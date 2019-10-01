import React from 'react'
import './About.css'
import pdf from './How-to.pdf'

export default class About extends React.Component {

    renderAbout() {
        return (
            <>
            <h2>Welcome to the tonewood data project, here's how to get started.</h2>
            <p>The tonewood data project brings together luthiers worldwide to make it easy to find the properties of many tonewoods.</p>
            <a href={pdf} download="TW Data Project How-to">Download PDF Instructions</a>
            </>
        )
    }
    render() {
        return (
            this.renderAbout()
        )
    }
}