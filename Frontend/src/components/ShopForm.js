import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { motion } from "framer-motion/dist/es/index";

function ShopForm(props) {
  const [shopName, setShopName] = useState(props.shop.shopName);
  const [mobilePhone, setMobilePhone] = useState(props.shop.mobilePhone);
  const [email, setEmail] = useState(props.shop.email);
  const [address, setAddress] = useState(props.shop.address);
  const [city, setCity] = useState(props.shop.city);
  const [ratings, setRatings] = useState(props.shop.ratings);

  const [token] = useCookies(["mytoken"]);

  const allNull = () => {
    setShopName("");
    setMobilePhone("");
    setEmail("");
    setAddress("");
    setCity("");
    setRatings("");
  };

  useEffect(() => {
    setShopName(props.shop.shopName);
    setMobilePhone(props.shop.mobilePhone);
    setEmail(props.shop.email);
    setAddress(props.shop.address);
    setCity(props.shop.city);
    setRatings(props.shop.ratings);
  }, [props.shop]);

  const InsertShops = () => {
    APIService.InsertShops(
      {
        shopName,
        mobilePhone,
        email,
        address,
        city,
        ratings,
      },
      token["mytoken"]
    )
      .then((resp) => props.insertedInformation(resp))
      .then(allNull());
  };

  const UpdateShops = () => {
    APIService.UpdateShops(
      props.shop.shopName,
      {
        shopName,
        mobilePhone,
        email,
        address,
        city,
        ratings,
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
          {props.shop ? (
            <div className="text-white fs-2">
              <div className="p-4">
                <label className="pb-2">Shop Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="shopName"
                  placeholder="Enter shop Name"
                  style={{
                    width: "90%",
                  }}
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Mobile Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="mobilePhone"
                  placeholder="Enter shop Mobile Phone"
                  style={{
                    width: "90%",
                  }}
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Enter shop Email"
                  style={{
                    width: "90%",
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Address</label>

                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter shop Address"
                  style={{
                    width: "90%",
                  }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder="Enter shop City"
                  style={{
                    width: "90%",
                  }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="p-4">
                <label className="pb-2">Ratings</label>
                <input
                  type="text"
                  className="form-control"
                  id="rating"
                  placeholder="Enter shop Ratings"
                  style={{
                    width: "90%",
                  }}
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                />
              </div>

              <div className="text-center fs-2">
                {props.shop.id && props.isUpdateBtn ? (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={UpdateShops}
                    className="btn btn-success btn-lg text-white fs-4"
                  >
                    Update
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={InsertShops}
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

export default ShopForm;
