import React from "react";
import { Section } from "../../components/Utils/Utils";
import SubmissionForm from "../../components/SubmissionForm/SubmissionForm";
import SubmissionSuccess from "../../components/SubmissionSuccess/SubmissionSuccess";

export default class SubmissionPage extends React.Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  //refactored this?
  state = {
    hasSubmission: false
  };

  handleSubmissionSuccess = sub => {
    //go to Welcome Page on timeout?
    this.setState({
        hasSubmission: true
    })
  };

  handleNewSubmitClick = sub => {
    this.setState({
      hasSubmission: false
    })
    
  }

  renderSubmissionForm() {
    return (
      <Section className="SubmissionPage">
        <h1>Submit your data!</h1>
        <SubmissionForm onSubmissionSuccess={this.handleSubmissionSuccess} />
      </Section>
    );
  }

  renderSubmissionSuccess() {
    return (
      <Section className="SubmissionSuccess">
        <SubmissionSuccess handleNewSubmitClick={this.handleNewSubmitClick}/>
      </Section>
    );
  }

  render() {
    return (
      <>
        {this.state.hasSubmission
          ? this.renderSubmissionSuccess()
          : this.renderSubmissionForm()}
      </>
    );
  }
}
