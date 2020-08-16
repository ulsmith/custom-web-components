import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCControlButton
 * @extends CustomHTMLElement
 * @description Custom Web Component, a button for forms and actions
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event click The button is clicked
 *
 * @attribute {String} context The contaxt as primary, secondary, success, warning, danger
 * @attribute {String} type The type for the button
 * @attribute {Flag} disabled Add to disabled the button
 *
 * @style_variable --cwc-control-button--border-radius
 * @style_variable --cwc-control-button--box-shadow
 * @style_variable --cwc-control-button--height
 * @style_variable --cwc-control-button--width
 * @style_variable --cwc-control-button--line-height
 * @style_variable --cwc-control-button--background
 * @style_variable --cwc-control-button--color
 * @style_variable --cwc-control-button--border
 * @style_variable --cwc-control-button--padding
 * @style_variable --cwc-control-button--font-size
 * @style_variable --cwc-control-button--font-family
 * @style_variable --cwc-control-button--cursor
 * @style_variable --cwc-control-button--outline
 *
 * @style_variable --cwc-control-button--background--hover
 * @style_variable --cwc-control-button--background--focus
 * @style_variable --cwc-control-button--background--active
 * @style_variable --cwc-control-button--box-shadow--hover
 * @style_variable --cwc-control-button--box-shadow--focus
 * @style_variable --cwc-control-button--box-shadow--active
 *
 * @slot root Single root slot to show contents of button
 * 
 * @example
 * <cwc-control-button @click="${this.test.bind(this)}" type="submit" disabled>A Button</cwc-control-button>
 */
class CWCControlButton extends CustomHTMLElement {

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>	
				:host { 
					display: inline-block; 
					outline: var(--cwc-control-button--outline, none);
					cursor: var(--cwc-control-button--cursor, default);
				}
				
				.cwc-control-button { 
					box-sizing: border-box;
					border-radius: var(--cwc-control-button--border-radius, 0px);
					height: var(--cwc-control-button--height, 30px);
					width: var(--cwc-control-button--width, auto);
					line-height: var(--cwc-control-button--line-height, 28px);
					background: var(--cwc-control-button--background, white);
					color: var(--cwc-control-button--color, black);
					fill: var(--cwc-control-button--color, black);
					border: var(--cwc-control-button--border, 1px solid black);
					padding: var(--cwc-control-button--padding, 0 8px);
					font-size: var(--cwc-control-button--font-size, 14px);
					font-family: var(--cwc-control-button--font-family, inherit);
					outline: none;
					box-shadow: var(--cwc-control-button--box-shadow, none);
					display: inline-block;
					pointer-events: none; 
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				:host([icon]) .cwc-control-button { padding: var(--cwc-control-button--icon--padding, 0); }

				:host(:hover) .cwc-control-button { background: var(--cwc-control-button--background--hover, #ddd); box-shadow: var(--cwc-control-button--box-shadow--hover, none); }
				:host(:focus) .cwc-control-button { background: var(--cwc-control-button--background--focus, #ddd); box-shadow: var(--cwc-control-button--box-shadow--focus, 0 0 0 1px grey); }
				:host(:active) .cwc-control-button { background: var(--cwc-control-button--background--active, #bbb); box-shadow: var(--cwc-control-button--box-shadow--active, 0 0 0 2px grey); }			
				:host([disabled]), :host([disabled]):hover, :host([disabled]):active, :host([disabled]):focus .cwc-control-button { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-control-button--disabled--opacity, 0.6); }
			</style>

			<button class="cwc-control-button" @click="${this._click.bind(this)}" type="${ifDefined(this.getAttribute('type') || undefined)}"><slot></slot></button>
		`;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide atributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['disabled', 'icon'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this.setAttribute('tabindex', 0);
		this.addEventListener('keyup', this._click.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	disconnected() {
		this.removeEventListener('keyup', this._click.bind(this));
	}

	/**
	 * @private @name _click
	 * @description Click action happened
     * @param {Event} ev Any event that kicks the function
	 */
	_click(ev) {
		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('click'));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-control-button', CWCControlButton);
