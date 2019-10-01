import TokenService from "../services/token-service";
import config from "../config";

const WoodApiService = {
  getWoods() {
    return fetch(`${config.API_ENDPOINT}/woods`, {
      headers: {}
    }).then(res => {
      if (!res.ok) {
          throw new Error(res.status)
      }
      return res.json()
  })
  },

  getWood(woodId) {
    return fetch(`${config.API_ENDPOINT}/woods/${woodId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getWoodSubmissions(woodId) {
    return fetch(`${config.API_ENDPOINT}/woods/${woodId}/submissions`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getAllSubmissions(user_id) {
    return fetch(`${config.API_ENDPOINT}/submissions?user_id=${user_id}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  postSubmission(sub) {
    return fetch(`${config.API_ENDPOINT}/submissions`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(sub)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default WoodApiService;
