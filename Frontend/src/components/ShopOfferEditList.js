import React from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import "./LoginPage.css";
import { Container, Row, Col, Figure } from "react-bootstrap";

function ShopEditList(props) {
  const [token] = useCookies(["mytoken"]);
  const editBtn = (shop) => {
    props.editBtn(shop);
  };

  const deleteBtn = (shop) => {
    APIService.DeleteShops(shop.shopId.id, token["mytoken"])
      .then(() => props.deleteBtn(shop))
      .catch((error) => console.log(error));
  };

  const shopOfferForm = () => {
    props.shopOfferForm();
  };

  return (
    <div>
      <br />
      {props.shopOffer &&
        props.shopOffer.map((shop) => {
          return (
            <Container>
              <Row
                key={shop.shopId.id}
                className="shadow-lg p-4 rounded-3 text-white fs-4"
                style={{
                  background: "#c95f5f",
                }}
              >
                <Col sm={5}>
                  <Figure.Image
                    width={400}
                    height={200}
                    alt={shop.shopId.shopImg}
                    src={shop.shopId.shopImg}
                    rounded
                  />
                </Col>
                <Col sm={5}>
                  <strong>Shop Name:</strong> {shop.shopId.shopName}
                  <br />
                  <strong>Offer In Percentage:</strong> {shop.offerInPercentage}
                  <br />
                  <strong>Offer In Taka:</strong> {shop.offerInTaka}
                  <br />
                  <strong>Offer Till:</strong> {shop.offerTill}
                  <br />
                  <br />
                  <button
                    className="btn btn-primary p-2"
                    onClick={() => editBtn(shop)}
                  >
                    Update
                  </button>
                  <span> </span>
                  <button
                    onClick={() => deleteBtn(shop)}
                    className="btn btn-danger p-2"
                  >
                    Delete
                  </button>
                </Col>
              </Row>
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
            onClick={shopOfferForm}
            className="btn btn-primary fs-1 text-white pb-2"
          >
            Insert Shop Offer
          </button>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  );
}

export default ShopEditList;
