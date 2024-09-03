import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4">
          <h1 className="mb-4">
            Welcome Admin <span className="text-success">{user?.name}</span>
          </h1>
          <h3 className="mb-3">Manage Blood Bank App</h3>
          <hr />
          <p className="mb-4" style={{ fontSize: "18px" }}>
            A blood bank management website serves as a comprehensive platform
            facilitating the efficient management of blood inventory, donations,
            and distribution. Through user registration and authentication, it
            enables donors to schedule appointments, hospitals to request blood
            units, and administrators to oversee operations. Features include
            donor management, inventory tracking, donation requests, analytics,
            and notifications, with roles for donors, recipients, hospital
            staff, and administrators.
            <br />
            Powered by a technology stack encompassing frontend frameworks like
            React.js or Angular.js, backend systems such as Node.js or Django,
            and databases like MySQL or MongoDB, the website ensures secure
            access, real-time updates, and streamlined communication, ultimately
            contributing to the effective utilization of blood resources and
            enhancing healthcare outcomes.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
