import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlayTooltip
 * @extends CustomHTMLElement
 * @description Custom Web Component, overlay tooltip
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The tooltip has been shown
 * @event hide The tooltip has been hidden
 *
 * @method show() Show the tooltip manually
 * @method hide() Hide the tooltip manually
 * 
 * @attribute {String} for Text that matches the closest element name attribute for which it relates
 * 
 * @style_variable --cwc-overlay-tooltip--transition-time
 * @style_variable --cwc-overlay-tooltip--max-width
 * @style_variable --cwc-overlay-tooltip--box-shadow
 * @style_variable --cwc-overlay-tooltip--border
 * @style_variable --cwc-overlay-tooltip--border-radius
 * @style_variable --cwc-overlay-tooltip--background
 * @style_variable --cwc-overlay-tooltip--color
 * @style_variable --cwc-overlay-tooltip--padding
 * @style_variable --cwc-overlay-tooltip--font-size
 * @style_variable --cwc-overlay-tooltip--font-weight
 * @style_variable --cwc-overlay-tooltip--text-align
 *
 * @slot Single root slot for content in the saving component
 * 
 * @example
 * <cwc-overlay-tooltip for="input-one">Your tooltip message</cwc-overlay-tooltip>
 */
class CWCOverlayTooltip extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._watchNode;
		this._windowEvent;
		this._actionTimeout;
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
					z-index: -1;
					opacity: 0;
					transition: opacity var(--cwc-overlay-tooltip--transition-time, 150ms) linear;
					max-width: var(--cwc-overlay-tooltip--max-width, 250px);
				}

				.tooltip {
					box-shadow: var(--cwc-overlay-tooltip--box-shadow, 0px 0px 5px 0px grey);
					border: var(--cwc-overlay-tooltip--border, none);
					border-radius: var(--cwc-overlay-tooltip--border-radius, 0);
					background: var(--cwc-overlay-tooltip--background, black);
					color: var(--cwc-overlay-tooltip--color, white);
					padding: var(--cwc-overlay-tooltip--padding, 5px 10px);
					font-size: var(--cwc-overlay-tooltip--font-size, 14px);
					font-weight: var(--cwc-overlay-tooltip--font-weight, normal);
					text-align: var(--cwc-overlay-tooltip--text-align, left);
				}
			</style>

			<div class="tooltip"><slot></slot></div>
        `;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedAttributes() { return ['for'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements properties change
	 * @param {String} attribute The property name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attributes, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this._watchNode = this.parentNode.querySelector(`[name="${this.getAttribute('for')}"]`);

		if (this._watchNode) {
			this._watchNode.addEventListener('mouseover', this.show.bind(this));
			this._watchNode.addEventListener('mouseout', this.hide.bind(this));
			this._watchNode.addEventListener('click', this.show.bind(this));
		}

		window.addEventListener('scroll', this._forceHide.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	disconnected() {
		if (this._watchNode) {
			this._watchNode.removeEventListener('mouseover', this.show.bind(this));
			this._watchNode.removeEventListener('mouseout', this.hide.bind(this));
			this._watchNode.removeEventListener('click', this.show.bind(this));
		}

		window.removeEventListener('scroll', this._forceHide.bind(this));
	}

	/**
	 * @public @name show
	 * @description Show the tooltip
	 * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.style.display == 'block') return;

		if (ev && ev.type === 'mouseover' && ev.target.getAttribute('name') !== this.getAttribute('for')) {
			let node;

			for (let i = 0; i < ev.path.length; i++) {
				if (!ev.path[i].getAttribute) continue;
				if (ev.path[i].getAttribute('name') === this.getAttribute('for')) node = ev.path[i];
			}

			if (!node) return;
		}

		this.dispatchEvent(new CustomEvent('show'));

		clearTimeout(this._actionTimeout);
		this._actionTimeout = setTimeout(() => {
			this.style.display = 'block';
			this.style.zIndex = 1000;
			this.style.top = ev.clientY - this.offsetHeight - 25 + 'px';
			let posx = ev.clientX - (this.offsetWidth / 2);
			this.style.left = posx < 0 ? 10 : (posx + this.offsetWidth > window.innerWidth ? window.innerWidth - this.offsetWidth - 10 : posx) + 'px';

			setTimeout(() => this.style.opacity = 1, 25);
		}, 150);
	}

	/**
     * @public @name hide
	 * @description Hide the tooltip
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		if (this.style.display === 'none') return;

		if (ev && ev.type === 'mouseout' && ev.target.getAttribute('name') !== this.getAttribute('for')) {
			let node;

			for (let i = 0; i < ev.path.length; i++) {
				if (!ev.path[i].getAttribute) continue;
				if (ev.path[i].getAttribute('name') === this.getAttribute('for')) node = ev.path[i];
			}

			if (!node) return;
		}

		clearTimeout(this._actionTimeout);
		this._actionTimeout = setTimeout(() => {
			this.dispatchEvent(new CustomEvent('hide'));

			this.style.opacity = 0;

			setTimeout(() => {
				this.style.display = 'none';
				this.style.zIndex = -1;
			}, 150);
		}, 150);
	}

	/**
     * @public @name _forceHide
	 * @description Force hide the tooltip
     * @param {Event} ev Any event that kicks the function
	 */
	_forceHide(ev) {
		if (this.style.display === 'none') return;

		this.dispatchEvent(new CustomEvent('hide'));

		this.style.opacity = 0;

		// hide it
		setTimeout(() => {
			this.style.display = 'none';
			this.style.zIndex = -1;
		}, 150);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-tooltip', CWCOverlayTooltip);
