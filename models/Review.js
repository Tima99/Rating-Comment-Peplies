const { db } = require("../db");

class Review {
    constructor({ user, replyparent , replyto = null, review, rating, tubeId }) {
        this.user = user;
        this.replyto = replyto ;
        this.replyparent = replyparent || this.replyto;
        this.review = review;
        this.rating = rating;
        this.tubeId = tubeId;
    }

    async save() {
        try {
            const query = "INSERT INTO reviews (user, replyparent, replyto, review, rating, tubeId) VALUE (?, ?, ?, ?, ?, ?)";
            const [res] = await db.query(query, [this.user, this.replyparent, this.replyto, this.review, this.rating, this.tubeId]);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static async findAll({ id , start=0, end}) {
        try {
            const query = `
            SELECT R.*,  U.name, U.picture,
            GROUP_CONCAT(
                JSON_OBJECT(
                    'name', RU.name,
                    'picture', RU.picture,
                    'id', RPLY.id,
                    'replyto', RPLY.replyto,
                    'replyparent', RPLY.replyparent,
                    'review', RPLY.review,
                    'reply', '[]',
                    'replytoname', RUT.name
                )
            ) as reply,
            (SELECT COUNT(id) from reviews WHERE tubeId = ? AND rating IN ('0','1','2','3','4','5')) as maxLimit
            from reviews R
            -- for name of commentor or parent reviewer
            INNER JOIN users U ON U.email = R.user
            -- Join repliers as JSON_OBJECT to whom they reply
            LEFT JOIN reviews RPLY On RPLY.replyparent = R.id
            -- for get name of reply to id
            LEFT JOIN users RU ON RU.email = RPLY.user
            -- for get name of replyto id
            LEFT JOIN users RUT ON RUT.email = (SELECT user from reviews WHERE reviews.id = RPLY.replyto)
            WHERE R.tubeId = ? AND R.rating IN ('0','1','2','3','4','5')
            GROUP BY R.id ORDER BY R.id DESC
            LIMIT ${start},  ${end};
            `;
            const [res] = await db.query(query, [id, id]);
            return res;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

module.exports = Review;
