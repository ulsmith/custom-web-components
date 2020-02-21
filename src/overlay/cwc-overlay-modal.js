import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayModal
 * @extends CustomHTMLElement
 * @description Application Web Component, adds a modal to the page that can close itself
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @example HTML
 * <cwc-overlay-modal>
 * 	   <div slot="header">
 * 	       <h1>A Modal</h1>
 *     </div>
 * 	   <div slot="main">
 * 	       <p>Some content...</p>
 *     </div>
 * 	   <div slot="footer">
 * 	       <button>A Button</button>
 *     </div>
 * </cwc-overlay-modal>
 */
class CWCOverlayModal extends CustomHTMLElement {

	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.visible = false;
		this._header = this.hasAttribute('header');
		this._footer = this.hasAttribute('footer');

		window.addEventListener('resize', this.adjustHost.bind(this));
	}
	
	/**
	 * @public @name template
	 * @description Template function to return web component HTML template
	 * 
	 * @return {TemplateResult} HTML template result
	 *
	 * @example JS
	 * this.updateTemplate(); // updates the template and topically re-renders changes
	 */
	static template() {
		return html`
			<style>
				:host {
					position: fixed;
					top: 50%;
					left: 50%;
					width: 50%;
					height: fit-content;
					box-shadow: 0px 0px 25px -1px rgba(0,0,0,0.75);
					background-color: white;
					transition: ease-out 200ms opacity;
					display: none;
					opacity: 0;
					z-index: 1000;
				}

				.cwc-overlay-modal .header {
					padding: 10px;
					background-color: #444;
					color: white;
				}

				.cwc-overlay-modal .header .icon {
					position: absolute;
					top: 2px;
					right: 2px;
					width: 35px; 
					height: 35px;
					cursor: pointer;
					fill: white;
				}

				.cwc-overlay-modal .main {
					padding: 10px;
					overflow: auto;

				}

				.cwc-overlay-modal .footer {
					padding: 10px;
					background-color: #e4e4e4;
				}
			</style>

			<div class="cwc-overlay-modal">
				<div class="box">
					<div class="header" ?hidden="${!this._header}">
					<!-- <div class="header"> -->
						<slot name="header"></slot>
						<span class="icon" @click="${this.hide.bind(this)}">${CWCIconMaterialGeneral.close}</span>
					</div>
					<div id="main" class="main">
						<slot name="main"></slot>
					</div>
					<div class="footer" ?hidden="${!this._footer}">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * @public @name connected
	 * @description Lifecycle hook that gets called when the element template is rendered
	 */
	templateUpdated() {
		this.visibility();
	}

	/**
	 * @public @name updateHeight
	 * @description Updates the menu and page height to match the window
	 * 
	 * @param {Event} ev The event that instigated the function
	 */
	visibility() {
		if (!this.visible) this.style.opacity = 0;
		else this.style.display = 'block';
		this.adjustHost();

		setTimeout(() => {
			if (!this.visible) this.style.display = 'none';
			else this.style.opacity = 1;
		}, 210);
	}

	/**
	 * @public @name updateHeight
	 * @description Updates the menu and page height to match the window
	 * 
	 * @param {Event} ev The event that instigated the function
	 */
	adjustHost() {
		if (!this.visible) return;
		this.style.maxHeight = Math.round((parseInt(window.innerHeight) / 10 * 8) - 80) + 'px';
		this.style.marginLeft = '-' + (parseInt(this.scrollWidth) / 2) + 'px';	
		this.style.marginTop = '-' + (parseInt(this.scrollHeight) / 2) + 'px';	
	}

	/**
	 * @public @name toggle
	 * @description Toggle the loading spinner from off/on to on/off
	 */
	toggle() {
		this.visible = !this.visible;
		this.visibility();
	}

	/**
	 * @public @name show
	 * @description Show the loading spinner
	 */
	show() {
		this.visible = true;
		this.visibility();
	}

	/**
	 * @public @name hide
	 * @description Hide the loading spinner
	 */
	hide() {
		this.visible = false;
		this.visibility();
	}
}

// define the new custom element
customElements.define('cwc-overlay-modal', CWCOverlayModal);