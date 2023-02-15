import React, { useState } from "react";
import { Form, Image, Button, Container, Card, Placeholder } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadTube = () => {
    const [formData, setFormData] = useState({
        title: "",
        describe: "",
        thumbnail: null,
        video: null,
    });
    const navigate = useNavigate()

    function changeHandler(e) {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    function readFile(e) {
        const reader = new FileReader();

        reader.onloadend = function () {
            const base64 = reader.result;
            setFormData((prev) => ({ ...prev, [e.target.name]: { file: e.target.files[0], data: base64 } }));
        };

        reader.readAsDataURL(e.target.files[0]);
    }

    async function Upload(e) {
        e.preventDefault();

        const res = await axios.post(
            "/api/video",
            {
                ...formData,
                thumbnail: formData.thumbnail.file,
                video: formData.video.file,
            },
            {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            }
        );
        if(res.status === 200)
            navigate('/videos')
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-content-evenly">
                    <Form className="col-md-5" style={{ margin: "auto", display: "flex", gap: "1rem", flexDirection: "column" }}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control as="textarea" value={formData.title} name="title" onChange={changeHandler}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" value={formData.describe} name="describe" onChange={changeHandler}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Thumbnail</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={readFile} name="thumbnail"></Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Upload video</Form.Label>
                            <Form.Control type="file" accept="video/*" onChange={readFile} name="video"></Form.Control>
                        </Form.Group>

                        <Button variant="outline-primary" onClick={Upload}>
                            Upload
                        </Button>
                    </Form>

                    <Card className="col-md-5" style={{ width: "18rem" }}>
                        <Card.Img
                            variant="top"
                            src={formData.thumbnail?.data}
                            style={{
                                aspectRatio: "1.5/1",
                            }}
                            className="mt-2"
                        />
                        <Card.Body>
                            <Card.Title style={{ textTransform: "capitalize" }}>
                                {formData.title ? (
                                    formData.title
                                ) : (
                                    <p aria-hidden="true">
                                        <Placeholder xs={6} bg="secondary" />
                                    </p>
                                )}
                            </Card.Title>
                            <Card.Text>
                              {
                                formData.describe
                                ? formData.describe
                                : <>
                                <Placeholder xs={12} size="xs" bg="secondary"/>
                                <Placeholder xs={10} size="xs" bg="secondary"/>
                                <Placeholder xs={8} size="xs" bg="secondary"/>
                              </>
                              }
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default UploadTube;
