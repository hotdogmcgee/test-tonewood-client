import React from 'react'
import { Section } from '../../components/Utils/Utils'
import SubmissionForm from '../../components/SubmissionForm/SubmissionForm'

export default class SubmissionPage extends React.Component {
    static defaultProps = {
        history: {
          push: () => {},
        },
      }

      handleSubmissionSuccess = sub => {
        const { history } = this.props
        //change to a successful submission splash page
        history.push('/')
    }

    render() {
        return (
            <Section className="SubmissionPage">
                <h1>Submit your data!</h1>
                <SubmissionForm 
                    onSubmissionSucces={this.handleSubmissionSuccess}
                />
            </Section>
        )
    }
}