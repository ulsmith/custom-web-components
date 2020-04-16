import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayHelp
 * @extends CustomHTMLElement
 * @description Custom Web Component, overlay help tooltip with clickable icon
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @event show The help tip has been shown
 * @event hide The help tip has been hidden
 * 
 * @method show() Show the help tip manually
 * @method hide() Hide the help tip manually
 * 
 * @attribute {Flag} flip Swap help tip message to other side
 * 
 * @style_variable --cwc-overlay-help--background
 * @style_variable --cwc-overlay-help--border
 * @style_variable --cwc-overlay-help--border-radius
 * @style_variable --cwc-overlay-help--box-shadow
 * @style_variable --cwc-overlay-help--color
 * @style_variable --cwc-overlay-help--font-size
 * @style_variable --cwc-overlay-help--padding
 * @style_variable --cwc-overlay-help--width
 * 
 * @style_variable --cwc-overlay-help--icon--width
 * @style_variable --cwc-overlay-help--icon--height
 * @style_variable --cwc-overlay-help--icon--color
 * 
 * @slot root Single root slot for text to show in help tip
 * 
 * @example
 * <cwc-overlay-help>This is a help message...</cwc-overlay-help>
 */
class CWCOverlayHelp extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._windowEvent;
		this._helpNode;
		this._actionTimeout;
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
					position: relative;
					display: inline-block;
					width: var(--cwc-overlay-help--icon--width, 20px);
					height: var(--cwc-overlay-help--icon--height, 20px);
					vertical-align: text-bottom;
				}

				.cwc-help {
					padding: 0px;
					vertical-align: top;
					height: var(--cwc-overlay-help--icon--height, 20px);
					width: var(--cwc-overlay-help--icon--width, 20px);
					fill: var(--cwc-overlay-help--icon--color, black);
				}

				.cwc-helptip {
					display: none;
					position: absolute;
					bottom: calc(var(--cwc-overlay-help--icon--height, 20px) + 10px);
					right: calc(calc(var(--cwc-overlay-help--icon--width, 20px) / 2) - 15px);
					z-index: -1;
					opacity: 0;
					text-align: left;
					transition: opacity 150ms linear;
					width: var(--cwc-overlay-help--helptip--width, 200px);
					max-width: var(--cwc-overlay-help--helptip--max-width, 200px);
					box-shadow: var(--cwc-overlay-help--helptip--box-shadow, 0px 0px 5px 0px grey);
					border: var(--cwc-overlay-help--helptip--border, none);
					border-radius: var(--cwc-overlay-help--helptip--border-radius, 0);
					background-color: var(--cwc-overlay-help--helptip--background-color, black);
					font-size: var(--cwc-overlay-help--helptip--font-size, 14px);
					color: var(--cwc-overlay-help--helptip--color, white);
					padding: var(--cwc-overlay-help--helptip--padding, 10px);
				}

				.cwc-pointer {
					position: absolute;
					right: 10px;
					bottom: -5px;
					width: 0;
					height: 0;
					margin-left: -5px;
					border-left: 5px solid transparent;
					border-right: 5px solid transparent;
					border-top: 5px solid var(--cwc-overlay-help--helptip-pointer--background-color, var(--cwc-overlay-help--helptip--background-color, black));
				}

				:host([flip]) .cwc-helptip { right: unset; left: calc(calc(var(--cwc-overlay-help--icon--width, 20px) / 2) - 15px); }
				:host([flip]) .cwc-pointer { right: unset; left: 15px; }
			</style>


			<cwc-icon-material-general id="help" class="cwc-help" name="help"></cwc-icon-material-general>

			<div id="helptip" class="cwc-helptip">
				<slot></slot>
				<span class="cwc-pointer"></span>
			</div>
        `;
	}

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		this._helpNode = this.shadowRoot.querySelector('#help');
		this._helpTipNode = this.shadowRoot.querySelector('#helptip');

		if (this._helpNode) {
			this._helpNode.addEventListener('click', this.show.bind(this));
			this._helpNode.addEventListener('mouseover', this.show.bind(this));
			this._helpNode.addEventListener('mouseout', this.hide.bind(this));
		}

		window.addEventListener('scroll', this._forceHide.bind(this));
	}

	/**
	 * @public @name disconnected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	disconnected() {
		if (this._helpNode) {
			this._helpNode.removeEventListener('click', this.show.bind(this));
			this._helpNode.removeEventListener('mouseover', this.show.bind(this));
			this._helpNode.removeEventListener('mouseout', this.hide.bind(this));
		}

		window.removeEventListener('scroll', this._forceHide.bind(this));
	}

	/**
     * @public @name show
	 * @description Show the help text
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this._helpTipNode.display == 'block') return;

		this.dispatchEvent(new CustomEvent('show'));
		clearTimeout(this._actionTimeout);

		this._actionTimeout = setTimeout(() => {
			// add it
			this._helpTipNode.style.display = 'block';
			this._helpTipNode.style.zIndex = 1000;

			// show it
			setTimeout(() => this._helpTipNode.style.opacity = 1, 50);
		}, 100);
	}

	/**
     * @public @name hide
	 * @description Hide the help text
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		clearTimeout(this._actionTimeout);
		this._actionTimeout = setTimeout(() => {
			this.dispatchEvent(new CustomEvent('hide'));
			this._helpTipNode.style.opacity = 0;

			// hide it
			setTimeout(() => {
				this._helpTipNode.style.display = 'none';
				this._helpTipNode.style.zIndex = -1;
			}, 100);
		}, 100);
	}

	/**
     * @public @name _forceHide
	 * @description Force hide the help text
     * @param {Event} ev Any event that kicks the function
	 */
	_forceHide(ev) {
		if (this._helpTipNode.style.display === 'none') return;

		this.dispatchEvent(new CustomEvent('hide'));
		this._helpTipNode.style.opacity = 0;

		// hide it
		setTimeout(() => {
			this._helpTipNode.style.display = 'none';
			this._helpTipNode.style.zIndex = -1;
		}, 100);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-help', CWCOverlayHelp);
