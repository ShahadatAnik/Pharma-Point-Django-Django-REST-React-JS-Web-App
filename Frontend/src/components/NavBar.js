import React, { useState, useEffect } from "react";
import { Navbar, Button, Nav, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import PharmaPointLogoName from "../assests/Pharma-point-logo-name.png";

export default function NavbarComp() {
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [userId, setUserId, removeUserId] = useCookies(["userId"]);

  const [user, setUser] = useState({});

  const logoutBtn = () => {
    removeToken(["mytoken"]);
    removeUserId(["userId"]);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/users/${userId["userId"]}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setUser(result))
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <Navbar bg="light" variant={"light"} expand="lg" fixed="top">
      <Navbar.Brand className="p-2" href="/home">
        <Figure.Image
          width={200}
          height={40}
          alt="Pharma Point"
          src={PharmaPointLogoName}
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="pills" className="fs-5 fw-bold ">
          <Nav.Item>
            <Nav.Link as={Link} to="/home" className="m-2 ">
              Home
            </Nav.Link>{" "}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/drugs" className="m-2">
              Drugs
            </Nav.Link>{" "}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/shops" className="m-2">
              Shops
            </Nav.Link>{" "}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/cart" className="m-2">
              Cart
            </Nav.Link>{" "}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/contuct-us" className="m-2">
              Contact us
            </Nav.Link>{" "}
          </Nav.Item>

          {user.is_staff ? (
            <Nav>
              <Nav.Item>
                <Nav.Link as={Link} to="/drugs-edit" className="m-2">
                  DrugEdit
                </Nav.Link>{" "}
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/shops-edit" className="m-2">
                  ShopEdit
                </Nav.Link>{" "}
              </Nav.Item>
            </Nav>
          ) : null}
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse
        className="justify-content-end"
        id="responsive-navbar-nav"
      >
        <Nav className="fs-5 fw-bold ">
          <Nav.Item className="m-3">
            <span className="text-uppercase">{user.username} </span>(
            {user.is_staff ? <span>Staff</span> : <span>User</span>}
            <span>)</span>
          </Nav.Item>
          <Nav.Item className="m-2">
            <Button variant="warning" onClick={logoutBtn} as={Link} to="/login">
              Logout
            </Button>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
