import axios from "axios";
import React, { useLayoutEffect, useState } from "react";
import { Row, Container, Col, Stack, Badge, NavLink } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import StarRating from "../components/StarRating";

const Videos = () => {
    const [apiVideos, setApiVideos] = useState();

    useLayoutEffect(() => {
        (async () => {
            const res = await axios.get("/api/videos");
            setApiVideos(res.data);
        })();
    }, []);

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
            return `${Math.round(minutes)} minutes ago`;
        } else if (elapsedTimeInDays < 1) {
            return `${Math.round(minutes / 60)} hours ago`;
        } else if (elapsedTimeInDays < 365) {
            return `${Math.floor(elapsedTimeInDays)} days ago`;
        } else {
            return `${Math.floor(elapsedTimeInYears)} years ago`;
        }
    }

    return (
        <>
            <Container className="mx-auto mt-3 relative" style={{ height: "80vh" }}>
                <Row>
                    {apiVideos &&
                        apiVideos.map((tube) => {
                            let date = new Date(tube.ts);
                            return (
                                <Col md={4} xs={12} key={tube.id} id={`tube${tube.id}`}>
                                    <Link to={"/videos/reviews"} state={{tube}}
                                        style={{color: 'black', textDecoration: 'none'}}
                                    >
                                        <Stack className="relative">
                                            <video
                                                src={`http://localhost:7000/videos/${tube.video}`}
                                                controls
                                                width="100%"
                                                style={{
                                                    aspectRatio: "1.5/1",
                                                }}
                                                className="video"
                                                autoPlay
                                            ></video>
                                            <img
                                                src={`http://localhost:7000/thumbnails/${tube.thumbnail}`}
                                                controls
                                                width="100%"
                                                className="thumbnail-image"
                                                style={{ background: "white" }}
                                            ></img>
                                        </Stack>
                                        <Container className="mt-3">
                                            <Row>
                                                <Col>
                                                    <h5>{tube.title}</h5>
                                                </Col>
                                                {/* <Col style={{ justifyContent: "flex-end", gap: "1rem", display: "flex" }} onClick={captureReaction}>
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
                                                <div className="relative">
                                                    <Link
                                                        to={"/videos/reviews"}
                                                        state={{tube}}
                                                    >
                                                        <i style={{ cursor: "pointer" }} className="reaction-icon">
                                                            ⛪
                                                        </i>
                                                    </Link>
                                                </div>
                                            </Col> */}
                                            </Row>
                                            <Row>{/* <Col>⭐⭐⭐⭐⭐</Col> */}</Row>
                                            <Stack>
                                                <div className="d-flex justify-content-between">
                                                    <h6>{tube.description}</h6>
                                                    <small>{timeAgo(date)}</small>
                                                </div>
                                            </Stack>
                                        </Container>
                                    </Link>
                                </Col>
                            );
                        })}
                </Row>
            </Container>
            <Outlet></Outlet>
        </>
    );
};

export default Videos;
