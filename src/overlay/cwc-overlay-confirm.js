import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import '../control/cwc-control-button.js';

/**
 * @public @name CWCOverlayConfirm
 * @extends CustomHTMLElement
 * @description Application Web Component, adds a saving icon that self hides after X seconds
 * @example Use by dispatching to custom event 'message' from within the app as an info, error, warning or done message e.g. `this.dispatchEvent(new CustomEvent('message', { bubbles: true, composed: true, detail: { text: 'boom canvas selector loaded', type: 'info', seconds: 2 } }));`
 */
class CWCOverlayConfirm extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._data;
		this._showing;
		this._timeout;
	}

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
				:host {
					position: fixed;
					display: none;
					opacity: 0;
					z-index: -1;
					top: 50%;
					left: 50%;
					min-width: fit-content;
					transform: translate(-50%, -50%);
					transition: opacity var(--cwc-overlay-confirm--speed, var(--cwc-overlay--speed, 200ms)) ease-in-out;
				}

				:host([visible]) {
					display: block;
					z-index: var(--cwc-overlay-confirm--z-index, var(--cwc-overlay--z-index, 1001));
				}

				.confirm {
					display: block;
					box-sizing: border-box;
					padding: var(--cwc-overlay-confirm--padding, var(--cwc-overlay--padding, 20px));
					box-shadow: var(--cwc-overlay-confirm--box-shadow, var(--cwc-overlay--box-shadow, 0px 0px 20px -4px black));
					background: var(--cwc-overlay-confirm--background, var(--cwc-overlay--background, white));
					border: var(--cwc-overlay-confirm--border, var(--cwc-overlay--border, none));
					border-radius:var(--cwc-overlay-confirm--border-radius, var(--cwc-overlay--border-radius, 0px));
					color: var(--cwc-overlay-confirm--color, var(--cwc-overlay--color, black));
					font-size: var(--cwc-overlay-confirm--font-size, var(--cwc-overlay--font-size, initial));
					font-weight: var(--cwc-overlay-confirm--font-weight, var(--cwc-overlay--font-weight, normal));
					text-transform: var(--cwc-overlay-confirm--text-transform, initial);
				}

				.controls { margin-top: 10px; text-align: center; }
				.controls .button { margin: 0 10px; }
			</style>

			<span class="confirm">
				<div class="message">
					<slot></slot>
				</div>
				<div class="controls">
					<cwc-control-button class="button" @click="${this._no.bind(this)}">No</cwc-control-button>
					<cwc-control-button class="button" context="primary" @click="${this._yes.bind(this)}">Yes</cwc-control-button>
				</div>
			</span>
        `;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['timeout'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) {
		this._timeout = this.hasAttribute('timeout') && !isNaN(this.getAttribute('timeout')) ? parseInt(this.getAttribute('timeout')) : 3000;
		this.updateTemplate();
	}

	/**
	 * @public @name constructed
	 * @description Lifecycle hook that gets called when the element is finished contructing, perfect for setting up properties
	 */
	constructed() { this._timeout = this.hasAttribute('timeout') && !isNaN(this.getAttribute('timeout')) ? parseInt(this.getAttribute('timeout')) : 3000 }

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this.removeAttribute('visible');
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	show(data) {
		this._data = data;
		this.dispatchEvent(new CustomEvent('show'));

		// auto hide it
		clearTimeout(this._showing);

		// add it
		this.setAttribute('visible', '');

		// show it
		setTimeout(() => {
			this.style.opacity = 1;
		}, 50);
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		if (this.style.display === 'none') return;

		this.dispatchEvent(new CustomEvent('hide'));

		// add it
		this.style.opacity = 0;

		// show it
		setTimeout(() => this.removeAttribute('visible'), 250);
	}

	/**
     * @public @name _yes
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	_yes(ev) {
		this.dispatchEvent(new CustomEvent('yes', { detail: this._data }));
		this.hide();
	}

	/**
     * @public @name _no
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	_no(ev) {
		this.dispatchEvent(new CustomEvent('no'));
		this.hide();
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-confirm', CWCOverlayConfirm);
