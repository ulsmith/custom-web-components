import { CustomHTMLElement, html } from '../../../../custom-web-component/index.js';

const ICONS = {
	dropbox: html`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 478.165 478.165" style="enable-background:new 0 0 478.165 478.165;" xml:space="preserve"><g><path id="Dropbox_1_" d="M387.911,188.357L244.84,101.271l90.254-74.713l143.071,88.082L387.911,188.357z M334.157,353.025 l137.333-80.352l-82.663-69.991L254.344,283.97L334.157,353.025z M223.821,283.97L89.337,202.662L6.734,272.654l137.333,80.332 L223.821,283.97z M95.972,341.549v25.841l137.333,84.217V291.78l-91.13,74.693L95.972,341.549z M382.034,341.549l-45.984,24.904 l-91.23-74.713v159.866l137.174-84.217L382.034,341.549L382.034,341.549z M233.324,101.271l-90.214-74.713L0,114.64l90.333,73.697 L233.324,101.271z" /></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>`,
}

/**
 * @public @name CWCIconMaterialBrand
 * @extends CustomHTMLElement
 * @description Custom Web Component, common component, material icons brand
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @attribute {String} name The name of the icon to display
 *
 * @example
 * <cwc-icon-material-brand name="foo"></cwc-icon-material-brand>
 */
class CWCIconMaterialBrand extends CustomHTMLElement {

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
customElements.define('cwc-icon-material-brand', CWCIconMaterialBrand);