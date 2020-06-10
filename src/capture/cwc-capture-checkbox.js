import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-help.js';

/**
 * @public @name CWCCaptureCheckbox
 * @extends CustomHTMLElement
 * @description Custom Web Component, checkbox for forms
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event change The value is updated
 * 
 * @method validate(Boolean value) The value checked or not
 * 
 * @property {string} value The initial value (overrides attribute value)
 * 
 * @attribute {String} label The checkbox label
 * @attribute {String} checked-message The message to show when checked
 * @attribute {String} unchecked-message The message to show when not checked
 * @attribute {String} invalid-message The message to show when capture is invalid
 * @attribute {String} help The help text to display with a little hover icon
 * @attribute {String} value The initial value, if set
 * @attribute {String} context The contaxt as primary, secondary, success, warning, danger
 * @attribute {Flag} disabled To disable the capture
 * @attribute {Flag} invalid The capture is invalid (uses danger context styling if invalid styling not set)
 * @attribute {Flag} required The capture is required
 * @attribute {Flag} validate-on-load Validate the capture when it loads in the dom
 *
 * @style_variable --cwc-capture-checkbox--border
 * @style_variable --cwc-capture-checkbox--border-radius
 * @style_variable --cwc-capture-checkbox--color
 * @style_variable --cwc-capture-checkbox--float
 * @style_variable --cwc-capture-checkbox--fill
 * @style_variable --cwc-capture-checkbox--font-size
 * @style_variable --cwc-capture-checkbox--font-weight
 * @style_variable --cwc-capture-checkbox--font-style
 * @style_variable --cwc-capture-checkbox--font-family
 * @style_variable --cwc-capture-checkbox--padding
 * @style_variable --cwc-capture-checkbox--text-align
 *
 * @style_variable --cwc-capture-checkbox--color--hover
 * @style_variable --cwc-capture-checkbox--fill--hover
 *
 * @style_variable --cwc-capture-checkbox--label--text-align
 * @style_variable --cwc-capture-checkbox--label--color
 * @style_variable --cwc-capture-checkbox--label--font-size
 * @style_variable --cwc-capture-checkbox--label--font-weight
 * @style_variable --cwc-capture-checkbox--label--font-style
 * @style_variable --cwc-capture-checkbox--label--font-family
 * 
 * @style_variable --cwc-capture-checkbox--icon--padding
 *
 * @style_variable --cwc-capture-checkbox--invalid--fill
 * @style_variable --cwc-capture-checkbox--invalid--border
 * @style_variable --cwc-capture-checkbox--invalid--color
 * @style_variable --cwc-capture-checkbox--invalid--fill--hover
 * @style_variable --cwc-capture-checkbox--invalid--color--hover
 *
 * @style_variable --cwc-capture-checkbox--disabled--opacity
 * 
 * @example
 * <cwc-capture-checkbox 
 * 		label="A Checkbox" 
 * 		checked-message="Checked" 
 * 		unchecked-message="Not Checked" 
 * 		invalid-message="Please check me" 
 * 		help="Blah blah blah" 
 * 		value
 * 		disabled 
 * 		invalid 
 * 		required 
 * 		validate-on-load
 * ></cwc-capture-checkbox>
 */
class CWCCaptureCheckbox extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? true : false;
		this.invalid = this.hasAttribute('invalid') ? true : false;
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
					height: inherit;
					fill: var(--cwc-capture-checkbox--fill, black);
					box-sizing: border-box;
				}

				[hidden] { display: none !important; }

				.cwc-checkbox-container { 
					position: relative;
					width: inherit;
					height: inherit;
					display: block;
					padding: var(--cwc-capture-checkbox--padding, 0);
					box-sizing: border-box;
					text-align: var(--cwc-capture-checkbox--text-align, left);
				}

				.cwc-checkbox-container[boxed] { 
					border-radius: var(--cwc-capture-checkbox--border-radius, 0);
					border: var(--cwc-capture-checkbox--border, 1px solid black);
				}

				.cwc-checkbox-container [invisible] { opacity: 0; }
				.cwc-checkbox-container [no-label] { display: none; }

				.cwc-checkbox-container label {
					display: block;
					height: 18px;
					text-align: var(--cwc-capture-checkbox--label--text-align, left);
					color: var(--cwc-capture-checkbox--label--color, black);
					font-size: var(--cwc-capture-checkbox--label--font-size, 14px);
					font-weight: var(--cwc-capture-checkbox--label--font-weight, normal);
					font-style: var(--cwc-capture-checkbox--label--font-style, normal);
					font-family: var(--cwc-capture-checkbox--label--font-family, inherit);
				}

				.cwc-checkbox-container .cwc-checkbox-holder {
					display: inline-block;
					cursor: default;
					-webkit-touch-callout: none;
					-webkit-user-select: none;
					-khtml-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				.cwc-checkbox-container .cwc-checkbox-holder:hover {
					color: var(--cwc-capture-checkbox--color--hover, black);
					fill: var(--cwc-capture-checkbox--fill--hover, black);
				}

				.cwc-checkbox-container .cwc-checkbox-holder .cwc-checkbox { 
					float: var(--cwc-capture-checkbox--float, left);
					display: block;
					fill: inherit;
					padding: var(--cwc-capture-checkbox--icon--padding, 2px);
				}

				.cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message {
					color: inherit;
					line-height: 30px;
					padding: 5px;
					color: var(--cwc-capture-checkbox--color, black);
					font-size: var(--cwc-capture-checkbox--font-size, 14px);
					font-weight: var(--cwc-capture-checkbox--font-weight, normal);
					font-style: var(--cwc-capture-checkbox--font-style, normal);
					font-family: var(--cwc-capture-checkbox--font-family, inherit);
				}

				.cwc-checkbox-container[boxed] .cwc-sub-content { 
					display: block;
					height: fit-content;
					box-sizing: border-box;
					padding: 5px;
					color: var(--cwc-capture-checkbox--color, black);
					font-size: var(--cwc-capture-checkbox--font-size, 14px);
					font-family: var(--cwc-capture-checkbox--font-family, inherit);
					font-style: var(--cwc-capture-checkbox--font-style, italic);
				}
				
				.cwc-checkbox-container .cwc-error {
					display: block;
					font-size: 11px;
					line-height: 12px;
					overflow: hidden;
					position: absolute;
					bottom: 1px;
					left: 15px;
					opacity: 0;
				}

				.cwc-checkbox-container[invalid] .cwc-error { opacity: 1; }

				.cwc-checkbox-container .cwc-help {
					position: absolute;
					top: 2px;
					right: 2px;
				}

				:host .cwc-checkbox-container[invalid] { fill: var(--cwc-capture-checkbox--invalid--fill, red); }
				:host .cwc-checkbox-container[invalid][boxed] { border: var(--cwc-capture-checkbox--invalid--border, 1px solid red); }
				:host .cwc-checkbox-container[invalid] .cwc-sub-content { color: var(--cwc-capture-checkbox--invalid--color, red); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-capture-checkbox--invalid--color, red); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder:hover { fill: var(--cwc-capture-checkbox--invalid--fill--hover, darkred); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-capture-checkbox--invalid--color--hover, darkred); }
				:host .cwc-checkbox-container[invalid] .cwc-error { color: var(--cwc-capture-checkbox--invalid--color, red); }

				:host([disabled]) { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-capture-checkbox--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-checkbox-container" ?invalid="${this.hasAttribute('invalid')}" ?boxed="${this.hasAttribute('detail')}">
				<div class="cwc-sub-content" ?hidden="${!this.hasAttribute('detail')}">${this.getAttribute('detail')}</div>
				<label ?hidden="${!this.hasAttribute('label') || (!this.hasAttribute('checked-message') && !this.hasAttribute('unchecked-message'))}">
					${this.getAttribute('label')}${this.hasAttribute('required') && this.hasAttribute('required-marker') ? ' ' + this.getAttribute('required-marker') : ''}
				</label>
				<div class="cwc-help" ?hidden="${!this.hasAttribute('help')}">
					<cwc-overlay-help>${this.getAttribute('help')}</cwc-overlay-help>
				</div>
				<div class="cwc-checkbox-holder" @click="${this._change.bind(this)}">
					<cwc-icon-material-general class="cwc-checkbox" type="icons" name="${this.value ? 'checkBox' : 'checkBoxOutlineBlank'}"></cwc-icon-material-general>
					<span class="cwc-check-message">${!this.hasAttribute('checked-message') && !this.hasAttribute('unchecked-message') ? this.getAttribute('label') : (this.value ? this.getAttribute('checked-message') : this.getAttribute('unchecked-message'))}</span>
				</div>
				<span class="cwc-error">${this.hasAttribute('invalid-message') ? this.getAttribute('invalid-message') : (this.hasAttribute('required') ? 'Required' : 'Invalid')}</span>
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
	static get observedAttributes() { return ['label', 'checked-message', 'unchecked-message', 'invalid-message', 'invalid', 'required', 'help', 'disabled', 'detail'] }

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
	 * @description Detect a change, update a property and dispatch an event
     * @param {Event} ev Any event that kicks the function
	 */
	_change(ev) {
        if (this.hasAttribute('disabled')) return;

		this.value = !this.value;

		this.validate(this.value);
		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('validated'));

		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent('change', { detail: ev }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-checkbox', CWCCaptureCheckbox);
