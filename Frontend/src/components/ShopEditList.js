import React from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";

function ShopEditList(props) {
  const [token] = useCookies(["mytoken"]);
  const editBtn = (shop) => {
    props.editBtn(shop);
  };

  const deleteBtn = (shop) => {
    APIService.DeleteShops(shop.shopName, token["mytoken"])
      .then(() => props.deleteBtn(shop))
      .catch((error) => console.log(error));
  };

  const shopForm = () => {
    props.shopForm();
  };

  return (
    <div>
      <br />
      {props.shops &&
        props.shops.map((shop) => {
          return (
            <Container>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Row
                  key={shop.id}
                  className="shadow-lg p-4 rounded-3 text-white fs-4"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  <Col sm={5}>
                    <Figure.Image
                      width={400}
                      height={200}
                      alt={shop.shopImg}
                      src={shop.shopImg}
                      rounded
                    />
                  </Col>
                  <Col sm={5}>
                    <strong>Name:</strong> {shop.shopName}
                    <br />
                    <strong>mobilePhone:</strong> {shop.mobilePhone}
                    <br />
                    <strong>email:</strong> {shop.email}
                    <br />
                    <strong>address:</strong> {shop.address}
                    <br />
                    <strong>city:</strong> {shop.city}
                    <br />
                    <strong>ratings:</strong> {shop.ratings}
                    <br />
                    <span>
                      <strong>Created Time: </strong>{" "}
                      {shop.timeStampCreated[11]}
                      {shop.timeStampCreated[12]}
                      {shop.timeStampCreated[13]}
                      {shop.timeStampCreated[14]}
                      {shop.timeStampCreated[15]} <strong> Date:</strong>{" "}
                      {shop.timeStampCreated[8]}
                      {shop.timeStampCreated[9]}
                      {shop.timeStampCreated[7]}
                      {shop.timeStampCreated[5]}
                      {shop.timeStampCreated[6]}
                      {shop.timeStampCreated[4]}
                      {shop.timeStampCreated[0]}
                      {shop.timeStampCreated[1]}
                      {shop.timeStampCreated[2]}
                      {shop.timeStampCreated[3]}
                    </span>
                    <br />
                    <span>
                      <strong>Updated Time: </strong>{" "}
                      {shop.timeStampUpdated[11]}
                      {shop.timeStampUpdated[12]}
                      {shop.timeStampUpdated[13]}
                      {shop.timeStampUpdated[14]}
                      {shop.timeStampUpdated[15]} <strong> Date:</strong>{" "}
                      {shop.timeStampUpdated[8]}
                      {shop.timeStampUpdated[9]}
                      {shop.timeStampUpdated[7]}
                      {shop.timeStampUpdated[5]}
                      {shop.timeStampUpdated[6]}
                      {shop.timeStampUpdated[4]}
                      {shop.timeStampUpdated[0]}
                      {shop.timeStampUpdated[1]}
                      {shop.timeStampUpdated[2]}
                      {shop.timeStampUpdated[3]}
                    </span>
                    <br />
                    <br />
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      className="btn btn-primary p-2"
                      onClick={() => editBtn(shop)}
                    >
                      Update
                    </motion.button>
                    <span> </span>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => deleteBtn(shop)}
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
          <button
            onClick={shopForm}
            className="btn btn-primary fs-1 text-white pb-2"
          >
            Insert Shop
          </button>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  );
}

export default ShopEditList;
