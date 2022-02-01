import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";

import NavBar from "./NavBar";
import ShopOfferEditList from "./ShopOfferEditList";
import ShopOfferForm from "./ShopOfferForm";

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

export default function ShopOfferEdit() {
  const [shopOffer, setShopOffer] = useState([]);
  const [editShopOffer, seteditShopOffer] = useState(null);
  const [isUpdateBtn, setIsUpdateBtn] = useState(false);
  const [token] = useCookies(["mytoken"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/so/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setShopOffer(resp))
      .catch((error) => console.log(error));
  }, [token]);

  const editBtn = (shop) => {
    seteditShopOffer(shop);
    setIsUpdateBtn(true);
  };

  const updatedInformation = (shop) => {
    const new_shops = shopOffer.map((new_shop) => {
      if (new_shop.shopId.id === shop.shopId.id) {
        return shop;
      } else {
        return new_shop;
      }
    });

    setShopOffer(new_shops);
    setIsUpdateBtn(false);
  };

  const shopOfferForm = () => {
    seteditShopOffer({
      shopId: "",
      offerInPercentage: "",
      offerInTaka: "",
      offerTill: "",
    });
  };

  const insertedInformation = (shop) => {
    const new_shop = [...shopOffer, shop];
    setShops(new_shop);
  };

  const deleteBtn = (shop) => {
    const new_shops = shops.filter((my_shop) => {
      if (my_shop.shopId.id === shop.shopId.id) {
        return false;
      }
      return true;
    });

    setShops(new_shops);
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
            Edit Shop Offer
          </Col>
          <Col sm={2}></Col>
        </Row>

        <ShopOfferEditList
          shopOffer={shopOffer}
          editBtn={editBtn}
          shopOfferForm={ShopOfferForm}
          deleteBtn={deleteBtn}
        />

        {editShops ? (
          <ShopOfferForm
            shopOffer={editShopOffer}
            updatedInformation={updatedInformation}
            insertedInformation={insertedInformation}
            isUpdateBtn={isUpdateBtn}
          />
        ) : null}
      </motion.div>
    </Container>
  );
}
