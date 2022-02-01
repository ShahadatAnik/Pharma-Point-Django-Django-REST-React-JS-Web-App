import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/es/index";

import { Row, Col, Card, Button } from "react-bootstrap";

export default function CarouselForDrugs() {
  const [token] = useCookies(["mytoken"]);
  const [drugs, setDrugs] = useState([]);

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

  return (
    <div>
      <Row>
        <br />
      </Row>
      <Row>
        <Col sm={1}></Col>
        <Col
          sm={10}
          className="shadow-lg p-4 rounded-3 text-center text-white "
          style={{
            background: "#c95f5f",
          }}
        >
          <h1
            className=" fw-bold text-white text-center fs-3 "
            style={{
              background: "#c95f5f",
            }}
          >
            Popular Drugs
          </h1>
        </Col>
        <Col sm={1}></Col>
      </Row>
      <Row md={4} className="g-5 p-5 rounded-3">
        {drugs &&
          drugs.slice(0, 8).map((drug) => {
            return (
              <div key={drug.id}>
                <Card
                  className="shadow-lg p-3 rounded-3"
                  style={{ width: "18rem", background: "#c95f5f" }}
                >
                  <Card.Img
                    variant="top"
                    className="shadow-lg rounded-3 "
                    width={300}
                    height={150}
                    alt={drug.name}
                    src={drug.drugImg}
                  />
                  <Card.Body>
                    <Card.Title
                      className="shadow-lg p-2 rounded-3 text-white text-center fs-3"
                      style={{ background: "#bf3636" }}
                    >
                      {drug.name}
                    </Card.Title>
                    <Card.Text className="p-2 text-white">
                      {drug.name} is <strong>{drug.category}</strong> category
                      drug, which is manufactured by{" "}
                      <strong>{drug.manufacturer}</strong> and unit price is{" "}
                      <strong>{drug.unitPrice} BDT</strong>
                    </Card.Text>
                    <Button
                      style={{ backgroundColor: "#bf3636" }}
                      variant="danger"
                      className="text-white text-center fs-5"
                      size="lg"
                      id="tbg-check-2"
                      as={Link}
                      to={`/drugs/${drug.name}`}
                    >
                      Details
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </Row>
    </div>
  );
}
