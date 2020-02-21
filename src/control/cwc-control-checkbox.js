import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-help.js';

/**
 * @public @name CWCControlCheckbox
 * @extends CustomHTMLElement
 * @description Application Web Component, common component, checkbox
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * <cwc-control-checkbox 
 * 		label="A Checkbox" 
 * 		checked-message="Checked" 
 * 		unchecked-message="Not Checked" 
 * 		invalid-message="Please check me" 
 * 		help="Blah blah blah" 
 * 		disabled 
 * 		invalid 
 * 		required 
 * 		validate-on-load
 * ></cwc-control-checkbox>
 */
class CWCControlCheckbox extends CustomHTMLElement {

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
					fill: var(--cwc-control-checkbox--fill, black);
					box-sizing: border-box;
				}

				[hidden] { display: none !important; }

				.cwc-checkbox-container { 
					position: relative;
					width: inherit;
					height: inherit;
					display: block;
					padding: 10px;
					box-sizing: border-box;
					text-align: var(--cwc-control-checkbox--text-align, left);
				}

				.cwc-checkbox-container[boxed] { 
					border-radius: var(--cwc-control-checkbox--border-radius, 0);
					border: var(--cwc-control-checkbox--border, 1px solid black);
				}

				.cwc-checkbox-container [invisible] { opacity: 0; }
				.cwc-checkbox-container [no-label] { display: none; }

				.cwc-checkbox-container label {
					display: block;
					height: 18px;
					padding-left: 3px;
					text-align: var(--cwc-control-checkbox--label--text-align, left);
					color: var(--cwc-control-checkbox--label--color, black);
					font-size: var(--cwc-control-checkbox--label--font-size, 14px);
					font-weight: var(--cwc-control-checkbox--label--font-weight, normal);
					font-style: var(--cwc-control-checkbox--label--font-style, normal);
					font-family: var(--cwc-control-checkbox--label--font-family, inherit);
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
					color: var(--cwc-control-checkbox--color--hover, black);
					fill: var(--cwc-control-checkbox--fill--hover, black);
				}

				.cwc-checkbox-container .cwc-checkbox-holder .cwc-checkbox { 
					float: var(--cwc-control-checkbox--float, left);
					display: inline-block;
					fill: inherit;
					padding: 4px;
				}

				.cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message {
					color: inherit;
					line-height: 30px;
					padding: 5px;
					color: var(--cwc-control-checkbox--color, black);
					font-size: var(--cwc-control-checkbox--font-size, 14px);
					font-weight: var(--cwc-control-checkbox--font-weight, normal);
					font-style: var(--cwc-control-checkbox--font-style, normal);
					font-family: var(--cwc-control-checkbox--font-family, inherit);
				}

				.cwc-checkbox-container[boxed] .cwc-sub-content { 
					display: block;
					height: fit-content;
					box-sizing: border-box;
					padding: 5px;
					color: var(--cwc-control-checkbox--color, black);
					font-size: var(--cwc-control-checkbox--font-size, 14px);
					font-family: var(--cwc-control-checkbox--font-family, inherit);
					font-style: var(--cwc-control-checkbox--font-style, italic);
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

				:host([context="primary"]) .cwc-checkbox-container { fill: var(--cwc-control-checkbox--primary--fill, blue); }
				:host([context="primary"]) .cwc-checkbox-container[boxed] { border: var(--cwc-control-checkbox--primary--border, 1px solid blue); }
				:host([context="primary"]) .cwc-checkbox-container .cwc-sub-content { color: var(--cwc-control-checkbox--primary--color, blue); }
				:host([context="primary"]) .cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--primary--color, blue); }
				:host([context="primary"]) .cwc-checkbox-container .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--primary--fill--hover, darkblue); }
				:host([context="primary"]) .cwc-checkbox-container .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--primary--color--hover, darkblue); }

				:host([context="secondary"]) .cwc-checkbox-container { fill: var(--cwc-control-checkbox--secondary--fill, grey); }
				:host([context="secondary"]) .cwc-checkbox-container[boxed] { border: var(--cwc-control-checkbox--secondary--border, 1px solid grey); }
				:host([context="secondary"]) .cwc-checkbox-container .cwc-sub-content { color: var(--cwc-control-checkbox--secondary--color, grey); }
				:host([context="secondary"]) .cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--secondary--color, grey); }
				:host([context="secondary"]) .cwc-checkbox-container .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--secondary--fill--hover, darkgrey); }
				:host([context="secondary"]) .cwc-checkbox-container .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--secondary--color--hover, darkgrey); }

				:host([context="success"]) .cwc-checkbox-container { fill: var(--cwc-control-checkbox--success--fill, green); }
				:host([context="success"]) .cwc-checkbox-container[boxed] { border: var(--cwc-control-checkbox--success--border, 1px solid green); }
				:host([context="success"]) .cwc-checkbox-container .cwc-sub-content { color: var(--cwc-control-checkbox--success--color, green); }
				:host([context="success"]) .cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--success--color, green); }
				:host([context="success"]) .cwc-checkbox-container .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--success--fill--hover, darkgreen); }
				:host([context="success"]) .cwc-checkbox-container .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--success--color--hover, darkgreen); }

				:host([context="warning"]) .cwc-checkbox-container { fill: var(--cwc-control-checkbox--warning--fill, orange); }
				:host([context="warning"]) .cwc-checkbox-container[boxed] { border: var(--cwc-control-checkbox--warning--border, 1px solid orange); }
				:host([context="warning"]) .cwc-checkbox-container .cwc-sub-content { color: var(--cwc-control-checkbox--warning--color, orange); }
				:host([context="warning"]) .cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--warning--color, orange); }
				:host([context="warning"]) .cwc-checkbox-container .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--warning--fill--hover, darkorange); }
				:host([context="warning"]) .cwc-checkbox-container .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--warning--color--hover, darkorange); }

				:host([context="danger"]) .cwc-checkbox-container { fill: var(--cwc-control-checkbox--danger--fill, red); }
				:host([context="danger"]) .cwc-checkbox-container[boxed] { border: var(--cwc-control-checkbox--danger--border, 1px solid red); }
				:host([context="danger"]) .cwc-checkbox-container .cwc-sub-content { color: var(--cwc-control-checkbox--danger--color, red); }
				:host([context="danger"]) .cwc-checkbox-container .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--danger--color, red); }
				:host([context="danger"]) .cwc-checkbox-container .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--danger--fill--hover, darkred); }
				:host([context="danger"]) .cwc-checkbox-container .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--danger--color--hover, darkred); }

				:host .cwc-checkbox-container[invalid] { fill: var(--cwc-control-checkbox--invalid--fill, var(--cwc-control-checkbox--danger--fill, red)); }
				:host .cwc-checkbox-container[invalid][boxed] { border: var(--cwc-control-checkbox--invalid--border, var(--cwc-control-checkbox--danger--border, 1px solid red)); }
				:host .cwc-checkbox-container[invalid] .cwc-sub-content { color: var(--cwc-control-checkbox--invalid--color, var(--cwc-control-checkbox--danger--color, red)); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder .cwc-check-message { color: var(--cwc-control-checkbox--invalid--color, var(--cwc-control-checkbox--danger--color, red)); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder:hover { fill: var(--cwc-control-checkbox--invalid--fill--hover, var(--cwc-control-checkbox--danger--fill--hover, darkred)); }
				:host .cwc-checkbox-container[invalid] .cwc-checkbox-holder:hover .cwc-check-message { color: var(--cwc-control-checkbox--invalid--color--hover, var(--cwc-control-checkbox--danger--color--hover, darkred)); }
				:host .cwc-checkbox-container[invalid] .cwc-error { color: var(--cwc-control-checkbox--invalid--color, var(--cwc-control-checkbox--danger--color, red)); }

				:host([disabled]) { pointer-events: none; cursor: not-allowed; opacity: var(--cwc-control-checkbox--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-checkbox-container" ?invalid="${this.hasAttribute('invalid')}" ?boxed="${this.hasAttribute('detail')}">
				<div class="cwc-sub-content" ?hidden="${!this.hasAttribute('detail')}">${this.getAttribute('detail')}</div>
				<label ?hidden="${!this.hasAttribute('label') || (!this.hasAttribute('checked-message') && !this.hasAttribute('unchecked-message'))}">${this.getAttribute('label')}</label>
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
customElements.define('cwc-control-checkbox', CWCControlCheckbox);
