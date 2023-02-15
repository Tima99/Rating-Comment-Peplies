import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

const Layout1 = () => {

    return (
        <>
            <div className="container-fluid bg-dark">
                <div className="text-light p-2 d-flex gap-4">
                    <NavLink to={"/videos"} className="text-light text-decoration-none ">
                        Home
                    </NavLink>

                    <NavLink to={"/"} className="text-light text-decoration-none">
                        Upload
                    </NavLink>

                    <NavLink to={"/profile"} className="text-light text-decoration-none">
                        Profile
                    </NavLink>

                    
                </div>
            </div>
            <div className="container">
                <Row>
                    <Outlet></Outlet>
                </Row>
            </div>
        </>
    );
};

export default Layout1;
