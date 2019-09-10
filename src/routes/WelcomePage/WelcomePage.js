import React from "react";
import { Section, Button } from "../../components/Utils/Utils";
import { Link } from 'react-router-dom'
import WoodListContext from '../../contexts/WoodListContext'
import WoodApiService from '../../services/wood-api-service'
import WoodListItem from '../../components/WoodListItem/WoodListItem'
import About from '../../components/About/About'
import './WelcomePage.css'

export default class WelcomePage extends React.Component {

  static contextType = WoodListContext
  
  componentDidMount() {
    this.context.clearError()
    WoodApiService.getWoods()
      .then(this.context.setWoodsList)
      .catch(this.context.setError)
  }

  //limit the number shown?
  renderWoods() {
    const { woodsList=[] } = this.context
    const newList = woodsList.filter(wood => wood.common_name.toLowerCase() !== 'other')
    return newList.map(wood => 
      <WoodListItem 
        key={wood.id}
        wood={wood}
      />)
  }

  render() {
    const { error } = this.context

    return (
      <>
        <Section id='About'>
          <About />
        </Section>
        <Section list className='WoodList'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderWoods()}
        </Section>
        <Section id='Submission-Link-Section'>
        <Link to={'/new-submission'} className="Submission-Link"><Button>Submit your data!</Button></Link>
        </Section>
        
      </>
    )
  }
}
