import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { motion } from "framer-motion/dist/es/index";

export default function ShopOffers() {
  const [token] = useCookies(["mytoken"]);
  const [offerList, setofferList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/so/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setofferList(result))
      .catch((error) => console.log(error));
  }, [token]);

  return (
    <motion.div
      // animate={{ x: [0, 100, 0] }}
      className="shadow-lg rounded-3"
      style={{
        height: "auto",
        width: "auto",
        background: "#c95f5f",
        border: "4px",
        color: "white",
        textAlign: "left",
        padding: "20px 20px 20px 20px",
      }}
    >
      <div>
        <motion.h1
          animate={{ x: [0, 15, 0] }}
          className="shadow-lg rounded-3 fw-bold text-white text-center fs-1 p-1"
          style={{
            background: "#bf3636",
          }}
        >
          Offers
        </motion.h1>
        <br />
      </div>
      {offerList &&
        offerList.map((offer) => {
          return (
            <div key={offer.shopId.id}>
              <div
                className="shadow rounded-3 p-3"
                style={{
                  background: "#bf3636",
                }}
              >
                <motion.h3
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.8 }}
                  className="shadow rounded-3 text-white text-center fs-2 pb-1"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  <Link to={`/shops/${offer.shopId.shopName}`}>
                    <div className="fs-4 text-decoration-underline text-white">
                      {offer.shopId.shopName}
                    </div>
                  </Link>
                </motion.h3>
                {offer.offerInPercentage > 0 ? (
                  <p>
                    ◻ <strong>{offer.offerInPercentage}%</strong> discount{" "}
                  </p>
                ) : (
                  ""
                )}
                {offer.offerInTaka > 0 ? (
                  <p>
                    ◻ <strong>{offer.offerInTaka} BDT</strong> discount{" "}
                  </p>
                ) : (
                  ""
                )}
                <p
                  className="shadow rounded-3 text-white text-center pt-1"
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  Till: <strong> {offer.offerTill}</strong>
                </p>
              </div>
              <br />
            </div>
          );
        })}
    </motion.div>
  );
}
