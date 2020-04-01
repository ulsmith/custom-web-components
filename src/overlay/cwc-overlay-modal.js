import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayModal
 * @extends CustomHTMLElement
 * @description Custom Web Component, adds a modal to the page that can close itself
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The help tip has been shown
 * @event hide The help tip has been hidden
 *
 * @method show() Show the modal manually
 * @method hide() Hide the modal manually
 * @method toggle() Toggle the modal manually from hide / show or show / hide
 * 
 * @style_variable --cwc-overlay-modal--border
 * @style_variable --cwc-overlay-modal--border-radius
 * @style_variable --cwc-overlay-modal--box-shadow
 * @style_variable --cwc-overlay-modal--background
 * @style_variable --cwc-overlay-modal--transition
 * 
 * @style_variable --cwc-overlay-modal--header--padding
 * @style_variable --cwc-overlay-modal--header--background
 * @style_variable --cwc-overlay-modal--header--color
 *
 * @style_variable --cwc-overlay-modal--body--padding
 * @style_variable --cwc-overlay-modal--body--background
 * @style_variable --cwc-overlay-modal--body--color
 *
 * @style_variable --cwc-overlay-modal--footer--padding
 * @style_variable --cwc-overlay-modal--footer--background
 * @style_variable --cwc-overlay-modal--footer--color
 * 
 * @slot header Content in the title area, the header, omit to remove
 * @slot body Content that goes in the body
 * @slot footer Content that goes in the footer, omit to remove
 *
 * @example HTML
 * <cwc-overlay-modal>
 * 	   <div slot="header">
 * 	       <h1>A Modal</h1>
 *     </div>
 * 	   <div slot="body">
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
					border: var(--cwc-overlay-modal--border, 1px solid #ccc);
					border-radius: var(--cwc-overlay-modal--border-radius, 0px);
					box-shadow: var(--cwc-overlay-modal--box-shadow, 0px 0px 6px -4px rgba(0,0,0,0.75));
					background: var(--cwc-overlay-modal--background, white);
					transition: var(--cwc-overlay-modal--transition, ease-out 200ms opacity);
					display: none;
					opacity: 0;
					z-index: 1000;
				}

				.cwc-overlay-modal .header {
					padding: var(--cwc-overlay-modal--header--padding, 10px);
					background: var(--cwc-overlay-modal--header--background, #444);
					color: var(--cwc-overlay-modal--header--color, white);
					fill: var(--cwc-overlay-modal--header--color, white);
				}

				.cwc-overlay-modal .header .icon {
					position: absolute;
					top: 2px;
					right: 2px;
					width: 35px; 
					height: 35px;
					cursor: pointer;
					fill: var(--cwc-overlay-modal--header--color, white);
				}

				.cwc-overlay-modal .body {
					padding: var(--cwc-overlay-modal--body--padding, 10px);
					overflow: auto;
					background: var(--cwc-overlay-modal--body--background, transparent);
					color: var(--cwc-overlay-modal--body--color, #222);
					fill: var(--cwc-overlay-modal--body--color, #222);
				}

				.cwc-overlay-modal .footer {
					padding: var(--cwc-overlay-modal--footer--padding, 10px);
					background: var(--cwc-overlay-modal--footer--background, #e4e4e4);
					color: var(--cwc-overlay-modal--footer--color, #222);
					fill: var(--cwc-overlay-modal--footer--color, #222);
				}
			</style>

			<div class="cwc-overlay-modal">
				<div class="box">
					<div class="header" ?hidden="${!this._header}">
						<slot name="header"></slot>
						<span class="icon" @click="${this.hide.bind(this)}">${CWCIconMaterialGeneral.close}</span>
					</div>
					<div id="body" class="body">
						<slot name="body"></slot>
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
		const header = this.shadowRoot.querySelector('slot[name="header"]');
		const footer = this.shadowRoot.querySelector('slot[name="footer"]');
		header.parentNode.style.display = header.assignedNodes().length < 1 ? 'none' : 'block';
		footer.parentNode.style.display = footer.assignedNodes().length < 1 ? 'none' : 'block';

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
		this.dispatchEvent(new CustomEvent('show'));
	}

	/**
	 * @public @name hide
	 * @description Hide the loading spinner
	 */
	hide() {
		this.visible = false;
		this.visibility();
		this.dispatchEvent(new CustomEvent('hide'));
	}
}

// define the new custom element
customElements.define('cwc-overlay-modal', CWCOverlayModal);