import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import PharmaPointLogoNameWhite from "../assests/Pharma-point-logo-white.png";
import { Container, Row, Col, Figure } from "react-bootstrap";
import Animation from "./Animation";

import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
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

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken, removeToken] = useCookies(["mytoken"]);
  const [userId, setUserId, removeUserId] = useCookies(["userId"]);

  const [isLogin, setLogin] = useState(true);
  let history = useNavigate();

  useEffect(() => {
    if (token["mytoken"] === "undefined") {
      removeToken(["mytoken"]);
      removeUserId(["userId"]);
      return alert(
        "You have not regerstered yet OR your username and password is empty or wrong."
      );
    } else if (token["mytoken"] && username && password) {
      return history("/home");
    }
  }, [token]);

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => {
        setToken("mytoken", resp.token);
        setUserId("userId", resp.user_id);
      })
      .catch((error) => console.log(error));
  };

  const RegisterBtn = () => {
    APIService.RegisterUser({ username, password })
      .then(() => loginBtn())
      .catch((error) => console.log(error));
  };
  return (
    <Container fluid>
      <Row>
        <br />
        <br />
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col sm>
          <Animation>
            <div
              className="p-3 rounded-3 text-white"
              style={{
                background: "#c95f5f",
              }}
            >
              <motion.div animate={{ x: [0, 50, 0] }} className="center-text">
                <Figure.Image
                  width={150}
                  height={200}
                  alt="Pharma Point"
                  src={PharmaPointLogoNameWhite}
                />
              </motion.div>
              <br />
              <br />
              {isLogin ? (
                <h1 className="center-text">Login </h1>
              ) : (
                <h1 className="center-text">Registration </h1>
              )}

              <br />
              <br />

              <div className="mb-5">
                <input
                  type="text-login"
                  className="form-control"
                  id="username"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="center-text">
                {isLogin ? (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={loginBtn}
                    className="btn btn-danger btn-lg "
                  >
                    Login
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={RegisterBtn}
                    className="btn btn-danger btn-lg"
                  >
                    Register
                  </motion.button>
                )}
              </div>
              <div className="mb-3">
                <br />
                {isLogin ? (
                  <div className="center-text fs-2">
                    If You Don't Have Account, Please{" "}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                      className="btn btn-danger btn-lg"
                      onClick={() => setLogin(false)}
                    >
                      Register{" "}
                    </motion.button>{" "}
                    Here
                  </div>
                ) : (
                  <div className="center-text fs-2">
                    If You Have Account, Please{" "}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                      className="btn btn-danger btn-lg"
                      onClick={() => setLogin(true)}
                    >
                      Login
                    </motion.button>{" "}
                    Here
                  </div>
                )}
              </div>
            </div>
          </Animation>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Container>
  );
}

export default Login;
