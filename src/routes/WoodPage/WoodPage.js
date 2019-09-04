import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import WoodContext from '../../contexts/WoodContext'
import WoodApiService from '../../services/wood-api-service'
import { Hyph, Section } from '../../components/Utils/Utils'

import './WoodPage.css'

export default class WoodPage extends Component {
  static defaultProps = {
    match: { params: {} },
  }

  static contextType = WoodContext

  componentDidMount() {
    const { woodId } = this.props.match.params
    this.context.clearError()
    WoodApiService.getWood(woodId)
      .then(this.context.setWood)
      .catch(this.context.setError)
    WoodApiService.getWoodSubmissions(woodId)
      .then(this.context.setSubmissions)
      .catch(this.context.setError)
  }

  componentWillUnmount() {
    this.context.clearWood()
  }

  renderWood() {
    const { wood, submissions } = this.context
    return <>
      {/* <div className='WoodPage__image' style={{backgroundImage: `url(${Wood.image})`}} /> */}
      <h2>{wood.common_name}</h2>
      <WoodDescription wood={wood} />
      <WoodSubmissions submissions={submissions}/>
    </>
  }

  render() {
    const { error, wood } = this.context
    let description
    if (error) {
      description = (error.error === `Wood doesn't exist`)
        ? <p className='red'>Wood not found</p>
        : <p className='red'>There was an error</p>
    } else if (!wood.id) {
      description = <div className='loading' />
    } else {
      description = this.renderWood()
    }
    return (
      <Section className='WoodPage'>
        {description}
      </Section>
    )
  }
}

function WoodDescription({ wood }) {
  return (
      <>
    <p className='WoodPage__description'>
      {wood.genus}
    </p>
    <p className='WoodPage__description'>
    {wood.species}
    </p>
    </>
  )
}

function WoodSubmissions({ submissions = [] }) {
  return (
    <ul className='WoodPage__submissions-list'>
      {submissions.map(sub =>
        <li key={sub.id} className='WoodPage__sub'>
          <p className='WoodPage__sub-data'>
            {/* need to update data */}
            {sub.e_long}
          </p>
        <p className="WoodPage__sub-user">
          {sub.user.email}
        </p>
        </li>
      )
      }
    </ul>
  )
}
