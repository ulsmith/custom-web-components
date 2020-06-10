import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCCaptureBox
 * @extends CustomHTMLElement
 * @description Custom Web Component, box select
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event change The value is updated
 *
 * @method render() Re-render the options
 * @method validate(Array value) The value saved, an array of selections
 *
 * @attribute {String} label The capture label
 * @attribute {String} value The initial value, if set
 * @attribute {Flag} disabled To disable the capture
 * @attribute {Flag} invalid The capture is invalid
 * @attribute {Flag} required The capture is required
 * @attribute {Flag} validate-on-load Validate the capture when it loads in the dom
 *
 * @style_variable --cwc-capture-box--border
 * @style_variable --cwc-capture-box--border-radius
 *
 * @style_variable --cwc-capture-box--label--color
 * @style_variable --cwc-capture-box--label--font-weight
 * @style_variable --cwc-capture-box--label--text-align
 *
 * @style_variable --cwc-capture-box--option--background
 * @style_variable --cwc-capture-box--option--color
 * @style_variable --cwc-capture-box--option--font-size
 * @style_variable --cwc-capture-box--option--font-family
 * @style_variable --cwc-capture-box--option--cursor
 * @style_variable --cwc-capture-box--option--border-radius
 *
 * @style_variable --cwc-capture-box--option--background--selected
 * @style_variable --cwc-capture-box--option--color--selected
 *
 * @style_variable --cwc-capture-box--disabled--opacity
 *
 * @example
 * <cwc-capture-box label="Hello" value="1" disabled invalid @change="${this.test.bind(this)}">
 * 		<option value="1">One</option>
 * 		<option value="2">Two</option>
 * </cwc-capture-box>
 */
class CWCCaptureBox extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = this.hasAttribute('value') ? this.getAttribute('value') : this.value;
		this.invalid = this.hasAttribute('invalid') ? true : false;
		this.options = [];
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
					min-height: 62px;
					box-sizing: border-box;
				}

				[hidden] { display: none !important; }

				.container {
					width: 100%;
					height: inherit;
					display: inline-block;
					padding: 6px 0 6px 0;
					box-sizing: border-box;
					position: relative;
				}

				.container [invisible] { opacity: 0; }

				.container label {
					display: block;
					min-height: 20px;
					color: var(--cwc-capture-box--label--color, black);
					font-weight: var(--cwc-capture-box--label--font-weight, normal);
					text-align: var(--cwc-capture-box--label--text-align, left);
					font-size: 14px;
					overflow: hidden;
				}

				.container .cwc-box-buttons {
					display: flex;
					flex-flow: row;
					width: 100%;
					border: var(--cwc-capture-box--border, 1px solid black);
					border-radius: var(--cwc-capture-box--border-radius, 0);
					padding: 1px;
					box-sizing: border-box;
				}

 				.container .cwc-box-buttons .cwc-option {
 					flex: 1 1;
 					display: block;
 					background: var(--cwc-capture-box--option--background, white);
 					color: var(--cwc-capture-box--option--color, black);
 					font-size: var(--cwc-capture-box--option--font-size, 13px);
 					font-family: var(--cwc-capture-box--option--font-family, inherit);
					cursor: var(--cwc-capture-box--option--cursor, default);
 					height: 28px;
 					text-align: center;
 					line-height: 30px;
 					padding: 0 5px;
 					white-space: nowrap;
					border-radius: var(--cwc-capture-box--option--border-radius, 0);
					outline: none;
				}

				:host([disabled]) .container .cwc-box-buttons .cwc-option {	pointer-events: none; cursor: not-allowed; }
				:host([disabled]) {	opacity: var(--cwc-capture-box--disabled--opacity, 0.6); }

 				.container .cwc-box-buttons .cwc-option[selected] {
 					background: var(--cwc-capture-box--option--background--selected, black);
 					color: var(--cwc-capture-box--option--color--selected, white);
					cursor: default;
 				}

			</style>

			<div class="container" ?invalid="${this.invalid}">
				<label ?hidden="${!this.hasAttribute('label')}">
					${this.getAttribute('label')}${this.hasAttribute('required') && this.hasAttribute('required-marker') ? ' ' + this.getAttribute('required-marker') : ''}
				</label>
				<div id="box-buttons" class="cwc-box-buttons" @change="${this._change.bind(this)}">
					${this.options.length > 0 ? this.options.map((option) => html`
						<span class="cwc-option" tabindex="0" value="${option.value}" ?selected="${option.selected}" @click="${this._change.bind(this)}">${option.label}</span>
					`) : ''}
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
	static get observedAttributes() { return ['name', 'label', 'invalid-message', 'required', 'disabled', 'invalid', 'required-marker'] }

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
	 * @description Callback run once the template has complete re-render
	 */
	templateUpdated() {
		this.render();
	}

	/**
	 * @public @name templateUpdated
	 * @description Callback run once the custom element has complete a re-render
	 */
	render() {
		setTimeout(() => {
			this.options = [];

			let options = this.querySelectorAll('option');
			for (let i = 0; i < options.length; i++) {
				let value = options[i].hasAttribute('value') ? options[i].getAttribute('value') : options[i].innerText;
				this.options.push({ label: options[i].innerText, value: value, selected: value === this.value });
			}

			this.updateTemplate();
		}, 1);
	}

	/**
	 * @private @name validate
	 * @description Validate value for errors based on required or regex
     * @param {Event} ev Any event that kicks the function
	 */
	validate(value) {
		value = value !== undefined ? value : this.value;
		this.invalid = false;
		this.invalid = this.hasAttribute('required') ? (!value || value.length < 1 ? true : false) : (!value || value.length < 1 ? false : this.invalid);

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');
	}

	/**
	 * @private @name _change
	 * @description Detect a change
     * @param {Event} ev Any event that kicks the function
	 */
	_change(ev) {
		if (this.hasAttribute('disabled')) return;

		this.value = ev.target.hasAttribute('value') ? ev.target.getAttribute('value') : ev.target.innerText;
		this._select(this.value);
		this.validate(this.value);
		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('change', { detail: ev }));

		ev.stopPropagation();
	}

	/**
	 * @private @name _select
	 * @description Select a value
     * @param {Event} ev Any event that kicks the function
	 */
	_select(value) {
		for (let i = 0; i < this.options.length; i++) this.options[i].selected = this.options[i].value === this.value;
		this.updateTemplate();
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-box', CWCCaptureBox);
