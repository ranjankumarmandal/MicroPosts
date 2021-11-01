/**
 * Easy HTTP Library
 * Library for making HTTP Requests
 * 
 * @version 3.0.0
 * @author Ranjan Kumar Mandal
 * @license MIT
 **/

 class EasyHTTP {
    async get(url) {
        // make HTTP GET request
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    
    async post(url, sendData) {
        // make HTTP POST request - submit
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(sendData)
        });
        const data = await response.json();
        return data;
    }

    async put(url, putData) {
        // make HTTP PUT request - update
        const response = await fetch(url, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(putData)
        });
        const data = await response.json();
        return data;
    }

    async delete(url) {
        // make HTTP DELETE request - delete
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'}
        });
        const data = await 'Resources Deleted...';
        return data;
    }
}

export const http = new EasyHTTP();