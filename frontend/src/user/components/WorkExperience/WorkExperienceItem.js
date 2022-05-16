import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Modal from "../../../shared/components/UIElements/Modal";
import Button from "../../../shared/components/FormElements/Button";
import "./WorkExperienceItem.css";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

//Mikko is here
import WorkIcon from '@mui/icons-material/Work';
//end

const WorkExperienceItem = (props) => {
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
      "http://localhost:5000/api/users/getEditWorkExperience",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workId: props.workId,
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
      "http://localhost:5000/api/users/deleteWorkExperience",
      "DELETE",
      JSON.stringify({
        workId: props.workId,
        userId: storedData.userId,
      }),
      { "Content-Type": "application/json" }
    );
    const response = await fetch(
      "http://localhost:5000/api/users/getWorkExperience",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: storedData.userId,
        }),
      }
    );
    const getUserWork = await response.json();
    props.setUserData(getUserWork.WorkExperience, responseData.message);
  };

  let salarySep = (s) => {
    return s.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
      <div className="work-container">
        <div className="work-container__data">
          <div className="work-info-title-cont">
            <div className="basic-title-blank"></div>
            <div className="basic-title-text">
              <WorkIcon sx={{fontSize: "30px"}}/><h1 className="MarginLang">Work Experience - {props.position}</h1>
            </div>
            <div className="work-action-btn">
              {!userIdByParams && (
                <div className="work-container__actions">
                  <div className="work-edit-btn">
                    <Button onClick={editModeHandler}><EditIcon /></Button>
                  </div>
                  <div className="work-del-btn">
                    <Button danger onClick={showDeleteWarningHandler}>
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="work-info-details-cont">
            <div className="work-dets-cont">
              <table>
                <tr>
                  <td className="label"><div>Company</div></td>
                  <td className="colon">:</td>
                  <td>{props.company}</td>
                </tr>
                <tr>
                  <td className="label"><div>Position</div></td>
                  <td className="colon">:</td>
                  <td>{props.position}</td>
                </tr>
                <tr>
                  <td className="label"><div>Department</div></td>
                  <td className="colon">:</td>
                  <td>{props.department}</td>
                </tr>
                <tr>
                  <td className="label"><div>Status of Appointment</div></td>
                  <td className="colon">:</td>
                  <td>{" "}{props.statusOfAppointment ? props.statusOfAppointment : "N/A"}</td>
                </tr>
                <tr>
                  <td className="label"><div>From</div></td>
                  <td className="colon">:</td>
                  <td>{props.fromDate}</td>
                </tr>
                <tr>
                  <td className="label"><div>To</div></td>
                  <td className="colon">:</td>
                  <td>{props.toDate}</td>
                </tr>
                <tr>
                  <td className="label"><div>Monthly Salary</div></td>
                  <td className="colon">:</td>
                  <td>&#8369;{salarySep(props.monthlySalary)}</td>
                </tr>
                <tr>
                  <td className="label"><div>Salary Grade</div></td>
                  <td className="colon">:</td>
                  <td>{" "}{props.salaryGrade && props.salaryStep
                    ? props.salaryGrade + "-" + props.salaryStep
                    : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="label"><div>Government</div></td>
                  <td className="colon">:</td>
                  <td>{props.government}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WorkExperienceItem;
