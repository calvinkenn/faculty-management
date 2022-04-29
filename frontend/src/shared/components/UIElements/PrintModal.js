import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import ModalForPrint from "./ModalForPrint";
import Button from "../FormElements/Button";

export class ComponentToPrint extends React.PureComponent {
  render() {
    return <div>{this.props.data}</div>;
  }
}

const PrintModal = (props) => {
  const componentRef = useRef();

  const activeAccountData = () => {
    return (
      <table>
        <tr>
          <th>Employee Number</th>
          <th>Email</th>
          <th>Faculty</th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Middle Name</th>
        </tr>
        {props.activeUserData?.map((active) => (
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
    <ModalForPrint
      onCancel={props.onClear}
      header="Print this File"
      show={
        <div>
          <button onClick={handlePrint}>Print</button>
          <ComponentToPrint data={activeAccountData()} ref={componentRef} />
        </div>
      }
      footer={<Button onClick={props.onClear}>Close</Button>}
    >
      <div>
        <button onClick={handlePrint}>Print</button>
        <ComponentToPrint data={activeAccountData()} ref={componentRef} />
      </div>
    </ModalForPrint>
  );
};

export default PrintModal;
