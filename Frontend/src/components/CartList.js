import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";

export default function CartList(props) {
  const [token] = useCookies(["mytoken"]);

  const [storeDrugs, setStoreDrugs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/sd/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setStoreDrugs(result))
      .catch((error) => console.log(error));
  }, [token]);

  const deleteBtn = (item) => {
    APIService.DeleteCart(item.id, token["mytoken"])
      .then(() => props.deleteBtn(item))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {storeDrugs
        .filter((sd) => sd.id === props.item.sdId)
        .map((item) => {
          return (
            <Container>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Row
                  key={item.id}
                  className="shadow-lg p-4 rounded-3 text-white fs-4"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  <Col sm={2}>
                    <Figure.Image
                      width={150}
                      height={150}
                      alt={item.drugId.drugImg}
                      src={item.drugId.drugImg}
                      rounded
                    />
                  </Col>
                  <Col sm={3}>
                    <strong>Drug Name:</strong> {item.drugId.name}
                    <br />
                    <strong>Category:</strong> {item.drugId.category}
                    <br />
                    <strong>Manufacturer:</strong> {item.drugId.manufacturer}
                    <br />
                    <strong>Unit Price:</strong> {item.drugId.unitPrice}
                    <br />
                    <strong>Expire Date:</strong> {item.expireDate}
                    <br />
                  </Col>
                  <Col sm={2}>
                    <Figure.Image
                      width={150}
                      height={150}
                      alt={item.shopId.shopImg}
                      src={item.shopId.shopImg}
                      rounded
                    />
                  </Col>
                  <Col sm={4}>
                    <strong>Shop Name:</strong> {item.shopId.shopName}
                    <br />
                    <strong>Mobile Phone:</strong> {item.shopId.mobilePhone}
                    <br />
                    <strong>Address:</strong> {item.shopId.address},{" "}
                    {item.shopId.city}
                    <br />
                  </Col>
                  <Col sm={1} className="text-center align-self-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteBtn(props.item)}
                      className="btn btn-danger p-2 btn-lg fw-bold fs-4"
                    >
                      Delete
                    </motion.button>
                  </Col>
                </Row>
              </motion.div>
              <Row>
                <br />
              </Row>
            </Container>
          );
        })}
    </div>
  );
}
