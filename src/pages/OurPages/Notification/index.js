import React, { useEffect, useState } from "react";
import { Button, Card, CardHeader } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import NotificationModal from "./NotificationModal";
import NotificationAccordian from "./NotificationAccordian";
import { getAllNotification } from "../../../slices/notifications/thunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearDeleteNotificationState } from "../../../slices/notifications/reducer";
function Notification() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()

  const deletedRes = useSelector(
    (state) => state.NotificationReducer.deleteNotificationState
  );

  useEffect(() => {
    if (deletedRes.message) {
      dispatch(getAllNotification());
      bottomrightnotify(deletedRes.message);
      dispatch(clearDeleteNotificationState())
    }
  }, [deletedRes]);

  const tog_grid = () => {
    setShow(!show);
  };

  const bottomrightnotify = (message) =>
    toast(message, {
      position: "bottom-right",
      hideProgressBar: true,
      className: "bg-success text-white",
    });

  return (
    <React.Fragment>
      <ToastContainer />
      <NotificationModal show={show} tog_grid={tog_grid} />
      <div className="page-content">
        <Card>
          <CardHeader className="border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Notification</h4>
            <Button color="primary" onClick={tog_grid}>
              Add Notification
            </Button>
          </CardHeader>
        </Card>
        <NotificationAccordian />
      </div>
    </React.Fragment>
  );
}
export default Notification;
