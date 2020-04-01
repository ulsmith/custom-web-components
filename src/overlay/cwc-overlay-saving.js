import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlaySaving
 * @extends CustomHTMLElement
 * @description Custom Web Component, overlay saving indicator
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The saving indicator has been shown
 * @event hide The saving indicator has been hidden
 *
 * @method show() Show the saving indicator manually
 * @method hide() Hide the saving indicator manually
 *
 * @attribute {Flag} visible The component is visible
 * @attribute {Number} timeout The auto close time in ms
 *
 * @style_variable --cwc-overlay-saving--padding
 * @style_variable --cwc-overlay-saving--background
 * @style_variable --cwc-overlay-saving--border
 * @style_variable --cwc-overlay-saving--border-radius
 * @style_variable --cwc-overlay-saving--bottom
 * @style_variable --cwc-overlay-saving--box-shadow
 * @style_variable --cwc-overlay-saving--color
 * @style_variable --cwc-overlay-saving--font-size
 * @style_variable --cwc-overlay-saving--font-weight
 * @style_variable --cwc-overlay-saving--text-transform
 * @style_variable --cwc-overlay-saving--top
 * @style_variable --cwc-overlay-saving--z-index
 * 
 * @slot Single root slot for content in the saving component
 *
 * @example
 * <cwc-overlay-saving timeout="4000">Your saving message</cwc-overlay-saving>
 */
class CWCOverlaySaving extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._showing;
		this._timeout = this.hasAttribute('timeout') && !isNaN(this.getAttribute('timeout')) ? parseInt(this.getAttribute('timeout')) : 3000;
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
					position: fixed;
					left: 50%;
					z-index: -1;
					height: 30px;
					min-width: fit-content;
					opacity: 0;
					transform: translate(-50%, -50%);
					transition: opacity 180ms ease-in-out;
					top: var(--cwc-overlay-saving--top, initial);
					bottom: var(--cwc-overlay-saving--bottom, 20px);
				}

				:host([visible]) { display: block; z-index: var(--cwc-overlay-saving--z-index, 1001); }

				.cwc-progress {
					display: block;
					box-sizing: border-box;
					padding: var(--cwc-overlay-saving--padding, 10px);
					box-shadow: var(--cwc-overlay-saving--box-shadow, 0px 0px 20px -4px grey);
					background: var(--cwc-overlay-saving--background, green);
					border: var(--cwc-overlay-saving--border, none);
					border-radius:var(--cwc-overlay-saving--border-radius, 0px);
					color: var(--cwc-overlay-saving--color, white);
					font-size: var(--cwc-overlay-saving--font-size, initial);
					font-weight: var(--cwc-overlay-saving--font-weight, normal);
					text-transform: var(--cwc-overlay-saving--text-transform, initial);
				}
			</style>

			<span class="cwc-progress" @click="${this.hide.bind(this)}">
				<slot></slot>
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
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() { this.removeAttribute('visible') }

	/**
     * @public @name show
	 * @description Show the saving indicator and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		clearTimeout(this._showing);
		this.setAttribute('visible', '');
		
		this.dispatchEvent(new CustomEvent('show'));
		setTimeout(() => {
			this.style.opacity = 1;
			if (this._timeout) this._showing = setTimeout(() => this.hide(ev), this._timeout);
		}, 50);
	}

	/**
     * @public @name hide
	 * @description Hide the saving indicator
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		if (this.style.display === 'none') return;

		this.style.opacity = 0;
		this.dispatchEvent(new CustomEvent('hide'));
		setTimeout(() => this.removeAttribute('visible'), 200);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-saving', CWCOverlaySaving);
