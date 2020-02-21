import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';

/**
 * @public @name CWCOverlayLoading
 * @extends CustomHTMLElement
 * @description Application Web Component, common component, overlay loader that can be styled
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 *
 * @example
 * <cwc-overlay visible></cwc-overlay>
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
					z-index: -1;
					opacity: 0;
					position: fixed;
					top: 50%;
					left: 50%;
					margin-top: -60px;
					margin-left: -60px;
					width: 120px;
					height: 120px;
					border-radius: 80px;
					box-sizing: border-box;
					transition: opacity 190ms ease-in-out;
					padding: var(--cwc-overlay-loading--padding, 10px);
					background: var(--cwc-overlay-loading--background, white);
					border: var(--cwc-overlay-loading--border, none);
					box-shadow: var(--cwc-overlay-loading--box-shadow, 0px 0px 15px 0px grey);
					z-index: var(--cwc-overlay-loading--z-index, 1000);
				}

				:host([visible]) {
					display: block;
					z-index: var(--cwc-overlay-loading--z-index, 1000);
				}

				.loading {
					display: inline-block;
					width: 50px;
					height: 50px;
					border: 3px solid rgba(255,255,255,.3);
					border-top-color: #fff;
					border-radius: 50%;
					animation: spin 1s ease-in-out infinite;
					-webkit-animation: spin 1s ease-in-out infinite;
				}
			</style>

			<div class="cwc-overlay-loading">
				<div class="loading" ?fade="${!this._loading}" ?hidden="${this._loaded}"></div>
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

		setTimeout(() => this.removeAttribute('visible'), 200);
	}
}

// bootstrap the class as a new web component
customElements.define('cwc-overlay-loading', CWCOverlayLoading);
