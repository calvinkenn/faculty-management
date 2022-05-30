import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./CivilServiceItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//mikko is here
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
//end

const CivilServiceItem = (props) => {
  const userIdByParams = useParams().userId;
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, success, sendRequest, clearError, clearSuccess } =
    useHttpClient();

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const editModeHandler = async () => {
    const response = await fetch(
      "http://localhost:5000/api/users/getEditCivil",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          civilId: props.civilId,
        }),
      }
    );
    const responseData = await response.json();
    props.setIsEditModeHandler(responseData.editData);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    const responseData = await sendRequest(
      "http://localhost:5000/api/users/deleteCivil",
      "DELETE",
      JSON.stringify({
        civilId: props.civilId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );

    const getUserCivil = await fetch(
      "http://localhost:5000/api/users/getUserCivil",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserCivilData = await getUserCivil.json();
    props.setUserData(getUserCivilData.userCivil, responseData.message);
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Delete this item?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you want to proceed and delete this item?</p>
      </Modal>
      <div className="civil-container">
        <div className="civil-container__data">
          <div className="civ-service-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <WorkHistoryIcon sx={{fontSize: "30px"}}/><h1 className="Marginlang">Career - {props.career}</h1>
            </div>
            <div className="civ-service-action-btn">
              {!userIdByParams && (
                <div className="civil-container__actions">
                  <div className="civ-edit-btn">
                    <Button onClick={editModeHandler}><EditIcon /></Button>
                  </div>
                  <div className="civ-del-btn">
                    <Button danger onClick={showDeleteWarningHandler}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="civ-service-details-cont">
            <div className="civ-service-details">
              <table>
                <tr>
                  <td className="label"><div>Career</div></td>
                  <td className="colon">:</td>
                  <td>{props.career}</td>
                </tr>
                <tr>
                  <td className="label"><div>Rating</div></td>
                  <td className="colon">:</td>
                  <td>{props.rating ? props.rating : "N/A"}</td>
                </tr>
                <tr>
                  <td className="label"><div>Date</div></td>
                  <td className="colon">:</td>
                  <td>{props.date}</td>
                </tr>
                <tr>
                  <td className="label"><div>Place of Examination</div></td>
                  <td className="colon">:</td>
                  <td>{props.examPlace}</td>
                </tr>
                <tr>
                  <td className="label"><div>License Number</div></td>
                  <td className="colon">:</td>
                  <td>{" "}{props.licenseNumber ? props.licenseNumber : "N/A"}</td>
                </tr>
                <tr>
                  <td className="label"><div>License Validity</div></td>
                  <td className="colon">:</td>
                  <td>{props.licenseValidity}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CivilServiceItem;
