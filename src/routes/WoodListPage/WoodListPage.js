import React from "react";
import { Section } from "../../components/Utils/Utils";
import WoodListContext from '../../contexts/WoodListContext'
import WoodApiService from '../../services/wood-api-service'
import WoodListItem from '../../components/WoodListItem/WoodListItem'
import './WoodListPage.css'

export default class WoodListPage extends React.Component {

  static contextType = WoodListContext
  
  componentDidMount() {
    this.context.clearError()
    WoodApiService.getWoods()
      .then(this.context.setWoodsList)
      .catch(this.context.setError)
  }

  renderWoods() {
    const { woodsList=[] } = this.context
    return woodsList.map(wood => 
      <WoodListItem 
        key={wood.id}
        wood={wood}
      />)
  }

  render() {
    const { error } = this.context

    return (
        <Section list className='WoodListPage'>
        {error
          ? <p className='red'>There was an error, try again</p>
          : this.renderWoods()}
        </Section>
    )
  }
}