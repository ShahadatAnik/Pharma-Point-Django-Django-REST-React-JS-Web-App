import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

export default function UserInfo(props) {
  const [userInfo, setUserInfo] = useState([]);
  const [token] = useCookies(["mytoken"]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/pp/users/${props.userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setUserInfo(result))
      .catch((error) => console.log(error));
  }, [token]);
  return <h2 className="text-uppercase">{userInfo.username}</h2>;
}
