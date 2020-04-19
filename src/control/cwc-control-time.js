import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-modal.js';
import './cwc-control-input.js';
import './cwc-control-button.js';

/**
 * @public @name CWCControlTime
 * @extends CustomHTMLElement
 * @description Custom Web Component, time input with overlay picker letting you pick a time
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The modal has been shown
 * @event hide The modal has been hidden
 *
 * @method show() Show the modal manually
 * @method hide() Hide the modal manually
 *
 * @property {String} format The date format to use
 * @property {String} label The label to use for the input box
 * @property {String} value The selected date formatted
 * @property {Boolean} required The label to use for the input box
 * @property {Boolean} disabled The label to use for the input box
 * @property {Boolean} invalid The label to use for the input box
 *
 * @attribute {String} format The date format to use
 * @attribute {String} label The label to use for the input box
 * @attribute {String} placeholder The placeholder text in the input box
 * @attribute {String} help The help tip text
 * @attribute {Flag} required The label to use for the input box
 * @attribute {Flag} disabled The label to use for the input box
 * @attribute {Flag} invalid The label to use for the input box
 * @attribute {Flag} validate-on-load The current selected date from the picker
 *
 * @style_variable @inherits All cwc-control-button variables inherited
 * @style_variable @inherits All cwc-control-input variables inherited
 * @style_variable @inherits All cwc-overlay-modal variables inherited
 * 
 * @style_variable --cwc-control-time--input--padding
 * 
 * @style_variable --cwc-control-time--button-open--background
 * @style_variable --cwc-control-time--button-open--color
 * @style_variable --cwc-control-time--button-open--border
 * @style_variable --cwc-control-time--button-open--outline
 * @style_variable --cwc-control-time--button-open--background--hover
 * @style_variable --cwc-control-time--button-open--background--focus
 * @style_variable --cwc-control-time--button-open--background--active
 * @style_variable --cwc-control-time--button-open--box-shadow--hover
 * @style_variable --cwc-control-time--button-open--box-shadow--focus
 * @style_variable --cwc-control-time--button-open--box-shadow--active
 * 
 * @style_variable --cwc-control-time--icon--margin
 * 
 * @style_variable --cwc-control-time--selectable--border
 * @style_variable --cwc-control-time--selectable--background
 * @style_variable --cwc-control-time--selectable--color
 * @style_variable --cwc-control-time--selectable--border-radius
 * @style_variable --cwc-control-time--selectable--color
 * 
 * @example
 * <cwc-control-time format="hh:mm:ss"></cwc-control-time>
 */
class CWCControlTime extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.content;
		this.name;
		this.duration;
		this.opened = false;
		this.time;
		this.position = { hour: 0, minute: 0, second: 0 };
		this.scrolling = [];

		this.hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
		this.minutes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
		this.seconds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];

		this.value;
		this.date;
		this.scrollable;
		this.format = this.hasAttribute('format') ? this.getAttribute('format') : 'hh:mm:ss';
		this.label = this.hasAttribute('label') ? this.getAttribute('label') : 'Time'
		this.required = this.hasAttribute('required') ? true : false
		this.disabled = this.hasAttribute('disabled') ? true : false
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

				.cwc-control-time .cwc-picker-box {
					position: relative;
					width: 220px;
					height: 230px;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
				}

				.cwc-control-time .cwc-inputs { width: 100%; display: inline-block; position: relative; }

				.cwc-control-time .cwc-inputs .cwc-input {
					width: 100%;
					display: inline-block;
					padding: 0 40px 0 0;
					box-sizing: border-box;
					--cwc-control-input--padding: var(--cwc-control-time--input--padding, 4px 25px 4px 4px);
				}

				.cwc-control-time .cwc-inputs .cwc-icon-button  { 
					--cwc-control-button--background: var(--cwc-control-time--button-open--background);
					--cwc-control-button--color: var(--cwc-control-time--button-open--color);
					--cwc-control-button--border: var(--cwc-control-time--button-open--border);
					--cwc-control-button--outline: var(--cwc-control-time--button-open--outline);
					
					--cwc-control-button--background--hover: var(--cwc-control-time--button-open--background--hover);
					--cwc-control-button--background--focus: var(--cwc-control-time--button-open--background--focus);
					--cwc-control-button--background--active: var(--cwc-control-time--button-open--background--active);

					--cwc-control-button--box-shadow--hover: var(--cwc-control-time--button-open--box-shadow--hover);
					--cwc-control-button--box-shadow--focus: var(--cwc-control-time--button-open--box-shadow--focus);
					--cwc-control-button--box-shadow--active: var(--cwc-control-time--button-open--box-shadow--active);
					--cwc-control-button--padding: 2px; 
					position: absolute; 
					top: 20px; 
				}

				.cwc-control-time .cwc-inputs .cwc-icon-button.cwc-open { right: 0px; }
				.cwc-control-time .cwc-inputs .cwc-icon-button.cwc-clear { right: 40px; padding: 5px; }
				.cwc-control-time .cwc-inputs .cwc-icon-button .cwc-icon { height: 24px; width: 24px; vertical-align: top; padding: 2px; margin: var(--cwc-control-time--icon--margin, 0); }
				.cwc-control-time .cwc-picker-controls { position: relative; }
				.cwc-control-time .cwc-control-box { padding: 10px; margin: 0; text-align: center; }

				.cwc-control-time .cwc-bar-box {
					position: absolute;
					top: 50%;
					left: 50%;
					margin-left: -110px;
					margin-top: -115px;
					z-index: 0;
					width: 220px;
					height: 230px;
				}

				.cwc-control-time .cwc-time-bar {
					position: absolute;
					top: 50%;
					z-index: 0;
					border: var(--cwc-control-time--selectable--border, 1px solid #ccc);
					background: var(--cwc-control-time--selectable--background, #ddd);
					color: var(--cwc-control-time--selectable--color, #999);
					padding: 0;
					margin-top: -35px;
					height: 70px;
					width: 70px;
    				box-sizing: border-box;
					text-align: center;
					font-size: 10px;
					text-transform: uppercase;
					border-radius: var(--cwc-control-time--selectable--border-radius, 0px);
				}

				.cwc-control-time .cwc-time-bar.cwc-left { left: 0px; }
				.cwc-control-time .cwc-time-bar.cwc-middle { left: 50%; margin-left: -35px; }
				.cwc-control-time .cwc-time-bar.cwc-right { right: 0px; }

				.cwc-control-time .cwc-picker-time-box-mask {
					margin: 0;
					padding: 0;
					width: 70px;
					height: 160px;
					position: relative;
					top: 35px;
					overflow: hidden;
					display: inline-block;
				}

				.cwc-control-time .cwc-picker-time-box {
					display: inline-block;
					height: 160px;
					width: 110px;
					box-sizing: border-box;
					overflow-y: scroll;
				}

				.cwc-control-time .cwc-hours, .cwc-control-time .cwc-minutes, .cwc-control-time .cwc-seconds {
					padding-top: 50px;
    				padding-bottom: 50px;
					height: fit-content;
					float: left;
				}

				.cwc-control-time .cwc-hours .cwc-hour, .cwc-control-time .cwc-minutes .cwc-minute, .cwc-control-time .cwc-seconds .cwc-second {
					display: block;
					float: left;
					height: 40px;
					line-height: 40px;
					font-size: 40px;
					margin: 10px 0px 10px 13px;
					color: var(--cwc-control-time--selectable--color, #999);
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				.cwc-control-time .cwc-arrow {
				    position: absolute;
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
				}

				.cwc-control-time .cwc-arrow[up] { top: 0px; }
				.cwc-control-time .cwc-arrow[down] { bottom: 0px; }
				.cwc-control-time .cwc-arrow[hour] { left: 20px; }
				.cwc-control-time .cwc-arrow[minute] { left: 50%; margin-left: -15px; }
				.cwc-control-time .cwc-arrow[second] { right: 20px; }

				.cwc-control-time .cwc-bottom-controls {
					display: flex;
					flex-flow: row;
					margin: 5px -5px -5px -5px;
					position: relative;
					z-index: 100;
				}

				.cwc-control-time .cwc-bottom-controls .cwc-bottom-button { flex: 1 1; margin: 5px; text-align: center; }
			</style>

			<div class="cwc-control-time">
				<div class="cwc-inputs">
					<cwc-control-input
						id="input"
						class="cwc-input"
						type="text"
						label="${ifDefined(this.label)}"
						regex="${ifDefined(this._pattern(this.format))}"
						invalid-message="${this.format} or now, midnight..."
						help="${ifDefined(this.getAttribute('help') || undefined)}"
						placeholder="${this.getAttribute('placeholder') || ''}"
						.value="${this.value}"
						?disabled="${this.hasAttribute('disabled')}"
						?required="${this.hasAttribute('required')}"
						?required-asterisk="${this.hasAttribute('required-asterisk')}"
						?validate-on-load="${this.hasAttribute('validate-on-load')}"
						@validated="${this._manual.bind(this)}"
					></cwc-control-input>
					<cwc-icon-material-general name="clear" class="cwc-icon-button cwc-clear" @click="${this._delete.bind(this)}" ?hidden="${this.hasAttribute('disabled')}"></cwc-icon-material-general>
					<cwc-control-button class="cwc-icon-button cwc-open" @click="${this.show.bind(this)}" ?disabled="${this.hasAttribute('disabled')}">
						<cwc-icon-material-general name="schedule" class="cwc-icon"></cwc-icon-material-general>
					</cwc-control-button>
				</div>

				<cwc-overlay-modal id="picker" @hide="${this._closed.bind(this)}">
					<div class="cwc-picker-controls" slot="body">
						<div class="cwc-bar-box">
							<div class="cwc-time-bar cwc-left">
								<span>Hours</span>
							</div>
							<div class="cwc-time-bar cwc-middle">
								<span>Minutes</span>
							</div>
							<div class="cwc-time-bar cwc-right">
								<span>Seconds</span>
							</div>
						</div>
						<div class="cwc-picker-box">
							<cwc-icon-material-general name="arrowDropUp" class="cwc-arrow" hour up @click="${this._move.bind(this, 'hour', 'up')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropDown" class="cwc-arrow" hour down @click="${this._move.bind(this, 'hour', 'down')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropUp" class="cwc-arrow" minute up @click="${this._move.bind(this, 'minute', 'up')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropDown" class="cwc-arrow" minute down @click="${this._move.bind(this, 'minute', 'down')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropUp" class="cwc-arrow" second up @click="${this._move.bind(this, 'second', 'up')}"></cwc-icon-material-general>
							<cwc-icon-material-general name="arrowDropDown" class="cwc-arrow" second down @click="${this._move.bind(this, 'second', 'down')}"></cwc-icon-material-general>
							<div class="cwc-picker-time-box-mask">
								<div id="scrollhour" class="cwc-picker-time-box" hour @scroll="${this._scrolling.bind(this, 'hour')}">
									<div id="hours" class="cwc-hours">
										${this.hours ? this.hours.map((hour) => html`
											<span class="cwc-hour">${this._pad(hour)}</span>
										`) : ''}
									</div>
								</div>
							</div>
							<div class="cwc-picker-time-box-mask">
								<div id="scrollminute" class="cwc-picker-time-box" minute @scroll="${this._scrolling.bind(this, 'minute')}">
									<div id="minutes" class="cwc-minutes">
										${this.minutes ? this.minutes.map((minute) => html`
											<span class="cwc-minute">${this._pad(minute)}</span>
										`) : ''}
									</div>
								</div>
							</div>
							<div class="cwc-picker-time-box-mask">
								<div id="scrollsecond" class="cwc-picker-time-box" second @scroll="${this._scrolling.bind(this, 'second')}">
									<div id="seconds" class="cwc-seconds">
										${this.seconds ? this.seconds.map((second) => html`
											<span class="cwc-second">${this._pad(second)}</span>
										`) : ''}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="bottom-controls">
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
	static get observedProperties() { return ['format', 'label', 'value', 'required', 'disabled'] }

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
	static get observedAttributes() { return ['format', 'label', 'required', 'disabled', 'validate-on-load', 'placeholder', 'context'] }

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
	 * @description Show the time picker
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.disabled) return;

		this.date = !this.value ? new Date() : this._timeToDate(this.value);

		this.position.hour = this.hours.indexOf(this.date.getHours());
		this.position.minute = this.minutes.indexOf(this.date.getMinutes());
		this.position.second = this.seconds.indexOf(this.date.getSeconds());

		setTimeout(() => {
			this.shadowRoot.querySelector('#scrollhour').scrollTop = this.position.hour * 60;
			this.shadowRoot.querySelector('#scrollminute').scrollTop = this.position.minute * 60;
			this.shadowRoot.querySelector('#scrollsecond').scrollTop = this.position.second * 60;
		}, 1);

		this.opened = true;
		this.shadowRoot.querySelector('#picker').show();
		this.scrollable = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		this.dispatchEvent(new CustomEvent('show'));
	}

	/**
	 * @private @name hide
	 * @description Hide the time picker
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		this._closed();
		this.shadowRoot.querySelector('#picker').hide();
		this.dispatchEvent(new CustomEvent('hide'));
	}

	_closed(ev) {
		this.opened = false;
		this.date.setHours(this.hours[this.position.hour]);
		this.date.setMinutes(this.minutes[this.position.minute]);
		this.date.setSeconds(this.seconds[this.position.second]);
		this.value = this._dateToTime(this.date);

		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
		document.body.style.overflow = this.scrollable;
	}

	/**
	 * @private @name _manual
	 * @description Data is entered manually into the input box, converts to a time
     * @param {Event} ev Any event that kicks the function
	 */
	_manual(ev) {
		let input = this.shadowRoot.querySelector('#input');

		if (input.invalid) {
			this.value = input.value;
			this.updateTemplate();
			return;
		}

		this.value = this._dateToTime(this._timeToDate(ev.target.value));
	}

	/**
	 * @private @name _pad
	 * @description Pad the date with leading 0's
     * @param {Number} num The number to pad
	 * @return {String} The padded number
	 */
	_pad(num) { return num < 10 ? '0' + num : num }

	/**
	 * @private @name _move
	 * @description move the time picker digits
     * @param {String} type The type of we are changing such as hour, minute, second
     * @param {String} dir the direction we are moving it such as up or down
     * @param {Event} ev The event that triggered this method
	 */
	_move(type, dir, ev) {
		dir = dir == 'down' ? 1 : (dir == 'up' ? -1 : 0);

		// single change
		this.position[type.toLowerCase()] = this.position[type.toLowerCase()] + dir < 0 ? 0 : (this.position[type.toLowerCase()] + dir > this[type.toLowerCase() + 's'].length - 1 ? this[type.toLowerCase() + 's'].length - 1 : this.position[type.toLowerCase()] + dir);
		this.shadowRoot.querySelector('#scroll' + type).scrollTop = this.position[type.toLowerCase()] * 60;
	}

	/**
	 * @private @name _buildTime
	 * @description build up the time arrays for hosurs minutes and seconds
	 */
	_buildTime() {
		for (let i = 0; i < 24; i++) this.hours.push(i);
		for (let i = 0; i < 60; i++) this.minutes.push(i);
		for (let i = 0; i < 60; i++) this.seconds.push(i);
	}

	/**
	 * @private @name _scrolling
	 * @description Scrolling the time scrollers
     * @param {String} type The type of we are changing such as hour, minute, second
     * @param {Event} ev The event that triggered this method
	 */
	_scrolling(type, ev) {
		let scrollNode = ev.target || ev.path[0];

		ev.stopPropagation();
		ev.preventDefault();

		// debounce
		if (this.scrolling[type]) clearTimeout(this.scrolling[type]);

		// scroll to nearest... but need to scroll in direction
		this.scrolling[type] = setTimeout(() => {
			let diff = scrollNode.scrollTop % 60;
			if (diff > 15 && diff < 45) {
				// scrolling change, always choose next in scroll
				let newPos = scrollNode.scrollTop / 60;
				this.position[type.toLowerCase()] = newPos < this.position[type.toLowerCase()] ? Math.floor(scrollNode.scrollTop / 60) : (newPos > this.position[type.toLowerCase()] ? Math.ceil(scrollNode.scrollTop / 60) : this.position[type.toLowerCase()]);
				scrollNode.scrollTop = this.position[type.toLowerCase()] * 60;
			} else {
				// single change, or close to selection, use nearest
				this.position[type.toLowerCase()] = diff < 30 ? Math.floor(scrollNode.scrollTop / 60) : Math.ceil(scrollNode.scrollTop / 60);
				scrollNode.scrollTop = this.position[type.toLowerCase()] * 60;
			}
		}, 100);
	}

	/**
	 * @private @name _delete
	 * @description Delete the time entered into thte input box
     * @param {Event} ev Any event that kicks the function
	 */
	_delete(ev) {
		this.value = undefined;
		this.shadowRoot.querySelector('#input').focus();
	}

	/**
	 * @private @name _dateToTime
	 * @description Convert a date object to time string
	 * @param {Date} date The date object to convert
	 * @return {String} A string representation of the time
	 */
	_dateToTime(date) {
		if (!date) return '';

		// set format
		let formatted = this.format.toLowerCase().replace('hh', this._formatHour(date, true)).replace('h', this._formatHour(date));
		formatted = formatted.replace('mm', this._formatMinute(date, true)).replace('m', this._formatMinute(date));
		formatted = formatted.replace('ss', this._formatSecond(date, true)).replace('s', this._formatSecond(date));

		return formatted;
	}

	/**
	 * @private @name _timeToDate
	 * @description Convert a time string to a date object
	 * @param {String} string The date as a string which wants to be converted (can also be things like today, next week)
	 * @return {Date} A date object base on teh string
	 */
	_timeToDate(string) {
		string = this._stringToTime(string);

		let fParts = this.format.toLowerCase().split(':');
		let dParts = string.split(':');

		// get indexes
		let hh = fParts.indexOf('hh');
		let h = fParts.indexOf('h');
		let mm = fParts.indexOf('mm');
		let m = fParts.indexOf('m');
		let ss = fParts.indexOf('ss');
		let s = fParts.indexOf('s');

		let date = new Date();
		date.setHours(hh >= 0 ? dParts[hh] : (h >= 0 ? dParts[h] : 0));
		date.setMinutes(mm >= 0 ? dParts[mm] : (m >= 0 ? dParts[m] : 0));
		date.setSeconds(ss >= 0 ? dParts[ss] : (s >= 0 ? dParts[s] : 0));

		return isNaN(date.getTime()) ? new Date() : date;
	}

	/**
	 * @private @name _stringToTime
	 * @description Convert a string to a time string
	 * @param {String} string The time as a string which wants to be converted (can also be things like now, afternoon)
	 * @return {String} A time string
	 */
	_stringToTime(string) {
		let date = new Date();

		switch (string.toLowerCase()) {
			case 'today':
			case 'now':
			case 'current':
				// set format
				return this._dateToTime(new Date());
				break;
			case 'dinner':
			case 'noon':
				date.setHours(12);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'early':
				date.setHours(6);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'morning':
				date.setHours(8);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'afternoon':
				date.setHours(14);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'tonight':
			case 'night':
			case 'evening':
				date.setHours(20);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'late':
				date.setHours(22);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			case 'midnight':
				date.setHours(0);
				date.setMinutes(0);
				date.setSeconds(0);
				return this._dateToTime(date);
				break;
			default:
				return string;
				break;
		}
	}

	/**
	 * @private @name _formatHour
	 * @description Format the hours, should we pad them?
	 * @param {Date} date The date object to format as a string padded or not
	 * @param {Boolean} pad Should we pad or not
	 * @return {String} The time portion as a string, padded or not
	 */
	_formatHour(date, pad) { return !date ? '' : (!!pad ? (date.getHours().toString().length < 2 ? '0' + date.getHours() : date.getHours()) : date.getHours()) }

	/**
	 * @private @name _formatMinute
	 * @description Format the minutes, should we pad them?
	 * @param {Date} date The date object to format as a string padded or not
	 * @param {Boolean} pad Should we pad or not
	 * @return {String} The time portion as a string, padded or not
	 */
	_formatMinute(date, pad) { return !date ? '' : (!!pad ? (date.getMinutes().toString().length < 2 ? '0' + date.getMinutes() : date.getMinutes()) : date.getMinutes()) }

	/**
	 * @private @name _formatSecond
	 * @description Format the seconds, should we pad them?
	 * @param {Date} date The date object to format as a string padded or not
	 * @param {Boolean} pad Should we pad or not
	 * @return {String} The time portion as a string, padded or not
	 */
	_formatSecond(date, pad) { return !date ? '' : (!!pad ? (date.getSeconds().toString().length < 2 ? '0' + date.getSeconds() : date.getSeconds()) : date.getSeconds()) }

	/**
	 * @private @name _pattern
	 * @description Turn a time pattern into a regex so we can validate against a string
	 * @param {String} format The format we want to convert such as hh:mm:ss
	 * @return {String} A regex pattern based off the format
	 */
	_pattern(format) {
		let parsed = this.format.toLowerCase()
			.replace('hh', '(2[0-3]|1[0-9]|0[0-9])')
			.replace('h', '(2[0-3]|1[0-9]|[0-9])')
			.replace('mm', '[0-5]{1}[0-9]{1}')
			.replace('m', '([0-9]{1}|[0-5]{1}[0-9]{1})')
			.replace('ss', '[0-5]{1}[0-9]{1}')
			.replace('s', '([0-9]{1}|[0-5]{1}[0-9]{1})');

		return `^(${parsed})$|^today$|^now$|^current$|^dinner$|^noon$|^early$|^morning$|^afternoon$|^tonight$|^night$|^evening$|^late$|^midnight$`;
	}

	_now() {
		this.date = new Date();
		this.position.hour = this.hours.indexOf(this.date.getHours());
		this.position.minute = this.minutes.indexOf(this.date.getMinutes());
		this.position.second = this.seconds.indexOf(this.date.getSeconds());

		this.shadowRoot.querySelector('#scrollhour').scrollTop = this.position.hour * 60;
		this.shadowRoot.querySelector('#scrollminute').scrollTop = this.position.minute * 60;
		this.shadowRoot.querySelector('#scrollsecond').scrollTop = this.position.second * 60;
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-control-time', CWCControlTime);
