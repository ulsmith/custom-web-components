import { CustomHTMLElement, html } from '../../../custom-web-component/index.js';
import CWCResourceRequest from '../resource/cwc-resource-request.js';
import CWCResourceStore from '../resource/cwc-resource-store.js';

import '../icon/material/cwc-icon-material-general.js';

/**
 * @public @name CWCOverlayAuthentication
 * @extends CustomHTMLElement
 * @description Application Web Component, authentication overlay, helps with login, logout and autherisation
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2018 Paul Smith (ulsmith.net)
 * @license MIT
 * 
 * @example HTML
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
					transition: opacity 400ms ease-in-out;
					z-index: 10000;
				}

				.backdrop { 
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: #444;
					z-index: 10010; 
					opacity: 0.995;
				}

				.wrapper { 
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%; 
					z-index: 10020; 
					background: transparent;
				}

				.box {
					position: fixed;
					top: 50%;
					left: 50%;
					width: 90%;
					max-width: 300px;
					transform: translate(-50%, -50%);
					background: white;
					-webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
					-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
					box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
				}

				.box.auth { border-radius: 50px; width: auto; }
				.header { height: 50px; width: 100%; background: #eee; }
				
				.header > * {
					font-weight: normal;
					font-size: 20px;
					text-transform: uppercase;
					margin: 0;
					padding: 10px;
					line-height: 30px;
					height: 30px;
					color: #777;
					text-align: center;
				}

				.message cwc-icon-material-general {
					height: 16px;
					width: 16px;
					padding: 0px;
					margin: 3px;
				}
				
				.main { margin: 0px; padding: 0px; background: white; }
				.main > * { margin: 0px; padding: 0px; color: #444; }

				.main input {
					width: calc(100% - 20px);
					padding: 8px;
					box-sizing: border-box;
					font-size: 16px;
					margin: 10px;
					display: block;
					border: 1px solid grey;
				}

				.main input[invalid] { border: 1px solid red; }

				.main button {
					padding: 0 10px;
					position: absolute;
					right: 10px;
					bottom: 10px;
					height: 30px;
					border: darkblue;
					background: blue;
					color: white;
				}

				.main button[disabled] {
					opacity: 0.5;
					box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
					transform: scale(1);
					animation: pulse 1s infinite;
				}

				.message  {
					vertical-align: middle;
					text-align: center;
					font-size: 15px;
					display: none;
					margin: 10px;
					padding: 5px;
				}

				.message[show] { display: block; }
				.message[type="danger"] { color: red; fill: red; background: #ffd7d7; }
				.message[type="success"] { color: green; fill: green; background: #cae6ca; }

				.footer {
					height: 50px;
					width: 100%;
					padding: 10px;
					background: #eee;
					box-sizing: border-box;
				}

				.footer span {
					display: inline-block;
					margin: 0;
					line-height: 30px;
					font-size: 16px;
					text-decoration: none;
					cursor: pointer;
					color: blue;
				}

				.footer span.link:hover {
					color: #00006c;
				}

				.footer .button { float: right; }

				.bumpf {
					position: absolute;
					bottom: -22px;
					left: 0px;
					display: inline-block;
					font-size: 16px;
					color: white;
					width: 100%;
				}

				.bumpf span {
					font-size: 16px;
					color: white;
				}

				.bumpf span.version {
					float: right;
				}

				.auth-heading {
					margin: 0;
					padding: 10px;
					color: grey;
					text-align: center;
					font-weight: normal;
					font-size: 20px;
					display: inline-block; 
					white-space: nowrap;
				}
				
				.auth-heading cwc-icon-material-general {
					background: grey;
					fill: white;
					width: 34px;
					height: 34px;
					vertical-align: middle;
					transform: scale(1);
					animation: pulse 1s infinite;
					border-radius: 50px;
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
						<h1 class="auth-heading" ?hidden="${this._action !== 'authenticate'}"><cwc-icon-material-general name="lock"></cwc-icon-material-general> Authenticating...</h1>
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