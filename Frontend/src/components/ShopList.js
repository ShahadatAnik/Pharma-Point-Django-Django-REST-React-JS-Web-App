import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Container, Row, Col, Figure } from "react-bootstrap";
import NavBar from "./NavBar";

import { Link } from "react-router-dom";
import Animation from "./Animation";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

import { motion } from "framer-motion/dist/es/index";

function ShopList() {
  const [token] = useCookies(["mytoken"]);
  const [shopList, setShopList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/shops/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setShopList(result))

      .catch((error) => console.log(error));
  }, []);

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
      dataField: "shopImg",
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
      dataField: "shopName",
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
      dataField: "mobilePhone",
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
      dataField: "address",
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
      dataField: "city",
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
      dataField: "ratings",
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

  const defaultSorted = [
    {
      dataField: "ratings",
      order: "desc",
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
          keyField="shopName"
          data={shopList}
          columns={columns}
          search
        >
          {(props) => (
            <div>
              <Row>
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
                      Search The Shops
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
                      placeholder="Search About Shop"
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
                    keyField="shopName"
                    pagination={pagination}
                    filter={filterFactory()}
                    defaultSorted={defaultSorted}
                    bordered={false}
                    rowStyle={rowStyle}
                    {...props.baseProps}
                  />
                </Row>
              </Row>
            </div>
          )}
        </ToolkitProvider>
      </Animation>
    </Container>
  );
}

export default ShopList;
