/**
 * @public @name CWCResourceStore
 * @description Class definition, adds local storage resources
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @example
 * CWCResourceStore.setItem('foo', {bar: 'bar'});
 * let foo = CWCResourceStore.getItem('foo'); // foo = { bar: 'bar'}
 */
export default class CWCResourceStore {

	/**
     * @public @constructor @name constructor
	 * @param {String} basename The basename of any stored data in local storage
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor(baseName) {
		this.baseName = baseName ? baseName : 'cwc';
	}

	/**
	 * @public @name hasItem
	 * @description Has a thing from local storage ben set
	 * @param {String} key The key for the item to check
	 * @return {Boolean} Does the item exist
	 */
	hasItem(key) {
		// blank key
		if (!key || localStorage.length < 1) return undefined;

		// full key exists
		return !!localStorage[this.baseName + '.store.' + key];
	}

	/**
	 * @public @name getItem
	 * @description Get a thing from local storage
	 * @param {String} key The key for the item to get
	 * @return {Mixed} The data to get
	 */
	getItem(key) {
		// blank key
		if (!key || localStorage.length < 1) return undefined;

		// full key exists
		if (localStorage[this.baseName + '.store.' + key] !== undefined) return JSON.parse(localStorage[this.baseName + '.store.' + key]);
	}

	/**
	 * @public @name setItem
	 * @description Set a value on local storage
	 * @param {String} key The key for the item to set
	 * @param {Mixed} value The value to store such as object, string, number
	 * @return {Boolean} Was it successfull or not
	 */
	setItem(key, value) {
		// blank key or value
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.' || value === undefined) return false;

		localStorage[this.baseName + '.store.' + key] = JSON.stringify(value);

		return true;
	}

	/**
	 * @public @name deleteItem
	 * @description Delete a value from local storage
	 * @param {String} key The key for the item to get
	 * @return Boolean If the data was removed
	 */
	deleteItem(key) {
		// blank key or value
		var result = false;
		if (!key || typeof key !== 'string' || key.charAt(key.length - 1) == '.') return result;

		// remove value
		if (localStorage[this.baseName + '.store.' + key]) return localStorage.removeItem(this.baseName + '.store.' + key);

		return false;
	}
}
