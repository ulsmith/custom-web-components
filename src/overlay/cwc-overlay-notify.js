import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlayNotify
 * @extends CustomHTMLElement
 * @description Custom Web Component, overlay notify message that can be styled
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 * 
 * @event show The help tip has been shown
 * @event hide The help tip has been hidden
 *
 * @method show(Number timeout) Show the modal manually with optional timeout for auto close in ms
 * @method hide() Hide the modal manually
 *
 * @attribute {Flag} visible The element visible
 * @attribute {String} context The contaxt as primary, success, warning, danger
 * @attribute {Number} timeout The timeout to auto close
 *
 * @style_variable --cwc-overlay-notify--background
 * @style_variable --cwc-overlay-notify--border
 * @style_variable --cwc-overlay-notify--border-radius
 * @style_variable --cwc-overlay-notify--bottom
 * @style_variable --cwc-overlay-notify--box-shadow
 * @style_variable --cwc-overlay-notify--color
 * @style_variable --cwc-overlay-notify--fill
 * @style_variable --cwc-overlay-notify--height
 * @style_variable --cwc-overlay-notify--left
 * @style_variable --cwc-overlay-notify--max-height
 * @style_variable --cwc-overlay-notify--max-width
 * @style_variable --cwc-overlay-notify--min-height
 * @style_variable --cwc-overlay-notify--min-width
 * @style_variable --cwc-overlay-notify--padding
 * @style_variable --cwc-overlay-notify--right
 * @style_variable --cwc-overlay-notify--top
 * @style_variable --cwc-overlay-notify--transform
 * @style_variable --cwc-overlay-notify--width
 * @style_variable --cwc-overlay-notify--z-index
 * 
 * @slot Single root slot, to add a message to the notify component
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
					position: fixed;
					width: var(--cwc-overlay-notify--width, fit-content);
					height: var(--cwc-overlay-notify--height, fit-content);
					min-height: var(--cwc-overlay-notify--min-height, 20px);
					max-height: var(--cwc-overlay-notify--max-height, 500px);
					min-width: var(--cwc-overlay-notify--min-width, 20px);
					max-width: var(--cwc-overlay-notify--max-width, 500px);
					z-index: -1;
					transition: opacity 190ms ease-in-out;
					top: var(--cwc-overlay-notify--top, unset);
					bottom: var(--cwc-overlay-notify--bottom, 20px);
					left: var(--cwc-overlay-notify--left, unset);
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

				.message {
					display: block;
					min-height: inherit;
					max-height: inherit;
					min-width: inherit;
					max-width: inherit;
					width: fit-content;
					height: fit-content;
					padding: var(--cwc-overlay-notify--padding, 10px);
					box-sizing: border-box;
				}

				:host([jiggle]) { animation: jiggle 0.2s 1; }

				@keyframes jiggle {
					0% { transform: var(--cwc-overlay-notify--transform, translate(0)) scale(1.1); }
					20% { transform: var(--cwc-overlay-notify--transform, translate(0)) scale(1.1); }
					100% { transform: var(--cwc-overlay-notify--transform, translate(0)) scale(1); }
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
		this.dispatchEvent(new CustomEvent('show'));
		this.setAttribute('visible', '');

		if (this._showing) this.setAttribute('jiggle', '');

		clearTimeout(this._showing);
		setTimeout(() => {
			this.style.opacity = 1;
			this.removeAttribute('jiggle');

			if (!timeout && !this._timeout) return;

			this._showing = setTimeout(() => this.hide(), parseInt(timeout || this._timeout));
		}, 200);
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
