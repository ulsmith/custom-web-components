/**
 * @public @name CWCResourceStore
 * @description Library class, adds local storage ability to store arrays, objects and strings to local storage
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 * 
 * @example 
 * let store = new Store();
 * store.baseName = 'XXX';
 * store.set('thing', {some: 'data'});
 * store.get('thing');
 */
export default class CWCResourceStore {

	/**
     * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		this.baseName = 'store';
	}

	/**
	 * @public @name getItem
	 * @description Get an thing from local storage, data can be stored as objects with a key and have child objects, you can retrieve them as such too
	 * 
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * 
	 * @return {Object} The data object to get
	 */
	getItem(key) {
		// blank key
		if (!key || localStorage.length < 1) return undefined;

		// full key exists
		if (localStorage[this.baseName + '.store.' + key] !== undefined) return JSON.parse(localStorage[this.baseName + '.store.' + key]);

		// find all values from this key onwards
		var obj = {};
		for (let name in localStorage) {
			if (name.indexOf(this.baseName + '.store.' + key) !== 0) continue;

			// build up obj
			let temp, parts, part;
			temp = obj;
			parts = name.substring((this.baseName + '.store.' + key).length + 1, name.length).split('.');
			while (parts.length) {
				part = parts.shift();
				if (!temp[part]) temp[part] = {};
				if (parts.length === 0) temp[part] = JSON.parse(localStorage[name]);
				temp = temp[part];
			}
		}

		return Object.keys(obj).length > 0 ? obj : undefined;
	}

	/**
	 * @public @name setItem
	 * @description Set a value on local storage, you can save pretty much anything and you can save things as an object with child objects
	 * 
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * @param {Mixed} value the value to store
	 * 
	 * @return {Boolean} Was it successfull or not in sotring
	 */
	setItem(key, value) {
		// blank key or value
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.' || value === undefined) return false;

		// clear out keys and set values
		this.deleteItem(key);
		if (typeof value === 'object') {
			for (var name in value) {
				this.setItem(key + '.' + name, value[name]);
			}
		} else {
			// this.deleteItem(key)
			localStorage[this.baseName + '.store.' + key] = JSON.stringify(value);

			// clean up parents if we added or changed a child as parents are objects and shouldn't be present anyway
			var parts = key.split('.');
			var part = '';
			while (parts.length > 1) {
				part += '.' + parts.shift();
				localStorage.removeItem(this.baseName + '.store' + part);
			}
		}

		return true;
	}

	/**
	 * @public @name deleteItem
	 * @description Delete a value from local storage, you can delete single items or item and children if they have any
	 * 
	 * @param {String} key The key for the item to get, can be dot notated to get all children of parent
	 * 
	 * @return Array Web component api onbservations
	 */
	deleteItem(key) {
		// blank key or value
		var result = false;
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.') return result;

		// remove value
		if (localStorage[this.baseName + '.store.' + key]) result = localStorage.removeItem(this.baseName + '.store.' + key);

		// remove children
		for (let name in localStorage) {
			if (name.indexOf(this.baseName + '.store.' + key + '.') !== 0) continue;
			result = localStorage.removeItem(name);
		}

		return result;
	}
}