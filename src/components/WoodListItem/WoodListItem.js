import React from 'react'
import { Link } from 'react-router-dom'

export default class WoodListItem extends React.Component {
    render() {
        const { wood } = this.props
        return (
            <Link to={`/woods/${wood.id}`} className='WoodListItem'>
              {/* <div className='WoodListItem__image' style={{backgroundImage: `url(${wood.image})`}} /> */}
      
              <div className='WoodListItem__details'>
                <div className='WoodListItem__text'>
                  <h2 className='WoodListItem__heading'>{wood.common_name}</h2>
                  <p className='WoodListItem__genus'>{wood.genus}</p>
                  <p className='WoodListItem__species'>{wood.species}</p>
                  {/* <p className='WoodListItem__description'>{truncate(wood.description)}</p> */}
                </div>
      
              </div>
            </Link>
          ) 
    }
}

function truncate(text) {
    const words = text.split(' ')
  
    if (words.length > 10) {
      return words.slice(0, 10).join(' ') + ' ...'
    }
  
    return text
  }