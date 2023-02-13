import React from 'react'
import useUpload from "../hooks/useUpload";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef } from "react";

const UploadVideo = () => {
    const formRef = useRef();
    const { setFile: setVideo, Upload } = useUpload({});

    return (
        <form className="container" ref={formRef}>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Choose video</Form.Label>
                <Form.Control
                    type="file"
                    name="video"
                    accept="video/mp4,video/x-m4v,video/*"
                    required
                    onChange={(e) => setVideo((prev) => e.target.files[0])}
                />
            </Form.Group>
            <Button variant="outline-primary" onClick={Upload}>
                Upload
            </Button>
        </form>
    );
}

export default UploadVideo