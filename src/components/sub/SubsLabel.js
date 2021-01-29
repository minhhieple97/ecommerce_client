import React from "react";

const SubsLabel = ({ subs, handleOnClick }) => {
  return subs.map((sub) => {
    return (
      <div
        key={sub._id}
        onClick={handleOnClick.bind(null, sub._id)}
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
      >
        {sub.name}
      </div>
    );
  });
};

export default SubsLabel;
