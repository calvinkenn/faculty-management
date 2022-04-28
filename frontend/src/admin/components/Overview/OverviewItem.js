import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Card from "../../../shared/components/UIElements/Card";
import "../item.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverviewItem = (props) => {
  const total =
    props.totalActiveAccounts +
    props.totalDeactivatedAccounts +
    props.totalPendingAccounts +
    props.totalRejectedAccounts;

  const totalAccounts = {
    labels: [
      //   "Active Accounts",
      //   "Deactivated Accounts",
      //   "Pending Accounts",
      //   "Rejected Accounts",
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
    labels: [
      //   "Active Accounts",
      //   "Deactivated Accounts",
      //   "Pending Accounts",
      //   "Rejected Accounts",
    ],
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
      <div>Total Accounts: {total}</div>
      <div>Total Active Accounts: {props.totalActiveAccounts}</div>
      <div>Total Deactivated Accounts: {props.totalDeactivatedAccounts}</div>
      <div>Total Pending Accounts: {props.totalPendingAccounts}</div>
      <div>Total Rejected Accounts: {props.totalRejectedAccounts}</div>
      <div>Total BSIT Faculty Members: {props.totalBSIT}</div>
      <div>Total BLIS Faculty Members: {props.totalBLIS}</div>
      <div>Total ALLIED Faculty Members: {props.totalALLIED}</div>
      <br />
      <div className="chart">
        <div>
          TOTAL ACCOUNTS
          <Doughnut data={totalAccounts} />
        </div>
        <div>
          TOTAL FACULTY
          <Doughnut data={totalFaculty} />
        </div>
      </div>
    </Card>
  );
};

export default OverviewItem;
