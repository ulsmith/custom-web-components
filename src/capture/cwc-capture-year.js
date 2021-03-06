import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-modal.js';
import './cwc-capture-input.js';
import '../control/cwc-control-button.js';

/**
 * @public @name CWCCaptureYear
 * @extends CustomHTMLElement
 * @description Custom Web Component, year input with overlay picker letting you pick a year
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The year picker has been shown
 * @event hide The year picker has been hidden
 * @event change The the value has changed, with event detail as the value
 *
 * @method show() Show the year picker manually
 * @method hide() Hide the year picker manually
 *
 * @property {String} format The year format to use
 * @property {String} label The label to use for the input box
 * @property {String} value The selected year formatted
 *
 * @attribute {String} format The year format to use
 * @attribute {String} label The label to use for the input box
 * @attribute {String} placeholder The placeholder text in the input box
 * @attribute {String} help The help tip text
 * @attribute {Flag} required Is the capture required
 * @attribute {Flag} disabled Is the capture disabled
 * @attribute {Flag} invalid Is the capture invalid
 * @attribute {Flag} validate-on-load Validate the capture on load
 *
 * @style_variable @inherits All cwc-control-button variables inherited
 * @style_variable @inherits All cwc-capture-input variables inherited
 * @style_variable @inherits All cwc-overlay-modal variables inherited
 * 
 * @style_variable --cwc-capture-year--input--padding
 * @style_variable --cwc-capture-year--button-open--background
 * @style_variable --cwc-capture-year--button-open--color
 * @style_variable --cwc-capture-year--button-open--border
 * @style_variable --cwc-capture-year--button-open--outline
 * @style_variable --cwc-capture-year--button-open--background--hover
 * @style_variable --cwc-capture-year--button-open--background--focus
 * @style_variable --cwc-capture-year--button-open--background--active
 * @style_variable --cwc-capture-year--button-open--box-shadow--hover
 * @style_variable --cwc-capture-year--button-open--box-shadow--focus
 * @style_variable --cwc-capture-year--button-open--box-shadow--active
 * @style_variable --cwc-capture-year--icon--margin
 * @style_variable --cwc-capture-year--selectable--border
 * @style_variable --cwc-capture-year--selectable--background
 * @style_variable --cwc-capture-year--selectable--color
 * @style_variable --cwc-capture-year--selectable--border-radius
 * @style_variable --cwc-capture-year--selectable--color
 * 
 * @example
 * <cwc-capture-year format="yyyy"></cwc-capture-year>
 */
class CWCCaptureYear extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.years = [];
		this.today = new Date();

		this.position = 0;
		this.opened = false;
		this.scrolling;
		this.value;
		this.date;
		this.invalid = false;
		this.selected;
		this.scrollable;
		this.format = this.hasAttribute('format') ? this.getAttribute('format') : 'yyyy';
		this.label = this.hasAttribute('label') ? this.getAttribute('label') : 'Year';
		this.limit = this.hasAttribute('limit') ? parseInt(this.getAttribute('limit')) : '400';
		this.required = this.hasAttribute('required') ? true : false;
		this.disabled = this.hasAttribute('disabled') ? true : false;

		this._buildYears();
	}

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
				:host { display: block; width: 100%; }

				[hidden] { display: none !important; }

				.cwc-capture-year .cwc-picker-box {
					position: relative;
					width: 200px;
					height: 230px;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
				}

				.cwc-capture-year .cwc-bar-box {
					position: absolute;
					top: 50%;
					left: 50%;
					margin-left: -100px;
					margin-top: -115px;
					z-index: 0;
					width: 200px;
					height: 230px;
				}

				.cwc-capture-year .cwc-inputs { width: 100%; display: inline-block; position: relative; }

				.cwc-capture-year .cwc-inputs .cwc-input {
					width: 100%;
					display: inline-block;
					padding: 0 40px 0 0;
					box-sizing: border-box;
					--cwc-capture-input--padding: var(--cwc-capture-year--input--padding, 4px 25px 4px 4px);
				}

				.cwc-capture-year .cwc-inputs .cwc-icon-button  { 
					--cwc-control-button--background: var(--cwc-capture-year--button-open--background);
					--cwc-control-button--color: var(--cwc-capture-year--button-open--color);
					--cwc-control-button--border: var(--cwc-capture-year--button-open--border);
					--cwc-control-button--outline: var(--cwc-capture-year--button-open--outline);
					
					--cwc-control-button--background--hover: var(--cwc-capture-year--button-open--background--hover);
					--cwc-control-button--background--focus: var(--cwc-capture-year--button-open--background--focus);
					--cwc-control-button--background--active: var(--cwc-capture-year--button-open--background--active);

					--cwc-control-button--box-shadow--hover: var(--cwc-capture-year--button-open--box-shadow--hover);
					--cwc-control-button--box-shadow--focus: var(--cwc-capture-year--button-open--box-shadow--focus);
					--cwc-control-button--box-shadow--active: var(--cwc-capture-year--button-open--box-shadow--active);
					--cwc-control-button--padding: 2px; 
					position: absolute; 
					top: 20px; 
				}

				.cwc-capture-year .cwc-inputs .cwc-icon-button.cwc-open { right: 0px; }
				.cwc-capture-year .cwc-inputs .cwc-icon-button.cwc-clear { right: 40px; padding: 5px; }
				.cwc-capture-year .cwc-inputs .cwc-icon-button .cwc-icon { height: 24px; width: 24px; vertical-align: top; padding: 2px; margin: var(--cwc-capture-year--icon--margin, 0); }
				.cwc-capture-year .cwc-picker-captures { position: relative; }

				.cwc-capture-year .cwc-year-bar {
					position: absolute;
					top: 50%;
					z-index: 0;
					padding: 0;
					margin-top: -35px;
					height: 70px;
					width: 100%;
    				box-sizing: border-box;
					text-align: center;
					font-size: 10px;
					text-transform: uppercase;
					border: var(--cwc-capture-year--selectable--border, 1px solid #ccc);
					background: var(--cwc-capture-year--selectable--background, #ddd);
					color: var(--cwc-capture-year--selectable--color, #999);
					border-radius: var(--cwc-capture-year--selectable--border-radius, 0px);
				}

				.cwc-capture-year .cwc-picker-year-box-mask {
					margin: 0;
					padding: 0;
					width: 190px;
					height: 160px;
					position: relative;
					top: 35px;
					overflow: hidden;
				}

				.cwc-capture-year .cwc-picker-year-box {
					height: 160px;
					width: 250px;
					box-sizing: border-box;
					overflow-y: scroll;
				}

				.cwc-capture-year .cwc-years {
					padding-top: 50px;
					padding-bottom: 50px;
					height: fit-content;
					float: left;
				}

				.cwc-capture-year .cwc-years .cwc-year {
					display: block;
					float: left;
					height: 40px;
					line-height: 40px;
					font-size: 40px;
					margin: 10px 0px 10px 55px;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					color: var(--cwc-capture-year--selectable--color, #999);
				}

				.cwc-capture-year .cwc-arrow {
				    position: absolute;
					left: 50%;
					height: 30px;
					width: 30px;
					box-shadow: 0 0px 5px 0px #444;
					background: white;
					padding: 2px;
					border-radius: 50px;
					cursor: pointer;
					display: inline-block;
					box-sizing: border-box;
					color: #444;
					margin-left: -15px;
				}

				.cwc-capture-year .cwc-arrow[up] { top: 0px; }
				.cwc-capture-year .cwc-arrow[down] { bottom: 0px; }

				.cwc-capture-year .cwc-bottom-captures {
					display: flex;
					flex-flow: row;
					margin: 5px -5px -5px -5px;
					position: relative;
					z-index: 100;
				}

				.cwc-capture-year .cwc-bottom-captures .cwc-bottom-button { flex: 1 1; margin: 5px; text-align: center; }
			</style>


			<div class="cwc-capture-year">
				<div class="cwc-inputs">
					<cwc-capture-input
						type="text"
						id="input"
						class="cwc-input"
						label="${ifDefined(this.label)}"
						regex="${ifDefined(this._pattern(this.format))}"
						invalid-message="${this.getAttribute('invalid-message') || this.format + ' or now, next year...'}"
						help="${ifDefined(this.getAttribute('help') || undefined)}"
						?disabled="${this.hasAttribute('disabled')}"
						?required="${this.hasAttribute('required')}"
						required-marker="${ifDefined(this.getAttribute('required-marker'))}"
						?validate-on-load="${this.hasAttribute('validate-on-load')}"
						placeholder="${this.getAttribute('placeholder') || ''}"
						@validated="${this._manual.bind(this)}"
						.value="${this.value}"
					></cwc-capture-input>
					<cwc-icon-material-general name="clear" class="cwc-icon-button cwc-clear" @click="${this._delete.bind(this)}" ?hidden="${this.hasAttribute('disabled')}"></cwc-icon-material-general>
					<cwc-control-button class="cwc-icon-button cwc-open" @click="${this.show.bind(this)}" ?disabled="${this.hasAttribute('disabled')}">
						<cwc-icon-material-general name="event" class="cwc-icon"></cwc-icon-material-general>
					</cwc-control-button>
				</div>

				<cwc-overlay-modal id="picker" @hide="${this._closed.bind(this)}">
					<div class="cwc-picker-captures" slot="body">
						<div class="cwc-bar-box">
							<div class="cwc-year-bar">
								<span>Year</span>
							</div>
						</div>
						<div class="cwc-picker-box">
							<cwc-icon-material-general name="arrowDropUp" class="cwc-arrow" up @click="${this._move.bind(this, 'up')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropDown" class="cwc-arrow" down @click="${this._move.bind(this, 'down')}"></cwc-icon-material-general>
							<div class="cwc-picker-year-box-mask">
								<div id="scroll" class="cwc-picker-year-box" @scroll="${this._scrolling.bind(this)}">
									<div id="years" class="cwc-years">
										${this.years ? this.years.map((year) => html`
											<span class="cwc-year">${year}</span>
										`) : ''}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="cwc-bottom-captures">
						<cwc-control-button class="cwc-bottom-button" @click="${this._now.bind(this)}">Now</cwc-control-button>
						<cwc-control-button class="cwc-bottom-button" @click="${this.hide.bind(this)}">Close</cwc-control-button>
					</div>
				</cwc-overlay-modal>
			</div>
        `;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedProperties() { return ['format', 'label', 'value', 'required', 'disabled', 'invalid', 'selected'] }

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
	static get observedAttributes() { return ['format', 'label', 'required', 'disabled', 'validate-on-load', 'placeholder', 'context', 'required-marker'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) {
		switch (attribute) {
			case 'format': this.format = newValue; break;
			case 'label': this.label = newValue; break;
			case 'required': this.required = newValue; break;
			case 'disabled': this.disabled = newValue; break;
		}

		this.updateTemplate();
	}

	/**
	 * @private @name open
	 * @description Show the date picker
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.disabled) return;

		setTimeout(() => {
			let cur = this.value ? this.value : this.today.getFullYear();
			this.shadowRoot.querySelector('#scroll').scrollTop = this.years.indexOf(cur) * 60;
		}, 1);

		this.opened = true;
		this.shadowRoot.querySelector('#picker').show();
		this.scrollable = document.body.style.overflow;

		document.body.style.overflow = 'hidden';
		this.dispatchEvent(new CustomEvent('show'));
	}

	/**
	 * @private @name hide
	 * @description Hide the date picker
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		this._closed();
		this.shadowRoot.querySelector('#picker').hide();
		this.dispatchEvent(new CustomEvent('hide'));
	}

	/**
	 * @private @name validate
	 * @description Proxy the validation to input
	 * @param {String} value The value to validate
	 */
	validate(value) { return this.shadowRoot.querySelector('cwc-capture-input').validate(value) }

	/**
	 * @private @name _closed
	 * @description Run when the picker is closed, to save values and emit events
	 */
	_closed(ev) {
		this.opened = false;
		this.value = this.years[this.position];

		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));

		document.body.style.overflow = this.scrollable;
	}

	/**
	 * @private @name _manual
	 * @description Data is entered manually into the input box, converts to a date
     * @param {Event} ev Any event that kicks the function
	 */
	_manual(ev) {
		let input = this.shadowRoot.querySelector('#input');

		if (input.invalid) {
			this.value = input.value;
			this.updateTemplate();
			return;
		}

		this.value = this._formatYear(this.format, this._stringToDate(ev.target.value));
		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
	}

	/**
	 * @private @name _buildYears
	 * @description Build all hte years XXX amount before and after current year and put into an array
	 */
	_buildYears() {
		if (!this.limit || this.years.length == this.limit) return;

		// set today
		let date = new Date(this.today);
		date.setFullYear(date.getFullYear() - (Math.floor(this.limit / 2) + 1));
		this.years = [];

		// build years from limit
		for (let i = 0; i <= this.limit; i++) {
			date.setFullYear(date.getFullYear() + 1);
			this.years.push(date.getFullYear());
		}

		// set position to the center
		this.position = (Math.floor(this.limit / 2) + 1);
	}

	/**
	 * @private @name _move
	 * @description move the year picker digits
     * @param {String} dir the direction we are moving it such as up or down
     * @param {Event} ev The event that triggered this method
	 */
	_move(dir, ev) {
		dir = dir == 'down' ? 1 : (dir == 'up' ? -1 : 0);

		this.position = this.position + dir < 0 ? 0 : (this.position + dir > this.years.length - 1 ? this.years.length - 1 : this.position + dir);
		this.shadowRoot.querySelector('#scroll').scrollTop = (this.position * 60);
	}

	/**
	 * @private @name _delete
	 * @description Delete the time entered into thte input box
     * @param {Event} ev Any event that kicks the function
	 */
	_delete(ev) {
		this.value = undefined;
		this.shadowRoot.querySelector('#input').focus();
		this.updateTemplate();
		setTimeout(() => this.dispatchEvent(new CustomEvent('change', { detail: this.value })), 50);
	}

	/**
	 * @private @name _scrolling
	 * @description Scrolling the time scrollers
     * @param {Event} ev The event that triggered this method
	 */
	_scrolling(ev) {
		let scrollNode = ev.target || ev.path[0];

		ev.stopPropagation();
		ev.preventDefault();

		// debounce
		if (this.scrolling) clearTimeout(this.scrolling);

		// scroll to nearest... but need to scroll in direction
		this.scrolling = setTimeout(() => {
			let diff = scrollNode.scrollTop % 60;

			if (diff > 15 && diff < 45) {
				// scrolling change, always choose next in scroll
				let newPos = scrollNode.scrollTop / 60;
				this.position = newPos < this.position ? Math.floor(scrollNode.scrollTop / 60) : (newPos > this.position ? Math.ceil(scrollNode.scrollTop / 60) : this.position);
				scrollNode.scrollTop = this.position * 60;
			} else {
				// single change, or close to selection, use nearest
				this.position = diff < 30 ? Math.floor(scrollNode.scrollTop / 60) : Math.ceil(scrollNode.scrollTop / 60);
				scrollNode.scrollTop = this.position * 60;
			}
		}, 100);
	}

	/**
	 * @private @name _stringToDate
	 * @description Convert a string to a date object
	 * @param {String} string The year as a string which wants to be converted (can also be things like now, next year)
	 * @return {Date} A date object with te selected year set
	 */
	_stringToDate(string) {
		let date = new Date();

		switch (string.toLowerCase()) {
			case 'today': case 'now': case 'current': break;
			case 'next year': date.setFullYear(date.getFullYear() + 1); break;
			case 'last year': date.setFullYear(date.getFullYear() - 1); break;
			case 'next decade': date.setFullYear(date.getFullYear() + 10); break;
			case 'last decade': date.setFullYear(date.getFullYear() - 10); break;
			default:
				if (string.length == 4) date.setFullYear(string);
				else if (string.length == 2) date.setYear(string);
				else date.setFullYear(Date.parse(string));

				// choose today
				if (date.toString() == 'Invalid Date') date = new Date();
				break;
		}

		return date;
	}

	/**
	 * @private @name _formatYear
	 * @description Format the year as YY or YYYY
	 * @param {String} format The format of the year as YYYY or YY
	 * @param {Date} date The date object to format as a string padded or not
	 * @return {String} The year portion as a string
	 */
	_formatYear(format, date) {
		if (!date || typeof date !== 'object') return '';

		return format.toLowerCase() == 'yy' ? date.getYear() : date.getFullYear();
	}

	/**
	 * @private @name _pattern
	 * @description Turn a year pattern into a regex so we can validate against a string
	 * @param {String} format The format we want to convert such as YYYY
	 * @return {String} A regex pattern based off the format
	 */
	_pattern(format) {
		let parsed = format.toLowerCase()
			.replace('yyyy', '[0-9]{4}')
			.replace('yy', '[0-9]{2}');

		return '^' + parsed + '$|^today$|^now$|^current$|^next year$|^last year$|^next decade$|^last decade';
	}

	_now() {
		let cur = this.today.getFullYear();
		this.shadowRoot.querySelector('#scroll').scrollTop = this.years.indexOf(cur) * 60;
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-capture-year', CWCCaptureYear);
