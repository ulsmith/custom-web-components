import { CustomHTMLElement, html } from '../../../../custom-web-component/index.js';

const ICONS = {
	'': html``,
}

/**
 * @public @name CWCIconBrandPrefixG
 * @extends CustomHTMLElement
 * @description Custom Web Component, common component, brand icons
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * 
 * @attribute {String} name The name of the icon to display
 *
 * @example
 * <cwc-icon-brand-prefix-g name="foo"></cwc-icon-brand-prefix-g>
 */
class CWCIconBrandPrefixG extends CustomHTMLElement {

	/**
	 * @public @static @name template
	 * @description Template function to return web component UI
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
			    :host {
					display: inline-block;
					width: 30px;
					height: 30px;
					padding: 5px;
					box-sizing: border-box;
					vertical-align: middle;
				}

				svg { float: left; }
			</style>

			${ICONS[this.getAttribute('name')]}
		`;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['name'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) { this.updateTemplate() }
}

// bootstrap the class as a new web component
customElements.define('cwc-icon-brand-prefix-g', CWCIconBrandPrefixG);