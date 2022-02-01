import React from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";

function DrugsList(props) {
  const editBtn = (drug) => {
    props.editBtn(drug);
  };

  const deleteBtn = (drug) => {
    APIService.DeleteDrugs(drug.name, token["mytoken"])
      .then(() => props.deleteBtn(drug))
      .catch((error) => console.log(error));
  };

  const drugForm = () => {
    props.drugForm();
  };

  const [token] = useCookies(["mytoken"]);

  return (
    <div>
      <br />
      {props.drugs &&
        props.drugs.map((drug) => {
          return (
            <Container>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Row
                  key={drug.id}
                  className="shadow-lg p-4 rounded-3 text-white fs-4"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  <Col sm={5}>
                    <Figure.Image
                      width={400}
                      height={200}
                      alt={drug.drugImg}
                      src={drug.drugImg}
                      rounded
                    />
                  </Col>
                  <Col sm={5}>
                    <strong>Name:</strong> {drug.name}
                    <br />
                    <strong>Category:</strong> {drug.category}
                    <br />
                    <strong>Manufacturer:</strong> {drug.manufacturer}
                    <br />
                    <strong>Unit Price:</strong> {drug.unitPrice}
                    <br />
                    <strong>Storage Temperature:</strong>{" "}
                    {drug.storageTemperature}
                    <br />
                    <strong>Age Level:</strong> {drug.ageLevel}
                    <br />
                    <span>
                      <strong>Created Time: </strong>{" "}
                      {drug.timeStampCreated[11]}
                      {drug.timeStampCreated[12]}
                      {drug.timeStampCreated[13]}
                      {drug.timeStampCreated[14]}
                      {drug.timeStampCreated[15]} <strong> Date:</strong>{" "}
                      {drug.timeStampCreated[8]}
                      {drug.timeStampCreated[9]}
                      {drug.timeStampCreated[7]}
                      {drug.timeStampCreated[5]}
                      {drug.timeStampCreated[6]}
                      {drug.timeStampCreated[4]}
                      {drug.timeStampCreated[0]}
                      {drug.timeStampCreated[1]}
                      {drug.timeStampCreated[2]}
                      {drug.timeStampCreated[3]}
                    </span>
                    <br />
                    <span>
                      <strong>Updated Time: </strong>{" "}
                      {drug.timeStampUpdated[11]}
                      {drug.timeStampUpdated[12]}
                      {drug.timeStampUpdated[13]}
                      {drug.timeStampUpdated[14]}
                      {drug.timeStampUpdated[15]} <strong> Date:</strong>{" "}
                      {drug.timeStampUpdated[8]}
                      {drug.timeStampUpdated[9]}
                      {drug.timeStampUpdated[7]}
                      {drug.timeStampUpdated[5]}
                      {drug.timeStampUpdated[6]}
                      {drug.timeStampUpdated[4]}
                      {drug.timeStampUpdated[0]}
                      {drug.timeStampUpdated[1]}
                      {drug.timeStampUpdated[2]}
                      {drug.timeStampUpdated[3]}
                    </span>
                    <br />
                    <br />
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="btn btn-primary p-2"
                      onClick={() => editBtn(drug)}
                    >
                      Update
                    </motion.button>
                    <span> </span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteBtn(drug)}
                      className="btn btn-danger p-2"
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
      <Row>
        <Col sm={2}></Col>
        <Col
          sm
          className="p-3 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={drugForm}
            className="btn btn-primary fs-1 text-white pb-2"
          >
            Insert Drug
          </motion.button>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  );
}

export default DrugsList;
