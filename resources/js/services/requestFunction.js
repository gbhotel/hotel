 export function createOptions(method, data = null) {
    return {
        method: method,
        headers: {
            'Content-Type': 'application.json',
            'X-CSRF-Token': _token,
        },
        body: JSON.stringify(data)
    }
}

 export function request(url, options = {}) {

   return  fetch(url, options).then(response =>  response.json())
        // .then(data => {setter(data)})
        // .catch(error => {
        //     console.error(error);
        // });
}
