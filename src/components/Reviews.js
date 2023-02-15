import React, { useEffect, useMemo, useState } from "react";
import { Button, Col, Container, Form, Row, Stack, Badge, InputGroup, Alert } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import StarRating from "../components/StarRating";
import axios from "axios";
import CommentCard from "./CommentCard";

const Reviews = () => {
    const [rating, setRating]         = useState(0);
    const [review, setReview]         = useState("");
    const [replyTo, setReplyTo]       = useState({ name: null, id: null });
    const [reviews, setReviews]       = useState([]);
    const [startLimit, setStartLimit] = useState(0);
    const [maxLimit, setMaxLimit]     = useState(null);
    /* ******* */
    const navigate    = useNavigate();
    const { state }   = useLocation();
    const { tube }    = state || {};
    const date        = new Date(tube.ts);
    const dataToFetch = 10;
    let fetching      = useMemo(() => true);

    function checkBottom(element) {
        if (element.scrollTop + element.offsetHeight >= element.scrollHeight - 210) return true;
    }

    function Scrolling(e) {
        const isReach = checkBottom(e.currentTarget);
        if (isReach) {
            if (startLimit > maxLimit) return;
            setStartLimit((prev) => prev + dataToFetch);
        }
    }

    async function fetchComments() {
        fetching = false;

        const { data: reviews } = await axios.get("/api/reviews/" + tube?.id + `?start=${startLimit}&end=${dataToFetch}`);
        if (reviews.length <= 0) return;

        // console.log(reviews)
        
        const $reviews = reviews.map((_) => {
            const inarr = "[" + _?.reply + "]";
            _.reply = JSON.parse(inarr).filter((_) => _.id);
            return _;
        });

        if (maxLimit === null) {
            setMaxLimit((...prev) => {
                const _maxLimit = reviews[0]?.maxLimit;
                return _maxLimit ? _maxLimit : prev;
            });
        }

        setReviews((_) => [..._, ...$reviews]);

        fetching = true;
    }

    useEffect(() => {
        fetching && fetchComments();
    }, [startLimit]);

    useEffect(() => {
        const scrollContainer = document.getElementById("scroll-container");
        scrollContainer.addEventListener("scroll", Scrolling);

        return () => {
            scrollContainer.removeEventListener("scroll", Scrolling);
        };
    }, [startLimit, maxLimit]);

    function captureReaction(e) {
        if (e.target.id.includes("btn")) {
            const actionDone = e.target.nextElementSibling;
            actionDone && (actionDone.style.zIndex = "1");
        }
    }

    function timeAgo(date) {
        const now = new Date();
        const elapsedTime = now - date;
        const elapsedTimeInMinutes = Math.floor((now.getTime() - date.getTime()) / 1000);
        const minutes = elapsedTimeInMinutes / 60;
        const elapsedTimeInDays = elapsedTime / (1000 * 60 * 60 * 24);
        const elapsedTimeInYears = elapsedTimeInDays / 365;

        if (minutes < 60) {
            return `${Math.floor(minutes)} minutes ago`;
        } else if (elapsedTimeInDays < 1) {
            return `${Math.floor(minutes / 60)} hours ago`;
        } else if (elapsedTimeInDays < 365) {
            return `${Math.floor(elapsedTimeInDays)} days ago`;
        } else {
            return `${Math.floor(elapsedTimeInYears)} years ago`;
        }
    }

    async function SubmitReview(e) {
        if (review.trim().length <= 0) return;
        try {
            const res = await axios.post(
                `/api/review?end=${startLimit + dataToFetch}`,
                { rating, review, videoId: tube.id },
                { withCredentials: true }
            );

            const $reviews = res.data.map((_) => {
                const inarr = "[" + _.reply + "]";
                _.reply = JSON.parse(inarr).filter((_) => _.id);
                return _;
            });

            setReviews((_) => $reviews);
            setReview("");
        } catch (error) {
            console.log(error);
        }
    }

    function avgStar() {
        const totalStar = reviews.reduce((a, review) => a + Number(review.rating), 0);
        const totalReviwee = reviews.filter((_) => _.replyto === null).length;
        return totalStar / totalReviwee;
    }

    async function SubmitReply(e) {
        try {
            if (review.trim().length <= 0) return;
            if (replyTo.id === null) return;

            const res = await axios.post(
                `/api/review?end=${startLimit + dataToFetch}`,
                { review, videoId: tube.id, replyto: replyTo.id, replyparent: replyTo.parentId },
                { withCredentials: true }
            );

            const $reviews = res.data.map((_) => {
                const inarr = "[" + _.reply + "]";
                _.reply = JSON.parse(inarr).filter((_) => _.id);
                return _;
            });

            setReviews((_) => $reviews);
            setReview("");
            document.getElementById("comment" + (replyTo.parentId || replyTo.id)).classList.remove("onreply-pop-up");
            document.getElementById("comment" + replyTo.id).classList.remove("border-green");

            setReplyTo((prev) => ({ name: null, id: null }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Stack
            className="position-absolute top-0 left-0 bg-light w-100 left-0 overflow-hidden"
            direction="horizontal"
            style={{
                zIndex: 999,
                translate: "0 2.55rem",
                left: 0,
                overflow: "scroll",
                height: "auto",
            }}
        >
            <div
                md={2}
                className="container-fluid"
                id="scroll-container"
                style={{
                    height: "94vh",
                    overflow: "scroll",
                    scrollPadding: "25vh",
                    scrollBehavior: "smooth",
                }}
            >
                <Row>
                    <Col
                        id={`tube${tube.id}`}
                        md={5}
                        className="slide-enter-left"
                        onAnimationEnd={function (e) {
                            e.currentTarget.classList.remove("slide-enter-left");
                        }}
                    >
                        <Stack className="relative">
                            <video
                                src={`http://localhost:7000/videos/${tube.video}`}
                                controls
                                width="100%"
                                style={{
                                    aspectRatio: "1.5/1",
                                }}
                            ></video>
                        </Stack>
                        <Container className="mt-3">
                            <Row>
                                <Col>
                                    <h5>{tube.title}</h5>
                                </Col>
                                <Col style={{ justifyContent: "flex-end", gap: "1rem", display: "flex" }} onClick={captureReaction}>
                                    <div className="relative">
                                        <i style={{ cursor: "pointer" }} className="reaction-icon" id="like-btn">
                                            👍
                                        </i>
                                        <i style={{ filter: "grayscale(1)", position: "absolute", left: "0", zIndex: "-1" }}>👍</i>
                                    </div>
                                    <div className="relative">
                                        <i style={{ cursor: "pointer" }} className="reaction-icon" id="clap-btn">
                                            👏
                                        </i>
                                        <i style={{ filter: "grayscale(1)", position: "absolute", left: "0", zIndex: "-1" }}>👏</i>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                <span>{"⭐".repeat(avgStar())}</span>
                                <span style={{ filter: "grayscale(1)" }}>{"⭐".repeat(5 - avgStar())}</span>
                            </div>
                            <Stack>
                                <div className="d-flex justify-content-between">
                                    <h6>{tube.description}</h6>
                                    <small>{timeAgo(date)}</small>
                                </div>
                                <small className="d-flex justify-content-between">
                                    <span>{date.toDateString()}</span>
                                    <span>{date.toLocaleTimeString()}</span>
                                </small>
                            </Stack>
                        </Container>
                    </Col>

                    <Col
                        md={7}
                        onScroll={(e) => console.log("scroll")}
                        className="slide-enter boi"
                        onAnimationEnd={function (e) {
                            e.currentTarget.classList.remove("slide-enter");
                        }}
                    >
                        <Row
                            style={{
                                fontSize: "1.25rem",
                                margin: ".5REM",
                                cursor: "pointer",
                                display: "inline",
                            }}
                            onClick={(e) => {
                                const reviewoutlet = e.target.parentElement;
                                const videooutlet = e.target.parentElement.previousSibling;
                                reviewoutlet.classList.add("slide-exit");
                                videooutlet.classList.add("slide-exit-left");
                                reviewoutlet.addEventListener("animationend", function back() {
                                    reviewoutlet.removeEventListener("animationend", back);
                                    navigate(-1);
                                });
                            }}
                        >
                            ❌
                        </Row>
                        <Row>{replyTo.id === null && <StarRating rating={rating} setRating={setRating}></StarRating>}</Row>

                        <Row className="justify-content-end">
                            <Col>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>{replyTo.id === null ? <b>Write Comment</b> : <b>Reply To:</b>}</Form.Label>

                                        <InputGroup>
                                            {replyTo.id !== null && (
                                                <InputGroup.Text style={{ flexDirection: "column" }}>
                                                    <Badge>{replyTo.name}</Badge>
                                                </InputGroup.Text>
                                            )}
                                            <Form.Control
                                                as="textarea"
                                                aria-label="With textarea"
                                                onChange={(e) => setReview(e.target.value)}
                                                value={review}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                </Form>

                                <div className="d-flex justify-content-end gap-2">
                                    <Button className="mt-2" onClick={replyTo.id !== null ? SubmitReply : SubmitReview}>
                                        Submit
                                    </Button>
                                    {replyTo.id !== null && (
                                        <Button
                                            className="mt-2"
                                            variant="outline-danger"
                                            onClick={(e) => {
                                                document
                                                    .getElementById("comment" + (replyTo.parentId || replyTo.id))
                                                    .classList.remove("onreply-pop-up");
                                                document.getElementById("comment" + replyTo.id).classList.remove("border-green");
                                                setReplyTo((prev) => ({ name: null, id: null }));
                                                setRating(0)
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <hr />
                        <Stack
                            className="mt-3 reviews-scroll-section relative"
                            gap={2}
                            onClick={(e) => {
                                if (e.target.type === "button") {
                                    const parentId = e.target.getAttribute("data-parentid");
                                    const reviewId = e.target.getAttribute("data-review-id");
                                    if (!reviewId) return;
                                    // remove styling on selected reply
                                    replyTo.id &&
                                        document.getElementById("comment" + (replyTo.parentId || replyTo.id)).classList.remove("onreply-pop-up");
                                    replyTo.id && document.getElementById("comment" + replyTo.id).classList.remove("border-green");

                                    // focus reply input
                                    document.querySelector("textarea").scrollIntoView();
                                    document.querySelector("textarea").focus();

                                    // add styling on selected reply
                                    const parentComment = document.getElementById("comment" + (parentId || reviewId));

                                    if (parentId) {
                                        parentComment?.classList.add("onreply-pop-up");
                                    } else {
                                        parentComment?.classList.add("onreply-pop-up");
                                    }
                                    document.getElementById("comment" + reviewId).classList.add("border-green");

                                    setReplyTo((prev) => ({
                                        name: e.target.getAttribute("data-reviwee"),
                                        id: reviewId,
                                        parentId,
                                    }));
                                }
                            }}
                            onAnimationEnd={(e) => e.target.classList.remove("fade-color")}
                        >
                            {reviews.length > 0 ? (
                                reviews?.map((review, i) => {
                                    return <CommentCard comment={review} key={review.id} />;
                                })
                            ) : (
                                <Alert variant={'light'}>
                                    There is no comments!
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </div>
        </Stack>
    );
};

export default Reviews;
