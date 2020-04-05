import { CustomHTMLElement, html } from '../../../../custom-web-component/index.js';

const ICONS = {
	'yahoo': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Yahoo! icon</title><path d="M18.86 1.56L14.27 11.87H19.4L24 1.56H18.86M0 6.71L5.15 18.27L3.3 22.44H7.83L14.69 6.71H10.19L7.39 13.44L4.62 6.71H0M15.62 12.87C13.95 12.87 12.71 14.12 12.71 15.58C12.71 17 13.91 18.19 15.5 18.19C17.18 18.19 18.43 16.96 18.43 15.5C18.43 14.03 17.23 12.87 15.62 12.87Z"></path></svg>`,
	'yamahacorporation': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Yamaha Corporation icon</title><path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm-.412 1.377A10.648 10.648 0 0122.664 12 10.648 10.648 0 0112 22.664a10.648 10.648 0 01-.412-21.287zM12 1.9a.184.184 0 00-.172.131l-.883 2.526a.39.39 0 000 .097.3.3 0 00.133.25.926.926 0 01.074 1.465 2.345 2.345 0 00-.82 1.79v.903L5.865 6.498l-.547.953 4.987 2.877v.692l-.602.347-4.978-2.88-.551.954L8.602 12l-.782.45a2.345 2.345 0 00-1.127 1.616.93.93 0 01-1.312.668.293.293 0 00-.277 0 .324.324 0 00-.079.063l-1.742 2.037a.188.188 0 00.176.305l2.633-.493a.36.36 0 00.09-.035.3.3 0 00.152-.238.926.926 0 011.232-.781 2.345 2.345 0 001.954-.184l.78-.451v5.104h1.098v-5.756l.598-.344.598.344v5.756h1.1v-5.123l.78.45a2.345 2.345 0 001.954.184.926.926 0 011.234.782.285.285 0 00.149.238.36.36 0 00.09.035l2.634.492a.184.184 0 00.176-.305l.004.02-1.744-2.037a.39.39 0 00-.075-.063.3.3 0 00-.28 0 .938.938 0 01-.864-.035.93.93 0 01-.434-.633 2.368 2.368 0 00-1.14-1.609l-.782-.45 4.436-2.558-.549-.955-4.98 2.873-.602-.347v-.692l4.985-2.877-.547-.953L13.7 9.062v-.904a2.345 2.345 0 00-.803-1.789.922.922 0 01.079-1.465.309.309 0 00.128-.25.27.27 0 000-.097L12.18 2.03a.184.184 0 00-.18-.13zm.021 5.512a.598.598 0 01.58.598V9.7l-.597.347-.598-.348V8.01a.598.598 0 01.615-.597zm-.017 3.818l.687.391v.781l-.687.391-.688-.39v-.782zm2.299 1.403l1.46.847a.598.598 0 01.223.817v.004a.602.602 0 01-.82.219l-1.465-.844v-.696zm-4.596.004l.602.347v.692l-1.465.844a.598.598 0 11-.598-1.036z"></path></svg>`,
	'yamahamotorcorporation': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Yamaha Motor Corporation icon</title><path d="M12 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0zm0 .57C18.315.57 23.43 5.685 23.43 12c0 6.31-5.115 11.43-11.43 11.43C5.69 23.43.57 18.314.57 12 .57 5.69 5.69.57 12 .57zm0 .234c-.1 0-.183.06-.218.147l-.492 1.551A9.523 9.523 0 002.475 12c0 1.48.337 2.885.94 4.136l-1.1 1.206a.241.241 0 00-.015.262.246.246 0 00.238.115l1.592-.353a9.52 9.52 0 007.87 4.16c3.27 0 6.16-1.652 7.874-4.16l1.592.353a.236.236 0 00.23-.123.234.234 0 00-.016-.262l-1.1-1.198A9.431 9.431 0 0021.526 12a9.523 9.523 0 00-8.815-9.498L12.218.947A.237.237 0 0012 .804zm-.003.25c.024 0 .048.02.056.043l1.02 3.354a1.2 1.2 0 00-.48.957c0 .389.19.734.48.952h-.004c.436.326.718.846.718 1.429v1.12l4.326-2.497.476.825-4.802 2.77v.965l.834.48 4.802-2.774.476.825-4.326 2.5.972.56c.508.294.818.798.882 1.338v-.004a1.193 1.193 0 001.655.953l2.393 2.56c.02.02.02.047.008.07-.016.025-.04.033-.068.029l-3.413-.794a1.193 1.193 0 00-1.65-.957l.003-.004c-.5.215-1.091.199-1.6-.095l-.968-.56v4.994h-.952v-5.545l-.834-.48-.833.48v5.545h-.953V15.1l-.972.555c-.508.294-1.1.31-1.6.096l.004.004a1.193 1.193 0 00-1.651.957l-3.413.793a.054.054 0 01-.063-.028c-.016-.02-.012-.047.008-.067l2.397-2.56c.333.143.73.135 1.067-.064.338-.194.544-.528.588-.889v.004c.063-.54.373-1.044.88-1.337l.97-.56-4.327-2.496.477-.826 4.802 2.774.833-.484v-.964l-4.802-2.77.476-.826 4.326 2.496V7.79c0-.583.282-1.103.719-1.429h-.004c.29-.214.476-.56.476-.952 0-.393-.19-.738-.48-.957l1.02-3.353c.008-.028.031-.044.051-.044zm.004 5.902a.833.833 0 00-.833.833v1.67L12 9.94l.833-.48V7.789a.833.833 0 00-.833-.833zm0 4.084l-.833.48v.964l.833.476.833-.48v-.96zm-2.62 1.516l-1.444.833a.833.833 0 00-.306 1.14.822.822 0 00.723.412.83.83 0 00.416-.111l1.445-.834v-.96zm5.243 0l-.833.48V14l1.445.834a.834.834 0 00.833-1.445z"></path></svg>`,
	'yammer': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Yammer icon</title><path d="M23.5094 7.391a.696.696 0 00-.859-.527l-2.31.626A17.4135 17.4135 0 0016.3897.226a.69.69 0 00-.509-.225.677.677 0 00-.482.2L9.7667 5.8379H1.023C.458 5.838 0 6.296 0 6.862v10.2368c0 .566.458 1.025 1.023 1.025h8.7037l5.6719 5.6768a.687.687 0 00.99-.025 17.4305 17.4305 0 003.9509-7.2638l2.3109.626a.696.696 0 00.859-.527 21.9024 21.9024 0 000-9.2198zm-7.6738-5.45a15.8536 15.8536 0 013.0229 5.9499l-6.5958 1.786v-2.815a1.02 1.02 0 00-.48-.865zM9.2738 9.226l-2.205 3.8809v2.0219a.938.938 0 11-1.876 0v-2.193L3.085 9.226a.8637.8637 0 111.501-.855l1.594 2.9779 1.5939-2.978a.861.861 0 011.176-.324.866.866 0 01.324 1.179zm9.5847 6.8848a15.8536 15.8536 0 01-3.023 5.9498l-4.0788-4.0819c.301-.178.506-.504.506-.88v-2.7739zm3.316-.698l-9.9118-2.684v-1.4559l9.9117-2.684a20.4075 20.4075 0 010 6.8239Z"></path></svg>`,
	'yandex': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Yandex icon</title><path d="M1.902 16.349v-2.85L0 8.398h.957l1.4 3.938L3.97 7.573h.877l-2.069 5.96v2.815h-.876zm5.638 0h-.734c-.033-.125-.065-.3-.075-.447h-.057c-.246.313-.559.525-1.051.525-.798 0-1.344-.601-1.344-1.704 0-1.2.611-1.956 2.18-1.956h.123v-.333c0-.735-.246-1.048-.735-1.048-.445 0-.824.234-1.112.49l-.167-.766c.256-.213.766-.447 1.336-.447.99 0 1.533.424 1.533 1.781v2.636c0 .534.055 1.002.1 1.267l.003.002zm-.955-2.925h-.101c-1.08 0-1.313.479-1.313 1.2 0 .645.21 1.067.655 1.067.3 0 .601-.2.757-.445l.002-1.822zm2.802 2.925h-.869v-5.621h.869v.491h.056c.154-.21.578-.556 1.101-.556.732 0 1.121.412 1.121 1.268v4.418h-.878v-4.34c0-.423-.188-.57-.524-.57-.364 0-.675.279-.877.559v4.35l.001.001zm3.135-2.592c0-2.08.78-3.094 1.901-3.094.268 0 .545.09.713.211V8.398h.869v7.95h-.645l-.069-.445h-.055c-.245.312-.556.521-1.013.521-1.1 0-1.699-.933-1.699-2.667h-.002zm2.615-2.115c-.176-.176-.366-.266-.656-.266-.7 0-1.035 1.057-1.035 2.202 0 1.313.246 2.114.881 2.114.436 0 .666-.213.811-.435v-3.615zm3.604 4.785c-1.155 0-1.869-.924-1.869-2.647 0-1.804.501-3.116 1.69-3.116.935 0 1.544.701 1.544 2.604v.478h-2.331c0 1.268.355 1.935 1.045 1.935.489 0 .847-.222 1.068-.378l.2.667c-.354.278-.79.456-1.345.456l-.002.001zm-.957-3.394h1.435c0-.957-.155-1.657-.656-1.657-.532 0-.72.657-.78 1.657h.001zm6.095-2.292l-1.045 2.625L24 16.349h-.899l-.87-2.314-.844 2.313h-.855l1.166-2.904-1.057-2.702h.901l.727 2.035.765-2.036h.846z"></path></svg>`,
	'yarn': html`<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>Yarn icon</title><path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z"></path></svg>`,
	'ycombinator': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Y Combinator icon</title><path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"></path></svg>`,
	'yelp': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Yelp icon</title><path d="M21.111 18.226c-.141.969-2.119 3.483-3.029 3.847-.311.124-.611.094-.85-.09-.154-.12-.314-.365-2.447-3.827l-.633-1.032c-.244-.37-.199-.857.104-1.229.297-.359.732-.494 1.111-.35.02.012 1.596.531 1.596.531 3.588 1.179 3.705 1.224 3.857 1.338.227.186.332.475.285.813h.006zm-7.191-5.267c-.254-.386-.25-.841.012-1.155l.998-1.359c2.189-2.984 2.311-3.141 2.459-3.245.256-.171.57-.179.871-.032.869.422 2.623 3.029 2.729 4.029v.034c.029.341-.105.618-.346.784-.164.105-.314.166-4.393 1.156-.645.164-1.004.254-1.215.329l.029-.03c-.404.12-.854-.074-1.109-.479l-.035-.032zm-2.504-1.546c-.195.061-.789.245-1.519-.938 0 0-4.931-7.759-5.047-7.998-.07-.27.015-.574.255-.82.734-.761 4.717-1.875 5.76-1.621.34.088.574.301.656.604.06.335.545 7.536.615 9.149.066 1.38-.525 1.565-.72 1.624zm.651 7.893c-.011 3.774-.019 3.9-.081 4.079-.105.281-.346.469-.681.53-.96.164-3.967-.946-4.594-1.69-.12-.164-.195-.328-.21-.493-.016-.12 0-.24.045-.346.075-.195.18-.345 2.88-3.51l.794-.944c.271-.345.75-.45 1.199-.271.436.165.706.54.676.945v1.68l-.028.02zm-8.183-2.414c-.295-.01-.56-.187-.715-.48-.111-.215-.189-.57-.238-1.002-.137-1.301.029-3.264.419-3.887.183-.285.45-.436.745-.426.195 0 .369.061 4.229 1.65l1.13.449c.404.15.654.57.63 1.051-.03.465-.298.824-.694.93l-1.605.51c-3.59 1.155-3.709 1.185-3.898 1.17l-.003.035zm14.977 7.105h-.004l-.005.003.009-.003z"></path></svg>`,
	'youtube': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube icon</title><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"></path></svg>`,
	'youtubegaming': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube Gaming icon</title><path d="M24 13.2v-6l-6-3.6-6 3.6-6-3.6-6 3.6v6l12 7.2zM8.4 10.8H6v2.4H4.8v-2.4H2.4V9.6h2.4V7.2H6v2.4h2.4zm7.2 2.4a1.2 1.2 0 01-1.2-1.2c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2zm3.6-2.4A1.2 1.2 0 0118 9.6c0-.66.54-1.2 1.2-1.2.66 0 1.2.54 1.2 1.2 0 .66-.54 1.2-1.2 1.2Z"></path></svg>`,
	'youtubestudio': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube Studio icon</title><path d="M9.577 15.606L15.606 12 9.577 8.394zm11.38-2.423l2.536 1.972q.394.282.113.789l-2.423 4.169q-.225.394-.732.225l-2.986-1.183q-1.183.845-2.028 1.183l-.451 3.155q-.113.507-.563.507H9.577q-.45 0-.563-.507l-.45-3.155q-1.071-.45-2.029-1.183L3.55 20.338q-.507.169-.732-.225l-2.423-4.17q-.281-.506.113-.788l2.535-1.972Q2.986 12.79 2.986 12t.056-1.183L.507 8.845q-.394-.282-.113-.789l2.423-4.169q.225-.394.732-.225l2.986 1.183Q7.718 4 8.563 3.662L9.014.507Q9.127 0 9.577 0h4.846q.45 0 .563.507l.45 3.155q1.071.45 2.029 1.183l2.986-1.183q.507-.169.732.225l2.423 4.17q.281.506-.113.788l-2.535 1.972q.056.394.056 1.183t-.056 1.183Z"></path></svg>`,
	'youtubetv': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>YouTube TV icon</title><path d="M17.36 20.988H6.536c-.306 0-.51-.205-.51-.511 0-.306.204-.51.51-.51h10.928c.306 0 .51.204.51.51 0 .306-.306.51-.612.51zM1.635 3.012C.714 3.012 0 3.73 0 4.648v12.56c0 .92.714 1.634 1.634 1.634h20.73c.92 0 1.636-.714 1.636-1.633V4.648c0-.92-.716-1.636-1.636-1.636zm7.863 4.393l6.23 3.472-6.23 3.575Z"></path></svg>`
}

/**
 * @public @name CWCIconBrandPrefixY
 * @extends CustomHTMLElement
 * @description Custom Web Component, common component, brand icons
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * 
 * @attribute {String} name The name of the icon to display
 *
 * @example
 * <cwc-icon-brand-prefix-y name="foo"></cwc-icon-brand-prefix-y>
 */
class CWCIconBrandPrefixY extends CustomHTMLElement {

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
customElements.define('cwc-icon-brand-prefix-y', CWCIconBrandPrefixY);