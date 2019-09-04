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
    },

    getWood(woodId) {
      return fetch(`${config.API_ENDPOINT}/woods/${woodId}`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getWoodSubmissions(woodId) {
      return fetch(`${config.API_ENDPOINT}/woods/${woodId}/submissions`, {
        headers: {
          'authorization': `bearer ${TokenService.getAuthToken()}`,
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