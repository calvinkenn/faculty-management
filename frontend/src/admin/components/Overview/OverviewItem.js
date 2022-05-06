import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../../../shared/components/UIElements/Card";
import "../item.css";
import TotalAccount from "../../../assets/Image/total.png";
import ActivatedAccount from "../../../assets/Image/activated.png";
import DectivatedAccount from "../../../assets/Image/deactivated.png";
import PendingAccount from "../../../assets/Image/pending.png";
import RejectedAccount from "../../../assets/Image/rejected.png";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewItem = (props) => {
  const total =
    props.totalActiveAccounts +
    props.totalDeactivatedAccounts +
    props.totalPendingAccounts +
    props.totalRejectedAccounts;

  const totalAccounts = {
    labels: [
      "Active",
      "Deactivated",
      "Pending",
      "Rejected",
    ],
    datasets: [
      {
        label: "Total Accounts",
        data: [
          props.totalActiveAccounts,
          props.totalDeactivatedAccounts,
          props.totalPendingAccounts,
          props.totalRejectedAccounts,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const totalFaculty = {
    labels: ["BSIT", "BLIS", "ALLIED"],
    datasets: [
      {
        label: "Total Accounts",
        data: [props.totalBSIT, props.totalBLIS, props.totalALLIED],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card>
      <div className="overview-acc-summary-cont">
        <div className="chart">
          <div className="chart-cont">
            <h1>Total Accounts</h1>
            <div className="doughnut-cont">
              <Doughnut data={totalAccounts} />
            </div>
          </div>
          <div className="chart-cont">
            <h1>Total Faculty</h1>
            <div className="doughnut-cont">
              <Doughnut data={totalFaculty} />
            </div>
          </div>
        </div>
        <div className="total-acc-summary-cont">
          <div className="admin-overview-title-cont">
            <div className="admin-title-blank"></div>
            <div className="admin-title-text">
              <h1>Account Summary</h1>
            </div>
          </div>
          <div className="total-action-cont">
            <div className="total-action-acc-cont">
              <div className="container">
                <div className="tot-acc-img-cont">
                  <img src={TotalAccount} />
                </div>
                <div className="total-acc-text">
                  <h1>{total}</h1>
                  <h6>Total Accounts</h6>
                </div>
              </div>
              <span />
              <div className="container">
                <div className="tot-acc-img-cont">
                  <img src={ActivatedAccount} />
                </div>
                <div className="total-acc-text">
                  <h1>{props.totalActiveAccounts}</h1>
                  <h6>Active Accounts</h6>
                </div>
              </div>
              <span />
              <div className="container">
                <div className="tot-acc-img-cont">
                  <img src={DectivatedAccount} />
                </div>
                <div className="total-acc-text">
                  <h1>{props.totalDeactivatedAccounts}</h1>
                  <h6>Deactivated Account</h6>
                </div>
              </div>
              <div className="container">
                <div className="tot-acc-img-cont">
                  <img src={PendingAccount} />
                </div>
                <div className="total-acc-text">
                  <h1>{props.totalPendingAccounts}</h1>
                  <h6>Pending Accounts</h6>
                </div>
              </div>
              <span />
              <div className="container">
                <div className="tot-acc-img-cont">
                  <img src={RejectedAccount} />
                </div>
                <div className="total-acc-text">
                  <h1>{props.totalRejectedAccounts}</h1>
                  <h6>Rejected Accounts</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-overview-title-cont">
            <div className="admin-title-blank"></div>
            <div className="admin-title-text">
              <h1>Total Faculty Members</h1>
            </div>
          </div>
          <div className="total-faculty-members-cont">
            <div className="container">
              <div className="tot-acc-img-cont">
                <img src={TotalAccount} />
              </div>
              <div className="total-acc-text">
                <h1>{props.totalBSIT}</h1>
                <h6>BSIT Faculty Members</h6>
              </div>
            </div>
            <span />
            <div className="container">
              <div className="tot-acc-img-cont">
                <img src={TotalAccount} />
              </div>
              <div className="total-acc-text">
                <h1>{props.totalBLIS}</h1>
                <h6>BLIS Faculty Members</h6>
              </div>
            </div>
            <span />
            <div className="container">
              <div className="tot-acc-img-cont">
                <img src={TotalAccount} />
              </div>
              <div className="total-acc-text">
                <h1>{props.totalALLIED}</h1>
                <h6>Allied Faculty Members</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OverviewItem;
