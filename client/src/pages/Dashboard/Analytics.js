import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#49243E",
    "#430A5D",
    "#030637",
    "#092635",
    "#331D2C",
    "#43766C",
    "#016A70",
    "#3D3B40",
  ];
  //get blood group data
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifeycle
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //getFunction
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        //  console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-3">Blood Group Analytics</h1>
        {/* Blood Group Cards */}
        <div className="row">
          {data?.map((record, i) => (
            <div key={i} className="col-md-3 mb-4">
              <div
                className="card p-2"
                style={{ backgroundColor: `${colors[i]}` }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center text-light">
                    {record.bloodGroup}
                  </h5>
                  <p className="card-text text-light">
                    Total In: <b>{record.totalIn}</b> (ML)
                  </p>
                  <p className="card-text text-light">
                    Total Out: <b>{record.totalOut}</b> (ML)
                  </p>
                </div>
                <div className="card-footer bg-light text-dark text-center">
                  Total Available: <b>{record.availableBlood}</b> (ML)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Blood Transactions Table */}
      <div className="container mt-5">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity (ml)</th>
              <th scope="col">Donar Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
