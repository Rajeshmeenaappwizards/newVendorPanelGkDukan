import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader } from "reactstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import NoticeModal from "./NoticeModal";
import { getAllNotices } from "../../../slices/notice/thunk";
import { ToastContainer, toast } from "react-toastify";
import NoticeAccordian from "./NoticeAccordian";
import { clearDeleteNoticeState } from "../../../slices/notice/reducer";
function Notice() {
  const [show, setShow] = useState(false);

  const tog_grid = () => {
    setShow(!show);
  };

  const dispatch = useDispatch();

  const deletedRes = useSelector(
    (state) => state.Notice.deleteNoticeState
  );

  useEffect(() => {
    if (deletedRes.message) {
      dispatch(getAllNotices());
      bottomrightnotify(deletedRes.message);
      dispatch(clearDeleteNoticeState())
    }
  }, [deletedRes]);

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  return (
    <React.Fragment>
      <ToastContainer />
      <NoticeModal show={show} tog_grid={tog_grid} />
      <div className="page-content">
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Notice</h4>
            <Button color="primary" onClick={tog_grid}>
              Add Notice
            </Button>
          </CardHeader>
        </Card>
        <NoticeAccordian />
      </div>
    </React.Fragment>
  );
}

export default Notice;

