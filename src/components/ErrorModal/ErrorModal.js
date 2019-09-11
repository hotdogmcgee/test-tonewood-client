import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../../components/Utils/Utils'

export function ErrorModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal  show={show} onHide={handleClose} id='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}


// export function HandleModal(error) {
// {/* <ErrorModal error={error} /> */}
// console.log('error');
//   return document.getElementById('modal').showModal()
// }
