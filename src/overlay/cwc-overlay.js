import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlay
 * @extends CustomHTMLElement
 * @description Application Web Component, common component, overlay base clas to provide a generic overlay for modals etc.
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * <cwc-overlay visible><span>Your thing overlayed</span></cwc-overlay>
 */
class CWCOverlay extends CustomHTMLElement {

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
					transition: opacity 190ms ease-in-out;
				}

				:host([visible]) {
					display: block;
					z-index: var(--cwc-overlay--z-index, 1001);
				}

				.cwc-overlay-backdrop {
					display: block;
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: var(--cwc-overlay--z-index, 1001);
					background: var(--cwc-overlay--backdrop--background, white);
					opacity: var(--cwc-overlay--backdrop--opacity, 0.5);
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
					z-index: var(--cwc-overlay--z-index, 1001);
				}

				.cwc-overlay-container .cwc-overlay-content {
					position: relative;
					margin: 10px;
					padding: var(--cwc-overlay--padding, 20px);
					background: var(--cwc-overlay--background, white);
					border: var(--cwc-overlay--border, none);
					border-radius: var(--cwc-overlay--border-radius, 0);
					box-shadow: var(--cwc-overlay--box-shadow, 0px 0px 15px 0px grey);
				}
			</style>

			<div id="cwc-overlay">
				<div class="cwc-overlay-backdrop"></div>
				<div id="container" class="cwc-overlay-container" @click="${this.hide.bind(this)}">
					<div class="cwc-overlay-content"><slot></slot></div>
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
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() { 
		this.removeAttribute('visible');
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
	hide(ev) {
		if (this.style.display === 'none') return;

		if (!!ev && ev.target && ev.target.parentNode && ev.target.parentNode.id !== 'cwc-overlay') return;

		this.dispatchEvent(new CustomEvent('hide'));
		this.style.opacity = 0;

		setTimeout(() => this.removeAttribute('visible'), 200);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay', CWCOverlay);
