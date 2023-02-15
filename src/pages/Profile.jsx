import React, { useState } from "react";

import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Profile = () => {
    const authUser = useSelector((state) => state.auth);
    const [imageAlternative, setImageAlternative] = useState(false);

    if(!authUser)
     return(
        <h3>Loading...</h3>
     )
    
    return (
        <Card style={{ width: "18rem" }} className="m-auto mt-5">
            {!imageAlternative ? (
                <Card.Img
                    variant="top"
                    src={authUser?.picture || ''}
                    style ={{
                        width: '150px',
                        margin: 'auto',
                        marginTop: '.5rem'
                    }}
                    onError={(e) => {
                        console.log("image not loaded");
                        setImageAlternative(true)
                    }}
                />
            ) : (
                <div className="profile-logo">{authUser?.name?.[0]}</div>
            )}

            <Card.Body>
                <Card.Title>{authUser?.name}</Card.Title>
                <Card.Text>{authUser?.email}</Card.Text>
                <Button variant="" className="text-danger p-0">
                    Logout
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Profile;
