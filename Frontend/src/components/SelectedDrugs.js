import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";

import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import { Row, Col } from "react-bootstrap";

import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import filterFactory from "react-bootstrap-table2-filter";

import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";

export default function SelectedDrugs(props) {
  const [token] = useCookies(["mytoken"]);
  const [storeDrugs, setStoreDrugs] = useState([]);
  const { ExportCSVButton } = CSVExport;

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

  function Formatter(column, colIndex, { sortElement, filterElement }) {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {column.text}
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
      style: () => {
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
            <div className="fs-5 fw-bold text-decoration-underline text-white">
              {value}
            </div>
          </Link>
        );
      },
      sort: true,
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
      style: () => {
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
    },
    {
      dataField: "shopId.shopName",
      text: "Shop Name",
      headerStyle: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      style: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      formatter: (value) => {
        return (
          <Link to={`/shops/${value}`}>
            <div className="fs-6 fw-bold text-decoration-underline text-white">
              {value}
            </div>
          </Link>
        );
      },
      sort: true,
    },
    {
      dataField: "shopId.address",
      text: "Shop Address",
      headerStyle: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      style: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      sort: true,
      formatter: (value) => {
        return <div className="fs-6 ">{value}</div>;
      },
    },
    {
      dataField: "shopId.city",
      text: "Shop City",
      headerStyle: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      style: () => {
        return {
          backgroundColor: "#c95f5f",
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
      style: () => {
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
      style: () => {
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
    },
    {
      dataField: "quantity",
      text: "Quantity",
      headerStyle: () => {
        return {
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      style: () => {
        return {
          backgroundColor: "#c95f5f",
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
          backgroundColor: "#c95f5f",
          textAlign: "center",
          srText: "",
          color: "#ede8e8",
        };
      },
      style: () => {
        return {
          backgroundColor: "#c95f5f",
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
  ];

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

  function onRowSelect(row, isSelected) {
    console.log(`Selected: ${isSelected},\n\nrowID: ${row.id}`);
  }
  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    hideSelectAll: true,
    selected: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
      57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
      93, 94, 95, 96, 97, 98, 99,
    ],
    bgColor: "white",

    onSelect: onRowSelect,
    // onSelectAll: onSelectAll,
  };

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <button
          className="btn btn-danger"
          style={{ backgroundColor: "#bf3636" }}
          onClick={handleClick}
        >
          Export The Data in CSV
        </button>
      </div>
    );
  };

  return (
    <div>
      <Row>
        <br />
      </Row>
      <Row>
        <Col sm></Col>
        <Col
          sm={8}
          className="shadow-lg p-4 rounded-3 text-center text-white "
          style={{
            background: "#c95f5f",
          }}
        >
          <h1
            className=" fw-bold text-white text-center fs-3 "
            style={{
              background: "#c95f5f",
            }}
          >
            Cart Table
          </h1>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <br />
      </Row>
      <Row className="g-5 rounded-3">
        {props.sltDrug && props.sltDrug.length > 0 ? (
          <Col>
            <ToolkitProvider
              keyField="id"
              data={storeDrugs.filter((sd) => props.sltDrug.includes(sd.id))}
              columns={columns}
              exportCSV={{
                fileName: "DrugList from PharmaPoint.csv",
                onlyExportSelection: true,
                exportAll: false,
              }}
              search
            >
              {(props) => (
                <div>
                  <Row>
                    <Col
                      className="shadow-lg rounded-3 text-center text-white pt-5"
                      style={{
                        background: "#c95f5f",
                      }}
                    >
                      {}
                      <MyExportCSV {...props.csvProps} />
                      <br />
                      <span>
                        <SearchBar
                          srText=""
                          style={{
                            textAlign: "center",
                            margin: "auto",
                            width: "100%",
                          }}
                          placeholder="Search The Shops & Drugs"
                          {...props.searchProps}
                        />
                        <span> {"     "} </span>
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
                        bootstrap4
                        hover
                        striped
                        srText=""
                        pagination={pagination}
                        filter={filterFactory()}
                        defaultSorted={defaultSorted}
                        selectRow={selectRow}
                        {...props.baseProps}
                      />
                    </Col>
                  </Row>
                </div>
              )}
            </ToolkitProvider>
          </Col>
        ) : (
          <h1
            className="shadow-lg rounded-3 text-center text-white p-5"
            style={{
              background: "#c95f5f",
            }}
          >
            Select Drugs From Upper Table & Export The Selected Data From Here
          </h1>
        )}
      </Row>
    </div>
  );
}
