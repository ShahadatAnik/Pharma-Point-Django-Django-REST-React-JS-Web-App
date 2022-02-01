import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import NavBar from "./NavBar";
import { Container, Row, Col, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import Animation from "./Animation";

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

const pageStyle = {
  position: "absolute",
};

export default function Drugs() {
  const [token] = useCookies(["mytoken"]);
  const [drugs, setDrugs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/drugs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setDrugs(resp))
      .catch((error) => console.log(error));
  }, [token]);
  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "drugImg",
      text: "",
      headerAttrs: { title: "" },
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <Figure.Image
            width={150}
            height={50}
            alt={value}
            src={value}
            rounded
          />
        );
      },
    },
    {
      dataField: "name",
      text: "Drugs Name",
      headerAttrs: { title: "" },
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <Link to={`/drugs/${value}`}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fs-2 text-decoration-underline text-white "
            >
              {value}
            </motion.div>
          </Link>
        );
      },
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "category",
      text: "Category",
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },

      sort: true,
      formatter: (value) => {
        return (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      filter: textFilter(),
    },
    {
      dataField: "manufacturer",
      text: "Manufacturer",
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },

      sort: true,
      formatter: (value) => {
        return (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      filter: textFilter(),
    },
    {
      dataField: "unitPrice",
      text: "Unit Price",

      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      sort: true,
      formatter: (value) => {
        return (
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <span className="fs-5 fw-bold">{value}</span>
            <span> BDT</span>
          </motion.div>
        );
      },
      filter: textFilter(),
    },
    {
      dataField: "storageTemperature",
      text: "Storage Temp",
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },

      sort: true,
      formatter: (value) => {
        return (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      filter: textFilter(),
    },
    {
      dataField: "ageLevel",
      text: "Age Level",
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },

      sort: true,
      formatter: (value) => {
        return (
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      filter: textFilter(),
    },
  ];

  const rowStyle = (row, rowIndex) => {
    const style = {};
    if (rowIndex % 2 == 0) {
      style.backgroundColor = "#c95f5f";
    } else {
      style.backgroundColor = "#bf3636";
    }
    style.textAlign = "center";
    style.color = "white";
    return style;
  };

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 10,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: false,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ];

  return (
    <Container fluid className="p-5">
      <NavBar />
      <Row>
        <br />
        <br />
        <br />
      </Row>
      <Animation>
        <ToolkitProvider
          keyField="drugName"
          data={drugs}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <Row>
                <Col sm={1} />
                <Col sm>
                  <motion.div
                    animate={{ x: [0, 60, 0] }}
                    className="shadow-lg p-4 rounded-3 text-center text-white text-wrap fs-1 fw-bold "
                    style={{
                      background: "#c95f5f",
                    }}
                  >
                    Search The Drugs
                  </motion.div>
                </Col>
                <Col sm={1} />
              </Row>
              <Row>
                <br />
              </Row>
              <Row
                className="shadow-lg p-4 rounded-3 text-center text-white "
                style={{
                  background: "#c95f5f",
                }}
              >
                <span>
                  <SearchBar
                    srText=""
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      width: "100%",
                    }}
                    placeholder="Search About Drugs"
                    {...props.searchProps}
                  />
                  <span> </span>
                  <ClearSearchButton
                    className="btn btn-secondary btn-sm"
                    style={{
                      width: "100%",
                    }}
                    {...props.searchProps}
                  />
                </span>
                <br />
                <br />
                <br />

                <BootstrapTable
                  keyField="name"
                  pagination={pagination}
                  filter={filterFactory()}
                  defaultSorted={defaultSorted}
                  bordered={false}
                  rowStyle={rowStyle}
                  {...props.baseProps}
                />
              </Row>
            </div>
          )}
        </ToolkitProvider>
      </Animation>
      {/* </div> */}
    </Container>
  );
}
