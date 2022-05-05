import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
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
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const activeAccountData = () => {
    return (
      <table>
        <tr>
          <th onClick={() => requestSort("employeeNum")}>Employee Number</th>
          <th onClick={() => requestSort("email")}>Email</th>
          <th onClick={() => requestSort("faculty")}>Faculty</th>
          <th onClick={() => requestSort("lastName")}>Last Name</th>
          <th onClick={() => requestSort("firstName")}>First Name</th>
          <th onClick={() => requestSort("middleName")}>Middle Name</th>
        </tr>
        {items?.map((active) => (
          <tr>
            <td>{active.employeeNum}</td>
            <td>{active.email}</td>
            <td>{active.faculty}</td>
            <td>{active.lastName}</td>
            <td>{active.firstName}</td>
            <td>{active.middleName}</td>
          </tr>
        ))}
      </table>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <button onClick={handlePrint}>Print</button>
      <ComponentToPrint data={activeAccountData()} ref={componentRef} />
    </div>
  );
};

export default PrintData;
