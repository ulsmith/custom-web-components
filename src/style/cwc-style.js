import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../../../@webcomponents/shadycss/custom-style-interface.min.js';

import CWCResourceRequest from '../resource/CWCResourceRequest.js';

/**
 * @public @name CWCStyle
 * @extends CustomHTMLElement
 * @description Custom element, adds style override support for all project through css variables.
 * Load from css file or embed. This is to help offer support for ie11 through shadyCSS
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 * 
 * @attribute {String} href Used when you wan tto load style overrides from a css file
 *
 * @example
 * <cwc-style>
 * 		<style>
 * 			root: {
 * 				--com-something--attribute--action: black;
 * 			}
 * 		</style>
 * </cwc-style>
 * 
 * or
 * 
 * <cwc-style href="some/path/to/css/variables.css"></con-style>
 */
class CWCStyle extends CustomHTMLElement {

	constructor() {
		super();
		this.ie11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (this.hasAttribute('href')) this._fetchStyleFromUrl();
	}

	connected() {
		if (this.ie11) setTimeout(() => { if (!this.hasAttribute('href')) window.ShadyCSS.CustomStyleInterface.addCustomStyle(this) }, 1);
	}

	_fetchStyleFromUrl() {
		let url = this.getAttribute('href');
		url = (['.', '/'].indexOf(url.charAt(0)) < 0 ? '/' : '') + url;

		let request = new CWCResourceRequest('cwc-style');
		request.scheme = '';
		request.baseUrl = '';
		
		request.ajax('GET', url, null, { 'Accept': 'text/css' }).then((response) => {
			this.innerHTML = `<style>${response.data}</style>`;
			if (this.ie11) setTimeout(() => window.ShadyCSS.CustomStyleInterface.addCustomStyle(this), 1);
		});
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-style', CWCStyle);
