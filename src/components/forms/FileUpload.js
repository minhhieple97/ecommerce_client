import { Badge } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";

const FileUpload = ({ images, handleFileChange, handleRemoveImage }) => {
  return (
    <>
      <div className="row">
        {images &&
          images.length > 0 &&
          images.map((el, index) => {
            return (
              <Badge
                key={el.publicId}
                count="X"
                onClick={() => handleRemoveImage(el.publicId)}
                style={{ cursor: "pointer" }}
              >
                <Avatar
                  src={el.imageUrl}
                  size={100}
                  className="ml-3"
                  shape="square"
                ></Avatar>
              </Badge>
            );
          })}
      </div>
      <div className="row">
        <label className="btn btn-secondary">
          {/* Choose File */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          ></input>
        </label>
      </div>
    </>
  );
};

export default FileUpload;
