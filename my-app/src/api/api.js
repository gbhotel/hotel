import axios from 'axios'

api = "http://localhost:5000/api/data"

axios.get(api)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });