import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "../../components/Utils/Utils";
import { Link } from "react-router-dom";

export function ErrorModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  //how can i get this to show on page error?!?!
  return (
    <>
      <Modal show={show} onHide={handleClose} id="myModal">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>There was an error</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <Link to={"/"}>Close</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
