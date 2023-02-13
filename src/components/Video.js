import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";

const Video = () => {
    const [videos, setVideos] = useState();

    useEffect(() => {
        (async () => {
            const res = await axios.get("/api/videos");
            // console.log(res.data);
            setVideos(res.data);
        })();
    }, []);

    return (
        <Container className="mx-auto mt-5">
            <Row>
                {videos &&
                    videos.map((video) => {
                        return (
                            <Col md={4} xs={12}
                                key={video}
                            >
                                <video src={`http://localhost:7000/${video}`} controls width="100%"
                                
                                ></video>
                            </Col>
                        );
                    })}
            </Row>
        </Container>
    );
};

export default Video;
