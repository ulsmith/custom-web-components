import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../overlay/cwc-overlay-help.js';

/**
 * @public @name CWCControlSelect
 * @extends CustomHTMLElement
 * @description Custom Web Component, select box for forms
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event change The value is updated
 * 
 * @method render() Re-render the options
 * @method validate(Mixed value) The value selected
 *
 * @property {Mixed} value The initial value (overrides attribute value)
 * 
 * @attribute {String} label The control label
 * @attribute {String} name The control name
 * @attribute {String} justify [left, center, right] Justify options
 * @attribute {String} invalid-message The message to show when control is invalid
 * @attribute {String} help The help text to display with a little hover icon
 * @attribute {String} value The initial value, if set
 * @attribute {String} context The contaxt as primary, success, warning, danger
 * @attribute {Flag} disabled To disable the control
 * @attribute {Flag} invalid The control is invalid (uses danger context styling if invalid styling not set)
 * @attribute {Flag} required The control is required
 * @attribute {Flag} validate-on-load Validate the control when it loads in the dom
 * 
 * @style_variable --cwc-control-select--background
 * @style_variable --cwc-control-select--border
 * @style_variable --cwc-control-select--border-radius
 * @style_variable --cwc-control-select--color
 * @style_variable --cwc-control-select--height
 * @style_variable --cwc-control-select--font-size
 * @style_variable --cwc-control-select--font-weight
 * @style_variable --cwc-control-select--font-style
 * @style_variable --cwc-control-select--font-family
 * @style_variable --cwc-control-select--margin
 * @style_variable --cwc-control-select--padding
 * @style_variable --cwc-control-select--text-align
 *
 * @style_variable --cwc-control-select--label--text-align
 * @style_variable --cwc-control-select--label--color
 * @style_variable --cwc-control-select--label--font-weight
 *
 * @style_variable --cwc-control-select--invalid--border - Drops back to danger if not set
 * @style_variable --cwc-control-select--invalid--color - Drops back to danger if not set
 *
 * @style_variable --cwc-control-select--[context]--border
 * @style_variable --cwc-control-select--[context]--color
 *
 * @style_variable --cwc-control-select--disabled--opacity
 * 
 * @example
 * <cwc-control-select
 * 		label="A input"
 * 		name="something"
 * 		invalid-message="Please check me"
 * 		help="Blah blah blah"
 * 		disabled
 * 		invalid
 * 		required
 * 		validate-on-load
 * >
 * 		<option value="one">One</option>
 * 		<option value="two">Two</option>
 * </cwc-control-select>
 */
class CWCControlSelect extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? this.getAttribute('value') : this.value;
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
					width: 100%;
					height: 62px;
					box-sizing: border-box;
					padding: var(--cwc-control-select--margin, 0px);
				}

				.cwc-control-select {
					width: inherit;
					height: inherit;
					padding: var(--cwc-control-select--padding, 0px);
					box-sizing: border-box;
				}

				.cwc-control-select .cwc-select-container {
					width: 100%;
					min-height: 30px;
					display: inline-block;
					padding: 20px 0 12px 0;
					box-sizing: border-box;
					position: relative;
					text-align: var(--cwc-control-select--text-align, left);
				}

				.cwc-control-select [invisible] { opacity: 0; }

				.cwc-control-select label {
					display: block;
					height: 20px;
					width: fit-content;
				    white-space: nowrap;
					font-size: 14px;
					overflow: hidden;
					position: absolute;
					top: 0;
					left: 0;
					text-align: var(--cwc-control-select--label--text-align, left);
					color: var(--cwc-control-select--label--color, black);
					font-weight: var(--cwc-control-select--label--font-weight, normal);
				}

				.cwc-control-select select {
					box-sizing: border-box;
					width: 100%;
					min-height: 30px;
					background-color: transparent;
					display: block;
					color: var(--cwc-control-select--color, black);
					border: var(--cwc-control-select--border, 1px solid black);
					border-radius: var(--cwc-control-select--border-radius, 0);
					background: var(--cwc-control-select--background, white);
					height: var(--cwc-control-select--height, 30px);
					font-size: var(--cwc-control-select--font-size, 13px);
					font-weight: var(--cwc-control-select--font-weight, normal);
					font-style: var(--cwc-control-select--font-style, normal);
					font-family: var(--cwc-control-select--font-family, inherit);
				}

				.cwc-control-select .cwc-error {
					display: block;
					width: 100%;
					opacity: 0;
					font-size: 11px;
					line-height: 12px;
					overflow: hidden;
					position: absolute;
					bottom: 0;
					left: 0;
				}

				.cwc-control-select[invalid] .cwc-error { opacity: 1; }

				.cwc-control-select .cwc-help {
					position: absolute;
					top: 6px;
					right: 0px;
				}

				:host([context="primary"]) .cwc-control-select select { border: var(--cwc-control-select--primary--border, 1px solid blue) !important; color: var(--cwc-control-select--primary--color, blue) !important; }
				:host([context="success"]) .cwc-control-select select { border: var(--cwc-control-select--success--border, 1px solid green) !important; color: var(--cwc-control-select--success--color, green) !important; }
				:host([context="warning"]) .cwc-control-select select { border: var(--cwc-control-select--warning--border, 1px solid orange) !important; color: var(--cwc-control-select--warning--color, orange) !important; }
				:host([context="danger"]) .cwc-control-select select { border: var(--cwc-control-select--danger--border, 1px solid red) !important; color: var(--cwc-control-select--danger--color, red) !important; }
	
				:host .cwc-control-select[invalid] select { border: var(--cwc-control-select--invalid--border, var(--cwc-control-select--danger--border, 1px solid red)) !important; color: var(--cwc-control-select--invalid--color, var(--cwc-control-select--danger--color, red)) !important; }
				:host .cwc-control-select[invalid] .cwc-error { color: var(--cwc-control-select--invalid--color, var(--cwc-control-select--danger--color, red)) }

				:host([justify="center"]) .cwc-select-container { text-align: center; }
				:host([justify="right"]) .cwc-select-container { text-align: right; }

				:host([disabled]) { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-control-select--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-control-select" ?invalid="${this.hasAttribute('invalid')}">
				<div class="cwc-select-container">
					<label ?invisible="${!this.hasAttribute('label')}">${this.getAttribute('label')}</label>
					<div class="cwc-help" ?hidden="${!this.hasAttribute('help')}">
						<cwc-overlay-help>${this.getAttribute('help')}</cwc-overlay-help>
					</div>
					<select @change="${this._change.bind(this)}" name="${!this.getAttribute('name')}" .value="${this.value}" ?disabled="${this.hasAttribute('disabled')}"></select>
					<span class="cwc-error">${this.hasAttribute('invalid-message') ? this.getAttribute('invalid-message') : (this.hasAttribute('required') ? 'Required' : 'Invalid')}</span>
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
	static get observedAttributes() { return ['name', 'label', 'invalid-message', 'required', 'disabled', 'invalid'] }

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
		if (this.hasAttribute('validate-on-load') || (!!this.value)) {
			this.validate(this.value);
			this.updateTemplate();
		}
	}

	/**
	 * @public @name templateUpdated
	 * @description Callback run once the custom element has complete a re-render
	 */
	templateUpdated() {
		this.render();
	}

	/**
	 * @public @name render
	 * @description Re-redner the options
	 */
	render() {
		setTimeout(() => {
			let options = this.innerHTML;
			let select = this.shadowRoot.querySelector('select');
			select.innerHTML = options;
			select.value = this.value;
		}, 10);
	}

	/**
	 * @private @name validate
	 * @description Validate any text for errors based on required or regex
     * @param {Event} ev Any event that kicks the function
	 */
	validate(value) {
		this.invalid = false;
		this.invalid = this.hasAttribute('required') ? (!value || value.length < 1 ? true : false) : (!value || value.length < 1 ? false : this.invalid);

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

		if (ev.type == 'change') {
			this.value = ev.target.value;
			clearTimeout(this.valTimeout);
			this.valTimeout = setTimeout(() => {
				this.validate(this.value);
				this.updateTemplate();
			}, 300);
		}

		this.value = ev.target.value;
		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('change', { detail: ev }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-control-select', CWCControlSelect);
