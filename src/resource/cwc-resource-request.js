/**
 * @public @name CWCResourceRequest
 * @description Library class giving async ajax requests with JWT resolution and auto refresh on JWT expiration
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @example JS
 * import Crypto from '...';
 * let hash = Crypto.md5('string');
 */
export default class CWCResourceRequest {

	/**
     * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		this.scheme = null;
		this.baseUrl = null;
	}

	/**
	 * @public @name ajax
	 * @description Perform an ajax request
	 * 
	 * @param {String} type The request type such as GET, POST...
	 * @param {String} url The url to make the request to
	 * @param {Mixed} data Any payload data to go with the request
	 * @param {Objcet} headers Any headers to send
	 * 
	 * @return {Promise} a promies that is resolved when the request is fullfilled
	 */
	ajax(type, url, data, headers) {
		var scope = this;
		type = type.toUpperCase();
		var promise = new Promise(function (resolve, reject) {
			var XHR = XMLHttpRequest || ActiveXObject;
			var xhrRequest = new XHR('MSXML2.XMLHTTP.3.0');
			xhrRequest.open(type, url, true);
			if (typeof headers !== 'undefined') {
				if (scope.getToken()) headers.Authorization = 'Bearer ' + scope.getToken();
				for (var key in headers) xhrRequest.setRequestHeader(key, headers[key]);
			}

			xhrRequest.onreadystatechange = function () {
				if (xhrRequest.readyState === 4) {
					// sort out response, sniff out json and convert
					var output = xhrRequest.responseText;
					if (typeof headers['Accept'] !== 'undefined' && headers['Accept'].indexOf('json') >= 0) {
						try { output = JSON.parse(xhrRequest.responseText); }
						catch (e) { }
					}

					// if authorization save to localStorage to resend back in
					if (xhrRequest.status < 400 && !!this.getResponseHeader('Authorization')) scope.setToken(this.getResponseHeader('Authorization'));

					// if expired, request token refresh and then re-process th eoriginal request
					if (xhrRequest.status === 401 && output.status === 'expired') {
						if (!output.data || !output.data.refreshPath) throw ('You must specify a refresh PATH to the configured endpoint with a JWT expiration, please return data.refreshPath to enable auto JWT refresh');

						scope.get(output.data.refreshPath).then(function () {
							scope.ajax(type, url, data, headers).then(function (response) {
								resolve({ data: response.data, response: response.response });
							}).catch(function (response) {
								reject({ data: response.data, response: response.response });
							});
						}).catch(function () {
							reject({ data: output, response: xhrRequest });
						});
					}
					else if (xhrRequest.status >= 200 && xhrRequest.status < 300) resolve({ data: output, response: xhrRequest });
					else reject({ data: output, response: xhrRequest });
				}
			};
			xhrRequest.send(data);
		});
		return promise;
	}

	/**
	 * @public @name get
	 * @description Perform a get request
	 *
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Number} id Any id to append to the path for REST style requests
	 * 
	 * @return {Promise} A promised resolved on completion of request
	 */
	get(path, id) {
		var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
		return this.ajax('GET', this.scheme + this.baseUrl + '/' + path + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	}

	/**
	 * @public @name put
	 * @description Perform a put request
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Mixed} data Any data to send as the payload for REST style request
	 * @return {Promise} A promised resolved on completion of request
	 */
	put(path, data) {
		var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
		try { data = JSON.stringify(data); }
		catch (e) { }
		return this.ajax('PUT', this.scheme + this.baseUrl + '/' + path, data, headers);
	}

	/**
	 * @public @name patch
	 * @description Perform a patch request
	 * 
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Mixed} data Any data to send as the payload for REST style request
	 * 
	 * @return {Promise} A promised resolved on completion of request
	 */
	patch(path, data) {
		var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
		try { data = JSON.stringify(data); }
		catch (e) { }
		return this.ajax('PATCH', this.scheme + this.baseUrl + '/' + path, data, headers);
	}

	/**
	 * @public @name post
	 * @description Perform a post request
	 * 
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Mixed} data Any data to send as the payload for REST style request
	 * 
	 * @return {Promise} A promised resolved on completion of request
	 */
	post(path, data) {
		var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
		try { data = JSON.stringify(data); }
		catch (e) { }
		return this.ajax('POST', this.scheme + this.baseUrl + '/' + path, data, headers);
	}

	/**
	 * @public @name upload
	 * @description Perform a upload request using post and form data by sending in file list from input[type=file]
	 * 
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Mixed} data Any data to send as the payload for REST style request
	 * 
	 * @return {Promise} A promised resolved on completion of request
	 */
	upload(path, files, length) {
		let formData = new FormData();
		if (files.length > 0) {
			for (var i = 0; i < files.length; i++) {
				formData.append('uploads[]', files[i], files[i].name);
			}
		}

		var headers = { 'Accept': 'application/json', 'Cache-Control': 'no-cache', 'Cache-Control': 'no-store', 'Pragma': 'no-cache', 'Expires': '0' };
		return this.ajax('POST', this.scheme + this.baseUrl + (!!path ? '/' + path : ''), formData, headers);
	}

	/**
	 * @public @name delete
	 * @description Perform a delete request
	 * 
	 * @param {String} path The path to perform the request on (adds to scheme + baseUrl)
	 * @param {Number} id Any id to append to the path for REST style requests
	 * 
	 * @return {Promise} A promised resolved on completion of request
	 */
	delete(path, id) {
		var headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' };
		return this.ajax('DELETE', this.scheme + this.baseUrl + '/' + path + (typeof id !== 'undefined' && id !== null ? '/' + id : ''), null, headers);
	}

	/**
	 * @public @name getToken
	 * @description Get current JWT token
	 * 
	 * @return {String} The JWT token stored in local storage
	 */
	getToken() {
		if (localStorage[this.baseUrl + '.authorization'] !== undefined) return localStorage[this.baseUrl + '.authorization'];

		return undefined;
	}

	/**
	 * @public @name setToken
	 * @description Set the JWT token in local storage
	 * 
	 * @param {String} value The path to perform the request on (adds to scheme + baseUrl)
	 * 
	 * @return {String} The JWT token stored in local storage
	 */
	setToken(value) {
		if (value === undefined) return false;

		return localStorage[this.baseUrl + '.authorization'] = value.replace('Bearer ', '').replace('Refresh ', '');
	}

	/**
	 * @public @name deleteToken
	 * @description Delete the JWT token from local storage
	 */
	deleteToken() {
		localStorage[this.baseUrl + '.authorization'] = '';
	}

	/**
	 * @public @name setBaseUrl
	 * @description Set the base url and scheme
	 * 
	 * @param {String} value The path to set as baseUrl and scheme
	 */
	setBaseUrl(value) {
		if (value === undefined || value.length == 0) {
			this.baseUrl = window.location.host;
			this.scheme = 'http://';
		} else if (value.indexOf('https://') == 0) {
			if (value.charAt(value.length - 1) === '/') value = value.substring(0, value.length - 2);
			this.baseUrl = value.replace('https://', '');
			this.scheme = 'https://';
		} else if (value.indexOf('http://') == 0) {
			if (value.charAt(value.length - 1) === '/') value = value.substring(0, value.length - 2);
			this.baseUrl = value.replace('http://', '');
			this.scheme = 'http://';
		} else {
			if (value.charAt(value.length - 1) === '/') value = value.substring(0, value.length - 2);
			this.baseUrl = value;
			this.scheme = 'http://';
		}
	}
}