import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';
import '../overlay/cwc-overlay-help.js';

/**
 * @public @name CWCCaptureInput
 * @extends CustomHTMLElement
 * @description Custom Web Component, input box for forms
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event [any input event] The standard input event happens, change, input, keydown etc.
 * @event validated The value is validated
 *
 * @method focus() Set focus on the input box
 * @method validate(String value) The value in the input box
 *
 * @property {string} value The initial value (overrides attribute value)
 *
 * @attribute {String} label The capture label
 * @attribute {String} name The capture name
 * @attribute {String} type The capture type
 * @attribute {String} placeholder The capture type
 * @attribute {String} invalid-message The message to show when capture is invalid
 * @attribute {String} help The help text to display with a little hover icon
 * @attribute {String} regex The regex value to validate against
 * @attribute {String} value The initial value, if set
 * @attribute {String} justify The justification of content as left, right, center
 * @attribute {Flag} disabled To disable the capture
 * @attribute {Flag} invalid The capture is invalid
 * @attribute {Flag} required The capture is required
 * @attribute {Flag} validate-on-load Validate the capture when it loads in the dom
 *
 * @style_variable --cwc-capture-input--text-align
 * @style_variable --cwc-capture-input--padding
 * @style_variable --cwc-capture-input--border-radius
 * @style_variable --cwc-capture-input--border
 * @style_variable --cwc-capture-input--color
 * @style_variable --cwc-capture-input--background
 * @style_variable --cwc-capture-input--font-size
 * @style_variable --cwc-capture-input--font-weight
 * @style_variable --cwc-capture-input--font-style
 * @style_variable --cwc-capture-input--font-family
 *
 * @style_variable --cwc-capture-input--label--text-align
 * @style_variable --cwc-capture-input--label--color
 * @style_variable --cwc-capture-input--label--font-weight
 *
 * @style_variable --cwc-capture-input--invalid--border
 * @style_variable --cwc-capture-input--invalid--color
 *
 * @style_variable --cwc-capture-input--disabled--opacity
 *
 * @example
 * <cwc-capture-input
 * 		label="A input"
 * 		name="something"
 * 		type="text"
 * 		invalid-message="Please check me"
 * 		help="Blah blah blah"
 * 		regex="^[a-z]$"
 * 		disabled
 * 		invalid
 * 		required
 * 		validate-on-load
 * ></cwc-capture-input>
 */
class CWCCaptureInput extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? value : undefined;
		this.invalid = this.hasAttribute('invalid') ? true : false;
		this.valTimeout;
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
					min-height: 62px;
					box-sizing: border-box;
				}

				[hidden] { display: none !important; }

				.cwc-input-container {
					width: inherit;
					height: inherit;
					display: inline-block;
					padding: 20px 0 12px 0;
					box-sizing: border-box;
					position: relative;
					text-align: var(--cwc-capture-input--text-align, left);
				}

				.cwc-input-container label {
					display: block;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 20px;
					font-size: 14px;
					overflow: hidden;
					text-align: var(--cwc-capture-input--label--text-align, left);
					color: var(--cwc-capture-input--label--color, black);
					font-weight: var(--cwc-capture-input--label--font-weight, normal);
				}

				.cwc-input-container input {
					box-sizing: border-box;
					width: 100%;
					background-color: transparent;
					display: block;
					padding: var(--cwc-capture-input--padding, 4px);
					border-radius: var(--cwc-capture-input--border-radius, 0);
					border: var(--cwc-capture-input--border, 1px solid black);
					color: var(--cwc-capture-input--color, black);
					background: var(--cwc-capture-input--background, white);
					height: var(--cwc-capture-input--height, 30px);
					font-size: var(--cwc-capture-input--font-size, 13px);
					font-weight: var(--cwc-capture-input--font-weight, normal);
					font-style: var(--cwc-capture-input--font-style, normal);
					font-family: var(--cwc-capture-input--font-family, inherit);
					min-height: var(--cwc-capture-input--min-height, 30px);
				}

				.cwc-input-container input::-ms-clear { display: none; }

				.cwc-input-container textarea {
					box-sizing: border-box;
					width: 100%;
					background-color: transparent;
					display: block;
					height: 100%;
					min-height: var(--cwc-capture-input--min-height, 100px);
					padding: var(--cwc-capture-input--padding, 4px);
					border-radius: var(--cwc-capture-input--border-radius, 0);
					border: var(--cwc-capture-input--border, 1px solid black);
					color: var(--cwc-capture-input--color, black);
					background: var(--cwc-capture-input--background, white);
					font-size: var(--cwc-capture-input--font-size, 13px);
					font-weight: var(--cwc-capture-input--font-weight, normal);
					font-style: var(--cwc-capture-input--font-style, normal);
					font-family: var(--cwc-capture-input--font-family, inherit);
				}

				.cwc-input-container .cwc-error {
					display: block;
					width: 100%;
					font-size: 11px;
					line-height: 12px;
					overflow: hidden;
					position: absolute;
					bottom: 0;
					left: 0;
					opacity: 0;
				}

				.cwc-input-container[invalid] .cwc-error { opacity: 1; }

				.cwc-input-container .cwc-help {
					position: absolute;
					top: 0px;
					right: 0px;
				}

				.cwc-input-container .cwc-help .help-tip { vertical-align: top; }

				:host .cwc-input-container[invalid] input { border: var(--cwc-capture-input--invalid--border, 1px solid red); color: var(--cwc-capture-input--invalid--color, var(--cwc-capture-input--danger--color, red)); }
				:host .cwc-input-container[invalid] textarea { border: var(--cwc-capture-input--invalid--border, 1px solid red); color: var(--cwc-capture-input--invalid--color, var(--cwc-capture-input--danger--color, red)); }
				:host .cwc-input-container .cwc-error { color: var(--cwc-capture-input--invalid--color, red); }

				:host([justify="center"]) .cwc-input-container { text-align: center; }
				:host([justify="right"]) .cwc-input-container { text-align: right; }

				:host([disabled]) {	pointer-events: none; cursor: not-allowed; opacity: var(--cwc-capture-input--disabled--opacity, 0.6); }
			</style>

			<div class="cwc-input-container" ?invalid="${this.hasAttribute('invalid')}">
				<label ?hidden="${!this.hasAttribute('label')}">
					${this.getAttribute('label')}${this.hasAttribute('required') && this.hasAttribute('required-marker') ? ' ' + this.getAttribute('required-marker') : ''}
				</label>
				<div class="cwc-help" ?hidden="${!this.hasAttribute('help')}">
					<cwc-overlay-help class="help-tip">${this.getAttribute('help')}</cwc-overlay-help>
				</div>
				${this.getAttribute('type') === 'textarea' ? html`
					<textarea
						id="input"
						name="${ifDefined(this.getAttribute('name') || undefined)}"
						placeholder="${ifDefined(this.getAttribute('placeholder') || undefined)}"
						autocomplete="${ifDefined(this.getAttribute('autocomplete') || undefined)}"
						?disabled="${this.hasAttribute('disabled')}"
						.value="${!this.value ? '' : this.value}"
						@input="${this._event.bind(this)}"
						@keydown="${this._event.bind(this)}"
						@keyup="${this._event.bind(this)}"
					></textarea>
				` : html`
					<input
						id="input"
						name="${ifDefined(this.getAttribute('name') || undefined)}"
						type="${ifDefined(this.getAttribute('type') || undefined)}"
						placeholder="${ifDefined(this.getAttribute('placeholder') || undefined)}"
						autocomplete="${ifDefined(this.getAttribute('autocomplete') || undefined)}"
						?disabled="${this.hasAttribute('disabled')}"
						.value="${!this.value ? '' : this.value}"
						@input="${this._event.bind(this)}"
						@keydown="${this._event.bind(this)}"
						@keyup="${this._event.bind(this)}"
					>
				`}
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
	static get observedAttributes() { return ['label', 'name', 'type', 'invalid-message', 'required', 'regex', 'disabled', 'invalid', 'required-marker'] }

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
	 * @private @name focus
	 * @description Focus on the input
	 */
	focus() {
		this.shadowRoot.querySelector('#input').focus();
	}

	/**
	 * @private @name validate
	 * @description Validate for errors based on required or regex
     * @param {Event} ev Any event that kicks the function
	 */
	validate(value) {
		value = value === undefined ? this.value : value;
		this.invalid = this.hasAttribute('regex') && !((new RegExp(this.getAttribute('regex'))).test(value)) ? true : false;
		this.invalid = this.hasAttribute('required') ? (!value || value.length < 1 ? true : this.invalid) : (!value || value.length < 1 ? false : this.invalid);

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');
		this.updateTemplate();

		return !this.invalid;
	}

	/**
	 * @private @name _event
	 * @description Detect an event, update a property and dispatch an event
     * @param {Event} ev Any event that kicks the function
	 */
	_event(ev) {
		ev.stopPropagation();

        if (this.hasAttribute('disabled')) return;

        if (ev.type == 'input') {
			this.value = ev.target.value;
			this.removeAttribute('invalid');
			clearTimeout(this.valTimeout);
			this.valTimeout = setTimeout(() => {
				this.validate(this.value);
				this.updateTemplate();
				this.dispatchEvent(new CustomEvent('validated', { detail: ev }));
			}, 500);
		}

		this.dispatchEvent(new CustomEvent(ev.type, { detail: ev }));
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-input', CWCCaptureInput);
