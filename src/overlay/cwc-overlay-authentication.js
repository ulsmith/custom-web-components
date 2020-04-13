import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import CWCResourceRequest from '../resource/cwc-resource-request.js';
import CWCResourceStore from '../resource/cwc-resource-store.js';

import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayAuthentication
 * @extends CustomHTMLElement
 * @description Custom Web Component, authentication overlay, helps with login, logout, authorisation, registration. password reset
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 * 
 * @event change The user data has changed, send user data as event detail
 * 
 * @method login() Open the login overlay and wait for login
 * @method authenticate() Open the authenticate overlay and wait fo rauthentication to happen
 * @method terminate() Log the user out and terminate authentication
 * 
 * @property {Object} route The route object form cwc-resource-router
 *
 * @attribute {String} reset-route The route/path to the reset endpoint on the api
 * @attribute {String} register-route The route/path to the register endpoint on the api
 * @attribute {String} activate-route The route/path to the activate endpoint on the api
 * @attribute {String} system-key The key to use for prefixing the local storage data, such as 'my-app' or the DNS name
 * @attribute {String} system-version The version to output in the overlays as a footer
 * @attribute {String} api-url The URL of the API used before the routes above, such as http://my-app.com
 * 
 * @style_variable --cwc-overlay-authentication--transition
 * @style_variable --cwc-overlay-authentication--z-index
 * 
 * @style_variable --cwc-overlay-authentication--backdrop--background
 * @style_variable --cwc-overlay-authentication--backdrop--opacity
 * @style_variable --cwc-overlay-authentication--backdrop--z-index
 * 
 * @style_variable --cwc-overlay-authentication--box--background
 * @style_variable --cwc-overlay-authentication--box--border-radius
 * @style_variable --cwc-overlay-authentication--box--box-shadow
 * @style_variable --cwc-overlay-authentication--box--color
 * @style_variable --cwc-overlay-authentication--box--left
 * @style_variable --cwc-overlay-authentication--box--max-width
 * @style_variable --cwc-overlay-authentication--box--top
 * @style_variable --cwc-overlay-authentication--box--transform
 * @style_variable --cwc-overlay-authentication--box--width
 * @style_variable --cwc-overlay-authentication--box--z-index
 * 
 * @style_variable --cwc-overlay-authentication--box-header--background
 * @style_variable --cwc-overlay-authentication--box-header--border-radius
 * @style_variable --cwc-overlay-authentication--box-header--color
 * @style_variable --cwc-overlay-authentication--box-header--font-weight
 * @style_variable --cwc-overlay-authentication--box-header--font-size
 * @style_variable --cwc-overlay-authentication--box-header--height
 * @style_variable --cwc-overlay-authentication--box-header--line-height
 * @style_variable --cwc-overlay-authentication--box-header--margin
 * @style_variable --cwc-overlay-authentication--box-header--padding
 * @style_variable --cwc-overlay-authentication--box-header--text-transform
 * @style_variable --cwc-overlay-authentication--box-header--text-align
 * 
 * @style_variable --cwc-overlay-authentication--box-main--background
 * @style_variable --cwc-overlay-authentication--box-main--color
 * @style_variable --cwc-overlay-authentication--box-main--margin
 * @style_variable --cwc-overlay-authentication--box-main--padding
 * @style_variable --cwc-overlay-authentication--box-main--input--border
 * @style_variable --cwc-overlay-authentication--box-main--input--border-radius
 * @style_variable --cwc-overlay-authentication--box-main--input--font-size
 * @style_variable --cwc-overlay-authentication--box-main--input--margin
 * @style_variable --cwc-overlay-authentication--box-main--input--padding
 * @style_variable --cwc-overlay-authentication--box-main--input--invalid--background
 * @style_variable --cwc-overlay-authentication--box-main--input--invalid--border
 * @style_variable --cwc-overlay-authentication--box-main--button--background
 * @style_variable --cwc-overlay-authentication--box-main--button--border
 * @style_variable --cwc-overlay-authentication--box-main--button--bottom
 * @style_variable --cwc-overlay-authentication--box-main--button--color
 * @style_variable --cwc-overlay-authentication--box-main--button--height
 * @style_variable --cwc-overlay-authentication--box-main--button--padding
 * @style_variable --cwc-overlay-authentication--box-main--button--position
 * @style_variable --cwc-overlay-authentication--box-main--button--right
 * 
 * @style_variable --cwc-overlay-authentication--box-message--font-size
 * @style_variable --cwc-overlay-authentication--box-message--margin
 * @style_variable --cwc-overlay-authentication--box-message--padding
 * @style_variable --cwc-overlay-authentication--box-message--text-align
 * 
 * @style_variable --cwc-overlay-authentication--box-message-icon--height
 * @style_variable --cwc-overlay-authentication--box-message-icon--margin
 * @style_variable --cwc-overlay-authentication--box-message-icon--padding
 * @style_variable --cwc-overlay-authentication--box-message-icon--width
 * 
 * @style_variable --cwc-overlay-authentication--box-message-danger--background
 * @style_variable --cwc-overlay-authentication--box-message-danger--fill
 * @style_variable --cwc-overlay-authentication--box-message-danger--padding
 * 
 * @style_variable --cwc-overlay-authentication--box-message-success--background
 * @style_variable --cwc-overlay-authentication--box-message-success--fill
 * @style_variable --cwc-overlay-authentication--box-message-success--padding
 * 
 * @style_variable --cwc-overlay-authentication--box-footer--background
 * @style_variable --cwc-overlay-authentication--box-footer--border-radius
 * @style_variable --cwc-overlay-authentication--box-footer--height
 * @style_variable --cwc-overlay-authentication--box-footer--color
 * @style_variable --cwc-overlay-authentication--box-footer--color--hover
 * @style_variable --cwc-overlay-authentication--box-footer--cursor
 * @style_variable --cwc-overlay-authentication--box-footer--font-size
 * @style_variable --cwc-overlay-authentication--box-footer--line-height
 * @style_variable --cwc-overlay-authentication--box-footer--padding
 * @style_variable --cwc-overlay-authentication--box-footer--text-decoration
 * 
 * @style_variable --cwc-overlay-authentication--bumpf--bottom
 * @style_variable --cwc-overlay-authentication--bumpf--color
 * @style_variable --cwc-overlay-authentication--bumpf--font-size
 * @style_variable --cwc-overlay-authentication--bumpf--left
 * 
 * @style_variable --cwc-overlay-authentication--bumpf-version--float
 * 
 * @style_variable --cwc-overlay-authentication--auth--background
 * @style_variable --cwc-overlay-authentication--auth--border-radius
 * @style_variable --cwc-overlay-authentication--auth--color
 * 
 * @style_variable --cwc-overlay-authentication--auth-title--color
 * @style_variable --cwc-overlay-authentication--auth-title--font-size
 * @style_variable --cwc-overlay-authentication--auth-title--padding
 * @style_variable --cwc-overlay-authentication--auth-title--font-weight
 *
 * @style_variable --cwc-overlay-authentication--auth-icon--background
 * @style_variable --cwc-overlay-authentication--auth-icon--border-radius
 * @style_variable --cwc-overlay-authentication--auth-icon--fill
 * @style_variable --cwc-overlay-authentication--auth-icon--height
 * @style_variable --cwc-overlay-authentication--auth-icon--width
 * 
 * @example HTML (requires REST API with specific endpoints)
 *	<cwc-overlay-authentication
 *		reset-route="reset"
 *		register-route="register"
 *		activate-route="activate"
 *		system-key="${Config.systemKey}"
 *		system-version="${Config.systemVersion}"
 *		api-url="${Config.apiUrl}"
 *		.route="${this._route}"
 *		@change="${this.updateUser.bind(this)}"
 *	></cwc-overlay-authentication>
 */
class CWCOverlayAuthentication extends CustomHTMLElement {
	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this.route;
		
		this._store;
		this._request;
		this._action = 'authenticate';
		this._token;
		this._messageType;
		this._messageIcon;
		this._messageText;
	}

	/**
	 * @public @name template
	 * @description Template function to return web component HTML template
	 * 
	 * @return {TemplateResult} HTML template result
	 */
	static template() {
		return html`
			<style>
				[hidden] { display: none !important; }

				.container { 
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					transition: opacity var(--cwc-overlay-authentication--transition-duration, 400ms) ease-in-out;
					z-index: var(--cwc-overlay-authentication--z-index, 10000);
				}

				.backdrop { 
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: var(--cwc-overlay-authentication--backdrop--background, white);
					z-index: var(--cwc-overlay-authentication--backdrop--z-index, 10010); 
					opacity: var(--cwc-overlay-authentication--backdrop--opacity, 0.95);
				}

				.wrapper { 
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%; 
					z-index: var(--cwc-overlay-authentication--box--z-index, 10020); 
					background: transparent;
				}

				.box {
					position: fixed;
					top: var(--cwc-overlay-authentication--box--top, 50%);
					left: var(--cwc-overlay-authentication--box--left, 50%);
					width: var(--cwc-overlay-authentication--box--width, 90%);
					max-width: var(--cwc-overlay-authentication--box--max-width, 300px);
					transform: var(--cwc-overlay-authentication--box--transform, translate(-50%, -50%));
					background: var(--cwc-overlay-authentication--box--background, white);
					color: var(--cwc-overlay-authentication--box--color, #222);
					-webkit-box-shadow: var(--cwc-overlay-authentication--box--box-shadow, 0px 0px 5px 0px rgba(0,0,0,0.75));
					-moz-box-shadow: var(--cwc-overlay-authentication--box--box-shadow, 0px 0px 5px 0px rgba(0,0,0,0.75));
					box-shadow: var(--cwc-overlay-authentication--box--box-shadow, 0px 0px 5px 0px rgba(0,0,0,0.75));
					border-radius: var(--cwc-overlay-authentication--box--border-radius, 0px);
				}

				.header { 
					width: 100%; 
					height: var(--cwc-overlay-authentication--box-header--height, 50px);
					line-height: var(--cwc-overlay-authentication--box-header--line-height, 50px);
					background: var(--cwc-overlay-authentication--box-header--background, #eee);
					color: var(--cwc-overlay-authentication--box-header--color, #eee);
					border-radius: var(--cwc-overlay-authentication--box-header--border-radius, 0px);
				}
				
				.header > * {
					font-weight: var(--cwc-overlay-authentication--box-header--font-weight, normal);
					font-size: var(--cwc-overlay-authentication--box-header--font-size, 20px);
					text-transform: var(--cwc-overlay-authentication--box-header--text-transform, uppercase);
					margin: var(--cwc-overlay-authentication--box-header--margin, 0);
					padding: var(--cwc-overlay-authentication--box-header--padding, 10px);
					line-height: var(--cwc-overlay-authentication--box-header--line-height, 30px);
					height: var(--cwc-overlay-authentication--box-header--height, 30px);
					color: var(--cwc-overlay-authentication--box-header--color, #777);
					text-align: var(--cwc-overlay-authentication--box-header--text-align, center);
				}
				
				.main { 
					margin: var(--cwc-overlay-authentication--box-main--margin, 0px);
					padding: var(--cwc-overlay-authentication--box-main--padding, 0px);
					background: var(--cwc-overlay-authentication--box-main--background, white);
					color: var(--cwc-overlay-authentication--box-main--color, #444);
				}

				.main input {
					width: calc(100% - 20px);
					padding: var(--cwc-overlay-authentication--box-main--input--padding, 8px);
					box-sizing: border-box;
					font-size: var(--cwc-overlay-authentication--box-main--input--font-size, 16px);
					margin: var(--cwc-overlay-authentication--box-main--input--margin, 10px);
					display: block;
					border: var(--cwc-overlay-authentication--box-main--input--border, 1px solid grey);
					border-radius: var(--cwc-overlay-authentication--box-main--input--border-radius, 0);
				}

				.main input[invalid] { 
					border: var(--cwc-overlay-authentication--box-main--input--invalid--border, 1px solid red);
					background: var(--cwc-overlay-authentication--box-main--input--invalid--background, transparent);
				}

				.main button {
					padding: var(--cwc-overlay-authentication--box-main--button--padding, 0 10px);
					position: var(--cwc-overlay-authentication--box-main--button--position, absolute);
					right: var(--cwc-overlay-authentication--box-main--button--right, 10px);
					bottom: var(--cwc-overlay-authentication--box-main--button--bottom, 10px);
					height: var(--cwc-overlay-authentication--box-main--button--height, 30px);
					border: var(--cwc-overlay-authentication--box-main--button--border, darkblue);
					background: var(--cwc-overlay-authentication--box-main--button--background, blue);
					color: var(--cwc-overlay-authentication--box-main--button--color, white);
				}

				.main button[disabled] {
					opacity: 0.5;
					box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
					transform: scale(1);
					animation: pulse 1s infinite;
				}

				.message  {
					vertical-align: middle;
					text-align: var(--cwc-overlay-authentication--box-message--text-align, center);
					font-size: var(--cwc-overlay-authentication--box-message--font-size, 15px);
					display: none;
					margin: var(--cwc-overlay-authentication--box-message--margin, 10px);
					padding: var(--cwc-overlay-authentication--box-message--padding, 5px);
				}

				.message cwc-icon-material-general {
					height: var(--cwc-overlay-authentication--box-message-icon--height, 16px);
					width: var(--cwc-overlay-authentication--box-message-icon--width, 16px);
					padding: var(--cwc-overlay-authentication--box-message-icon--padding, 0px);
					margin: var(--cwc-overlay-authentication--box-message-icon--margin, 3px);
				}

				.message[show] { display: block; }
				
				.message[type="danger"] { 
					color: var(--cwc-overlay-authentication--box-message-danger--padding, red); 
					fill: var(--cwc-overlay-authentication--box-message-danger--fill, red);
					background: var(--cwc-overlay-authentication--box-message-danger--background, #ffd7d7);
				}

				.message[type="success"] { 
					color: var(--cwc-overlay-authentication--box-message-success--padding, green); 
					fill: var(--cwc-overlay-authentication--box-message-success--fill, green); 
					background: var(--cwc-overlay-authentication--box-message-success--background, #cae6ca);
				}

				.footer {
					height: var(--cwc-overlay-authentication--box-footer--height, 50px);
					width: 100%;
					padding: var(--cwc-overlay-authentication--box-footer--padding, 10px);
					background: var(--cwc-overlay-authentication--box-footer--background, #eee);
					border-radius: var(--cwc-overlay-authentication--box-footer--border-radius, 0px);
					box-sizing: border-box;
				}

				.footer span {
					display: inline-block;
					margin: 0;
					line-height: var(--cwc-overlay-authentication--box-footer--line-height, 30px);
					font-size: var(--cwc-overlay-authentication--box-footer--font-size, 16px);
					text-decoration: var(--cwc-overlay-authentication--box-footer--text-decoration, none);
					cursor: var(--cwc-overlay-authentication--box-footer--cursor, pointer);
					color: var(--cwc-overlay-authentication--box-footer--color, blue);
				}

				.footer span.link:hover { color: var(--cwc-overlay-authentication--box-footer--color--hover, #00006c); }

				.bumpf {
					position: absolute;
					bottom: var(--cwc-overlay-authentication--bumpf--bottom, -22px);
					left: var(--cwc-overlay-authentication--bumpf--left, 0px);
					display: inline-block;
					font-size: var(--cwc-overlay-authentication--bumpf--font-size, 16px);
					color:  var(--cwc-overlay-authentication--bumpf--color, #222);
					width: 100%;
				}

				.bumpf span.version { float: var(--cwc-overlay-authentication--bumpf-version--float, right); }

				.box.auth { 
					border-radius: var(--cwc-overlay-authentication--auth--border-radius, 50px);
					background: var(--cwc-overlay-authentication--auth--background, var(--cwc-overlay-authentication--box--background, white));
					color: var(--cwc-overlay-authentication--auth--color, var(--cwc-overlay-authentication--box--color, #222));
					width: auto;
				}

				.auth-title {
					margin: 0;
					padding: var(--cwc-overlay-authentication--auth-title--padding, 10px);
					color: var(--cwc-overlay-authentication--auth-title--color, grey);
					text-align: center;
					font-weight: var(--cwc-overlay-authentication--auth-title--font-weight, normal);
					font-size: var(--cwc-overlay-authentication--auth-title--font-size, 20px);
					display: inline-block; 
					white-space: nowrap;
				}
				
				.auth-title cwc-icon-material-general {
					background: var(--cwc-overlay-authentication--auth-icon--background, grey);
					fill: var(--cwc-overlay-authentication--auth-icon--fill, white);
					width: var(--cwc-overlay-authentication--auth-icon--width, 34px);
					height: var(--cwc-overlay-authentication--auth-icon--height, 34px);
					vertical-align: middle;
					transform: scale(1);
					animation: pulse 1s infinite;
					border-radius: var(--cwc-overlay-authentication--auth-icon--border-radius, 50px);
				}

				@keyframes pulse {
					0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7); }
					70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
					100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
				}
			</style>

			<div id="login" class="container">
				<div class="backdrop"></div>
				<div class="wrapper">
					<div id="detail-box" class="box" ?hidden="${this._action === 'authenticate'}">
						<div class="header">
							<h1 ?hidden="${this._action !== 'login'}">Log In</h1>
							<h1 ?hidden="${this._action !== 'reset'}">Reset Password</h1>
							<h1 ?hidden="${this._action !== 'reset-confirm'}">Set New Password</h1>
							<h1 ?hidden="${this._action !== 'register'}">Register</h1>
							<h1 ?hidden="${this._action !== 'register-confirm'}">Verify Identity</h1>
							<h1 ?hidden="${this._action !== 'activate-confirm'}">Activate Identity</h1>
						</div>
						<div class="main">
							<span id="message" class="message" type="${this._messageType}">
								<cwc-icon-material-general name="${this._messageIcon}"></cwc-icon-material-general>
								${this._messageText}
							</span>
							${this._action === 'login' ? html`
								<form id="login" method="POST" @submit="${this._doLogin.bind(this)}" action="">
									<input id="username" name="username" placeholder="Your identity, such as email" type="text" autocomplete="username">
									<input id="password" name="password" placeholder="Your password, for your identity" type="password" autocomplete="new-password">
									<button id="submit" class="button" context="primary" type="submit">Log In</button>
								</form>
							` : this._action === 'reset' ? html`
								<form id="reset" ?hidden="${this._action !== 'reset'}" method="POST" @submit="${this._doReset.bind(this)}" action="">
									<input id="username" name="username" placeholder="Your identity, such as email" type="text" autocomplete="username">
									<button id="submit" class="button" context="primary" type="submit">Reset Password</button>
								</form>
							` : this._action === 'reset-confirm' ? html`
								<form id="reset-confirm" method="POST" @submit="${this._confirmReset.bind(this)}" action="">
									<input id="username" name="username" placeholder="Your identity, such as email" type="text" autocomplete="username">
									<input id="password" name="password" placeholder="Your new password" type="password">
									<button id="submit" class="button" context="primary" type="submit">Set New Password</button>
								</form>
							` : this._action === 'register' ? html`
								<form id="register" method="POST" @submit="${this._doRegister.bind(this)}" action="">
									<input id="username" name="username" placeholder="Your email (identity)" type="text" autocomplete="username">
									<input id="password" name="password" placeholder="Your password, for your identity" type="password" autocomplete="current-password">
									<button id="submit" class="button" context="primary" type="submit">Register</button>
								</form>
							` : this._action === 'register-confirm' ? html`
								<form id="register-confirm" method="POST" @submit="${this._confirmRegister.bind(this)}" action="">
									<input id="username" name="username" placeholder="Your email (identity)" type="text" autocomplete="username">
									<button id="submit" class="button" context="primary" type="submit">Confirm Identity</button>
								</form>
							` : this._action === 'activate-confirm' ? html`
								<form id="activate-confirm" method="POST" @submit="${this._confirmActivate.bind(this)}" action="">
									<button id="submit" class="button" context="primary" type="submit">Activate Identity</button>
								</form>
							`: ''}
						</div>
						<div class="footer">
							<span ?hidden="${this._action !== 'login'}">
								<span class="link" @click="${this._switch.bind(this, 'reset')}">Reset Password</span> |
								<span class="link" @click="${this._switch.bind(this, 'register')}">Register</span>
							</span>
							<span ?hidden="${this._action === 'login'}" @click="${this._switch.bind(this, 'login')}">Log in</span>
						</div>
						<div class="bumpf">
							<span>&copy;2020 Project 7</span>
							<span class="version">V${this.getAttribute('system-version')}</span>
						</div>
					</div>
					<div id="auth-box" class="box auth">
						<h1 class="auth-title" ?hidden="${this._action !== 'authenticate'}"><cwc-icon-material-general name="lock"></cwc-icon-material-general> Authenticating...</h1>
					</div>
				</div>
			</div>
		`;
	}

	/**
	 * @public @static @get @name observedProperties
	 * @description Lifecycle hook that sets properties to observe on the element
	 * 
	 * @return {Array} An array of string property names (camelcase)
	 */
	static get observedProperties() {
		return ['route', 'routes'];
	}

	/**
	 * @public @name propertyChanged
	 * @description Lifecycle hook that gets called when the elements observed properties change
     * 
	 * @param {String} property Name of the property changed
     * @param {Mixed} oldValue Value before the change
     * @param {Mixed} newValue Value after the change
	 */
	propertyChanged(property, oldValue, newValue) {
		this.updateTemplate();
	}

	/**
	 * @public @name connected
	 * @description Callback run once the custom element has been added to the DOM and template is rendered
	 */
	connected() {
		// setup config
		this._store = new CWCResourceStore(this.getAttribute('system-key'));
		this._request = new CWCResourceRequest(this.getAttribute('system-key'));
		this._request.setBaseUrl(this.getAttribute('api-url'));

		// login or auth on load
		if (!!this._request.hasToken()) this.authenticate();
		else {
			this._action = 'login';
			this.updateTemplate();
			this.login(); 
		}
	}

	/**
	 * @private @name login
	 * @description Show the login overlay
	 */
	login() {
		// sniff out a password reset
		if (this.route && this.route.path && this.hasAttribute('register-route') && this.route.path === this.getAttribute('register-route')) {
			this._token = undefined;
			this._action = 'registered';
			this.updateTemplate();
		}

		this.shadowRoot.querySelector('#auth-box').style.display = 'none';
		this.shadowRoot.querySelector('#detail-box').style.display = 'block';

		this.shadowRoot.querySelector('#login').style.display = 'block';
		setTimeout(() => this.shadowRoot.querySelector('#login').style.opacity = 1, 10);

		let form = document.createElement("FORM");
		let uinput = document.createElement("INPUT");
		let pinput = document.createElement("INPUT");

		form.setAttribute('id', 'login-form-autocomplete-helper');

		uinput.setAttribute('name', 'username');
		uinput.setAttribute('type', 'text');
		uinput.setAttribute('autocomplete', 'username');

		pinput.setAttribute('name', 'password');
		pinput.setAttribute('type', 'password');
		pinput.setAttribute('autocomplete', 'current-password');

		form.style.display = 'none';
		form.appendChild(uinput);
		form.appendChild(pinput);

		document.body.appendChild(form);
	}

	/**
	 * @public @name authenticate
	 * @description Tell the auth module to re-auth the user
	 */
	authenticate() {
		clearTimeout(this.authenticateDebounce);

		this.authenticateDebounce = setTimeout(() => {
			// sniff out a password reset
			if (!this._request.hasToken()) {
				switch (this.route.prefix) {
					case this.getAttribute('register-route'):
						this._token = this.route.parameters[0];
						this._switch('register-confirm');
						return;
					case this.getAttribute('reset-route'):
						this._token = this.route.parameters[0];
						this._switch('reset-confirm');
						return;
					case this.getAttribute('activate-route'):
						this._token = this.route.parameters[0];
						this._switch('activate-confirm');
						return;
				}

			}

			// show authenticating
			this._request.get('account/authenticate').then((response) => {
				this.shadowRoot.querySelector('#login').style.opacity = 0;
				setTimeout(() => this.shadowRoot.querySelector('#login').style.display = 'none', 500);
				this._store.setItem('auth.user', response.data.user);
				this._store.setItem('auth.organisation', response.data.organisation);
				this._store.setItem('auth.permissions', response.data.permissions);
				this.dispatchEvent(new CustomEvent('change', { detail: response.data }));
			}).catch((error) => {
				this._request.deleteToken();
				this.dispatchEvent(new CustomEvent('change', { detail: {} }));
			});
		}, 10);
	}

	/**
	 * @public @name terminate
	 * @description Tell the auth module to re-auth the user
	 */
	terminate() {
		this._request.deleteToken();
		this._switch('login');

		this.dispatchEvent(new CustomEvent('change', { detail: {} }));
	}

	/**
	 * @private @name _switch
	 * @description Toggle login/reset
	 */
	_switch(action) {
		this._action = action;
		this.updateTemplate();
		this.shadowRoot.querySelector('#message').removeAttribute('show');

		if (action === 'authenticate') this.authenticate();
		else if (action === 'login') this.login();
	}

	/**
	 * @private @name _doLogin
	 * @description Do a login
	 */
	_doLogin(ev) {
		ev.preventDefault();

		// grab elements
		let identity = this.shadowRoot.querySelector('#username');
		let password = this.shadowRoot.querySelector('#password');
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');
		
		identity.removeAttribute('invalid');
		password.removeAttribute('invalid');
		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.post('account/authenticate', { identity: identity.value, password: password.value }).then((response) => {
			this._request.setToken(response.data.token);
			this.shadowRoot.querySelector('#login').style.opacity = 0;
			setTimeout(() => this.shadowRoot.querySelector('#login').style.display = 'none', 500);
			
			delete response.data.token;
			document.body.removeChild(document.body.querySelector('#login-form-autocomplete-helper'));

			this._store.setItem('auth.user', response.data.user);
			this._store.setItem('auth.organisation', response.data.organisation);
			this._store.setItem('auth.permissions', response.data.permissions);
			this.dispatchEvent(new CustomEvent('change', { detail: response.data }));

			identity.value = '';
			password.value = '';
		}).catch((response) => {
			this._request.deleteToken();

			identity.setAttribute('invalid', '');
			identity.value = '';
			
			password.setAttribute('invalid', '');
			password.value = '';

			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}

	/**
	 * @private @name _doReset
	 * @description Do reset
	 */
	_doReset(ev) {
		ev.preventDefault();

		// first things first, ensure token is killed
		this._request.deleteToken();

		// grab elements
		let identity = this.shadowRoot.querySelector('#username');
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');

		identity.removeAttribute('invalid');
		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.post('account/reset', { 
			identity: identity.value, 
			identityType: 'email', 
			resetRoute: this.getAttribute('reset-route')
		}).then((response) => {
			this._messageType = 'success';
			this._messageIcon = 'check';
			this._messageText = 'Password reset sent to email';
			this.updateTemplate();

			message.setAttribute('show', '');
			this._action = 'login';
		}).catch((response) => {
			this._request.deleteToken();

			identity.setAttribute('invalid', '');
			identity.value = '';

			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}

	/**
	 * @private @name _confirmReset
	 * @description Process a reset
	 */
	_confirmReset(ev) {
		ev.preventDefault();

		// grab elements
		let identity = this.shadowRoot.querySelector('#username');
		let password = this.shadowRoot.querySelector('#password');
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');

		identity.removeAttribute('invalid');
		password.removeAttribute('invalid');
		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.patch('account/reset/' + this._token, { 
			identity: identity.value, 
			identityType: 'email', 
			password: password.value
		}).then((response) => {
			identity.value = '';
			password.value = '';
			this._action = 'login';
			this._token = undefined;
			this._messageType = 'success';
			this._messageIcon = 'check';
			this._messageText = 'Password reset successfully';
			this.updateTemplate();

			message.setAttribute('show', '');
		}).catch((response) => {
			identity.setAttribute('invalid', '');
			identity.value = '';

			password.setAttribute('invalid', '');
			password.value = '';

			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}

	/**
	 * @private @name _doRegister
	 * @description Process a reset
	 */
	_doRegister(ev) {
		ev.preventDefault();

		// grab elements
		let identity = this.shadowRoot.querySelector('#username');
		let password = this.shadowRoot.querySelector('#password');
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');

		identity.removeAttribute('invalid');
		password.removeAttribute('invalid');
		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.post('account/registration', { 
			identity: identity.value, 
			identityType: 'email', 
			password: password.value, 
			registerRoute: this.getAttribute('register-route')
		}).then((response) => {
			identity.value = '';
			password.value = '';

			this._messageType = 'success';
			this._messageIcon = 'check';
			this._messageText = 'Registration sent to email';
			this._action = 'login';
			this._token = undefined;
			this.updateTemplate();
			message.setAttribute('show', '');
		}).catch((response) => {
			identity.setAttribute('invalid', '');
			identity.value = '';

			password.setAttribute('invalid', '');
			password.value = '';

			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}

	/**
	 * @private @name _confirmRegister
	 * @description Process a reset
	 */
	_confirmRegister(ev) {
		ev.preventDefault();

		// grab elements
		let identity = this.shadowRoot.querySelector('#username');
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');

		identity.removeAttribute('invalid');
		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.patch('account/registration/' + this._token, {
			identity: identity.value, 
			identityType: 'email',
			activateRoute: this.getAttribute('activate-route')
		}).then((response) => {
			identity.value = '';
			this._action = 'login';
			this._token = undefined;
			this._messageType = 'success';
			this._messageIcon = 'check';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
		}).catch((response) => {
			identity.setAttribute('invalid', '');
			identity.value = '';
			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}

	/**
	 * @private @name _confirmActivate
	 * @description Process a reset
	 */
	_confirmActivate(ev) {
		ev.preventDefault();

		// grab elements
		let button = this.shadowRoot.querySelector('#submit');
		let message = this.shadowRoot.querySelector('#message');

		button.setAttribute('disabled', '');
		message.removeAttribute('show');

		this._request.patch('account/activate/' + this._token).then((response) => {
			this._action = 'login';
			this._token = undefined;
			this._messageType = 'success';
			this._messageIcon = 'check';
			this._messageText = 'User Activated';
			this.updateTemplate();

			message.setAttribute('show', '');
		}).catch((response) => {
			this._messageType = 'danger';
			this._messageIcon = 'warning';
			this._messageText = response.data.message;
			this.updateTemplate();

			message.setAttribute('show', '');
			this.dispatchEvent(new CustomEvent('change', { detail: {} }));
		}).then(() => button.removeAttribute('disabled'));
	}
}

// define the new custom element
customElements.define('cwc-overlay-authentication', CWCOverlayAuthentication);