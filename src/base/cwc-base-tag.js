import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCBaseTag
 * @extends CustomHTMLElement
 * @description Custom Web Component, a simple tag you can style
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @style_variable --cwc-base-tag--padding - Padding of the element
 * @style_variable --cwc-base-tag--font-size - Font size of the element
 * @style_variable --cwc-base-tag--line-height - Line height of the element
 * @style_variable --cwc-base-tag--background - Background of the element
 * @style_variable --cwc-base-tag--color - Colour / Fill of the element content
 * @style_variable --cwc-base-tag--border-radius - Border radius of the element
 *
 * @example HTML
 * <cwc-base-tag>Hello!</cwc-base-tag>
 */
class CWCBaseTag extends CustomHTMLElement {
	
	/**
	 * @public @name template
	 * @description Template function to return web component UI
	 * @return {String} HTML template block
	 */
	static template() {
		return html`
			<style>
				:host { 
					display: inline-block; 
					padding: var(--cwc-base-tag--padding, 6px 8px);
					font-size: var(--cwc-base-tag--font-size, 14px); 
					line-height: var(--cwc-base-tag--line-height, 16px); 
					background: var(--cwc-base-tag--background, #ddd); 
					color: var(--cwc-base-tag--color, #222);
					fill: var(--cwc-base-tag--color, #222);
					border-radius: var(--cwc-base-tag--border-radius, 0);
				}
			</style>

			<slot></slot>
		`;
	}
}

// define the new custom element
customElements.define('cwc-base-tag', CWCBaseTag);