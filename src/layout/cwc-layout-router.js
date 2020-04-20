import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCLayoutRouter
 * @extends CustomHTMLElement
 * @description Custom Web Component, adds dynamic lazy routing (deactivated) via push state URL or hashtag.
 * Loads the component into the router when URL matches and permissions met if set
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 * 
 * @event change The route has been changed and is painted to the DOM
 * 
 * @property {Object} route The route selected { component: 'app-system-account', path: 'account', label: 'Account', hidden: true, permission: 'ui.route.account' }
 * @property {Array[Object]} routes The routes to use as array of objects [{ component: 'app-system-account', path: 'account', label: 'Account', hidden: true, permission: 'ui.route.account' },...]
 * @property {Array[Object.String]} routes[].src (optional) The full src path to the component, if you wish to dynamically import, omit if loading all routes manually
 * @property {Array[Object.String]} routes[].component The component to display when route matched such as my-component
 * @property {Array[Object.String]} routes[].path The url path to match such as some/url would match http://yoursite.com/some/url
 * @property {Array[Object.String]} routes[].prefix The url prefix to match instead of the full path, such as some/url would match http://yoursite.com/some/url/fsdfsdfsdfsd
 * @property {Array[Object.String]} routes[].label The label to use when displaying links in the menu
 * @property {Array[Object.Boolean]} routes[].hidden Do not show the route in the menu
 * @property {Array[Object.String]} routes[].permission The permission you need to have to view the route such as ui.route.something
 * @property {Array[Object]} permissions The permissions for the user logged in, as an array of objects [{role, 'ur.role.name', read: true, write, true, delete: true}, ...]
 * @property {Array[Object.String]} permissions[].role The role that needs to match to the permission in the route
 * @property {Array[Object.Boolean]} permissions[].read Does the user have read access
 * @property {Array[Object.Boolean]} permissions[].write Does the user have write access
 * @property {Array[Object.Boolean]} permissions[].delete Does the user have delete access
 *
 * @attribute {String} default The default route path when no path detected in url (index page)
 * @attribute {String} not-found The route to use when no route found (404)
 * @attribute {Flag} push-state Flag to tell the router if it's using push-state (fallback is hashtag) 
 * @attribute {Flag} redirect Flag to tell the system to redirect the default page to it's actual route or show it as empty in the url
 * 
 * @example HTML
 * <cwc-layout-router .route="${this.route}" .routes="${this.routes}" default="test" not-found="404" push-state redirect></cwc-layout-router>
 */
class CWCLayoutRouter extends CustomHTMLElement {
	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		// properties
		this.route;
		this.routes;
		this.permissions;

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
	static template() {
		return html`<div id="cwc-layout-router"></div>`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Lifecycle hook that sets properties to observe on the element
	 * 
	 * @return {Array} An array of string property names (camelcase)
	 */
	static get observedProperties() {
		return ['route', 'routes', 'permissions'];
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
	 * @private @name _permitted
	 * @description Change the route of the application
	 * 
     * @param {String} path The path of the route
	 */
	_permitted(permission, type) {
		permission = this.permissions.filter((perm) => perm.role === permission)[0] || {};
		return permission[type];
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
		else return;

		// resolve from path
		let route = this._getRouteFromPath(path);
		let routeDefault = this._getRouteFromPath(this.getAttribute('default'));
		let routeNotFound = this._getRouteFromPath(this.getAttribute('not-found'));
		let routeNotAllowed = this._getRouteFromPath(this.getAttribute('not-allowed'));
		if (route && route.prefix) route.parameters = path.split(route.prefix)[1].replace(/^\/|\/$/g, '').split('/');

		// not set, load default, set then load, else 404
		if (route && route.permission && !this._permitted(route.permission, 'read')) this._loadRoute(routeNotAllowed);
		else if (!path) this._loadRoute(routeDefault);
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
		return this.routes.filter(selected => !selected.prefix ? selected.path === path : path.indexOf(selected.prefix + (selected.prefix.charAt(selected.prefix.length - 1) != '/' ? '/' : '')) === 0)[0] || undefined;
	}

	/**
	 * @public @name _loadRoute
	 * @description Load the route from the selected route object. Dynamic lazy imports is deactivated
     * 
	 * @param {Object} selected The route object to load the route from
	 */
	_loadRoute(selected) {
		// should we load route, has it changed
		if (this._selected && this._selected.component == selected.component) return;

		// set route
		this._selected = selected;
		this.route = selected;

		// if component was not loaded in routes file, 
		if (!customElements.get(selected.component)) {
			import(selected.src)
				.then(() => this._paintRoute(selected.component))
				.catch((error) => {
					console.log(error);
					throw Error('Component not loaded. Must provide a full src path to component in route to dynamically load component from src. Alternatively, load all route components manually in routes file.');
				});
		} else this._paintRoute(selected.component);

		// persist history/location
		if (this.hasAttribute('push-state')) {
			// should we redirect default to path
			let path = this._selected.path !== this.getAttribute('default') ? this._selected.path : (this.hasAttribute('redirect') ? this._selected.path : '');
			history.pushState({ 'route': path }, '', path);
		} else window.location.hash = this._selected.path;
	}

	/**
	 * @public @name _paintRoute
	 * @description Paint the loaded component to screen, omits event once complete
     * 
	 * @param {String} component The component tag name (lowercase, hyphoned)
	 */
	_paintRoute(component) {
		this.shadowRoot.innerHTML = `<${component}></${component}>`;
		this.dispatchEvent(new CustomEvent('change', { detail: this._selected }));

		setTimeout(() => window.scrollTo({ left: 0, top: 0, behavior: 'smooth' }), 200);
	}
}

// define the new custom element
customElements.define('cwc-layout-router', CWCLayoutRouter);