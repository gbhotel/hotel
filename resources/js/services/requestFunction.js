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

 export function createOptions2(method, data = null) {
     return {
         method: method,
         headers: {
             'X-CSRF-Token': _token,
         },
         body: data
     }
 }

 export function request(url, options = {}) {
   return  fetch(url, options).then(response =>  response.json())
}

 export function request2(url, options = {}) {
     return  fetch(url, options)
 }
