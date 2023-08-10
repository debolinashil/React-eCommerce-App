import React from "react";
import UserNav from "../../components/nav/UserNav";

const History = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col">
          <h2>User History</h2>
        </div>
      </div>
    </div>
  );
};

export default History;
