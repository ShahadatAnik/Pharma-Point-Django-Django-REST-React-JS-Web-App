import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import APIService from "../APIService";
import UserInfo from "./UserInfo";
import NavBar from "./NavBar";
import { Container, Row, Col, Figure } from "react-bootstrap";

import { motion } from "framer-motion/dist/es/index";
const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw",
    y: "-100vh",
    scale: 0.8,
  },
  in: {
    opacity: 1,
    y: 0,
    // x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: "100vh",
    // x: "100vw",
    scale: 5,
  },
};

const pageTransition = {
  type: "spring",
  ease: "anticipate",
  duration: 1,
  transition: "linear",
  stiffness: 50,
};

export default function UserProfile(props) {
  const [userInfo, setUserInfo] = useState([]);
  const [token] = useCookies(["mytoken"]);
  const [user] = useCookies(["userId"]);

  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/users/${user["userId"]}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setUserInfo(result))
      .catch((error) => console.log(error));
  }, [token]);

  const allNull = () => {
    setFirst_name("");
    setLast_name("");
    setEmail("");
  };

  const updateBtn = (userInfo) => {
    setFirst_name(userInfo.first_name);
    setLast_name(userInfo.last_name);
    setEmail(userInfo.email);
  };

  const updatedUserInfo = (user) => {
    setUserInfo(user);
  };

  const UserInfoUpdate = () => {
    APIService.UpdateUser(
      userInfo.id,
      {
        first_name,
        last_name,
        email,
      },
      token["mytoken"]
    )
      .then((resp) => updatedUserInfo(resp))
      .then(allNull())
      .catch((error) => console.log(error));
  };

  return (
    <Container fluid>
      <Row>
        <NavBar />
      </Row>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Row>
          <br />
          <br />
          <br />
          <br />
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col
            sm
            className="shadow-lg p-3 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
            style={{
              background: "#c95f5f",
            }}
          >
            User Profile
          </Col>
          <Col sm={2}></Col>
        </Row>
        <Row
          className="shadow rounded-3 text-white p-3"
          style={{
            background: "#c95f5f",
          }}
        >
          <h3>{userInfo.first_name}</h3>
          <br />
          <h3>{userInfo.last_name}</h3>
          <br />
          <h3>{userInfo.email}</h3>

          <br />

          <div>
            <button
              className="btn btn-primary mx-auto"
              onClick={() => updateBtn(userInfo)}
            >
              Update
            </button>
          </div>
        </Row>
        <Row>
          <div
            className="shadow rounded-3 text-white p-3"
            style={{
              background: "#c95f5f",
              width: "100%",
            }}
          >
            <div className="p-4">
              <label className="pb-2">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                placeholder="Enter First Name"
                style={{
                  width: "90%",
                }}
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className="p-4">
              <label className="pb-2">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Enter Last Name"
                style={{
                  width: "90%",
                }}
                value={last_name}
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div className="p-4">
              <label className="pb-2">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                style={{
                  width: "90%",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />

            <div class="col text-center text-white fw-2 pb-3">
              <button
                type="button"
                onClick={UserInfoUpdate}
                className="btn btn-lg text-white fs-4 "
                style={{
                  background: "#bf3636",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </Row>
      </motion.div>
    </Container>
  );
}
