import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";

import NavBar from "./NavBar";
import DrugsList from "./DrugsList";
import Form from "./Form";

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

const pageStyle = {
  position: "absolute",
};

export default function DrugEdit() {
  const [drugs, setDrugs] = useState([]);
  const [editDrugs, seteditDrugs] = useState(null);
  const [isUpdateBtn, setIsUpdateBtn] = useState(false);
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/drugs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setDrugs(resp))
      .catch((error) => console.log(error));
  }, [token]);

  const editBtn = (drug) => {
    seteditDrugs(drug);
    setIsUpdateBtn(true);
  };

  const updatedInformation = (drug) => {
    const new_drugs = drugs.map((new_drug) => {
      if (new_drug.id === drug.id) {
        return drug;
      } else {
        return new_drug;
      }
    });

    setDrugs(new_drugs);
    setIsUpdateBtn(false);
  };

  const drugForm = () => {
    seteditDrugs({
      id: "",
      name: "",
      category: "",
      manufacturer: "",
      unitPrice: "",
      storageTemperature: "",
      ageLevel: "",
    });
  };

  const insertedInformation = (drug) => {
    const new_drug = [...drugs, drug];
    setDrugs(new_drug);
  };

  const deleteBtn = (drug) => {
    const new_drugs = drugs.filter((my_drug) => {
      if (my_drug.id === drug.id) {
        return false;
      }
      return true;
    });

    setDrugs(new_drugs);
  };

  return (
    <Container fluid>
      <NavBar />

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
            Edit Drugs
          </Col>
          <Col sm={2}></Col>
        </Row>

        <DrugsList
          drugs={drugs}
          editBtn={editBtn}
          drugForm={drugForm}
          deleteBtn={deleteBtn}
        />

        {editDrugs ? (
          <Form
            drug={editDrugs}
            updatedInformation={updatedInformation}
            insertedInformation={insertedInformation}
            isUpdateBtn={isUpdateBtn}
          />
        ) : null}
      </motion.div>
    </Container>
  );
}
