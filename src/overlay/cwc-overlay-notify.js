import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlayNotify
 * @extends CustomHTMLElement
 * @description Application Web Component, common component, overlay notify that can be styled
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * <cwc-overlay-notify timeout="4000" context="primary">Your Message</cwc-overlay-notify>
 */
class CWCOverlayNotify extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._showing;
		this._timeout = this.hasAttribute('timeout') ? parseInt(this.getAttribute('timeout')) : 3000;
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
					display: none;
					opacity: 0;
					margin-left: 20px;
					position: fixed;
					width: fit-content;
					height: fit-content;
					min-height: 20px;
					max-height: 500px;
					min-width: 20px;
					max-width: 500px;
					z-index: -1;
					transition: opacity 190ms ease-in-out;
					top: var(--cwc-overlay-notify--top, auto);
					bottom: var(--cwc-overlay-notify--bottom, 20px);
					left: var(--cwc-overlay-notify--left, auto);
					right: var(--cwc-overlay-notify--right, 20px);
					transform: var(--cwc-overlay-notify--transform, none);
					border-radius: var(--cwc-overlay-notify--border-radius, 0);
					box-shadow: var(--cwc-overlay-notify--box-shadow, 0px 0px 20px -4px grey);
					background: var(--cwc-overlay-notify--background, #ddd);
					border: var(--cwc-overlay-notify--border, 1px solid #ccc);
					color: var(--cwc-overlay-notify--color, black);
					fill: var(--cwc-overlay-notify--fill, black);
				}

				:host([visible]) { display: block; z-index: var(--cwc-overlay-notify--z-index, 1001); }
				:host([context="primary"]) { background: var(--cwc-overlay-notify--primary--background, blue); color: var(--cwc-overlay-notify--primary--color, white); fill: var(--cwc-overlay-notify--primary--fill, white); border: var(--cwc-overlay-notify--primary--border, none); }
				:host([context="success"]) { background: var(--cwc-overlay-notify--success--background, green); color: var(--cwc-overlay-notify--success--color, white); fill: var(--cwc-overlay-notify--success--fill, white); border: var(--cwc-overlay-notify--success--border, none); }
				:host([context="warning"]) { background: var(--cwc-overlay-notify--warning--background, orange); color: var(--cwc-overlay-notify--warning--color, white); fill: var(--cwc-overlay-notify--warning--fill, white); border: var(--cwc-overlay-notify--warning--border, none); }
				:host([context="danger"]) { background: var(--cwc-overlay-notify--danger--background, red); color: var(--cwc-overlay-notify--danger--color, white); fill: var(--cwc-overlay-notify--danger--fill, white); border: var(--cwc-overlay-notify--danger--border, none); }

				.message {
					display: block;
					min-height: 20px;
					max-height: 500px;
					min-width: 20px;
					max-width: 500px;
					width: fit-content;
					height: fit-content;
					border-radius: 5px;
					padding: 10px;
					box-sizing: border-box;
				}
			</style>

			<div class="message" @click="${this.hide.bind(this)}"><slot></slot></div>
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
		this._timeout = newValue !== null ? parseInt(newValue) : undefined;
		this.updateTemplate();
	}

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this.removeAttribute('visible');
	}

	/**
     * @public @name show
	 * @description Show a notification message
	 * @param {Number} timeout (optional) The milliseconds of time to auto timeout
	 */
	show(timeout) {
		// auto hide it
		clearTimeout(this._showing);

		this.dispatchEvent(new CustomEvent('show'));
		this.setAttribute('visible', '');

		setTimeout(() => {
			this.style.opacity = 1;

			if (!timeout && !this._timeout) return;

			this._showing = setTimeout(() => this.hide(), parseInt(timeout || this._timeout));
		}, 50);
	}

	/**
     * @public @name hide
	 * @description Hide a notification message
	 */
	hide() {
		if (this.style.display === 'none') return;

		this.dispatchEvent(new CustomEvent('hide'));
		this.style.opacity = 0;

		setTimeout(() => this.removeAttribute('visible'), 250);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-notify', CWCOverlayNotify);
