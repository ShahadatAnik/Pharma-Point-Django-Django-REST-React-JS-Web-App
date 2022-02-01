import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Container, Row, Col } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

import NavBar from "./NavBar";
import CartList from "./CartList";
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

export default function Cart() {
  const [token] = useCookies(["mytoken"]);
  const [user] = useCookies(["userId"]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/cart/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setCart(result))
      .catch((error) => console.log(error));
  }, [token]);

  const deleteBtn = (item) => {
    const new_items = cart.filter((my_item) => {
      if (my_item.id === item.id) {
        return false;
      }
      return true;
    });

    setCart(new_items);
  };

  return (
    <Container fluid className="p-4">
      <NavBar />

      <Animation>
        <div ref={componentRef}>
          <Row>
            <br />
            <br />
            <br />
            <br />
          </Row>
          <Row>
            <Col sm={2}></Col>
            <Col sm>
              <motion.div
                animate={{ x: [0, 50, 0] }}
                className="shadow-lg p-3 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
                style={{
                  background: "#c95f5f",
                }}
              >
                Cart
              </motion.div>
            </Col>

            <Col sm={2}></Col>
          </Row>
          <Row>
            <br />
          </Row>

          <Row>
            <br />
          </Row>
          <Row>
            {cart
              .filter((id) => id.userId == user["userId"])
              .map((item) => {
                return (
                  <div>
                    {item.id ? (
                      <CartList item={item} deleteBtn={deleteBtn} />
                    ) : null}
                  </div>
                );
              })}
          </Row>
        </div>
      </Animation>
      <Animation>
        <Row>
          <Col sm={5}></Col>
          <Col sm={2} className="text-center p-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={handlePrint}
              className="btn btn-primary btn-lg fs-2"
            >
              Print
            </motion.button>
          </Col>
          <Col sm={5}></Col>
        </Row>
      </Animation>
    </Container>
  );
}
