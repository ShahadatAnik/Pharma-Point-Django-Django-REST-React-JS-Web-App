import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import "./LoginPage.css";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";

function Form(props) {
  const [name, setName] = useState(props.drug.name);
  const [category, setCategory] = useState(props.drug.category);
  const [manufacturer, setManufacturer] = useState(props.drug.manufacturer);
  const [unitPrice, setUnitPrice] = useState(props.drug.unitPrice);
  const [storageTemperature, setStorageTemperature] = useState(
    props.drug.storageTemperature
  );
  const [ageLevel, setAgeLevel] = useState(props.drug.ageLevel);

  const [token] = useCookies(["mytoken"]);
  const allNull = () => {
    setName("");
    setCategory("");
    setManufacturer("");
    setUnitPrice("");
    setStorageTemperature("");
    setAgeLevel("");
  };

  useEffect(() => {
    setName(props.drug.name);
    setCategory(props.drug.category);
    setManufacturer(props.drug.manufacturer);
    setUnitPrice(props.drug.unitPrice);
    setStorageTemperature(props.drug.storageTemperature);
    setAgeLevel(props.drug.ageLevel);
  }, [props.drug]);

  const InsertDrugs = () => {
    APIService.InsertDrugs(
      {
        name,
        category,
        manufacturer,
        unitPrice,
        storageTemperature,
        ageLevel,
      },
      token["mytoken"]
    )
      .then((resp) => props.insertedInformation(resp))
      .then(allNull());
  };

  const UpdateDrugs = () => {
    APIService.UpdateDrugs(
      props.drug.name,
      {
        name,
        category,
        manufacturer,
        unitPrice,
        storageTemperature,
        ageLevel,
      },
      token["mytoken"]
    )
      .then((resp) => props.updatedInformation(resp))
      .then(allNull());
  };

  return (
    <Container className="p-3">
      <Row>
        <Col sm={2} />
        <Col
          sm={8}
          className="p-3 rounded-3 text-white fs-1 fw-bold "
          style={{
            background: "#c95f5f",
          }}
        >
          {props.drug ? (
            <div className="text-white fs-2">
              <div className="p-4">
                <label className="pb-2">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Drug Name"
                  style={{
                    width: "90%",
                  }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Category</label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  placeholder="Enter Drug Category"
                  style={{
                    width: "90%",
                  }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Manufacturer</label>
                <input
                  type="text"
                  className="form-control"
                  id="manufacturer"
                  placeholder="Enter Drug Manufacturer"
                  style={{
                    width: "90%",
                  }}
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Unit Price</label>

                <input
                  type="text"
                  className="form-control"
                  id="unitPrice"
                  placeholder="Enter Drug Unit Price"
                  style={{
                    width: "90%",
                  }}
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Storage Temperature</label>
                <input
                  type="text"
                  className="form-control"
                  id="storageTemperature"
                  placeholder="Enter Drug Storage Temperature"
                  style={{
                    width: "90%",
                  }}
                  value={storageTemperature}
                  onChange={(e) => setStorageTemperature(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Age Level</label>
                <input
                  type="text"
                  className="form-control"
                  id="ageLevel"
                  placeholder="Enter Drug Age Level"
                  style={{
                    width: "90%",
                  }}
                  value={ageLevel}
                  onChange={(e) => setAgeLevel(e.target.value)}
                />
              </div>

              <div className="text-center fs-2">
                {props.drug.id && props.isUpdateBtn ? (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={UpdateDrugs}
                    className="btn btn-success btn-lg text-white fs-4"
                  >
                    Update
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={InsertDrugs}
                    className="btn btn-success btn-lg text-white fs-4"
                  >
                    Insert
                  </motion.button>
                )}
              </div>
            </div>
          ) : null}
        </Col>
        <Col sm={2} />
      </Row>
    </Container>
  );
}

export default Form;
