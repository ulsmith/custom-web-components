import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../overlay/cwc-overlay-help.js';

/**
 * @public @name CWCControlSwitch
 * @extends CustomHTMLElement
 * @description Custom Web Component, switch for forms and configs
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event change The value is updated
 *
 * @method validate(Boolean value) The value on or off, true or false
 *
 * @property {string} value The initial value (overrides attribute value)
 *
 * @attribute {String} label The control label
 * @attribute {String} help The help text to display with a little hover icon
 * @attribute {String} value The initial value, if set
 * @attribute {Flag} disabled To disable the control
 * @attribute {Flag} invalid The control is invalid
 * @attribute {Flag} required The control is required
 * @attribute {Flag} validate-on-load Validate the control when it loads in the dom
 *
 * @style_variable --cwc-control-switch--background
 * @style_variable --cwc-control-switch--border
 * @style_variable --cwc-control-switch--border-radius
 * @style_variable --cwc-control-switch--color
 * @style_variable --cwc-control-switch--text-align
 *
 * @style_variable --cwc-control-switch--background--hover
 *
 * @style_variable --cwc-control-switch--label--color
 * @style_variable --cwc-control-switch--label--font-weight
 * @style_variable --cwc-control-switch--label--text-align
 *
 * @style_variable --cwc-control-switch--disabled--opacity
 *
 * @example
 * <cwc-control-switch label="A input" help="Blah blah blah" disabled></cwc-control-switch>
 */

class CWCControlSwitch extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? true : false;
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
					display: inline-block;
					min-width: 200px;
					height: 62px;
					box-sizing: border-box;
				}

				.cwc-control-switch {
					position: relative;
					padding-right: 25px;
					width: inherit;
					height: inherit;
					display: block;
					text-align: var(--cwc-control-switch--text-align, left);
				}

				.cwc-control-switch [invisible] { opacity: 0; }

				.cwc-control-switch label {
					display: block;
					height: 20px;
					font-size: 14px;
					flex: 1 1;
					text-align: var(--cwc-control-switch--label--text-align, left);
					color: var(--cwc-control-switch--label--color, black);
					font-weight: var(--cwc-control-switch--label--font-weight, normal);
				}

				.cwc-control-switch .cwc-switch-box {
					margin: 1px;
					width: 80px;
					height: 30px;
					display: inline-block;
					position: relative;
					box-sizing: border-box;
					border-radius: var(--cwc-control-switch--border-radius, 0px);
					border: var(--cwc-control-switch--border, 1px solid black);
				}

				.cwc-control-switch .cwc-switch-box .cwc-switch-blob {
					display: block;
					height: 26px;
				    width: 36px;
					position: absolute;
					left: 1px;
					top: 1px;
					text-align: center;
					font-size: 12px;
					line-height: 26px;
					transition: left 0.1s ease-in-out;
					cursor: default;
					color: var(--cwc-control-switch--color, white);
					background: var(--cwc-control-switch--background, black);
					border-radius: var(--cwc-control-switch--border-radius, 0px);
				}

				.cwc-control-switch .cwc-switch-box .cwc-switch-blob[on] { left: 41px; }

				.cwc-control-switch .cwc-help {
					position: absolute;
					top: 0px;
					right: 0px;
				}

				:host(:hover) .cwc-control-switch .cwc-switch-box .cwc-switch-blob { background: var(--cwc-control-switch--background--hover, black); }

				:host([justify="center"]) .cwc-control-switch { text-align: center; }
				:host([justify="right"]) .cwc-control-switch { text-align: right; }

				:host([disabled]) .cwc-control-switch .cwc-switch-box { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-control-switch--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-control-switch">
				<label ?invisible="${!this.hasAttribute('label')}">${this.getAttribute('label')}</label>
				<div class="cwc-help" ?hidden="${!this.hasAttribute('help')}">
					<cwc-overlay-help>${this.getAttribute('help')}</cwc-overlay-help>
				</div>
				<div class="cwc-switch-box" @click="${this._change.bind(this)}">
					<div class="cwc-switch-blob" ?on="${this.value}">${this.value ? 'ON' : 'OFF'}</div>
				</div>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedProperties() { return ['value'] }

	/**
	 * @public @name propertyChanged
	 * @description Callback run when a custom elements properties change
	 * @param {String} property The property name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
    propertyChanged(property, oldValue, newValue) { this.updateTemplate() }

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['disabled', 'label', 'help'] }

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
		if (this.hasAttribute('validate-on-load') || !!this.value) {
			this.validate(this.value);
			this.updateTemplate();
		}
	}

	/**
	 * @private @name validate
	 * @description Validate any text for errors based on required or regex
     * @param {Event} ev Any event that kicks the function
	 */
	validate(value) {
		value = value !== undefined ? value : this.value;
		this.invalid = this.hasAttribute('required') ? (!value ? true : false) : false;

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');

		return !this.invalid;
	}

	/**
	 * @private @name _change
	 * @description Detect an event, update a property and dispatch an event
     * @param {Event} ev Any event that kicks the function
	 */
	_change(ev) {
        if (this.hasAttribute('disabled')) return;

		this.value = !this.value;

		this.validate(this.value);
		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('validated'));

		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-control-switch', CWCControlSwitch);
