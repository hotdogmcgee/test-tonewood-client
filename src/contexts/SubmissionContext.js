import React from "react";

const SubmissionContext = React.createContext({
  submissions: [],
  setSubmissions: () => {},
  addSubmission: () => {}
});

export default SubmissionContext;

export class SubmissionProvider extends React.Component {
    state = {
        submissions: []
    }
  setSubmissions = submissions => {
    this.setState({ submissions });
  };

  addSubmission = submission => {
    this.setSubmissions([...this.state.submissions, submission]);
  };

  render() {
      const value = {
          submissions: this.state.submissions,
          setSubmissions: this.setSubmissions,
          addSubmission: this.addSubmission
      }
      return(
          <SubmissionContext.Provider value={value}>
              {this.props.children}
          </SubmissionContext.Provider>
      )
  }
}
