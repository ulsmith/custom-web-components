import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlayModal
 * @extends CustomHTMLElement
 * @description Custom Web Component, overlay base component to provide a modal bare bones or with header and footer.
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The modal has been shown
 * @event hide The modal has been hidden
 *
 * @method show() Show the modal manually
 * @method hide() Hide the modal manually
 * @method toggle() Toggle the modal manually from hide / show or show / hide
 *
 * @attribute {Flag} visible The loading overlay is visible
 * 
 * @style_variable --cwc-overlay-modal--background
 * @style_variable --cwc-overlay-modal--border
 * @style_variable --cwc-overlay-modal--border-radius
 * @style_variable --cwc-overlay-modal--box-shadow
 * @style_variable --cwc-overlay-modal--height
 * @style_variable --cwc-overlay-modal--max-width
 * @style_variable --cwc-overlay-modal--max-height
 * @style_variable --cwc-overlay-modal--padding
 * @style_variable --cwc-overlay-modal--transition-time
 * @style_variable --cwc-overlay-modal--width
 * @style_variable --cwc-overlay-modal--z-index
 * 
 * @style_variable --cwc-overlay-modal--backdrop--background
 * @style_variable --cwc-overlay-modal--backdrop--opacity
 * 
 * @style_variable --cwc-overlay-modal--header--background
 * @style_variable --cwc-overlay-modal--header--border
 * @style_variable --cwc-overlay-modal--header--border-radius
 * @style_variable --cwc-overlay-modal--header--color
 * @style_variable --cwc-overlay-modal--header--padding
 * 
 * @style_variable --cwc-overlay-modal--header--icon--fill
 * @style_variable --cwc-overlay-modal--header--icon--height
 * @style_variable --cwc-overlay-modal--header--icon--padding
 * @style_variable --cwc-overlay-modal--header--icon--right
 * @style_variable --cwc-overlay-modal--header--icon--width
 * 
 * @style_variable --cwc-overlay-modal--body--background
 * @style_variable --cwc-overlay-modal--body--border
 * @style_variable --cwc-overlay-modal--body--border-radius
 * @style_variable --cwc-overlay-modal--body--color
 * @style_variable --cwc-overlay-modal--body--padding
 * 
 * @style_variable --cwc-overlay-modal--footer--background
 * @style_variable --cwc-overlay-modal--footer--border
 * @style_variable --cwc-overlay-modal--footer--border-radius
 * @style_variable --cwc-overlay-modal--footer--color
 * @style_variable --cwc-overlay-modal--footer--padding
 * 
 * @style_variable --cwc-overlay-modal--tablet--height
 * @style_variable --cwc-overlay-modal--tablet--max-width
 * @style_variable --cwc-overlay-modal--tablet--max-height
 * @style_variable --cwc-overlay-modal--tablet--width
 * 
 * @style_variable --cwc-overlay-modal--mobile--height
 * @style_variable --cwc-overlay-modal--mobile--max-width
 * @style_variable --cwc-overlay-modal--mobile--max-height
 * @style_variable --cwc-overlay-modal--mobile--width
 * 
 * @slot header [optional] A header for your modal, auto sizing to match content, includes cross to close
 * @slot body Main area for content, auto scrolling on overflow
 * @slot footer [optional] A footer for your modal, auto sizing to match content
 *
 * @example
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
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();
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
					display: none;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					opacity: 0;
					z-index: -1;
					transition: opacity var(--cwc-overlay-modal--transition-time, 190ms) ease-in-out;
				}

				:host([visible]) {
					display: block;
					z-index: var(--cwc-overlay-modal--z-index, 1001);
				}

				.cwc-overlay-backdrop {
					display: block;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: var(--cwc-overlay-modal--z-index, 1001);
					background: var(--cwc-overlay-modal--backdrop--background, white);
					opacity: var(--cwc-overlay-modal--backdrop--opacity, 0.5);
				}

				.cwc-overlay-container {
					border-radius: inherit;
					display: flex;
					align-items: center;
					justify-content: center;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: var(--cwc-overlay-modal--z-index, 1001);
				}

				.cwc-overlay-container .cwc-overlay-content {
					display: flex;
					flex-flow: column;
					position: relative;
					margin: 10px;
					padding: var(--cwc-overlay-modal--padding, 0);
					background: var(--cwc-overlay-modal--background, white);
					border: var(--cwc-overlay-modal--border, none);
					border-radius: var(--cwc-overlay-modal--border-radius, 0);
					box-shadow: var(--cwc-overlay-modal--box-shadow, 0px 0px 15px 0px grey);
					width: var(--cwc-overlay-modal--width, auto);
					height: var(--cwc-overlay-modal--height, auto);
					max-width: var(--cwc-overlay-modal--max-width, 70%);
					max-height: var(--cwc-overlay-modal--max-height, 70%);
				}

				.cwc-overlay-container .cwc-overlay-content .header {
					position: relative;
					flex: 0 1;
					border: var(--cwc-overlay-modal--header--border, none);
					border-radius: var(--cwc-overlay-modal--header--border-radius, 0);
					padding: var(--cwc-overlay-modal--header--padding, 20px 70px 20px 20px);
					background: var(--cwc-overlay-modal--header--background, #444);
					color: var(--cwc-overlay-modal--header--color, #eee);
				}

				.cwc-overlay-container .cwc-overlay-content .header .icon {
					position: absolute;
					top: 50%;
					right: var(--cwc-overlay-modal--header--icon--right, 20px);
					transform: translateY(-50%);
					padding: var(--cwc-overlay-modal--header--icon--padding, 0);
					width: var(--cwc-overlay-modal--header--icon--width, 35px); 
					height: var(--cwc-overlay-modal--header--icon--height, 35px);
					cursor: pointer;
					fill: var(--cwc-overlay-modal--header--icon--fill, white);
				}

				.cwc-overlay-container .cwc-overlay-content .body {
					flex: 1 1;
					border: var(--cwc-overlay-modal--body--border, none);
					border-radius: var(--cwc-overlay-modal--body--border-radius, 0);
					padding: var(--cwc-overlay-modal--body--padding, 20px);
					background: var(--cwc-overlay-modal--body--background, transparent);
					color: var(--cwc-overlay-modal--body--color, #222);
					overflow: auto;
				}

				.cwc-overlay-container .cwc-overlay-content .footer {
					flex: 0 1;
					border: var(--cwc-overlay-modal--footer--border, none);
					border-radius: var(--cwc-overlay-modal--footer--border-radius, 0);
					padding: var(--cwc-overlay-modal--footer--padding, 20px);
					background: var(--cwc-overlay-modal--footer--background, #eee);
					color: var(--cwc-overlay-modal--footer--color, #222);
				}

				@media (max-width: 980px) {
					.cwc-overlay-container .cwc-overlay-content {
						width: var(--cwc-overlay-modal--tablet--width, auto);
						height: var(--cwc-overlay-modal--tablet--height, auto);
						max-width: var(--cwc-overlay-modal--tablet--max-width, 80%);
						max-height: var(--cwc-overlay-modal--tablet--max-height, 80%);
					}
				}

				@media (max-width: 600px) {
					.cwc-overlay-container .cwc-overlay-content {
						width: var(--cwc-overlay-modal--mobile--width, auto);
						height: var(--cwc-overlay-modal--mobile--height, auto);
						max-width: var(--cwc-overlay-modal--mobile--max-width, 90%);
						max-height: var(--cwc-overlay-modal--mobile--max-height, 90%);
					}
				}
			</style>

			<div id="cwc-overlay">
				<div class="cwc-overlay-backdrop"></div>
				<div id="container" class="cwc-overlay-container" @click="${this.hide.bind(this)}">
					<div class="cwc-overlay-content">
						<div class="header">
							<slot name="header"></slot>
							<cwc-icon-material-general name="close" class="icon" @click="${this.hide.bind(this, true)}"></cwc-icon-material-general>
						</div>
						<div class="body">
							<slot name="body"></slot>
						</div>
						<div class="footer">
							<slot name="footer"></slot>
						</div>
					</div>
				</div>
			</div>
        `;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide atributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['visible'] }

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
	 * @description Lifecycle hook that gets called when the element template is rendered
	 */
	templateUpdated() {
		const header = this.shadowRoot.querySelector('slot[name="header"]');
		const footer = this.shadowRoot.querySelector('slot[name="footer"]');
		header.parentNode.style.display = header.assignedNodes().length < 1 ? 'none' : 'block';
		footer.parentNode.style.display = footer.assignedNodes().length < 1 ? 'none' : 'block';
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	toggle(ev) {
		if (this.style.display === 'block') this.hide();
		else this.show();
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		if (this.style.display === 'block') return;

		this.dispatchEvent(new CustomEvent('show'));
		this.setAttribute('visible', '');

		setTimeout(() => {
			this.style.opacity = 1;
		}, 50);
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev, force) {
		if (this.style.display === 'none') return;

		if (!force && !!ev && ev.target && ev.target.parentNode && ev.target.parentNode.id !== 'cwc-overlay') return;

		this.dispatchEvent(new CustomEvent('hide'));
		this.style.opacity = 0;

		setTimeout(() => this.removeAttribute('visible'), 200);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-modal', CWCOverlayModal);
