import React from "react";
import "./ErrorModal.css";
import { Button } from "../../components/Utils/Utils";

export function ErrorModal(props) {
  const showHideClassName = props.show
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <section className="modal-main error-modal">
        <div className="error-message-container">{props.children}</div>

        <Button onClick={props.handleClose}>Close</Button>
      </section>
    </div>
  );
}
