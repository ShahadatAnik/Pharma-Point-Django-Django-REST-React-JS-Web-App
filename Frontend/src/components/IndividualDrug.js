import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import NavBar from "./NavBar";
import { Container, Row, Col, Figure } from "react-bootstrap";
import DrugInShops from "./DrugInShops";
import DrugReview from "./DrugReview";
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

export default function IndividualDrug() {
  const [drug, setDrug] = useState({});
  const { name } = useParams();
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/drugs/${name}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setDrug(result))
      .catch((error) => console.log(error));
  }, [name]);

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
            className="shadow-lg box-shadow-white p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
            style={{
              background: "#c95f5f",
            }}
          >
            {drug.name}
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={1} />

          <Col
            sm={5}
            className="shadow-lg p-5 rounded-3 text-center "
            style={{
              background: "#c95f5f",
            }}
          >
            <Figure.Image
              width={400}
              height={200}
              alt={drug.name}
              src={drug.drugImg}
              rounded
            />
          </Col>

          <Col sm={1}></Col>
          <Col
            sm={4}
            className="shadow-lg p-5 ml-3 rounded-3 text-left text-white text-wrap fs-5"
            style={{
              background: "#c95f5f",
            }}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <span>
                  <span className=" fw-bold">Category: </span>
                  {drug.category}
                </span>
                <br />
                <span>
                  <span className="fw-bold">Manufacturer: </span>
                  {drug.manufacturer}{" "}
                </span>
              </Row>
            </motion.div>

            <hr className="hrclass" />
            <motion.div whileHover={{ scale: 1.1 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <span>
                  <span className=" fw-bold">Age Level: </span>
                  {drug.ageLevel}
                </span>
              </Row>
            </motion.div>
            <hr className="hrclass" />
            <motion.div whileHover={{ scale: 1.1 }}>
              <Row
                className="shadow-lg rounded-3 text-white text-center fs-4 p-3 fw-bold"
                style={{
                  background: "#bf3636",
                }}
              >
                <span>
                  Unit Price <h2 className="fw-bold">{drug.unitPrice} BDT</h2>
                </span>
              </Row>
            </motion.div>
          </Col>
          <Col sm={1}></Col>
        </Row>
        <Row className="p-5">
          {/* <Col sm={1}></Col> */}
          <Col sm={13}>{drug.id ? <DrugInShops drugId={drug.id} /> : ""}</Col>
          {/* <Col sm={1}></Col> */}
        </Row>
        <Row>
          <br />
        </Row>
        <Row className="p-2">
          <Col sm={12}>{drug.id ? <DrugReview drugId={drug.id} /> : ""}</Col>
        </Row>
      </motion.div>
    </Container>
  );
}
