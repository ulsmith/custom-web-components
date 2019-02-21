import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCResourceRouter
 * @extends CustomHTMLElement
 * @description Custom Web Component, adds dynamic lazy routing (deactivated) via push state URL or hashtag
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @property {String} route The route to set as 'one', 'one/two'
 * @property {Array} routes The routes to use as array of objects [{src: '../../app/test/app-test-index.js', component: 'app-test-index', route: 'test' },...]
 *
 * @attribute default The default route to use for no route (index page)
 * @attribute not-found The route to use when no route found (404)
 * @attribute push-state Flag to tell the router if it's using push-state (fallback is hashtag)
 * @attribute redirect Flag to tell the system to redirect the default page to it's actual route
 *
 * @example HTML
 * <cwc-resource-router .route="${this.route}" .routes="${this.routes}" default="test" not-found="404" push-state redirect></cwc-resource-router>
 */
export default class CWCResourceRouter extends CustomHTMLElement {
	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		// properties
		this.route;
		this.routes;

		// private
		this._windowEvent;
		this._selected;
	}

	/**
	 * @public @name template
	 * @description Template function to return web component UI
	 *
	 * @return {String} HTML template block
	 *
	 * @example JS
	 * this.updateTemplate(); // updates the template and topically re-renders changes
	 */
	template() {
		return html`<div id="cwc-resource-router"></div>`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Lifecycle hook that sets properties to observe on the element
	 *
	 * @return {Array} An array of string property names (camelcase)
	 */
	static get observedProperties() {
		return ['route', 'routes'];
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Lifecycle hook that sets attributes to observe on the element
	 *
	 * @return {Array} An array of string attribute names (hyphoned)
	 */
	static get observedAttributes() {
		return ['default', 'not-found', 'push-state', 'redirect'];
	}

	/**
	 * @public @name connected
	 * @description Lifecycle hook that gets called when the element is added to DOM
	 */
	connected() {
		this._windowEvent = window.addEventListener('popstate', this.updateRoute.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Lifecycle hook that gets called when the element is removed from DOM
	 */
	disconnected() {
		window.removeEventListener('popstate', this._windowEvent);
	}

	/**
	 * @public @name propertyChanged
	 * @description Lifecycle hook that gets called when the elements observed properties change
     *
	 * @param {String} property Name of the property changed
     * @param {Mixed} oldValue Value before the change
     * @param {Mixed} newValue Value after the change
	 */
	propertyChanged(property, oldValue, newValue) {
		if (property === 'route' && this.routes) this.updateRoute(newValue);
	}

	/**
	 * @public @name templateUpdated
	 * @description Lifecycle hook that gets called when the elements template is updated on DOM
	 */
	templateUpdated() {
		this.updateRoute();
	}

	/**
	 * @public @name updateRoute
	 * @description Update the router with a new route
     *
	 * @param {Mixed} data The new route as a route object ({component: 'some-thing', route: 'one'}), or a route string 'one'
	 */
	updateRoute(data) {
		let path;

		// empty route or popstate event, work out route from url | route passed in as route | route passed as string path string
		if (!data || data.type === 'popstate') path = this.hasAttribute('push-state') ? window.location.pathname.replace(/^\/|\/$/g, '') : window.location.hash.replace(/^\#|\#$/g, '');
		else if (data.path !== undefined) path = data.path.replace(/^\/|\/$/g, '');
		else if (data.length) path = data.replace(/^\/|\/$/g, '');

		// resolve from path
		let route = this._getRouteFromPath(path);
		let routeDefault = this._getRouteFromPath(this.getAttribute('default'));
		let routeNotFound = this._getRouteFromPath(this.getAttribute('not-found'));

		// not set, load default, set then load, else 404
		if (!path) this._loadRoute(routeDefault);
		else if (route) this._loadRoute(route);
		else this._loadRoute(routeNotFound);
	}

	/**
	 * @public @name _getRouteFromPath
	 * @description Get the router object from the list of routes using the path to search
     *
	 * @param {String} path The path to search for in the routes array
	 *
	 * @return {Object} The route object
	 */
	_getRouteFromPath(path) {
		return this.routes.filter(selected => selected.path === path)[0] || undefined;
	}

	/**
	 * @public @name _loadRoute
	 * @description Load the route from the selected route object. Dynamic lazy imports is deactivated
     *
	 * @param {Object} selected The route object to load the route from
	 */
	_loadRoute(selected) {
		// any route?
		if (!selected) throw 'No route found, default route could not be loaded, please ensure default route is set';

		// should we load route, is it empty or has it changed
		if (this._selected && this._selected.component == selected.component) return;

		if (!customElements.get(selected.component)) {
			// this is for when modules importing is universally excepted
			// import(selected.src).then(() => this._paintRoute(selected.component));
		} else this._paintRoute(selected.component);

		// set route
		this._selected = selected;
		this.route = selected.path;

		// persist history/location
		if (this.hasAttribute('push-state')) {
			// should we redirect default to path
			let path = this._selected.path !== this.getAttribute('default') ? this._selected.path : (this.hasAttribute('redirect') ? this._selected.path : '');
			history.pushState({ 'route': path }, '', path);
		} else window.location.hash = this._selected.path;

		this.dispatchEvent(new CustomEvent('routeloaded'));
	}

	/**
	 * @public @name _paintRoute
	 * @description Paint the loaded component to screen, omits event once complete
     *
	 * @param {String} component The component tag name (lowercase, hyphoned)
	 */
	_paintRoute(component) {
		this.dom().innerHTML = `<${component}></${component}>`;
	}
}

// define the new custom element
customElements.define('cwc-resource-router', CWCResourceRouter);
