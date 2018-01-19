//API PROMISE LIBRARY
import Promise from 'bluebird';


function get(url, data) {
    return dispatch('GET', url, data);
}
function post(url, data) {
    return dispatch('POST', url, data);
}
function put(url, data) {
    return dispatch('PUT', url, data);
}
function _delete(url, data) {
    return dispatch('DELETE', url, data);
}

function dispatch(type, url, data) {
        return requestWeb(type, url, data);
}

/**
 * PROMISES
 */

function requestWeb(type, url, data) {
    return new Promise(function(resolve, reject) {
        url = url.trim();

        let options = {
            type: type,
            data: data ? JSON.stringify(data) : null,
            dataType: 'json',
            contentType: 'application/json',
            crossDomain: true,
            timeout: 15000,
            xhrFields: { withCredentials: true }
        };
        fetch(url, options)
      	.then(response => {
	        resolve(response.json());
      	})
      	.catch(err => {
	        console.log('fetch error: ', JSON.stringify(err), err.message);
	        reject(err);
      	});
    });
}

export default { get, post, put, delete: _delete };
