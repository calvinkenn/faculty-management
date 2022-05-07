import React, { useState, useContext } from "react";

import Button from "../../../shared/components/FormElements/Button";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import Modal from "../../../shared/components/UIElements/Modal";
import "./AccountInfoItem.css";

const AccountInfoItem = (props) => {
  const { sendRequest } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [accountDeactivated, setAccountDeactivated] = useState(false);
  const auth = useContext(AuthContext);

  const changePassHandler = () => {
    props.changePasswordHandler();
  };

  const showDeactivateHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeactivateHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeactivateHandler = async (event) => {
    setAccountDeactivated(true);
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/admin/actionHandler",
        "PATCH",
        JSON.stringify({
          userId: props.id,
          permissionUpdate: "deactivated",
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        header={
          !accountDeactivated
            ? "Deactivate Account?"
            : "Account is now Deactivated!"
        }
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            {!accountDeactivated && (
              <Button inverse onClick={confirmDeactivateHandler}>
                YES
              </Button>
            )}
            {!accountDeactivated && (
              <Button onClick={cancelDeactivateHandler}>NO</Button>
            )}
            {accountDeactivated && <Button onClick={auth.logout}>Ok</Button>}
          </React.Fragment>
        }
      >
        {!accountDeactivated ? (
          <p>
            Are you sure you want to deactivate your account? You will need to
            contact admin for reactivation.
          </p>
        ) : (
          <p>Account Deactivated! You will now be logged out.</p>
        )}
      </Modal>
      <div className="account-container">
        <div className="account-container__data">
          <div className="employment-acc-info-cont">
            <div className="employment-info-title-cont">
              <div className="basic-title-blank"></div>
              <div className="basic-title-text">
                <h1>Employment Account Information</h1>
              </div>
            </div>
            <div className="employment-detail-cont">
              <div>Employee Number: {props.employeeNum}</div>
              <div>Faculty: {props.faculty ? props.faculty : "N/A"}</div>
              <div>
                Employment Type:{" "}
                {props.employmentType ? props.employmentType : "N/A"}
              </div>
            </div>
          </div>
          <div className="account-info-cont">
            <div className="account-info-title-cont">
              <div className="basic-title-blank"></div>
              <div className="basic-title-text">
                <h1>Account Information</h1>
              </div>
            </div>
            <div className="account-info-detail-cont">
              <div>Email: {props.email}</div>
              {!auth.isAdmin && (
                <div className="change-pass-cont">
                  Password: ************
                  <div className="change-btn-cont">
                    <Button onClick={changePassHandler}>Change Password</Button>
                  </div>
                </div>
              )}
            </div>
            {!auth.isAdmin && (
              <Button onClick={showDeactivateHandler}>Deactive Account</Button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountInfoItem;
