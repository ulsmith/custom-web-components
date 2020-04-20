import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCLayoutDockable
 * @extends CustomHTMLElement
 * @description Custom Web Component, displays a structured menu to the left with auto dock to top on mobile
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @event change The route has been changed
 * 
 * @method changeRoute(Object route) Change the route to the one sent in
 * @method updateHeight(Event ev) Update the height of the menu and page area
 * @method toggleMenu(Boolean docked, Event ev) Toggle the menu docked/undocked
 * 
 * @property {Object} route Route object, the selected route { component: '...', prefix: '...', path: '...', label: '...', hidden: true, permission: '...' }
 * @property {Object} route.component The component to display when route matched such as my-component
 * @property {Object} route.path The url path to match such as some/url would match http://yoursite.com/some/url
 * @property {Object} route.prefix The url prefix to match instead of the full path, such as some/url would match http://yoursite.com/some/url/fsdfsdfsdfsd
 * @property {Object} route.label The label to use when displaying links in the menu
 * @property {Object} route.hidden Do not show the route in the menu
 * @property {Object} route.permission The permission you need to have to view the route with cwc-layout-router
 * @property {Array[Object]} routes Array of routes to use for menu items
 *
 * @attribute {Flag} docked When the menu is docked (mobile)
 * 
 * @style_variable --cwc-layout-dockable--menu--margin
 * @style_variable --cwc-layout-dockable--menu--padding
 * @style_variable --cwc-layout-dockable--menu--background
 * @style_variable --cwc-layout-dockable--menu--color
 * 
 * @style_variable --cwc-layout-dockable--menu-header--padding
 * @style_variable --cwc-layout-dockable--menu-header--color
 * 
 * @style_variable --cwc-layout-dockable--menu-routes--color
 * @style_variable --cwc-layout-dockable--menu-routes--padding
 * @style_variable --cwc-layout-dockable--menu-route--padding
 * @style_variable --cwc-layout-dockable--menu-route--opacity
 * @style_variable --cwc-layout-dockable--menu-route--background--hover
 * @style_variable --cwc-layout-dockable--menu-route--selected--background
 * @style_variable --cwc-layout-dockable--menu-route--link--padding
 * @style_variable --cwc-layout-dockable--menu-button--width
 * @style_variable --cwc-layout-dockable--menu-button--height
 * @style_variable --cwc-layout-dockable--menu-button--border
 * @style_variable --cwc-layout-dockable--menu-button--border-radius
 * @style_variable --cwc-layout-dockable--menu-button--background
 * @style_variable --cwc-layout-dockable--menu-button--bottom
 * @style_variable --cwc-layout-dockable--menu-button--right
 * @style_variable --cwc-layout-dockable--menu-button--opacity
 * @style_variable --cwc-layout-dockable--menu-button--icon--width
 * @style_variable --cwc-layout-dockable--menu-button--icon--height
 * @style_variable --cwc-layout-dockable--menu-button--icon--padding
 * @style_variable --cwc-layout-dockable--menu-button--icon--fill
 * 
 * @style_variable --cwc-layout-dockable--menu-footer--padding
 * @style_variable --cwc-layout-dockable--menu-footer--color
 * 
 * @style_variable --cwc-layout-dockable--page--padding
 * @style_variable --cwc-layout-dockable--page--background
 * @style_variable --cwc-layout-dockable--page--color
 * 
 * @slot menu-header The content area top of the menu
 * @slot menu-footer The content area bottom of the menu
 * @slot page The content area reserved as page area.
 * 
 * @example HTML
 * <cwc-layout-dockable>
 * 		<span slot="menu-header">My Business</span>
 * 		<span slot="menu-footer">My Copywrite</span>
 * 		<div slot="page">
 * 			<h1>Page One</h1>
 * 			<p>This is a page...</p>
 * 		</div>
 * </cwc-layout-dockable>
 */
class CWCLayoutDockable extends CustomHTMLElement {

	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		// public
		this.route;
		this.routes = [];

		// private
		this._windowEvent;
		this._menuNode;
		this._docked;
	}

	/**
	 * @public @name template
	 * @description Template function to return web component HTML template
	 * 
	 * @return {TemplateResult} HTML template result
	 *
	 * @example JS
	 * this.updateTemplate(); // updates the template and topically re-renders changes
	 */
	static template() {
		return html`
			<style>
				:host { display: block; height: 100%; }

				.cwc-layout-dockable { display: flex; flex-flow: row wrap; margin: 0; padding: 0; height: 100%; }
				[hidden] { display: none !important; }

				.structure-menu { 
					display: block; 
					flex: 1 1 250px; 
					margin: 0; 
					padding: 0; 
					overflow-y: auto; 
					box-sizing: border-box; 
					transition: left 0.4s ease-in-out;
				}

				.structure-menu .structure-menu-box { 
					display: flex; 
					flex-flow: column; 
					margin: var(--cwc-layout-dockable--menu--margin, 0); 
					padding: var(--cwc-layout-dockable--menu--padding, 0); 
					height: 100%; 
					box-sizing: border-box; 
					background: var(--cwc-layout-dockable--menu--background, #eee); 
					color: var(--cwc-layout-dockable--menu--color, #222); 
				}

				.structure-menu .structure-menu-box .menu-header { flex: 1 1; padding: var(--cwc-layout-dockable--menu-header--padding, 15px); color: var(--cwc-layout-dockable--menu-header--color, var(--cwc-layout-dockable--menu--color, #222))}
				.structure-menu .structure-menu-box .menu-routes { flex: 50 1; padding: var(--cwc-layout-dockable--menu-routes--padding, 0px); }
				.structure-menu .structure-menu-box .menu-routes ul { margin: 0; padding: 0; list-style-type: none; }
				.structure-menu .structure-menu-box .menu-routes ul li { cursor: pointer; padding: var(--cwc-layout-dockable--menu-route--padding, 0px); opacity: var(--cwc-layout-dockable--menu-route--opacity, 0.9); }
				.structure-menu .structure-menu-box .menu-routes ul li[selected] { background: var(--cwc-layout-dockable--menu-route--selected--background, #33333311); }
				.structure-menu .structure-menu-box .menu-routes ul li:hover { background: var(--cwc-layout-dockable--menu-route--background--hover, #33333322); }
				.structure-menu .structure-menu-box .menu-routes ul li a.link { display: block; padding: var(--cwc-layout-dockable--menu-route--link--padding, 15px); text-decoration: none; color: var(--cwc-layout-dockable--menu-routes--color, var(--cwc-layout-dockable--menu--color, #222)); }
				.structure-menu .structure-menu-box .menu-footer { flex: 1 1; padding: var(--cwc-layout-dockable--menu-footer--padding, 15px); color: var(--cwc-layout-dockable--menu-footer--color, var(--cwc-layout-dockable--menu--color, #222))}
				
				.structure-page { display: block; flex: 10 1 535px; overflow-y: auto; margin: 0; padding: var(--cwc-layout-dockable--page--padding, 20px); box-sizing: border-box; background: var(--cwc-layout-dockable--page--background, #ddd); color: var(--cwc-layout-dockable--page--color, #222); }
				.structure-page .icon-bars { 
					display: none; 
					width: var(--cwc-layout-dockable--menu-button--width, 35px);
					height: var(--cwc-layout-dockable--menu-button--height, 35px);
					border: var(--cwc-layout-dockable--menu-button--border, 1px solid #888);
					border-radius: var(--cwc-layout-dockable--menu-button--border-radius, 50px);
					background: var(--cwc-layout-dockable--menu-button--background, white);
					box-sizing: border-box; 
					position: fixed; 
					bottom: var(--cwc-layout-dockable--menu-button--bottom, 15px);
					right: var(--cwc-layout-dockable--menu-button--right, 15px);
					opacity: var(--cwc-layout-dockable--menu-button--opacity, 0.6);
					cursor: pointer;
					box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5);
				}

				.structure-page .icon-bars:hover { opacity: 1; }

				.structure-page .icon-bars .icon { 
					width: var(--cwc-layout-dockable--menu-button--icon--width, 33px); 
					height: var(--cwc-layout-dockable--menu-button--icon--height, 33px); 
					padding: var(--cwc-layout-dockable--menu-button--icon--padding, 5px); 
					fill: var(--cwc-layout-dockable--menu-button--icon--fill, #222);
				}
				
				@media (max-width:799px) {
					.structure-menu { position: fixed; top: 0px; left: 0px; z-index: 1000; width: 250px; min-height: 100%; opacity: 0.95; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5); }
					.structure-menu[docked] { left: -300px; }
					.structure-page { padding-bottom: 50px; }
					.structure-page .icon-bars { display: block; }
				}
			</style>

			<div class="cwc-layout-dockable">
				<div id="structure-menu" class="structure-menu">
					<div class="structure-menu-box">
						<div class="menu-header">
							<slot name="menu-header"></slot>
						</div>
						<div class="menu-routes">
							<ul>
								${this.routes.map((route) => (route.hidden ? '' : html`
									<li ?selected="${this.route && this.route.component == route.component}"><a class="link" href="/${route.path}" @click="${this.changeRoute.bind(this, route)}">${route.label}</a></li>
								`))}
							</ul>
						</div>
						<div class="menu-footer">
							<slot name="menu-footer"></slot>
						</div>
					</div>
				</div>
				<div class="structure-page">
					<slot name="page"></slot>
					<span class="icon icon-bars" @click="${this.toggleMenu.bind(this)}"><cwc-icon-material-general class="icon" name="menu"></cwc-icon-material-general></span>
				</div>
			</div>
		`;
	}
		
	/**
	 * @public @static @get @name observedProperties
	 * @description Lifecycle hook that sets properties to observe on the element
	 * 
	 * @return {Array} An array of string property names (camelcase)
	 */
	static get observedProperties() {
		return ['routes','route'];
	}

	/**
	 * @public @name propertyChanged
	 * @description Callback run when an observed property changes value
	 * @param {String} property The property that changed
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	propertyChanged(property, oldValue, newValue) {
		this.updateTemplate();
	}

	/**
	 * @public @name connected
	 * @description Lifecycle hook that gets called when the element is added to DOM
	 */
	connected() {
		this._windowEvent = window.addEventListener('resize', this.updateHeight.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Lifecycle hook that gets called when the element is removed from DOM
	 */
	disconnected() {
		window.removeEventListener('resize', this._windowEvent);
	}

	/**
	 * @public @name templateUpdated
	 * @description Lifecycle hook that gets called when the element html template is updated
	 */
	templateUpdated() {
		this._menuNode = this.shadowRoot.querySelector('#structure-menu');
		this.updateHeight();
	}

	/**
	 * @public @name updateHeight
	 * @description Updates the menu and page height to match the window
	 * 
	 * @param {Event} ev The event that instigated the function
	 */
	updateHeight(ev) {
		this.style.height = window.innerHeight + 'px';
		if (window.innerWidth < 800) {
			setTimeout(() => this.toggleMenu(true), 1);
			this._menuNode.style.height = window.innerHeight + 'px';
		} else {
			this.toggleMenu(false);
			this._menuNode.style.height = 'auto';
		}
	}

	/**
	 * @public @name toggleMenu
	 * @description Toggles the menu in and out once in mobile view
	 * 
	 * @param {Boolean} docked Dock or un dock the menu or swippy swappy if nothing passed in
	 */
	toggleMenu(docked, ev) {
		let status = typeof docked === 'boolean' ? docked : !this._docked;
		if (status === this._docked) return;

		this._docked = status;
		if (this._docked) this._menuNode.setAttribute('docked', '');
		else this._menuNode.removeAttribute('docked');
	}

	/**
	 * @public @name changeRoute
	 * @description Change the route based in the route click by issuing a changeroute event with the selected route
	 * 
	 * @param {Boolean} docked Dock or un dock the menu or swippy swappy if nothing passed in
	 */
	changeRoute(route, ev) {
		this.route = route;
		if (window.innerWidth < 800) this.toggleMenu(true);
		this.dispatchEvent(new CustomEvent('change', { detail: route}));

		// stop anchors actually reloading
		ev.preventDefault();
	}
}

// define the new custom element
customElements.define('cwc-layout-dockable', CWCLayoutDockable);