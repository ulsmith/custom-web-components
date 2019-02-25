import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import CWCIconMaterial from '../icon/cwc-icon-material.js';

/**
 * @public @name CWCLayoutDockable
 * @extends CustomHTMLElement
 * @description Application Web Component, displays a structured menu to the left with auto dock to top on mobile
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @example HTML
 * <cwc-layout-dockable></cwc-layout-dockable>
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
	 */
	static template() {
		return html`
			<style>
				:host { display: block; height: 100%; }

				#cwc-layout-dockable { display: flex; flex-flow: row wrap; margin: 0; padding: 0;}
				#cwc-layout-dockable [hidden] { display: none !important; }
				#cwc-layout-dockable * { color: inherit; }
				#cwc-layout-dockable .structure-menu { display: block; flex: 1 1 250px; margin: 0; padding: 0; overflow-y: auto; box-sizing: border-box; background-color: #eee; color: #222; transition: left 0.4s ease-in-out; }
				#cwc-layout-dockable .structure-menu .structure-menu-box { display: flex; flex-flow: column; margin: 0; padding: 0; height: 100%; box-sizing: border-box; background-color: #eee; color: #222; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-header { flex: 1 1; padding: 20px; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-routes { flex: 50 1; padding: 20px; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-routes ul { margin: 0; padding: 0; list-style-type: none; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-routes ul li { line-height: 30px; cursor: pointer; opacity: 0.9; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-routes ul li:hover { text-shadow: 0px 0px 6px #aaa; opacity: 1; }
				#cwc-layout-dockable .structure-menu .structure-menu-box .menu-footer { flex: 1 1; padding: 20px; }
				#cwc-layout-dockable .structure-page { display: block; flex: 10 1 550px; overflow-y: auto; margin: 0; padding: 20px; box-sizing: border-box; background-color: #ddd; color: #222; }
				#cwc-layout-dockable .structure-page .icon-bars { display: none; width: 35px; height: 35px; border: 1px solid #888; border-radius: 50px; background-color: white; padding: 10px; box-sizing: border-box; position: fixed; bottom: 15px; right: 15px; opacity: 0.6; cursor: pointer; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5); }
				#cwc-layout-dockable .structure-page .icon-bars:hover { opacity: 1; }

				@media screen and (min-width:1px) and (max-width:799px) {
					#cwc-layout-dockable .structure-menu { position: fixed; top: 0px; left: 0px; width: 250px; min-height: 100%; opacity: 0.95; box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.5); }
					#cwc-layout-dockable .structure-menu[docked] { left: -300px; }
					#cwc-layout-dockable .structure-page { padding-bottom: 50px; }
					#cwc-layout-dockable .structure-page .icon-bars { display: block; }
				}
			</style>

			<div id="cwc-layout-dockable">
				<div id="structure-menu" class="structure-menu">
					<div class="structure-menu-box">
						<div class="menu-header">
							<slot name="menu-header"></slot>
						</div>
						<div class="menu-routes">
							<ul>
								${this.routes.map((route) => (route.hidden ? '' : html`<li @click="${this.changeRoute.bind(this, route)}">${route.label}</li>`))}
							</ul>
						</div>
						<div class="menu-footer">
							<slot name="menu-footer"></slot>
						</div>
					</div>
				</div>
				<div class="structure-page">
					<slot name="page"></slot>
					<span class="icon icon-bars" @click="${this.toggleMenu.bind(this)}">${CWCIconMaterial.menu}</span>
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
		return ['routes'];
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
		this.shadowRoot.style.height = window.innerHeight + 'px';
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
		this._docked = typeof docked === 'boolean' ? docked : !this._docked;
		if (this._docked) this._menuNode.setAttribute('docked', '');
		else this._menuNode.removeAttribute('docked');
	}

	/**
	 * @public @name changeRoute
	 * @description Change the route based in the route click by issuing a changeroute event with the selected route
	 *
	 * @param {Boolean} docked Dock or un dock the menu or swippy swappy if nothing passed in
	 */
	changeRoute(route) {
		this.route = route;
		if (window.innerWidth < 800) this.toggleMenu(true);
		this.dispatchEvent(new CustomEvent('changeroute', { detail: route}));
	}
}

// define the new custom element
customElements.define('cwc-layout-dockable', CWCLayoutDockable);
