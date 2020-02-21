import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCBaseTag
 * @extends CustomHTMLElement
 * @description Custom Web Component, a simple tag you can change the size, color and shape of
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 *
 * @attribute size (extra-small, small, medium, large, extra-large) The size of the tag
 * @attribute color (grey, blue, red, green, orange, black, pink, purple, yellow, aqua, white) The color of the tag
 * @attribute shape (round, rounded, oval) The shape of the tag
 *
 * @example HTML
 * <cwc-base-tag size="small" color="blue" shape="rounded"></cwc-base-tag>
 */
class CWCBaseTag extends CustomHTMLElement {
	
	/**
	 * @public @name template
	 * @description Template function to return web component UI
	 * 
	 * @return {String} HTML template block
	 * 
	 * @example JS
	 * this.updateTemplate(); // updates the template and topically re-renders changes
	 */
	static template() {
		return html`
			<div id="cwc-resource-router" ?size="${this.getAttribute('size')}" ?color="${this.getAttribute('color')}" ?shape="${this.getAttribute('shape')}">
				<style>
					:host { display: inline-block; padding: 6px 8px; background: #ddd; color: #222;}
					:host([size='extra-small']) { padding: 2px 4px; font-size: 10px; line-height: 10px; }
					:host([size='small']) { padding: 4px 6px; font-size: 12px; line-height: 12px; }
					:host([size='medium']) { padding: 6px 8px; font-size: 14px; line-height: 16px; }
					:host([size='large']) { padding: 8px 12px; font-size: 18px; line-height: 18px; }
					:host([size='extra-large']) { padding: 10px 14px; font-size: 22px; line-height: 22px; }
					:host([shape='round']) { border-radius: 100px; }
					:host([shape='rounded']) { border-radius: 5px; }
					:host([shape='oval']) { border-radius: 75% / 77%; }
					:host([color='grey']) { background: #ddd; color: #222; }
					:host([color='blue']) { background: rgb(74, 74, 255); color: #fff; }
					:host([color='red']) { background: rgb(255, 44, 44); color: #fff; }
					:host([color='green']) { background: rgb(18, 163, 18); color: #fff; }
					:host([color='orange']) { background: rgb(255, 136, 26); color: #fff; }
					:host([color='black']) { background: #222; color: #fff; }
					:host([color='pink']) { background: #D729D5; color: #fff; }
					:host([color='purple']) { background: #8913D4; color: #fff; }
					:host([color='yellow']) { background: #E5E522; color: #444; }
					:host([color='aqua']) { background: #31AEDB; color: #FFF; }
					:host([color='white']) { background: #FFFFFF; color: #444; }
				</style>

				<slot></slot>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Lifecycle hook that sets attributes to observe on the element
	 * 
	 * @return {Array} An array of string attribute names (hyphoned)
	 */
	static get observedAttributes() {
		return ['size', 'shape', 'color'];
	}

	/**
	 * @public @name attributeChanged
	 * @description Lifecycle hook that gets called when the elements observed attributes change
     * 
	 * @param {String} property Name of the property changed
     * @param {Mixed} oldValue Value before the change
     * @param {Mixed} newValue Value after the change
	 */
	attributeChanged(property, oldValue, newValue) {
		this.updateTemplate();
	}
}

// define the new custom element
customElements.define('cwc-base-tag', CWCBaseTag);