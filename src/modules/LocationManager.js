const remoteURL = "http://localhost:5002";

export default {
  get(id) {
    return fetch(`${remoteURL}/locations/${id}`).then(e => e.json());
  },
  getAll() {
    return fetch(`${remoteURL}/locations`).then(e => e.json());
  },
  deleteLocation(id) {
    return fetch(`${remoteURL}/locations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(e => e.json());
  },
  post(location) {
    return fetch(`${remoteURL}/locations`, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(location)
    }).then(e => e.json());
  }
};
