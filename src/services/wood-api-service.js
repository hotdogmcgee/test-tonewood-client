import TokenService from '../services/token-service'
import config from '../config'

const WoodApiService = {
    getWoods() {
        return fetch(`${config.API_ENDPOINT}/woods`, {
            headers: {
            },
          })
            .then(res =>
              (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            ) 
    }
}

export default WoodApiService