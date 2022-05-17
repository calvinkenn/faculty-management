import React, { useRef, useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintHeader from "../../../shared/components/Print/PrintHeader";
import { useSortableData } from "../../../shared/hooks/sort-hook";
import "./PrintData.css";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>{this.props.data}</div>;
  }
}

const PrintData = (props) => {
  const componentRef = useRef();
  const { items, requestSort, sortConfig } = useSortableData(
    props.activeUserData
  );
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    if (props.filterValue === 2) {
      setFilterData("BSIT");
      console.log("BSIT");
    } else if (props.filterValue === 3) {
      setFilterData("BLIS");
    } else if (props.filterValue === 4) {
      setFilterData("ALLIED");
    } else {
      setFilterData("");
    }
  }, [props.filterValue]);

  console.log(props.filterValue);

  const activeAccountData = () => {
    return (
      <React.Fragment>
        <PrintHeader />
        <div className="print-container">
          <div className="print-data">
            <h1>
              {filterData
                ? filterData + " Faculty Data"
                : "Faculty Data"}
            </h1>
          </div>
          <table>
            <tr className="table-header">
              <th onClick={() => requestSort("employeeNum")}>
                Employee Number
              </th>
              <th onClick={() => requestSort("email")}>Email</th>
              <th onClick={() => requestSort("faculty")}>Faculty</th>
              <th onClick={() => requestSort("lastName")}>Last Name</th>
              <th onClick={() => requestSort("firstName")}>First Name</th>
              <th onClick={() => requestSort("middleName")}>Middle Name</th>
            </tr>
            {items?.length > 0 ? (
              items?.map((active) => (
                <tr>
                  <td>{active.employeeNum}</td>
                  <td>{active.email}</td>
                  <td>{active.faculty ? active.faculty : "N/A"}</td>
                  <td>{active.lastName}</td>
                  <td>{active.firstName}</td>
                  <td>{active.middleName ? active.middleName : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            )}
          </table>
        </div>
      </React.Fragment>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint} className="print-button">
        Print
      </button>
      <div className="print-table-cont">
        <ComponentToPrint data={activeAccountData()} ref={componentRef} />
      </div>
    </div>
  );
};

export default PrintData;
