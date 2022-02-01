import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container, Row, Col } from "react-bootstrap";

import filterFactory, {
  textFilter,
  selectFilter,
} from "react-bootstrap-table2-filter";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import SelectedDrugs from "./SelectedDrugs";
import APIService from "../APIService";

import { motion } from "framer-motion/dist/es/index";

function ShopDrugAmount() {
  const [token] = useCookies(["mytoken"]);
  const [user] = useCookies(["userId"]);

  const [userId] = useState(user["userId"]);

  const [storeDrugs, setStoreDrugs] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  let sdId = 0;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/pp/sd/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mytoken"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => setStoreDrugs(result))
      .catch((error) => console.log(error));
  }, [token]);

  const selectOptions = {
    0: "Not Rated Yet",
    1: "Very Bad",
    2: "Bad",
    3: "Acceptable",
    4: "Good",
    5: "Very Good",
  };
  function Formatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {column.text}
        {filterElement}
      </div>
    );
  }

  const { SearchBar, ClearSearchButton } = Search;

  const columns = [
    {
      dataField: "drugId.name",
      text: "Drug Name",
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
              className="fs-5 fw-bold text-decoration-underline text-white"
            >
              {value}
            </motion.div>
          </Link>
        );
      },
      sort: true,
      filter: textFilter(),
      headerFormatter: Formatter,
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
        return <div className="fs-5 ">{value}</div>;
      },
      filter: textFilter(),
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
              className="fs-6 fw-bold text-decoration-underline text-white"
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
      dataField: "shopId.address",
      text: "Shop Address",
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
        return <div className="fs-6 ">{value}</div>;
      },
      filter: textFilter(),
    },
    {
      dataField: "shopId.city",
      text: "Shop City",
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
        return <div className="fs-5 fw-bold">{value}</div>;
      },
      filter: textFilter(),
    },
    {
      dataField: "batchNo",
      text: "Batch No",
      headerAlign: (column, colIndex) => "center",
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
        return <div className="fs-5 fw-bold">{value}</div>;
      },
    },
    {
      dataField: "expireDate",
      text: "Expire Date",
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
        return <div className="fs-6 fw-bold">{value}</div>;
      },
      filter: textFilter(),
    },
    {
      dataField: "quantity",
      text: "Quantity",
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
        return <div className="fs-5 fw-bold">{value}</div>;
      },
      // filter: textFilter(),
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
          <div>
            <span className="fs-5 fw-bold">{value}</span>
            <span> BDT</span>
          </div>
        );
      },
      // filter: textFilter(),
    },
    {
      dataField: "shopId.ratings",
      text: "Ratings",
      headerStyle: () => {
        return {
          backgroundColor: "#bf3636",
          color: "#ede8e8",
          textAlign: "center",
          srText: "",
        };
      },
      sort: true,
      formatter: (value) => {
        return <div className="fs-5 fw-bold">{value}</div>;
      },
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
  const defaultSorted = [
    {
      dataField: "shopId.ratings",
      order: "desc",
    },
    {
      dataField: "drugId.unitPrice",
      order: "asc",
    },
    {
      dataField: "expireDate",
      order: "desc",
    },
  ];

  const insertDrugId = (drugID) => {
    const new_drug_ID = [...selectedDrugs, drugID];
    setSelectedDrugs(new_drug_ID);
  };

  const deleteDrugId = (drugID) => {
    const new_drug_ID = selectedDrugs.filter(function (ID) {
      return ID != drugID;
    });
    setSelectedDrugs(new_drug_ID);
  };

  function onRowSelect(row, isSelected) {
    if (isSelected === true) {
      sdId = row.id;
      insertDrugId(row.id);
      APIService.InsertCart(
        {
          sdId,
          userId,
        },
        token["mytoken"]
      );
    }
    if (isSelected === false) {
      deleteDrugId(row.id);
    }
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    hideSelectAll: true,
    selectColumnStyle: ({ checked, rowIndex }) => {
      if (checked) {
        return {
          backgroundColor: "white",
        };
      }
      if (rowIndex % 2 === 0) {
        return {
          backgroundColor: "#bf3636",
        };
      } else {
        return {
          backgroundColor: "#c95f5f",
        };
      }
    },
    onSelect: onRowSelect,
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

  return (
    <motion.div animate={{ x: [0, 100, 0] }}>
      <Container fluid>
        <ToolkitProvider
          keyField="id"
          data={storeDrugs}
          columns={columns}
          search
        >
          {(props) => (
            <Row
              className="shadow-lg rounded-3 text-center text-white p-3"
              style={{
                background: "#c95f5f",
              }}
            >
              <Row>
                <Col sm={3} />

                <Col sm>
                  <motion.div
                    animate={{ x: [0, 50, 0] }}
                    className="shadow-lg p-3 rounded-3 text-center text-white "
                    style={{
                      background: "#bf3636",
                    }}
                  >
                    <span>
                      <SearchBar
                        srText=""
                        placeholder="Search Drugs Or Shops"
                        {...props.searchProps}
                      />
                      <span> </span>
                      <ClearSearchButton
                        className="btn btn-secondary btn-sm"
                        {...props.searchProps}
                      />
                    </span>
                  </motion.div>
                </Col>

                <Col sm={3} />
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                <BootstrapTable
                  pagination={pagination}
                  filter={filterFactory()}
                  defaultSorted={defaultSorted}
                  selectRow={selectRow}
                  bordered={false}
                  rowStyle={rowStyle}
                  {...props.baseProps}
                />
              </Row>
            </Row>
          )}
        </ToolkitProvider>
        {/* {selectedDrugs ? (
          <Container fluid>
            <SelectedDrugs sltDrug={selectedDrugs} />
          </Container>
        ) : null} */}
      </Container>
    </motion.div>
  );
}

export default ShopDrugAmount;
