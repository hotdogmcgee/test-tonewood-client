import React from 'react'
import './About.css'

export default class About extends React.Component {

    renderAbout() {
        return (
            <>
            <h2>Welcome to the tonewood project, here's how to get started.</h2>
            <p>The tonewood project brings together luthiers worldwide to make it easy to find the properties of many tonewoods.</p>
            <a href="https://www.pdfhost.net/index.php?Action=Download&File=1c27775b105ac4a5c744a876027023cc" target="blank">Link to PDF Instructions</a>
            </>
        )
    }
    render() {
        return (
            this.renderAbout()
        )
    }
}