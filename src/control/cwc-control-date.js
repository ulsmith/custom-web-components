import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';
import '../overlay/cwc-overlay-modal.js';
import './cwc-control-input.js';
import './cwc-control-button.js';

/**
 * @public @name CWCControlDate
 * @extends CustomHTMLElement
 * @description Custom Web Component, date input with overlay picker letting you pick a date with UI
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 * 
 * @event show The date picker has been shown
 * @event hide The date picker has been hidden
 * @event change The the value has changed, with event detail as the value
 *
 * @method show() Show the date picker manually
 * @method hide() Hide the date picker manually
 * @method validate(String value) Validate the value from the component
 * 
 * @property {String} format The date format to use
 * @property {String} label The label to use for the input box
 * @property {String} value The selected date formatted
 * @property {Boolean} required The label to use for the input box
 * @property {Boolean} disabled The label to use for the input box
 * @property {Boolean} invalid The label to use for the input box
 * @property {Date} selected The current selected date from the picker
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
 * @style_variable --cwc-control-date--icon--margin
 * 
 * @style_variable --cwc-control-date--input--padding
 * 
 * @style_variable --cwc-control-date--selectable--border-radius
 * 
 * @style_variable --cwc-control-date--selected-day--border
 * @style_variable --cwc-control-date--selected-day--background
 * @style_variable --cwc-control-date--selected-day--color
 * 
 * @style_variable --cwc-control-date--selected-month--border
 * @style_variable --cwc-control-date--selected-month--background
 * @style_variable --cwc-control-date--selected-month--color
 * 
 * @style_variable --cwc-control-date--selected-year--border
 * @style_variable --cwc-control-date--selected-year--background
 * @style_variable --cwc-control-date--selected-year--color
 * 
 * @style_variable --cwc-control-date--button-open--background
 * @style_variable --cwc-control-date--button-open--color
 * @style_variable --cwc-control-date--button-open--border
 * @style_variable --cwc-control-date--button-open--outline
 * @style_variable --cwc-control-date--button-open--background--hover
 * @style_variable --cwc-control-date--button-open--background--focus
 * @style_variable --cwc-control-date--button-open--background--active
 * @style_variable --cwc-control-date--button-open--box-shadow--hover
 * @style_variable --cwc-control-date--button-open--box-shadow--focus
 * @style_variable --cwc-control-date--button-open--box-shadow--active
 * @style_variable --cwc-control-date--button-open--height
 * 
 * @style_variable --cwc-control-date--button-today--background
 * @style_variable --cwc-control-date--button-today--color
 * @style_variable --cwc-control-date--button-today--border
 * @style_variable --cwc-control-date--button-today--outline
 * @style_variable --cwc-control-date--button-today--background--hover
 * @style_variable --cwc-control-date--button-today--background--focus
 * @style_variable --cwc-control-date--button-today--background--active
 * @style_variable --cwc-control-date--button-today--box-shadow--hover
 * @style_variable --cwc-control-date--button-today--box-shadow--focus
 * @style_variable --cwc-control-date--button-today--box-shadow--active
 * 
 * @style_variable --cwc-control-date--button-close--background
 * @style_variable --cwc-control-date--button-close--color
 * @style_variable --cwc-control-date--button-close--border
 * @style_variable --cwc-control-date--button-close--outline
 * @style_variable --cwc-control-date--button-close--background--hover
 * @style_variable --cwc-control-date--button-close--background--focus
 * @style_variable --cwc-control-date--button-close--background--active
 * @style_variable --cwc-control-date--button-close--box-shadow--hover
 * @style_variable --cwc-control-date--button-close--box-shadow--focus
 * @style_variable --cwc-control-date--button-close--box-shadow--active
 * 
 * @example
 * <cwc-control-date 
 * 		format="dd/mm/yyyy"
 * 		label="Date"
 * 		placeholder="Input Date"
 * 		required
 * 		disabled
 * 		validate-on-load
 * ></cwc-control-date>
 */
class CWCControlDate extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.value = '';
		this.mode = 'day';
		this.days = [];
		this.years = [];
		this.invalid = false;
		this.selected;
		this.date = new Date();
		this.date.setDate(1);

		this.fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		this.abbMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		this.fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		this.abbDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		this.format = this.hasAttribute('format') ? this.getAttribute('format') : 'dd/mm/yyyy';
		this.label = this.hasAttribute('label') ? this.getAttribute('label') : 'Date';
		this.required = this.hasAttribute('required') ? true : false;
		this.disabled = this.hasAttribute('disabled') ? true : false;

		this._open;
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

				.cwc-control-date { padding: 0; color: #222; }
				.cwc-control-date .cwc-inputs { width: 100%; display: inline-block; position: relative; }
				
				.cwc-control-date .cwc-inputs .cwc-icon-button { 
					--cwc-control-button--background: var(--cwc-control-date--button-open--background);
					--cwc-control-button--color: var(--cwc-control-date--button-open--color);
					--cwc-control-button--border: var(--cwc-control-date--button-open--border);
					--cwc-control-button--outline: var(--cwc-control-date--button-open--outline);
					
					--cwc-control-button--background--hover: var(--cwc-control-date--button-open--background--hover);
					--cwc-control-button--background--focus: var(--cwc-control-date--button-open--background--focus);
					--cwc-control-button--background--active: var(--cwc-control-date--button-open--background--active);

					--cwc-control-button--box-shadow--hover: var(--cwc-control-date--button-open--box-shadow--hover);
					--cwc-control-button--box-shadow--focus: var(--cwc-control-date--button-open--box-shadow--focus);
					--cwc-control-button--box-shadow--active: var(--cwc-control-date--button-open--box-shadow--active);
					--cwc-control-button--padding: 2px; 
					position: absolute; 
					top: 20px; 
				}
				
				.cwc-control-date .cwc-inputs .cwc-icon-button.cwc-open { right: 0px; height: var(--cwc-control-date--button-open--height, 30px); }
				.cwc-control-date .cwc-inputs .cwc-icon-button.cwc-clear { right: 40px; padding: 5px; margin: var(--cwc-control-date--icon--margin, 0); }
				.cwc-control-date .cwc-inputs .cwc-icon-button .cwc-icon { height: 24px; width: 24px; vertical-align: top; padding: 2px; margin: var(--cwc-control-date--icon--margin, 0); }

				.cwc-control-date .cwc-inputs .cwc-input { 
					width: 100%; 
					display: inline-block; 
					padding: 0 40px 0 0; 
					box-sizing: border-box; 
					--cwc-control-input--padding: var(--cwc-control-date--input--padding, 4px 25px 4px 4px);
				}
				
				.cwc-control-date .cwc-box {
					margin: 0;
					padding: 0;
					width: 260px;
					height: 320px;
					box-sizing: border-box;
					z-index: 1001;
				}

				.cwc-control-date .cwc-box .cwc-control-box {
					display: inline-block;
					padding: 0px;
					margin: 0;
				    text-align: center;
					width: 260px;
					height: 320px;
					box-sizing: border-box;
					float: left;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls {
					padding: 0px;
					height: 30px;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-month {
					vertical-align: super;
					line-height: 20px;
					box-shadow: 0 0px 5px 0px #444;
					padding: 5px 10px;
					margin-right: 1px;
					border-radius: 50px 0px 0px 50px;
					cursor: pointer;
					display: inline-block;
					box-sizing: border-box;
					color: #222;
					background: #eee;
					font-size: 14px;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-year {
					vertical-align: super;
					line-height: 20px;
					box-shadow: 0 0px 5px 0px #444;
					padding: 5px 10px;
					margin-left: 1px;
					border-radius: 0px 50px 50px 0px;
					cursor: pointer;
					display: inline-block;
					box-sizing: border-box;
					color: #222;
					background: #eee;
					font-size: 14px;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-month[selected], .cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-year[selected] { background-color: #ddd; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-icon {
					height: 30px;
					width: 30px;
					box-shadow: 0 0px 5px 0px #444;
					padding: 2px;
					border-radius: 50px;
					cursor: pointer;
					display: inline-block;
					box-sizing: border-box;
					background: #eee;
					fill: #222;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-icon[back] { float: left; }
				.cwc-control-date .cwc-box .cwc-control-box .cwc-controls .cwc-icon[forward] { float: right; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days {
					list-style-type: none;
					margin: 0;
					margin: 10px 0;
					padding: 0;
					height: 240px;
					width: 260px;
					display: flex;
					flex-flow: row wrap;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li {
					border: 1px solid #ccc;
					background-color: #eee;
					color: #555;
					box-sizing: border-box;
					font-size: 14px;
					line-height: 14px;
					display: flex;
					margin: 1px 1px;
					cursor: pointer;
					flex: 1 1 32px;
					align-items: center;
					justify-content: center;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
					border-radius: var(--cwc-control-date--selectable--border-radius, 0px);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li:nth-child(7n+7), .cwc-control-date .cwc-box .cwc-control-box .cwc-days li:nth-child(7n+6) { background-color: #ddd; }
				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li[today] { font-weight: bold; color: #000; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li[selected] {
					border: var(--cwc-control-date--selected-day--border, 1px solid #1b741b);
					background: var(--cwc-control-date--selected-day--background, #0f990f);
					color: var(--cwc-control-date--selected-day--color, white);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li[disabled] { opacity: 0.6; cursor: not-allowed; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li .cwc-day {
					margin: 0;
					padding: 0;
					display: block;
   					font-size: 10px;
					line-height: 14px;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-days li .cwc-date {
					margin: 0;
					padding: 0;
					display: block;
					font-size: 14px;
					line-height: 20px;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-months {
					list-style-type: none;
					padding: 0;
					margin: 10px 0;
					height: 240px;
					width: 260px;
					display: flex;
					flex-flow: row wrap;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-months li {
					border: 1px solid #ccc;
				    background-color: #ddd;
					color: #222;
					box-sizing: border-box;
					display: flex;
					margin: 1px;
					cursor: pointer;
					font-size: 14px;
					line-height: 14px;
					flex: 1 1 80px;
					align-items: center;
					justify-content: center;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
					border-radius: var(--cwc-control-date--selectable--border-radius, 0px);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-months li[today] { font-weight: bold; color: black; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-months li[selected] {
					border: var(--cwc-control-date--selected-month--border, 1px solid #ea5121);
					background: var(--cwc-control-date--selected-month--background, #ff7448);
					color: var(--cwc-control-date--selected-month--color, white);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-years {
					list-style-type: none;
					padding: 0;
					margin: 10px 0;
					height: 240px;
					width: 260px;
					display: flex;
					flex-flow: row wrap;
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-years li {
					border: 1px solid #ccc;
				    background-color: #ddd;
					color: #222;
					box-sizing: border-box;
					display: flex;
					flex: 1 1 45px;
					margin: 1px;
					cursor: pointer;
					font-size: 14px;
					line-height: 14px;
					align-items: center;
					justify-content: center;
					-webkit-touch-callout: none; /* iOS Safari */
					-webkit-user-select: none; /* Safari */
					-moz-user-select: none; /* Firefox */
					-ms-user-select: none; /* Internet Explorer/Edge */
					user-select: none;
					border-radius: var(--cwc-control-date--selectable--border-radius, 0px);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-years li[today] { font-weight: bold; color: black; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-years li[selected] {
					border: var(--cwc-control-date--selected-year--border, 1px solid #ea5121);
					background: var(--cwc-control-date--selected-year--background, #ff7448);
					color: var(--cwc-control-date--selected-year--color, white);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-bottom-controls { display: flex; flex-flow: row; margin: -5px; }
				.cwc-control-date .cwc-box .cwc-control-box .cwc-bottom-controls .cwc-bottom-button { flex: 1 1; margin: 5px; }

				.cwc-control-date .cwc-box .cwc-control-box .cwc-bottom-controls .cwc-bottom-button.button-today { 
					--cwc-control-button--background: var(--cwc-control-date--button-today--background);
					--cwc-control-button--color: var(--cwc-control-date--button-today--color);
					--cwc-control-button--border: var(--cwc-control-date--button-today--border);
					--cwc-control-button--outline: var(--cwc-control-date--button-today--outline);
					
					--cwc-control-button--background--hover: var(--cwc-control-date--button-today--background--hover);
					--cwc-control-button--background--focus: var(--cwc-control-date--button-today--background--focus);
					--cwc-control-button--background--active: var(--cwc-control-date--button-today--background--active);

					--cwc-control-button--box-shadow--hover: var(--cwc-control-date--button-today--box-shadow--hover);
					--cwc-control-button--box-shadow--focus: var(--cwc-control-date--button-today--box-shadow--focus);
					--cwc-control-button--box-shadow--active: var(--cwc-control-date--button-today--box-shadow--active);
				}

				.cwc-control-date .cwc-box .cwc-control-box .cwc-bottom-controls .cwc-bottom-button.button-close {
					--cwc-control-button--background: var(--cwc-control-date--button-close--background);
					--cwc-control-button--color: var(--cwc-control-date--button-close--color);
					--cwc-control-button--border: var(--cwc-control-date--button-close--border);
					--cwc-control-button--outline: var(--cwc-control-date--button-close--outline);
					
					--cwc-control-button--background--hover: var(--cwc-control-date--button-close--background--hover);
					--cwc-control-button--background--focus: var(--cwc-control-date--button-close--background--focus);
					--cwc-control-button--background--active: var(--cwc-control-date--button-close--background--active);

					--cwc-control-button--box-shadow--hover: var(--cwc-control-date--button-close--box-shadow--hover);
					--cwc-control-button--box-shadow--focus: var(--cwc-control-date--button-close--box-shadow--focus);
					--cwc-control-button--box-shadow--active: var(--cwc-control-date--button-close--box-shadow--active);
				}

        		@media (max-width: 550px) {
                    .cwc-control-date .cwc-box { width: 260px; }
					.cwc-control-date .cwc-box .cwc-date-box { width: 100%; height: 80px; margin-bottom: 10px; }
					.cwc-control-date .cwc-box .cwc-date-box .cwc-full-date { height: fit-content; position: initial; width: 100%; margin-top: 0; }

					.cwc-control-date .cwc-box .cwc-date-box .cwc-full-date .cwc-day, .cwc-control-date .cwc-box .cwc-date-box .cwc-full-date .cwc-year, .cwc-control-date .cwc-box .cwc-date-box .cwc-full-date .cwc-date {
						font-size: 20px;
						line-height: 26px;
						display: inline-block;
					}

					.cwc-control-date .cwc-box .date-box .cwc-controls .cwc-icon { margin: 5px 2px; }
				}
			</style>
			
			<div class="cwc-control-date">
				<div class="cwc-inputs">
					<cwc-control-input
						type="text"
						id="input"
						class="cwc-input"
						label="${ifDefined(this.label)}"
						regex="${ifDefined(this._pattern(this.format))}"
						invalid-message="${this.format} or tomorrow, next year..."
						placeholder="${this.getAttribute('placeholder') || ''}"
						help="${ifDefined(this.getAttribute('help') || undefined)}"
						.value="${this.value}"
						?disabled="${this.hasAttribute('disabled')}"
						?required="${this.hasAttribute('required')}"
						?validate-on-load="${this.hasAttribute('validate-on-load')}"
					    ?invalid="${this.hasAttribute('invalid')}"
						@validated="${this._manual.bind(this)}"
					></cwc-control-input>
					<cwc-icon-material-general name="clear" class="cwc-icon-button cwc-clear" @click="${this._delete.bind(this)}" ?hidden="${this.hasAttribute('disabled')}"></cwc-icon-material-general>
					<cwc-control-button class="cwc-icon-button cwc-open" @click="${this.show.bind(this)}" ?disabled="${this.hasAttribute('disabled')}">
						<cwc-icon-material-general name="dateRange" class="cwc-icon"></cwc-icon-material-general>
					</cwc-control-button>
				</div>

				<cwc-overlay-modal id="picker" class="cwc-picker" @hide="${this._closed.bind(this)}">
					<div class="cwc-box" slot="body">
						<div class="cwc-control-box">
							<div class="cwc-controls">
								<cwc-icon-material-general name="chevronLeft" class="cwc-icon" back @click="${this._back.bind(this)}" ?hidden="${this.mode == 'month'}"></cwc-icon-material-general>
								<span class="cwc-month" @click="${this._changeMode.bind(this, 'month')}" ?selected="${this.mode == 'month'}">
									${this._formatDate('mmmm', this.date)}
								</span><span class="cwc-year" @click="${this._changeMode.bind(this, 'year')}" ?selected="${this.mode == 'year'}">
									${this._formatDate('yyyy', this.date)}
								</span>
								<cwc-icon-material-general name="chevronRight" class="cwc-icon" forward @click="${this._forward.bind(this)}" ?hidden="${this.mode == 'month'}"></cwc-icon-material-general>
							</div>
							<ul class="cwc-days" ?hidden="${this.mode != 'day'}">
								${this.days ? this.days.map((day, idx) => html`
									<li @click="${this._selectDay.bind(this, idx, day.disabled)}" ?selected="${this._datesEqual(day.date, this.selected)}" ?disabled="${day.disabled}" ?today="${this._datesEqual(day.date, this.today)}">
										<div class="cwc-details">
											<span class="cwc-day">${this._formatDate('ddd', day.date)}</span>
											<span class="cwc-date">${this._formatDate('dd', day.date)}</span>
										</div>
									</li>
								`) : ''}
							</ul>
							<ul class="cwc-years" ?hidden="${this.mode != 'year'}">
								${this.years ? this.years.map((year, idx) => html`
									<li @click="${this._selectYear.bind(this, idx)}" ?today="${this._formatDate('yyyy', this.today) == year}" ?selected="${this._formatDate('yyyy', this.date) == year}">
										<div class="cwc-details">
											<span class="cwc-year">${year}</span>
										</div>
									</li>
								`) : ''}
							</ul>
							<ul class="cwc-months" ?hidden="${this.mode != 'month'}">
								${this.fullMonths ? this.fullMonths.map((month, idx) => html`
									<li @click="${this._selectMonth.bind(this, idx)}" ?today="${this._formatDate('mmmm', this.today) == month}" ?selected="${this._formatDate('mmmm', this.date) == month}">
										<div class="cwc-details">
											<span class="cwc-month">${month}</span>
										</div>
									</li>
								`) : ''}
							</ul>
							<div class="cwc-bottom-controls">
								<cwc-control-button class="cwc-bottom-button button-today" @click="${this._today.bind(this)}">Today</cwc-control-button>
								<cwc-control-button class="cwc-bottom-button button-close" @click="${this.hide.bind(this)}">Close</cwc-control-button>
							</div>
						</div>
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
	 * @public @static @get @name observedProperties
	 * @description Provide properties to watch for changes
	 * @return {Array} Array of property names as strings
	 */
	static get observedAttributes() { return ['format', 'label', 'required', 'disabled', 'validate-on-load', 'placeholder', 'context'] }

	/**
	 * @public @name propertyChanged
	 * @description Callback run when a custom elements properties change
	 * @param {String} property The property name
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
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() { this.today = new Date() }

	/**
	 * @private @name open
	 * @description Show the date picker
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.disabled) return;

		this._open = true;
		this.updateTemplate();
		let liveValue = this.shadowRoot.querySelector('#input').value;
		if (!!liveValue) this.selected = this._stringToDate(liveValue);
		else this.selected = null;

		this.date.setDate(1);
		this.date.setMonth(this.selected ? this.selected.getMonth() : this.today.getMonth());
		this.date.setFullYear(this.selected ? this.selected.getFullYear() : this.today.getFullYear());
		this.date = new Date(this.date);

		this._createMonth();
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
	validate(value) { return this.shadowRoot.querySelector('cwc-control-input').validate(value) }

	/**
	 * @private @name _closed
	 * @description Run when the picker is closed, to save values and emit events
	 */
	_closed() {
		this._open = false;
		this.updateTemplate();

		this.value = this.selected ? this._formatDate(this.format, this.selected) : undefined;
		this.shadowRoot.querySelector('cwc-control-input').validate(this.value)
		this.opened = false;
		this.invalid = this.shadowRoot.querySelector('#input').invalid;

		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));

		document.body.style.overflow = this.scrollable;

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');
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

		this.selected = this._stringToDate(input.value);
		this.value = this.selected ? this._formatDate(this.format, this.selected) : undefined;
		this.invalid = input.invalid;

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');

		this.updateTemplate();
	}

	/**
	 * @private @name _clear
	 * @description Clear the selected date
     * @param {Event} ev Any event that kicks the function
	 */
	_clear(ev) {
		this.selected = null;
	}

	/**
	 * @private @name _delete
	 * @description Delete the date entered into thte input box
     * @param {Event} ev Any event that kicks the function
	 */
	_delete(ev) {
		this.value = '';
		this.shadowRoot.querySelector('#input').value = '';
		this.invalid = this.shadowRoot.querySelector('#input').invalid;

		if (this.invalid) this.setAttribute('invalid', '');
		else this.removeAttribute('invalid');

		this.shadowRoot.querySelector('#input').focus();

		this.updateTemplate();
		this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
	}

	/**
	 * @private @name _today
	 * @description Set the date to today
     * @param {Event} ev Any event that kicks the function
	 */
	_today(ev) {
		this.date.setDate(1);
		this.date.setMonth(this.today.getMonth());
		this.date.setFullYear(this.today.getFullYear());
		this.date = new Date(this.date);
		this._createMonth();

		this.mode = 'day';
		this.updateTemplate();
	}

	/**
	 * @private @name _monthSuffix
	 * @description Generate a month suffix from date object
     * @param {Date} date Date object
	 * @return {String} Date suffix such as st, nd, rd, th
	 */
	_monthSuffix(date) {
		if (!date || typeof date !== 'object') return '';
		let dateNum = date.getDate();
		return [1, 21, 31].indexOf(dateNum) >= 0 ? 'st' : ([2, 22].indexOf(dateNum) >= 0 ? 'nd' : ([3, 23].indexOf(dateNum) >= 0 ? 'rd' : 'th'));
	}

	/**
	 * @private @name _datesEqual
	 * @description Check if two dates are equal
     * @param {Date} date1 Date object
     * @param {Date} date2 Date object
	 * @return {Boolean} Are the two dates equal
	 */
	_datesEqual(date1, date2) {
		return !!date1 && !!date2 && !!date1.toLocaleDateString && !!date2.toLocaleDateString && date1.toLocaleDateString() === date2.toLocaleDateString();
	}

	/**
	 * @private @name _formatDate
	 * @description Format a date in a prticular format
     * @param {String} format The format of the date in e.g. dd/mm/yy
     * @param {Date} date Date object
	 * @return {Boolean} Are the two dates equal
	 */
	_formatDate(format, date) {
		if (!date || typeof date !== 'object') return '';

		let formatted = '';
		let parts = format.split(/\s|\\|\/|\-/);
		for (let part of parts) {
			// ddd, dd, d
			formatted += part.toLowerCase() === 'dddd' ? this.fullDays[date.getDay()] : '';
			formatted += part.toLowerCase() === 'ddd' ? this.abbDays[date.getDay()] : '';
			formatted += part.toLowerCase() === 'dds' ? (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + this._monthSuffix(date) : '';
			formatted += part.toLowerCase() === 'dd' ? (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) : '';
			formatted += part.toLowerCase() === 'ds' ? (date.getDate()) + this._monthSuffix(date) : '';
			formatted += part.toLowerCase() === 'd' ? (date.getDate()) : '';

			// mmm, mm, m
			formatted += part.toLowerCase() === 'mmmm' ? this.fullMonths[date.getMonth()] : '';
			formatted += part.toLowerCase() === 'mmm' ? this.abbMonths[date.getMonth()] : '';
			formatted += part.toLowerCase() === 'mm' ? (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth()) : '';
			formatted += part.toLowerCase() === 'm' ? date.getMonth() + 1 : '';

			// mmm, mm, m
			formatted += part.toLowerCase() === 'yyyy' ? date.getFullYear() : '';
			formatted += part.toLowerCase() === 'yy' ? parseInt((date.getYear() / 100 + '').split('.')[1]) : '';

			// spacer
			let pos = format.indexOf(part);
			if (pos + part.length < format.length) formatted += format.substring(pos + part.length, pos + part.length + 1);
		}

		return formatted;
	}

	/**
	 * @private @name _createMonth
	 * @description Generate all the months for the calendar
	 */
	_createMonth() {
		// chache current place
		let cache = { day: this.date.getDate(), month: this.date.getMonth(), year: this.date.getFullYear() };

		// rewind the date
		let days = [];
		while (this.date.getDay() != 1) this.date.setDate(this.date.getDate() - 1);

		// do the first monday to get past loop
		days.push({
			'id': days.length,
			'date': new Date(this.date),
			'disabled': this.date.getMonth() != cache.month
		});

		this.date.setDate(this.date.getDate() + 1);

		// now loop until we hit the next monday that is not in the month we selected
		while (!(this.date.getDay() == 1 && this.date.getMonth() != cache.month)) {
			days.push({
				'id': days.length,
				'date': new Date(this.date),
				'disabled': this.date.getMonth() != cache.month
			});
			this.date.setDate(this.date.getDate() + 1);
		}
		this.days = days;

		// reset the date object
		this.date.setDate(cache.day);
		this.date.setMonth(cache.month);
		this.date.setFullYear(cache.year);

		this.updateTemplate();
	}

	/**
	 * @private @name _internalFormat
	 * @description Create in internal date string representation
	 * @param {Date} date A date object to convert
	 * @return {String} a date string in YYYY-MM-DD format
	 */
	_internalFormat(date) {
		return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	}

	/**
	 * @private @name _selectDay
	 * @description Select a day from calendar
	 * @param {Number} idx The index of the day from the array
	 * @param {Boolean} disabled Is this day disabled?
	 * @param {Event} ev The event that called this function
	 */
	_selectDay(idx, disabled, ev) {
		// set selected
		if (disabled) return;
		this.selected = new Date(this.days[parseInt(idx)].date);
		this.hide();
	}

	/**
	 * @private @name _selectMonth
	 * @description Select a month from calendar
	 * @param {Number} idx The index of the month from the array
	 * @param {Event} ev The event that called this function
	 */
	_selectMonth(idx, ev) {
		var dateObject = new Date();

		dateObject.setDate(this.date.getDate());
		dateObject.setMonth(idx);
		dateObject.setYear(this.date.getFullYear());

		this.date = dateObject;
		this._createMonth();

		this.mode = 'day';
		this.updateTemplate();
	}

	/**
	 * @private @name _selectYear
	 * @description Select a year from calendar
	 * @param {Number} idx The index of the year from the array
	 * @param {Event} ev The event that called this function
	 */
	_selectYear(idx, ev) {
		var dateObject = new Date();

		dateObject.setDate(this.date.getDate());
		dateObject.setMonth(this.date.getMonth());
		dateObject.setYear(this.years[idx]);

		this.date = dateObject
		this._createMonth();

		this.mode = 'day';
		this.updateTemplate();
	}

	/**
	 * @private @name _changeMode
	 * @description Change the calendar mode from day to month to year so people can choose them
	 */
	_changeMode(type) {
		if (type == this.mode) type = 'day';

		if (type == 'year') {
			var years = [];
			var start = parseInt(this.date.getFullYear()) - 12;
			for (var i = start; i < start + 25; i++) years.push(i);

			this.years = years;
			this.mode = 'year';
		}

		this.mode = type;
		this.updateTemplate();
	}

	/**
	 * @private @name _back
	 * @description Go back on days to the previous months days
	 */
	_back() {
		if (this.mode == 'day') {
			this.date.setMonth(this.date.getMonth() - 1);
			this.date = new Date(this.date);
			this._createMonth();
		} else if (this.mode == 'year') {
			var start = parseInt(this.years[0]) - 25;
			this.years = [];
			for (var i = start; i < start + 25; i++) this.years.push(i);
		}

		this.updateTemplate();
	}

	/**
	 * @private @name _forward
	 * @description Go forward on days to the next months days
	 */
	_forward() {
		if (this.mode == 'day') {
			this.date.setMonth(this.date.getMonth() + 1);
			this.date = new Date(this.date);
			this._createMonth();
		} else if (this.mode == 'year') {
			var start = parseInt(this.years[24]) + 1;
			this.years = [];
			for (var i = start; i < start + 25; i++) this.years.push(i);
		}

		this.updateTemplate();
	}

	/**
	 * @private @name _stringToDate
	 * @description Convert a string to a date object
	 * @param {String} string The date as a string which wants to be converted (can also be things like today, next week)
	 * @return {Date} A date object base on teh string
	 */
	_stringToDate(string) {
		let newDate = new Date();

		switch (string.toLowerCase()) {
			case 'today': case 'now': case 'current': break;
			case 'tomorrow': newDate.setDate(this.today.getDate() + 1); break;
			case 'yesterday': newDate.setDate(this.today.getDate() - 1); break;
			case 'next week': newDate.setDate(this.today.getDate() + 7); break;
			case 'fortnight': case 'next 2 weeks': newDate.setDate(this.today.getDate() + 14); break;
			case 'last week': newDate.setDate(this.today.getDate() - 7); break;
			case 'last 2 weeks': newDate.setDate(this.today.getDate() - 14); break;
			case 'last month': newDate.setMonth(this.today.getMonth() - 1); break;
			case 'next month': newDate.setMonth(this.today.getMonth() + 1); break;
			case 'last year': newDate.setFullYear(this.today.getFullYear() - 1); break;
			case 'next year': newDate.setFullYear(this.today.getFullYear() + 1); break;
			default:
				let fParts = this.format.toLowerCase().split(/\s|\\|\/|\-/);
				let dParts = string.split(/\s|\\|\/|\-/);

				// get indexes
				let dddd = fParts.indexOf('dddd');
				let ddd = fParts.indexOf('ddd');
				let dds = fParts.indexOf('dds');
				let dd = fParts.indexOf('dd');
				let ds = fParts.indexOf('ds');
				let d = fParts.indexOf('d');

				let mmmm = fParts.indexOf('mmmm');
				let mmm = fParts.indexOf('mmm');
				let mm = fParts.indexOf('mm');
				let m = fParts.indexOf('m');

				let yyyy = fParts.indexOf('yyyy');
				let yy = fParts.indexOf('yy');

				if (dd >= 0) newDate.setDate(parseInt(dParts[dd]));
				else if (d >= 0) newDate.setDate(parseInt(dParts[d]));

				if (mm >= 0) newDate.setMonth(parseInt(dParts[mm]) - 1);
				else if (m >= 0) newDate.setMonth(parseInt(dParts[m]) - 1);

				if (yyyy >= 0) newDate.setFullYear(parseInt(dParts[yyyy]));
				else if (yy >= 0) newDate.setYear(parseInt(dParts[yy]));

				if (isNaN(newDate.getTime())) newDate = new Date();
				break;
		}

		return newDate;
	}

	/**
	 * @private @name _pattern
	 * @description Turn a date pattern into a regex so we can validate against a string
	 * @param {String} format The format we want to convert such as DD/MM/YYYY
	 * @return {String} A regex pattern based off the format
	 */
	_pattern(format) {
		let parsed = this.format.toLowerCase()
			.replace('dd', '(3[0-1]|2[0-9]|1[0-9]|0[0-9])')
			.replace('d', '(3[0-1]|2[0-9]|1[0-9]|[0-9])')
			.replace('mmmm', '(january|february|march|april|may|june|july|august|september|october|november|december|January|February|March|April|May|June|July|August|September|October|November|December)')
			.replace('mmm', '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)')
			.replace('mm', '(1[0-2]|0[0-9])')
			.replace('m', '(1[0-2]|[0-9])')
			.replace('yyyy', '[0-9]{4}')
			.replace('yy', '[0-9]{2}');

		return `^(${parsed})$|^today$|^tomorrow$|^yesterday$|^next week$|^fortnight$|^last week$|^last month$|^next month$|^last year$|^next year$`;
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-control-date', CWCControlDate);
