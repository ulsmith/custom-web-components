import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import '../icon/material/cwc-icon-material-image.js';

/**
 * @public @name CWCOverlayLoading
 * @extends CustomHTMLElement
 * @description Custom Web Component, centrally positioned overlay loader that can be styled or statically placed
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event show The loading overlay has been shown
 * @event hide The loading overlay has been hidden
 *
 * @method show() Show the loading overlay manually
 * @method hide() Hide the loading overlay manually
 * 
 * @attribute {String} src The uses an image of your choice as the spinner, defaults to spinner icon
 * @attribute {Flag} static The loading overlay is statically placed inline with other content
 * @attribute {Flag} visible The loading overlay is visible
 * @attribute {Flag} show-on-load The loading overlay is shown when loaded
 *
 * @style_variable --cwc-overlay-loading--background
 * @style_variable --cwc-overlay-loading--border
 * @style_variable --cwc-overlay-loading--box-shadow
 * @style_variable --cwc-overlay-loading--padding
 * @style_variable --cwc-overlay-loading--speed
 * @style_variable --cwc-overlay-loading--z-index
 * 
 * @example
 * <cwc-overlay-loading show-on-load></cwc-overlay-loading>
 */
class CWCOverlayLoading extends CustomHTMLElement {

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
					opacity: 0;
					position: fixed;
					top: 50%;
					left: 50%;
					margin-top: -60px;
					margin-left: -60px;
					width: 120px;
					height: 120px;
					z-index: var(--cwc-overlay-loading--z-index, 1000);
					box-shadow: var(--cwc-overlay-loading--box-shadow, 0px 0px 15px 0px rgba(0,0,0,0.55));
					border: var(--cwc-overlay-loading--border, none);
					border-radius: 80px;
					padding: var(--cwc-overlay-loading--padding, 10px);
					box-sizing: border-box;
					background: var(--cwc-overlay-loading--background, white);
					animation-name: loading;
					animation-duration: 750ms;
					animation-iteration-count: infinite;
					animation-timing-function: ease-in-out;
					transition: opacity var(--cwc-overlay-loading--speed, 250ms) ease-in-out;
				}

				:host([static]) {
					opacity: 0;
					position: static;
					top: 0;
					left: 0;
					margin-top: 0;
					margin-left: 0;
					animation-name: loading;
					animation-duration: 750ms;
					animation-iteration-count: infinite;
					animation-timing-function: ease-in-out;
					transition: opacity var(--cwc-overlay-loading--speed, 250ms) ease-in-out;
				}

				:host([visible]) {
					display: block;
					z-index: var(--cwc-overlay-loading--z-index, 1000);
				}

				.loading img { width: 100%; height: 100%; }

				.loading .icon {
					width: 100%;
					height: 100%;
				}

				@keyframes loading {
					0% { transform:rotate(0deg); }
					10% { transform:rotate(5deg); }
					90% { transform:rotate(355deg); }
					100% { transform:rotate(360deg); }
				}
			</style>

			<div class="cwc-overlay-loading">
				<div class="loading" ?fade="${!this._loading}" ?hidden="${this._loaded}">
					${this.hasAttribute('src') ?
						html`<img class="loading" ?fade="${!this._loading}" ?hidden="${this._loaded}" src="${this.getAttribute('src')}">`
						:
						html`<cwc-icon-material-image class="icon" name="rotateRight"></cwc-icon-material-hardware>`
					}
				</div>
			</div>
        `;
	}

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		if (this.hasAttribute('show-on-load')) this.show();
		else this.removeAttribute('visible');
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	show(ev) {
		this.dispatchEvent(new CustomEvent('show'));
		this.setAttribute('visible', '');
		setTimeout(() => this.style.opacity = 1, 50);
	}

	/**
     * @public @name show
	 * @description Show the saving icon and self remove after X seconds
     * @param {Event} ev Any event that kicks the function
	 */
	hide(ev) {
		if (this.style.display === 'none') return;
		this.dispatchEvent(new CustomEvent('hide'));
		this.style.opacity = 0;
		setTimeout(() => this.removeAttribute('visible'), 250);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-loading', CWCOverlayLoading);
