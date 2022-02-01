import React from "react";
import NavBar from "./NavBar";
import "./LoginPage.css";
import { Container, Row, Col } from "react-bootstrap";
import ShopDrugAmount from "./ShopDrugAmount";
import ShopOffers from "./ShopOffers";
import CartlForDrugs from "./CartlForDrugs";
import Caro from "./Carousel";
import Animation from "./Animation";
import { motion } from "framer-motion/dist/es/index";
const pageVariants = {
  // from left to right
  initial: {
    opacity: 0,
    x: "100vw",
    // y: "-100vh",
    scale: 0.2,
  },
  in: {
    opacity: 1,
    // y: 0,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    // y: "100vh",
    x: "-100vw",
    scale: 0.2,
  },
};

const pageTransition = {
  type: "spring",
  ease: "anticipate",
  duration: 1,
  transition: "linear",
  stiffness: 50,
};

function Home() {
  return (
    <Container fluid className="p-4">
      <NavBar />
      <Row>
        <br />
        <br />
      </Row>

      <Animation>
        <Row className="p-5">
          <Caro />
        </Row>
        <Row>
          <Col sm={2}>
            <ShopOffers />
          </Col>
          <Col sm={10}>
            <ShopDrugAmount />
          </Col>
        </Row>
        <Row>
          <CartlForDrugs />
        </Row>
      </Animation>
    </Container>
  );
}

export default Home;
