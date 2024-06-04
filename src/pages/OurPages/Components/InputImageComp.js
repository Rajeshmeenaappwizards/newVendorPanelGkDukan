import React, { useState } from "react";
import { Input } from "reactstrap";
import axios from "axios";

function InputImageComp({ onFileUpload }) {
  const handleChange = async (event) => {
    try {
      let authData = JSON.parse(localStorage.getItem("authUser"));

      const formData = new FormData();
      formData.append("upload", event.target.files[0]);

      const res = await fetch(
        "https://seahorse-app-yobkt.ondigitalocean.app/admin/media/single",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: authData.token,
          },
        }
      );
      const response = await res.json();
      if (res && res.ok) {
        onFileUpload(response._id);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <Input type="file" className="form-control" onChange={handleChange} />
      </div>
    </div>
  );
}

export default InputImageComp;
