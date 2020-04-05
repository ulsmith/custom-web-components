import { CustomHTMLElement, html } from '../../../../custom-web-component/index.js';

const ICONS = {
	'1001tracklists': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>1001Tracklists icon</title><path d="M9.422 10.723h-1.35v3.807h2.458v-4.048h2.94v4.337h-1.35v1.35h-1.349v2.458h2.458v-2.7h2.699v-5.204h-1.35v-1.35H9.422zm1.35 11.952h2.457v-2.458H10.77v2.458zm-2.676-20H6.747v1.35h-1.35v1.348H4.049v1.35h-1.35v6.699H1.35v1.35H0v2.457h1.35v1.35h1.349v1.349h2.458v-7.856h-1.35v-4.24h1.35v-1.35h1.349v-1.35h1.35V3.784h8.289v1.35h1.349v1.349h1.35v1.35h1.349v4.24h-1.35v7.856h2.458v-1.35h1.35v-1.35H24v-2.457h-1.35v-1.35h-1.349V6.724h-1.35v-1.35h-1.349V4.024h-1.349v-1.35h-1.35V1.326H8.097v1.35Z"></path></svg>`,
	'1password': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>1Password icon</title><path d="M10.51,10.013V7.299c0-0.306,0.248-0.554,0.554-0.554h1.911c0.306,0,0.554,0.248,0.554,0.554v4.968 c0,0.076-0.038,0.134-0.076,0.191l-0.478,0.478c-0.115,0.115-0.115,0.287,0,0.382l0.478,0.478c0.057,0.057,0.076,0.115,0.076,0.191 v2.713c0,0.306-0.248,0.554-0.554,0.554h-1.911c-0.306,0-0.554-0.248-0.554-0.554v-4.968c0-0.076,0.038-0.134,0.076-0.191 l0.478-0.478c0.115-0.115,0.115-0.287,0-0.382l-0.478-0.478C10.529,10.146,10.51,10.089,10.51,10.013z M19.127,12 c0-3.936-3.191-7.127-7.127-7.127S4.873,8.064,4.873,12S8.064,19.127,12,19.127S19.127,15.936,19.127,12z M21.382,12 c0,5.178-4.204,9.363-9.363,9.363c-5.178,0-9.363-4.204-9.363-9.363c0-5.178,4.204-9.363,9.363-9.363 C17.178,2.637,21.382,6.822,21.382,12z M0.764,12c0,6.21,5.025,11.236,11.236,11.236S23.236,18.21,23.236,12S18.21,0.764,12,0.764 S0.764,5.79,0.764,12z M0,12C0,5.369,5.369,0,12,0c6.631,0,12,5.369,12,12s-5.369,12-12,12S0,18.631,0,12z"></path></svg>`,
	'500px': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>500px icon</title><path d="M7.439 9.01A2.994 2.994 0 0 0 4.449 12a2.993 2.993 0 0 0 2.99 2.99 2.994 2.994 0 0 0 2.99-2.99 2.993 2.993 0 0 0-2.99-2.99m0 5.343c-1.297 0-2.354-1.056-2.354-2.353s1.057-2.353 2.354-2.353S9.792 10.703 9.792 12s-1.056 2.353-2.353 2.353m6.472-5.343a2.994 2.994 0 0 0-2.99 2.99 2.993 2.993 0 0 0 2.99 2.99 2.994 2.994 0 0 0 2.99-2.99 2.994 2.994 0 0 0-2.99-2.99m0 5.343c-1.298 0-2.353-1.056-2.353-2.353s1.055-2.353 2.353-2.353c1.297 0 2.353 1.056 2.353 2.353s-1.056 2.353-2.353 2.353m-11.612-3.55a2.1 2.1 0 0 0-1.596.423V9.641H3.39c.093 0 .16-.017.16-.292 0-.269-.108-.28-.18-.28H.396c-.174 0-.265.14-.265.294v2.602c0 .136.087.183.247.214.141.028.223.012.285-.057l.006-.01c.283-.408.9-.804 1.486-.732.699.086 1.262.644 1.34 1.327a1.512 1.512 0 0 1-1.501 1.685c-.635 0-1.19-.408-1.421-1.001-.035-.088-.092-.152-.343-.062-.229.083-.243.181-.212.268a2.11 2.11 0 0 0 1.976 1.386 2.102 2.102 0 0 0 .305-4.18m16.646-1.764c-.805.062-1.434.769-1.434 1.61v2.661c0 .154.117.186.293.186s.293-.031.293-.186v-2.668c0-.524.382-.974.868-1.024a.972.972 0 0 1 .758.247.984.984 0 0 1 .322.729c0 .08-.039.34-.217.581-.135.182-.391.399-.844.399h-.009c-.115 0-.215.005-.234.28-.013.186-.012.269.148.29.286.04.576-.016.865-.166.492-.256.822-.741.861-1.267a1.562 1.562 0 0 0-.452-1.222 1.56 1.56 0 0 0-1.218-.45m3.919 1.559l1.085-1.085c.04-.039.132-.132-.055-.324-.08-.083-.153-.125-.217-.125h-.001a.163.163 0 0 0-.121.058l-1.088 1.088-1.086-1.093c-.088-.088-.19-.067-.322.065-.135.136-.157.24-.069.328l1.086 1.092-1.064 1.064-.007.007c-.026.025-.065.063-.065.125-.001.063.042.139.126.223.07.071.138.107.2.107.069 0 .114-.045.139-.07l1.068-1.067 1.091 1.092a.162.162 0 0 0 .114.045h.002c.069 0 .142-.04.217-.118.122-.129.143-.236.061-.319l-1.094-1.093z"></path></svg>`
}

/**
 * @public @name CWCIconBrandOther
 * @extends CustomHTMLElement
 * @description Custom Web Component, common component, brand icons
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * 
 * @attribute {String} name The name of the icon to display
 *
 * @example
 * <cwc-icon-brand-other name="foo"></cwc-icon-brand-other>
 */
class CWCIconBrandOther extends CustomHTMLElement {

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
customElements.define('cwc-icon-brand-other', CWCIconBrandOther);