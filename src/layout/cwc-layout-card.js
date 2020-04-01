import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

import '../icon/material/cwc-icon-material-general.js';
import '../icon/material/cwc-icon-material-image.js';

/**
 * @public @name CwcLayoutCard
 * @extends CustomHTMLElement
 * @description Custom Web Component, a card based layout that can be expanded, and show a loading spinner
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @attribute {Flag} loading The element is loading
 * @attribute {Flag} collapsible The element can collapse and expand with a click
 *
 * @style_variable --cwc-layout-card--border
 * @style_variable --cwc-layout-card--border
 * @style_variable --cwc-layout-card--border-radius
 *
 * @style_variable --cwc-layout-card--header--padding
 * @style_variable --cwc-layout-card--header--background
 * @style_variable --cwc-layout-card--header--color
 * @style_variable --cwc-layout-card--header--color
 * @style_variable --cwc-layout-card--header--border-radius
 *
 * @style_variable --cwc-layout-card--body--padding
 * @style_variable --cwc-layout-card--body--background
 * @style_variable --cwc-layout-card--body--color
 *
 * @style_variable --cwc-layout-card--footer--padding
 * @style_variable --cwc-layout-card--footer--background
 * @style_variable --cwc-layout-card--footer--color
 * @style_variable --cwc-layout-card--footer--border-radius
 *
 * @slot header Content in the title area, the header, omit to remove
 * @slot body Content that goes in the collapsible body
 * @slot footer Content that goes in the footer, omit to remove
 *
 * @example
 * <cwc-layout-card collapsible ?loading="${isLoading}">
 *		<h4 slot="header">A Heading</h4>
 *		<div slot="body">
 *			<p>Some thing in the body</p>
 *		</div>
 *		<div slot="footer">
 *			<cwc-control-button>Save</cwc-control-button>
 *		</div>
 * </cwc-layout-card>
 */
class CwcLayoutCard extends CustomHTMLElement {

	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._open = false;
	}

	// Define a template
	static template() {
		return html`
			<style>
				[hidden] { display: none !important; }
				
				.container {
					margin: 0px;
					border: var(--cwc-layout-card--border, 1px solid #ccc);
					box-shadow: var(--cwc-layout-card--border, 0px 0px 6px -4px rgba(0,0,0,0.75));
					border-radius: var(--cwc-layout-card--border-radius, 0px);
				}

				.header {
					margin: 0px;
					position: relative;
					padding: var(--cwc-layout-card--header--padding, 20px 40px 20px 20px);
					background: var(--cwc-layout-card--header--background, #999);
					color: var(--cwc-layout-card--header--color, #444);
					fill: var(--cwc-layout-card--header--color, #444);
					border-radius: var(--cwc-layout-card--header--border-radius, 0px);
				}

				:host([collapsible]) .header { cursor: pointer; opacity: 0.9; }
				:host([collapsible]) .header:hover { cursor: pointer; opacity: 1; }

				.header .icon {
					display: none;
					position: absolute;
					right: 0px;
					top: 50%;
					height: 40px;
					width: 40px;
					margin-top: -20px;
				}

				:host([collapsible]) .header .icon { display: inline-block; }

				:host([collapsible]) .header .icon.loading {
					animation-name: loading;
					animation-duration: 750ms;
					animation-iteration-count: infinite;
					animation-timing-function: ease-in-out;
				}

				.wrapper { max-height: 1500px; }
				
				:host([collapsible]) .wrapper {
					max-height: 0;
					transition: max-height 0.15s ease-out;
					overflow: hidden;
					background: #d5d5d5;
				}

				:host([collapsible]) .wrapper[open] { max-height: 1500px; transition: max-height 0.25s ease-in; }

				.wrapper .body {
					margin: 0px;
					padding: var(--cwc-layout-card--body--padding, 20px);
					background: var(--cwc-layout-card--body--background, whitesmoke);
					color: var(--cwc-layout-card--body--color, #444);
				}

				.wrapper .footer {
					margin: 0px;
					padding: var(--cwc-layout-card--footer--padding, 20px);
					background: var(--cwc-layout-card--footer--background, #bbb);
					color: var(--cwc-layout-card--footer--color, #444);
					border-radius: var(--cwc-layout-card--footer--border-radius, 0px);
				}

				@keyframes loading { 
					0% { transform:rotate(0deg); }
					10% { transform:rotate(5deg); }
					90% { transform:rotate(355deg); }
					100% { transform:rotate(360deg); }
				}
			</style>

			<div class="container">
				<div class="header" @click="${this._expand.bind(this)}">
					<slot name="header"></slot>
					<cwc-icon-material-general class="icon" name="${this._open ? 'unfoldLess' : 'unfoldMore'}" ?hidden="${this.hasAttribute('loading')}"></cwc-icon-material-general>
					<cwc-icon-material-image class="icon loading" name="rotateRight" ?hidden="${!this.hasAttribute('loading')}"></cwc-icon-material-image>
				</div>
				<div id="wrapper" class="wrapper" ?open="${this._open}">
					<div class="body">
						<slot name="body"></slot>
					</div>
					<div class="footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Provide attributes to watch for changes
	 * @return {Array} Array of attribute names as strings
	 */
	static get observedAttributes() { return ['loading'] }

	/**
	 * @public @name attributeChanged
	 * @description Callback run when a custom elements attributes change
	 * @param {String} attribute The attribute name
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) { 
		this.updateTemplate()
	}

	templateUpdated() {
		const header = this.shadowRoot.querySelector('slot[name="header"]');
		const footer = this.shadowRoot.querySelector('slot[name="footer"]');
		header.parentNode.style.display = header.assignedNodes().length < 1 ? 'none' : 'block';
		footer.parentNode.style.display = footer.assignedNodes().length < 1 ? 'none' : 'block';
	}

	_expand() {
		if (this.hasAttribute('loading')) return;
		this._open = !this._open;
		
		// allow content to show outside wrapper once open
		if (this._open) setTimeout(() => this.shadowRoot.querySelector('#wrapper').style.overflow = 'unset', 300);
		else this.shadowRoot.querySelector('#wrapper').style.removeProperty('overflow');

		this.updateTemplate();
	}
}

customElements.define('cwc-layout-card', CwcLayoutCard);