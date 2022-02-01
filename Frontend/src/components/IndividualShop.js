import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import IndividualShopOffer from "./IndividualShopOffer";
import ShopHasDrugs from "./ShopHasDrugs";
import ShopReview from "./ShopReview";

import NavBar from "./NavBar";
import { Container, Row, Col, Figure, ProgressBar } from "react-bootstrap";
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

export default function IndividualShop() {
  const [shop, setShop] = useState({});
  const { shopName } = useParams();
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/shops/${shopName}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setShop(result))
      .catch((error) => console.log(error));
  }, [shopName]);

  return (
    <Container fluid="sm">
      <div className="p-5">
        <NavBar />
      </div>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Row>
          <Col
            sm
            className="shadow-lg p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
            style={{
              background: "#c95f5f",
            }}
          >
            {shop.shopName}
          </Col>
        </Row>
        <br />
        <Row>
          <Col
            sm={4}
            className="shadow-lg p-5 rounded-3 text-center"
            style={{
              background: "#c95f5f",
            }}
          >
            <Figure.Image
              width={300}
              height={300}
              alt={shop.shopName}
              src={shop.shopImg}
              rounded
            />
          </Col>
          <Col sm={1}></Col>
          <Col
            sm={3}
            className="shadow-lg p-4 rounded-3 text-white"
            style={{
              background: "#c95f5f",
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-2"
                style={{
                  background: "#bf3636",
                }}
              >
                <span className="fw-bold">Address:</span>
                <a
                  href={`https://www.google.com.bd/maps/search/${shop.shopName}+${shop.address}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="fs-4 text-decoration-underline text-white"
                >
                  {shop.address}, {shop.city}
                </a>
              </Row>
            </motion.div>

            <hr className="hrclass" />
            <motion.div whileHover={{ scale: 1.05 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-2"
                style={{
                  background: "#bf3636",
                }}
              >
                <span>
                  <span className="text-decoration-none fw-bold">
                    Phone No:{" "}
                  </span>
                  {shop.mobilePhone}
                </span>{" "}
                <br />
                <span>
                  <span className="text-decoration-none fw-bold">Email: </span>
                  {shop.email}
                </span>
              </Row>
            </motion.div>

            <hr className="hrclass" />
            <motion.div whileHover={{ scale: 1.05 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-2"
                style={{
                  background: "#bf3636",
                }}
              >
                <Col className="text-center fw-bold fs-4">
                  <div className="pb-2">Rating</div>
                  <ProgressBar
                    className="fw-bold fs-5"
                    animated
                    variant="danger"
                    now={shop.ratings * 20}
                    label={`${shop.ratings} / 5`}
                  />
                </Col>
              </Row>
            </motion.div>
          </Col>
          <Col sm={1}></Col>
          <Col sm={3}>
            {shop.id ? <IndividualShopOffer shopOfferId={shop.id} /> : ""}
          </Col>
        </Row>
        <Row className="p-4">
          <Col sm>{shop.id ? <ShopHasDrugs shopId={shop.id} /> : ""}</Col>
        </Row>
        <Row>
          <br />
        </Row>
        <Row className="p-2">
          <Col sm={12}>{shop.id ? <ShopReview shopId={shop.id} /> : ""}</Col>
        </Row>
      </motion.div>
    </Container>
  );
}
