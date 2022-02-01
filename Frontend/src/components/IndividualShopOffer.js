import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function ShopOffers(props) {
  const [token] = useCookies(["mytoken"]);
  const [offer, setofferList] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/so/${props.shopOfferId}/`, {
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
    <div
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
      {" "}
      <div>
        <h1
          className="shadow-lg rounded-3 fw-bold text-white text-center fs-1 p-4"
          style={{
            background: "#bf3636",
          }}
        >
          Offers
        </h1>
        <br />
        {/* <hr className="hrclass" /> */}
      </div>
      {props.shopOfferId ? (
        <div>
          <div
            className="shadow rounded-3 p-2 fs-3"
            style={{
              background: "#bf3636",
            }}
          >
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
            {offer.offerInPercentage > 0 || offer.offerInTaka > 0 ? (
              <p
                className="shadow rounded-3 text-white text-center p-1 fs-4"
                style={{
                  background: "#c95f5f",
                }}
              >
                Till: <strong> {offer.offerTill}</strong>
              </p>
            ) : (
              <h3 className="text-center">
                Sorry, there is no offer available in this shop
              </h3>
            )}
          </div>
          <br />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
