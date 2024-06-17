import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";

// Import React FilePond
import { registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useDispatch } from "react-redux";
// import { addFileData } from "../../../slices/fileUpload/thunk";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImageUpload = (props) => {
  const [selectedFiles, setselectedFiles] = useState([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (props && props.imageUrl) {
      let data = []
      let obj = {
        preview: props.imageUrl,
        name: props?.imageUrl?.split('gkDhukaan_images/')[1] || ""
      }
      data.push(obj)
      setselectedFiles(data)
    } else {
      setselectedFiles([])
    }
  }, [props.imageUrl])

  async function handleAcceptedFiles(files) {
    try {
      let authData = JSON.parse(localStorage.getItem("authUser"));

      const formData = new FormData();
      formData.append('upload', files[0]);

      const res = await fetch('https://seahorse-app-yobkt.ondigitalocean.app/admin/media/single', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: authData.token
        }
      });
      const response = await res.json();
      if (res && res.ok) {
        let data = []
        let obj = {
          preview: response.url,
          name: response.name
        }
        data.push(obj)
        setselectedFiles(data)
        props.handleImageUpload(response._id, props.index, props.name)
      }
      // let data = files.map((file) =>
      //   Object.assign(file, {
      //     preview: URL.createObjectURL(file),
      //     formattedSize: formatBytes(file.size),
      //   })
      // );
      // setselectedFiles(data);
    } catch (error) {

    }

  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  document.title = "File Upload | GK Dukaan - Vendor";
  return (
    <React.Fragment>
      <Dropzone
        onDrop={(acceptedFiles) => {
          handleAcceptedFiles(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone dz-clickable">
            <div className="dz-message needsclick" {...getRootProps()}>
              <div className="">
                <i className="display-4 text-muted ri-upload-cloud-2-fill" />
              </div>
              <p className="text-muted">{props.size}</p>

            </div>
          </div>
        )}
      </Dropzone>
      <div className="list-unstyled mb-0" id="file-previews">
        {selectedFiles.map((f, i) => {
          return (
            <div key={i} className="p-2">
              <Row className="align-items-center">
                <Col className="col-auto">
                  <img
                    data-dz-thumbnail=""
                    height="80"
                    className="avatar-sm rounded bg-light"
                    alt={f.name}
                    src={f.preview}
                  />
                </Col>
                <Col>
                  <Link to="#" className="text-muted font-weight-bold">
                    {f.name}
                  </Link>
                  <p className="mb-0">
                    <strong>{f.formattedSize}</strong>
                  </p>
                </Col>
              </Row>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ImageUpload;
