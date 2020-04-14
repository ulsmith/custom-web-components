import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import CWCResourceStore from '../resource/cwc-resource-store.js';

import '../icon/material/cwc-icon-material-hardware.js';

/**
 * @public @name CWCOverlayBrowserCompatible
 * @extends CustomHTMLElement
 * @description Custom Web Component, displays a compatible browser message if using incompatible browsers. Persistance saved to local storage
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 * 
 * @attribute {Flag} show Opens the owverlay and show it, happens automatically if browser compatibility failed
 *
 * @slot root Single root slot for text to show in help tip
 * 
 * @example <cwc-overlay-browser-compatible></cwc-overlay-browser-compatible>
 */
class CWCOverlayBrowserCompatible extends CustomHTMLElement {

	/**
     * @public @constructor @name constructor
	 * @description Triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._store = new CWCResourceStore('impartials-common');
		this._ignore = this._store.getItem('ignoreBrowserMessage');
		this._isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
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
					top: 0px;
					left: 0px;
					z-index: 1000000;
					background: white;
					width: 100%;
					height: 100%;
					overflow: auto;
					font-family: sans-serif;
				}

				:host([show]) { display: block; }
				.compatible { opacity: 0.85; padding: 50px; }
				.compatible h1 { font-weight: normal; font-size: 150%; color: #222; }

				.compatible h1 .icon {
					width: 50px;
					height: 50px;
					padding: 0px;
					vertical-align: middle;
					fill: #444;
				}

				.compatible h3 { font-weight: normal; font-size: 120%; color: #222; }
				.compatible p { font-weight: normal; font-size: 90%; color: #555; }
				.compatible .remove { color: red; text-decoration: underline; cursor: pointer; }
            </style>

			${this._isIE11 && !this._ignore ? html`
				<div>
					<slot></slot>
				</div>
				<div id="default-message" class="compatible">
					<h1>
						<cwc-icon-material-hardware class="icon" name="security"></cwc-icon-material-hardware>
						Unfortunately we do not support IE11
					</h1>
					<h3>Find out why?</h3>
					<p>
						IE11 no longer supports upcoming web standards, we like web standards. We only support browsers that support web standards and offer perpetual upgrade paths. If you are using IE11 still, you should seriously think about installing a modern browser, to help keep yourself secure, getting more out of the web.
						<a href="https://www.google.com/search?q=why+should+i+stop+using+ie11" target="_blank">Search online to find out more!</a>
					</p>
					<h3>What are the alternatives?</h3>
					<p>
						There are many alternatives to IE11 that support web standards in a much better way:-
						<ul>
							<li><a href="https://www.google.com/chrome" target="_blank">Chrome</a> (Google)</li>
							<li><a href="https://www.mozilla.org" target="_blank">Firefox</a> (Mozilla)</li>
							<li><a href="https://www.opera.com" target="_blank">Opera</a> (Opera Software)</li>
							<li><a href="https://www.microsoft.com/windows/microsoft-edge" target="_blank">Edge</a> (MS)</li>
						</ul>
					</p>
					<h3>I simply must use IE11!</h3>
					<p>
						Well I am sorry, we will not degrade performance for other users, just to support an ageing, none compliant browser, used by a very small demographic. Still insist? You can ignore this message and experience the raw unalterted IE11 result.
					</p>
					<p>
						<span class="remove" @click="${this.remove.bind(this)}">I understand, now remove this Message.</span>
					</p>
				</div>
			` : ''}
        `;
	}

	/**
	 * @public @name disconnected
	 * @description Lifecycle hook that gets called when the element is removed from DOM
	 */
	connected() {
		if (this._isIE11 && !this._ignore) this.setAttribute('show', '');
	}

	templateUpdated() {
		const slot = this.shadowRoot.querySelector('slot');
		const defaultMessage = this.shadowRoot.querySelector('#default-message');
		if (!slot || !defaultMessage) return;
		slot.parentNode.style.display = slot.assignedNodes().length < 1 ? 'none' : 'block';
		defaultMessage.style.display = slot.assignedNodes().length < 1 ? 'block' : 'none';
	}

	remove() {
		this._ignore = true;
		this._store.setItem('ignoreBrowserMessage', this._ignore);
		this.updateTemplate();
		this.removeAttribute('show');
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-browser-compatible', CWCOverlayBrowserCompatible);