import React, { useState } from "react";
import { Card, Button, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommentCard = ({ comment: _ }) => {
    const [expandReplies, setExpandReplies] = useState(false);

    if (!Array.isArray(_.reply)) return;

    return (
        <Card style={{ width: "18rem" }} className={`w-100 pb-2 review-container ${_.replyparent && "linear-g"}`} id={"comment" + _.id}>
            <Card.Body>
                <Card.Title>
                    <div>
                        <img src={_.picture || ''} alt="" 
                            style={{
                                width : '30px',
                                borderRadius: '100%'
                            }}
                        />
                        &nbsp;&nbsp;
                        {_.name}
                    </div>
                    {_.rating != -1 && _.rating && (
                        <>
                            <span style={{ fontSize: ".8rem" }}>{"⭐".repeat(_.rating)}</span>
                            <span style={{ fontSize: ".8rem", filter: "grayscale(1)" }}>{"⭐".repeat(5 - _.rating)}</span>
                        </>
                    )}
                </Card.Title>

                <Card.Text className="m-0">
                    {_.replyto !== null && (
                        <a
                            href={`#comment${_.replyto}`}
                            data-parentid={_.replyparent}
                            onClick={(e) => {
                                e.preventDefault();
                                const id = new URL(e.currentTarget.href).hash;
                                document.querySelector(id).scrollIntoView({ behavior: "smooth" });
                                document.querySelector(id).classList.add("fade-color");
                            }}
                        >
                            {_.replytoname}
                        </a>
                    )}
                    &nbsp; {_.review}
                </Card.Text>

                <div className="d-flex justify-content-between reply-button-groups">
                    <Button variant="" className="p-0 mt-1 text-primary" data-reviwee={_.name} data-review-id={_.id} data-parentid={_.replyparent}>
                        Reply
                    </Button>
                    {_.reply.length > 0 && (
                        <Button variant="" className="p-0 mt-1" onClick={(e) => setExpandReplies((prev) => !prev)}>
                            <small>Replies {_.reply.length}</small>
                        </Button>
                    )}
                </div>
            </Card.Body>

            {_.reply?.length > 0 && (
                <Stack
                    className="replies-container gap-1"
                    style={{
                        padding: ".5rem 1rem 0 1.5rem",
                        display: expandReplies ? "flex" : "none",
                    }}
                >
                    {_.reply?.map((reply, i) => {
                        const replies = reply.reply && JSON.parse(reply.reply);
                        return <CommentCard comment={{ ...reply, reply: replies }} key={reply.id} />;
                    })}
                </Stack>
            )}
        </Card>
    );
};

export default CommentCard;
