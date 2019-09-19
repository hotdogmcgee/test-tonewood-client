import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "../../components/Utils/Utils";
import { Link } from "react-router-dom";

export function ErrorModal(message) {

  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  // const handleShow = () => setShow(true);

  //how can i get this to show on page error?!?!
  return (
    <>
      <Modal show={show} onHide={handleClose} id="myModal">
        <Modal.Header closeButton>
          <Modal.Title>There was a problem, oh no!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message.message}</Modal.Body>
        <Modal.Footer className='modal-footer-css'>
        <Link to={"/"}>
          <Button variant="secondary" onClick={handleClose} className='modal-button'>
            Close
          </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}
