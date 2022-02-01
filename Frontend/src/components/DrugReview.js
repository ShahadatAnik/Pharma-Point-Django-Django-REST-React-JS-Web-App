import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import APIService from "../APIService";
import UserInfo from "./UserInfo";
import { motion } from "framer-motion/dist/es/index";

export default function DrugReview(props) {
  const [token] = useCookies(["mytoken"]);
  const [user] = useCookies(["userId"]);

  const [DrugReview, setDrugReview] = useState([]);

  const [isUpdateComment, setIsUpdateComment] = useState(false);

  const [commentId, setCommentId] = useState();
  const [drugId] = useState(props.drugId);
  const [userId] = useState(user["userId"]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/dr/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setDrugReview(result))
      .catch((error) => console.log(error));
  }, [token]);

  const insertComment = () => {
    if (!comment) {
      return alert("Please post a comment.");
    } else {
      return APIService.InsertDrugComment(
        {
          drugId,
          userId,
          comment,
        },
        token["mytoken"]
      )
        .then((resp) => setDrugReview(...DrugReview, resp))
        .then(window.location.reload(false))
        .then(setComment(""));
    }
  };

  const deleteComment = (sr) => {
    const new_sr = DrugReview.filter((my_sr) => {
      if (my_sr.id === sr.id) {
        return false;
      }
      return true;
    });

    setDrugReview(new_sr);
  };

  const deleteBtn = (sr) => {
    APIService.DeleteDrugComment(sr.id, token["mytoken"])
      .then(() => deleteComment(sr))
      .catch((error) => console.log(error));
  };

  const updateBtn = (sr) => {
    setIsUpdateComment(true);
    setComment(sr.comment);
    setCommentId(sr.id);
  };

  const updatedComment = (sr) => {
    const new_sr = DrugReview.map((my_sr) => {
      if (my_sr.id === sr.id) {
        return sr;
      } else {
        return my_sr;
      }
    });

    setDrugReview(new_sr);
  };

  const userCommentUpdate = () => {
    if (!comment) {
      return alert("Please write something to update the comment.");
    } else {
      return APIService.UpdateDrugComment(
        commentId,
        {
          drugId,
          userId,
          comment,
        },
        token["mytoken"]
      )
        .then((resp) => updatedComment(resp))
        .then(setIsUpdateComment(false))
        .then(setComment(""))
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <h1
        className="shadow-lg rounded-3 fw-bold text-white text-center fs-1 p-3"
        style={{
          background: "#c95f5f",
        }}
      >
        Drug Review
      </h1>
      <br />
      <Row>
        <Col sm={1}></Col>
        <Col
          sm={10}
          className="shadow-lg rounded-3 p-5"
          style={{
            background: "#c95f5f",
          }}
        >
          {DrugReview.filter((sd) => sd.drugId === props.drugId).map((sr) => {
            return (
              <div key={sr.id}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Row
                    className="shadow rounded-3 text-white p-3"
                    style={{
                      background: "#bf3636",
                    }}
                  >
                    <p>
                      {sr.userId ? <UserInfo userId={sr.userId} /> : null}
                      <h3>{sr.comment}</h3>
                      <span>
                        <strong>Time: </strong> {sr.commentUpdated[11]}
                        {sr.commentUpdated[12]}
                        {sr.commentUpdated[13]}
                        {sr.commentUpdated[14]}
                        {sr.commentUpdated[15]} <strong> Date:</strong>{" "}
                        {sr.commentUpdated[8]}
                        {sr.commentUpdated[9]}
                        {sr.commentUpdated[7]}
                        {sr.commentUpdated[5]}
                        {sr.commentUpdated[6]}
                        {sr.commentUpdated[4]}
                        {sr.commentUpdated[0]}
                        {sr.commentUpdated[1]}
                        {sr.commentUpdated[2]}
                        {sr.commentUpdated[3]}
                      </span>
                      <br />
                    </p>

                    <br />
                    {sr.userId == userId ? (
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          className="btn btn-primary mx-auto"
                          onClick={() => updateBtn(sr)}
                        >
                          Update
                        </motion.button>{" "}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => deleteBtn(sr)}
                          className="btn btn-danger"
                        >
                          Delete
                        </motion.button>
                      </div>
                    ) : null}
                  </Row>
                </motion.div>
                <Row>
                  <br />
                  <br />
                </Row>
              </div>
            );
          })}

          <div
            className="shadow rounded-3 text-white p-3"
            style={{
              background: "#bf3636",
              width: "100%",
            }}
          >
            <label className="pb-2 text-white fs-2">Comment Box </label>
            <textarea
              type="text"
              className="form-control"
              id="desc"
              rows="5"
              placeholder="Post Comment"
              style={{
                width: "100%",
              }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <br />
            {isUpdateComment ? (
              <div class="col text-center text-white fw-2 pb-3">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={userCommentUpdate}
                  className="btn btn-lg text-white fs-4 "
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  Update
                </motion.button>
              </div>
            ) : (
              <div class="col text-center text-white fw-2 pb-3">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  type="button"
                  onClick={insertComment}
                  className="btn btn-lg text-white fs-4 "
                  style={{
                    background: "#c95f5f",
                  }}
                >
                  Post
                </motion.button>
              </div>
            )}
          </div>
        </Col>
        <Col sm={1}></Col>
      </Row>
    </div>
  );
}
