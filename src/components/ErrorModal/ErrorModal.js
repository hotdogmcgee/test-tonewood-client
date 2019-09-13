import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from '../../components/Utils/Utils'

export function ErrorModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //how can i get this to show on page error?!?!
  return (
    <>
      <Modal  show={show} onHide={handleClose} id='myModal'>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>There was an error</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}


// export function HandleModal() {
// {/* <ErrorModal error={error} /> */}
// <ErrorModal />
// console.log('error');
//   return document.getElementById('myModal').showModal()
// }
