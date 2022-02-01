import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Row, Col, Container } from "react-bootstrap";
import Animation from "./Animation";

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

export default function ContuctUs() {
  const [token] = useCookies(["mytoken"]);
  let history = useNavigate();

  const [cu, setCU] = useState();

  const [userName, setUserName] = useState();
  const [subject, setSubject] = useState();
  const [desc, setDesc] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/cu/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setCU(resp))
      .catch((error) => console.log(error));
  }, [token]);

  const InsertContuctUs = () => {
    if (!userName || !subject || !desc) {
      return alert("Please input all the field.");
    } else {
      return APIService.InsertContuctUs(
        {
          userName,
          subject,
          desc,
        },
        token["mytoken"]
      )
        .then((resp) => setCU(...cu, resp))
        .then(history("/home"))
        .then(
          alert(
            "You have successfully submited the form.\n\nWe will contuct you latter."
          )
        );
    }
  };

  return (
    <Container fluid className="p-4">
      <div className="p-5">
        <NavBar />
      </div>
      <Animation>
        <Row>
          <Col sm={1}></Col>
          <Col
            sm={4}
            className="shadow-lg rounded-3 fw-bold text-white fs-1 p-2"
            style={{
              background: "#c95f5f",
            }}
          >
            <Row className="p-4">
              <Col sm={2}></Col>
              <Col sm>
                <motion.h3
                  animate={{ x: [0, 50, 0] }}
                  className="shadow-lg rounded-3 fw-bold text-white text-center fs-1 p-2"
                  style={{
                    background: "#bf3636",
                  }}
                >
                  Developers
                </motion.h3>
              </Col>
              <Col sm={2}></Col>
            </Row>
            <Row className="pb-5">
              <Col sm={1}></Col>
              <Col
                sm
                className="shadow-lg rounded-3 text-white p-2 fs-4"
                style={{
                  background: "#bf3636",
                }}
              >
                Md. Shahadat Anik Sheikh
                <br />
                Student Id: 2019-1-60-068
                <br />
                East West University
              </Col>
              <Col sm={1}></Col>
            </Row>

            <Row className="pb-5">
              <Col sm={1}></Col>
              <Col
                sm
                className="shadow-lg rounded-3 text-white p-2 fs-4"
                style={{
                  background: "#bf3636",
                }}
              >
                Ajmiri Afrin Priniya
                <br />
                Student Id: 2019-1-60-061
                <br />
                East West University
              </Col>
              <Col sm={1}></Col>
            </Row>

            <Row className="pb-2">
              <Col sm={1}></Col>
              <Col
                sm
                className="shadow-lg rounded-3 text-white p-2 fs-4"
                style={{
                  background: "#bf3636",
                }}
              >
                AKM Sadat
                <br />
                Student Id: 2018-2-60-127
                <br />
                East West University
              </Col>
              <Col sm={1}></Col>
            </Row>
          </Col>
          <Col sm={1}></Col>
          <Col
            sm={5}
            className="shadow-lg rounded-3 fw-bold text-white fs-1 p-2"
            style={{
              background: "#c95f5f",
            }}
          >
            <Row className="p-4">
              <Col sm={2}></Col>
              <Col sm>
                <motion.h3
                  animate={{ x: [0, 50, 0] }}
                  className="shadow-lg rounded-3 fw-bold text-white text-center fs-1 p-2"
                  style={{
                    background: "#bf3636",
                  }}
                >
                  For Qurey
                </motion.h3>
              </Col>
              <Col sm={2}></Col>
            </Row>

            <div className="text-white fs-2 p-3">
              <div
                className="p-2 shadow-lg rounded-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <label className="pb-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Please Enter Your Name"
                  style={{
                    width: "100%",
                  }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div
                className="p-2 shadow-lg rounded-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <label className="pb-2">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Please Enter The Subject"
                  style={{
                    width: "100%",
                  }}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div
                className="p-2 shadow-lg rounded-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <label className="pb-2">Description </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="desc"
                  rows="4"
                  placeholder="Please Enter The Description"
                  style={{
                    width: "100%",
                  }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div
                class="text-center text-white fw-2 pb-3 shadow-lg rounded-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={InsertContuctUs}
                  className="btn btn-lg text-white fs-4 shadow-lg rounded-3"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <br />
        </Row>
      </Animation>
    </Container>
  );
}
