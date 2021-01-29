import React from "react";
import ReactQuill from "react-quill";

const AddAddress = ({ address, setAddress, handleAddress }) => {
  return (
    <>
      <ReactQuill
        theme="snow"
        value={address}
        onChange={setAddress}
      ></ReactQuill>
      <button className="btn btn-primary mt-2" onClick={handleAddress} disabled={address.length <= 11} >
        Save
      </button>
    </>
  );
};

export default AddAddress;
