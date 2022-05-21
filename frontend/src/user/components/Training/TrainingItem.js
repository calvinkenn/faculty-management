import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./TrainingItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//mikko is here
import ArticleIcon from "@mui/icons-material/Article";
//

const TrainingItem = (props) => {
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
      "http://localhost:5000/api/users/getEditTraining",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trainingId: props.trainingId,
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
      "http://localhost:5000/api/users/deleteUserTraining",
      "DELETE",
      JSON.stringify({
        trainingId: props.trainingId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );

    const getUserTraining = await fetch(
      "http://localhost:5000/api/users/getUserTraining",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserTrainingData = await getUserTraining.json();
    props.setUserData(getUserTrainingData.userTraining, responseData.message);
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
      <div className="training-container">
        <div className="training-container__data">
          <div className="training-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <ArticleIcon sx={{ fontSize: "30px" }} />
              <h1 className="Marginlang">{props.title}</h1>
            </div>
            <div className="training-action-btn">
              {!userIdByParams && (
                <div className="training-container__actions">
                  <div className="training-edit-btn">
                    <Button onClick={editModeHandler}>
                      <EditIcon />
                    </Button>
                  </div>
                  <div className="training-del-btn">
                    <Button danger onClick={showDeleteWarningHandler}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="training-v">
            <div className="training-details-cont">
              <div className="training-details">
                <table>
                  <tr>
                    <td className="label">
                      <div>Seminar/Training Title</div>
                    </td>
                    <td className="colon">:</td>
                    <td> {props.title}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>Location</div>
                    </td>
                    <td className="colon">:</td>
                    <td> {props.type}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>From</div>
                    </td>
                    <td className="colon">:</td>
                    <td>{props.from}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>To</div>
                    </td>
                    <td className="colon">:</td>
                    <td>{props.to}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>Hours</div>
                    </td>
                    <td className="colon">:</td>
                    <td>{props.hours}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>Type of learning and development</div>
                    </td>
                    <td className="colon">:</td>
                    <td>{props.typeOfLD}</td>
                  </tr>
                  <tr>
                    <td className="label">
                      <div>Conducted/Sponsored by</div>
                    </td>
                    <td className="colon">:</td>
                    <td>{props.conducted}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="training-cert-cont">
              <div className="training-container__image">
                <img
                  src={`http://localhost:5000/${props.certificatePic}`}
                  alt={props.title}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrainingItem;
