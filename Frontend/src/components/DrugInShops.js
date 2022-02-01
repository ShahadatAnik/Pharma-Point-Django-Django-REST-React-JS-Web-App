import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";
import { Row, Col, Figure } from "react-bootstrap";

import { motion } from "framer-motion/dist/es/index";

function DrugInShops(props) {
  const [token] = useCookies(["mytoken"]);
  const [shopsForDrugs, setShopsForDrugs] = useState([]);
  const selectOptions = {
    0: "Not Rated Yet",
    1: "Very Bad",
    2: "Bad",
    3: "Acceptable",
    4: "Good",
    5: "Very Good",
  };
  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "shopId.shopImg",
      text: "",
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
      dataField: "shopId.shopName",
      text: "Shop Name",
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
          <Link to={`/shops/${value}`}>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fs-3 text-decoration-underline text-white"
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
      dataField: "shopId.mobilePhone",
      text: "Mobile Phone",
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
      dataField: "shopId.address",
      text: "Address",
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
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "shopId.city",
      text: "City",
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
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "shopId.ratings",
      text: "Ratings",
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
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="fs-5"
          >
            {value}
          </motion.div>
        );
      },
      sort: true,
      filter: selectFilter({ options: selectOptions }),
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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/sd/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setShopsForDrugs(resp))
      .catch((error) => console.log(error));
  }, [token]);
  const defaultSorted = [
    {
      dataField: "shopId.ratings",
      order: "desc",
    },
  ];

  return (
    <div>
      <ToolkitProvider
        keyField="shopName"
        data={shopsForDrugs.filter(
          (sd, index, self) =>
            sd.drugId.id === props.drugId &&
            (index === self.findIndex((t) => sd.shopId.id === t.shopId.id) ||
              index != null)
        )}
        columns={columns}
        search
      >
        {(props) => (
          <div>
            <Row>
              <Row>
                <br />{" "}
              </Row>
              <Row>
                <Col sm={3}></Col>
                <Col
                  sm={6}
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
                      placeholder="Search Shops For This Drug"
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
                </Col>
                <Col sm={3}></Col>
              </Row>
              <Row>
                <br />{" "}
              </Row>

              <Row
                className="shadow-lg pt-4 rounded-3 text-center text-white "
                style={{
                  background: "#c95f5f",
                }}
              >
                <BootstrapTable
                  keyField="shopName"
                  pagination={pagination}
                  filter={filterFactory()}
                  defaultSorted={defaultSorted}
                  rowStyle={rowStyle}
                  bordered={false}
                  {...props.baseProps}
                />
              </Row>
            </Row>
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
}

export default DrugInShops;
