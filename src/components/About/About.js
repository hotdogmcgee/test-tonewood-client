import React from "react";
import "./About.css";
import pdf from "./How-to.pdf";
import { Button } from "../Utils/Utils";

export default class About extends React.Component {
  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  renderAbout() {
    return (
      <>
        <h2>
          Welcome to the tonewood data project, here's how to get started.
        </h2>
        <p>
          The tonewood data project brings together luthiers worldwide to make
          it easy to find the properties of many tonewoods.
        </p>
        <a href={pdf} download="TW Data Project How-to">
          Download PDF Instructions
        </a>

        <div className="button-container">
          <Button
            className="modal-button"
            type="button"
            onClick={this.showModal}
          >
            Show credentials to test Login
          </Button>
        </div>

        <CredentialsModal
          show={this.state.show}
          handleClose={this.hideModal}
        ></CredentialsModal>
      </>
    );
  }
  render() {
    return this.renderAbout();
  }
}

const CredentialsModal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName} id="shadow" >
      <section className="modal-main credentials-modal" id='thing'>
        <div className="credentials-details">
          <p>username: testuser</p>
          <p>password: Testuser1@</p>
        </div>

        <Button onClick={handleClose}>Close</Button>
      </section>
    </div>
  );
};

const modal = document.getElementById('thing')
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}
