import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Link } from "react-router-dom";
import { Row, Col, Figure } from "react-bootstrap";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

import { motion } from "framer-motion/dist/es/index";

export default function ShopHasDrugs(props) {
  const [token] = useCookies(["mytoken"]);
  const [shopDrugs, setShopDrugs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/sd/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setShopDrugs(resp))
      .catch((error) => console.log(error));
  }, [token]);
  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "drugId.drugImg",
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
      dataField: "drugId.name",
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
      dataField: "drugId.category",
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
      dataField: "drugId.manufacturer",
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
      dataField: "drugId.unitPrice",
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
      dataField: "drugId.storageTemperature",
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
      dataField: "drugId.ageLevel",
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
  //   const firstName =;
  console.log(props.shopId);

  return (
    <div>
      <ToolkitProvider
        keyField="id"
        data={shopDrugs.filter((sd) => sd.shopId.id === props.shopId)}
        columns={columns}
        search
      >
        {(props) => (
          <div className="p-2">
            <Row>
              <br />
            </Row>
            <Row>
              <Col sm={2} />
              <Col
                sm
                className="shadow-lg p-4 rounded-3 text-center text-white "
                style={{
                  background: "#c95f5f",
                }}
              >
                <span>
                  <SearchBar
                    srText=""
                    placeholder="Search Drugs In This Shop"
                    {...props.searchProps}
                  />
                  <span> </span>
                  <ClearSearchButton
                    className="btn btn-secondary btn-sm"
                    {...props.searchProps}
                  />
                </span>
              </Col>
              <Col sm={2} />
            </Row>
            <Row>
              <br />
            </Row>
            <Row
              className="shadow-lg p-4 rounded-3 text-center text-white"
              style={{
                background: "#c95f5f",
              }}
            >
              <BootstrapTable
                keyField="shopName"
                pagination={pagination}
                filter={filterFactory()}
                bordered={false}
                rowStyle={rowStyle}
                {...props.baseProps}
              />
            </Row>
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
}
