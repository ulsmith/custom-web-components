import { CustomHTMLElement, html, ifDefined, styleMap } from '../../../custom-web-component/index.js';

import '../icon/material/index.js';
import '../base/cwc-base-tag.js';
import '../control/cwc-control-button.js';

/**
 * @public @name CwcLayoutTable
 * @extends CustomHTMLElement
 * @description Custom Web Component, a table based layout that can be paginated internally, externally or have its own footer, shows a loading spinner when loading
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * @license MIT
 *
 * @event order The table needs to order by external ordering, detail contains index of data to order and order.
 * @event page The table needs to move to page by external pagination, detail contains page to move to.
 * @event start The table needs to move to the start of the pages externally.
 * @event end The table needs to move to the end of the pages externally.
 * @event back The table needs to move back a page externally.
 * @event forward The table needs to move forward a page externally.
 * @event {action} A table data event has been triggered, as set in table data [[{event: ...}]] returns row as detail.
 * 
 * @property {Array[String|Object]} header An array (columns) of string table headings or objects ['One', {...}, ...]
 * @property {Number} header[].colspan Column span of heading as Number
 * @property {String} header[].justify Justify the heading left, center, right
 * @property {String} header[].fontWeight Font weight of the heading normal, bold
 * @property {String} header[].weight Width of the heading as percentage or pixel etc. 50%, 100px
 * @property {String} header[].order Should the column be orderable, and direction, empty for orderable, asc, desc to force order
 * @property {String} header[].value The actual heading should you be using an object and not a string
 *
 * @property {Array[Array[String|Object]]} body An array (rows) of arrays (columns) of table data as strings or objects [['One', {...}, ...]]
 * @property {Number} body[][].colspan Column span of data as Number
 * @property {String} body[][].justify Justify the heading left, center, right
 * @property {String} body[][].fontWeight Font weight of the heading normal, bold
 * @property {String} body[][].event Make the contents a clickable button with an event to fire (returns row)
 * @property {String} body[][].detail Event detail if you want to do an event but send back something other than teh row of the table, such as the data object
 * @property {String} body[][].link Make the contents a clickable anchor link
 * @property {String} body[][].value The actual data should you be using an object and not a string
 * 
 * @property {Array[String|Object]} footer An array (columns) of table footers as strings or objects ['One', {...}, ...]
 * @property {Number} footer[].colspan Column span of footer as Number
 * @property {String} footer[].justify Justify the footer left, center, right
 * @property {String} footer[].fontWeight Font weight of the footer normal, bold
 * @property {String} footer[].value The actual data should you be using an object and not a string
 *
 * @attribute {Number} page-size The size of the pages (how many rows) when paginating internally or externally
 * @attribute {Number} page-count The amount pages calculated when paginating externally only
 * @attribute {Number} page The page you are currently on when paginating externally only
 * @attribute {Flag} loading The element is loading
 * @attribute {Flag} paginate-external The table is paginated (replaces footer properties), but externally, all pagination is set outside table
 * @attribute {Flag} paginate-internal The table is paginated internally (replaces footer properties), we feed it all the data and let it handle the pagination
 *
 * @style_variable --cwc-layout-table--border
 * @style_variable --cwc-layout-table--border-radius
 *
 * @style_variable --cwc-layout-table--cell--empty--height
 *
 * @style_variable --cwc-layout-table--header--background
 * @style_variable --cwc-layout-table--header--color
 * @style_variable --cwc-layout-table--header--border-radius
 * @style_variable --cwc-layout-table--header--padding
 *
 * @style_variable --cwc-layout-table--body--background
 * @style_variable --cwc-layout-table--body--color
 * @style_variable --cwc-layout-table--body--cell--padding
 * @style_variable --cwc-layout-table--body--cell--event--padding
 *
 * @style_variable --cwc-layout-table--footer--background
 * @style_variable --cwc-layout-table--footer--color
 * @style_variable --cwc-layout-table--footer--fill
 * @style_variable --cwc-layout-table--footer--cell--padding
 * @style_variable --cwc-layout-table--footer--page-count--right
 * @style_variable --cwc-layout-table--footer--page-count--padding
 * @style_variable --cwc-layout-table--footer--page-count--border
 * @style_variable --cwc-layout-table--footer--page-count--border-radius
 * @style_variable --cwc-layout-table--footer--page-count--background
 * @style_variable --cwc-layout-table--footer--page-count--color
 *  
 * @example
 * <cwc-layout-card 
 * 		.header="${this._header}"
 * 		.body="${this._body}"
 * 		page-size="5"
 * 		paginate-internal
 * ></cwc-layout-card>
 *
 * <cwc-layout-card
 * 		.header="${this._header}"
 * 		.body="${this._body}"
 * 		page-size="5"
 * 		page-count="4"
 *		page="1"
 * 		paginate-external
 * ></cwc-layout-card>
 */
class CwcLayoutTable extends CustomHTMLElement {

	/**
	 * @public @constructor @name constructor
	 * @description Process called function triggered when component is instantiated (but not ready or in DOM, must call super() first)
	 */
	constructor() {
		super();

		this._open = false;

		this._pageSize = 5;
		this._pageCount = 1;
		this._page = 1;

		this.header;
		this.body;
		this.footer;
	}

	// Define a template
	static template() {
		return html`
			<style>
				:host { display: block; }
				[hidden] { display: none !important; }
				
				.container {
					position: relative;
					margin: 0px;
					border: var(--cwc-layout-table--border, 1px solid #ccc);
					box-shadow: var(--cwc-layout-table--border, 0px 0px 6px -4px rgba(0,0,0,0.75));
					border-radius: var(--cwc-layout-table--border-radius, 0px);
					overflow: hidden;
				}

				table { width: calc(100% + 1px); border-collapse: collapse; border-style: hidden; }

				table thead {
					background: var(--cwc-layout-table--header--background, #999);
					color: var(--cwc-layout-table--header--color, #222);
					fill: var(--cwc-layout-table--header--color, #222);
					border-radius: var(--cwc-layout-table--header--border-radius, 0px);
				}

				table thead tr th {
					padding: var(--cwc-layout-table--header--padding, 20px);
					text-align: left;
					font-weight: normal;
				}

				table thead tr th[order] {
					position: relative;
					cursor: pointer;
					-moz-user-select: none;
					-khtml-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				table tbody {
					background: var(--cwc-layout-table--body--background, whitesmoke);
					color: var(--cwc-layout-table--body--color, #444);
				}

				table tbody tr td {
					padding: var(--cwc-layout-table--body--cell--padding, 20px);
					text-align: left;
					border: 1px solid #d8d8d8;
				}

				table tfoot {
					background: var(--cwc-layout-table--footer--background, whitesmoke);
					color: var(--cwc-layout-table--footer--color, #444);
					fill: var(--cwc-layout-table--footer--fill, var(--cwc-layout-table--footer--color, #444));
				}

				table tfoot tr td {
					position: relative;
					padding: var(--cwc-layout-table--footer--cell--padding, 20px);
					text-align: left;
				}

				table [empty] { padding: var(--cwc-layout-table--cell--empty--height, 30px); }

				[justify="center"] { text-align: center; }
				[justify="right"] { text-align: right; }
				[font-weight="bold"] { font-weight: bold; }
				[evented] { padding: var(--cwc-layout-table--body--cell--event--padding, 10px 20px)}
				.center { text-align: center; }
				.page-number { font-size: 16px; width: 80px; padding: 5px; }

				.page-count {
					position: absolute;
					right: var(--cwc-layout-table--footer--page-count--right, 10px);
					top: 50%;
					transform: translateY(-50%);
					padding: var(--cwc-layout-table--footer--page-count--padding, 10px);
					border: var(--cwc-layout-table--footer--page-count--border, none);
					border-radius: var(--cwc-layout-table--footer--page-count--border-radius, 0);
					background: var(--cwc-layout-table--footer--page-count--background, #444);
					color: var(--cwc-layout-table--footer--page-count--color, white);
				}

				.icon {
					width: 36px;
					height: 36px;
					-moz-user-select: none;
					-khtml-user-select: none;
					-webkit-user-select: none;
					-ms-user-select: none;
					user-select: none;
				}

				.icon.orderable {
					position: absolute;
					right: 3px;
					width: 22px;
					height: 22px;
					padding: 0px;
				}

				.icon[order] { transition: transform 0.2s linear; transform: rotate(-90deg); }
				.icon[order="asc"] { transform: rotate(-180deg); }
				.icon[order="desc"] { transform: rotate(0deg); }
				.action { cursor: pointer; }

				.loading-table-background {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: grey;
					opacity: 0.8;
				}

				.loading-table {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%)
				}
								
				.loading {
					fill: white;
					width: 60px;
					height: 60px;
					animation-name: loading;
					animation-duration: 750ms;
					animation-iteration-count: infinite;
					animation-timing-function: ease-in-out;
				}

				@keyframes loading {
					0% { transform:rotate(0deg); }
					10% { transform:rotate(5deg); }
					90% { transform:rotate(355deg); }
					100% { transform:rotate(360deg); }
				}
			</style>

			<div class="container">
				<table>
					<thead>
						<tr>
							${this.header && this.header.length ? this.header.map((h, i) => html`
								<th
									?hidden="${h.hidden}"
									colspan="${ifDefined(h.colspan)}"
									justify="${ifDefined(h.justify)}"
									font-weight="${ifDefined(h.fontWeight)}"
									width="${ifDefined(h.width)}"
									order="${ifDefined(h.order)}"
									@click="${this._order.bind(this, i)}"
								>
									${h.value !== undefined ? h.value : h}
									${h.order !== undefined ? html`
										<cwc-icon-material-general class="icon orderable" name="arrowDropDown" order="${ifDefined(h.order)}"></cwc-icon-material-general>
									` : ''}
								</th>
							`) : html`
								<th colspan="999" empty></th>
							`}
						</tr>
					</thead>
					<tbody>
						${this.body !== undefined ? this.body.filter((r, i) => this._paginate(i)).map((r) => html`
							<tr>
								${r.map((c) => html`
									<td 
										?hidden="${c && c.hidden}"
										colspan="${ifDefined(c ? c.colspan : undefined)}"
										justify="${ifDefined(c ? c.justify : undefined)}"
										font-weight="${ifDefined(c ? c.fontWeight : undefined)}"
										?evented="${c && c.event}"
									>
										${typeof c !== 'object' ? c : c.link ? html`
											<a href="${c.link}" style="${ifDefined(c.style ? styleMap(c.style) : undefined)}">${c.value}</a>
										` : c.event ? html`
											<cwc-control-button ?disabled="${c.disabled}" @click="${this._action.bind(this, c.event, c.detail ? c.detail : r)}" style="${ifDefined(c.style ? styleMap(c.style) : undefined)}">
												${c.icon && c.icon.type === 'av' ? html`<cwc-icon-material-av class="link-icon" name="${c.icon.name}"></cwc-icon-material-av>` : ''}
												${c.icon && c.icon.type === 'communication' ? html`<cwc-icon-material-communication class="link-icon" name="${c.icon.name}"></cwc-icon-material-communication>` : ''}
												${c.icon && c.icon.type === 'device' ? html`<cwc-icon-material-device class="link-icon" name="${c.icon.name}"></cwc-icon-material-device>` : ''}
												${c.icon && c.icon.type === 'editor' ? html`<cwc-icon-material-editor class="link-icon" name="${c.icon.name}"></cwc-icon-material-editor>` : ''}
												${c.icon && c.icon.type === 'general' ? html`<cwc-icon-material-general class="link-icon" name="${c.icon.name}"></cwc-icon-material-general>` : ''}
												${c.icon && c.icon.type === 'hardware' ? html`<cwc-icon-material-hardware class="link-icon" name="${c.icon.name}"></cwc-icon-material-hardware>` : ''}
												${c.icon && c.icon.type === 'image' ? html`<cwc-icon-material-image class="link-icon" name="${c.icon.name}"></cwc-icon-material-image>` : ''}
												${c.icon && c.icon.type === 'map' ? html`<cwc-icon-material-map class="link-icon" name="${c.icon.name}"></cwc-icon-material-map>` : ''}
												${c.icon && c.icon.type === 'notification' ? html`<cwc-icon-material-notification class="link-icon" name="${c.icon.name}"></cwc-icon-material-notification>` : ''}
												${c.icon && c.icon.type === 'place' ? html`<cwc-icon-material-place class="link-icon" name="${c.icon.name}"></cwc-icon-material-place>` : ''}
												${c.icon && c.icon.type === 'social' ? html`<cwc-icon-material-social class="link-icon" name="${c.icon.name}"></cwc-icon-material-social>` : ''}
												${c.value ? c.value : ''}
											</cwc-control-button>
										` : html`
											${c.icon && c.icon.type === 'av' ? html`<cwc-icon-material-av class="link-icon" name="${c.icon.name}"></cwc-icon-material-av>` : ''}
											${c.icon && c.icon.type === 'communication' ? html`<cwc-icon-material-communication class="link-icon" name="${c.icon.name}"></cwc-icon-material-communication>` : ''}
											${c.icon && c.icon.type === 'device' ? html`<cwc-icon-material-device class="link-icon" name="${c.icon.name}"></cwc-icon-material-device>` : ''}
											${c.icon && c.icon.type === 'editor' ? html`<cwc-icon-material-editor class="link-icon" name="${c.icon.name}"></cwc-icon-material-editor>` : ''}
											${c.icon && c.icon.type === 'general' ? html`<cwc-icon-material-general class="link-icon" name="${c.icon.name}"></cwc-icon-material-general>` : ''}
											${c.icon && c.icon.type === 'hardware' ? html`<cwc-icon-material-hardware class="link-icon" name="${c.icon.name}"></cwc-icon-material-hardware>` : ''}
											${c.icon && c.icon.type === 'image' ? html`<cwc-icon-material-image class="link-icon" name="${c.icon.name}"></cwc-icon-material-image>` : ''}
											${c.icon && c.icon.type === 'map' ? html`<cwc-icon-material-map class="link-icon" name="${c.icon.name}"></cwc-icon-material-map>` : ''}
											${c.icon && c.icon.type === 'notification' ? html`<cwc-icon-material-notification class="link-icon" name="${c.icon.name}"></cwc-icon-material-notification>` : ''}
											${c.icon && c.icon.type === 'place' ? html`<cwc-icon-material-place class="link-icon" name="${c.icon.name}"></cwc-icon-material-place>` : ''}
											${c.icon && c.icon.type === 'social' ? html`<cwc-icon-material-social class="link-icon" name="${c.icon.name}"></cwc-icon-material-social>` : ''}
											${c.value ? html`<span style="${ifDefined(c.style ? styleMap(c.style) : undefined)}">${c.value}</span>` : ''}
										`}
									</td>
								`)}
							</tr>
						`) : html`
							<tr>
								<td colspan="999" empty></td>
							</tr>
						`}
					</tbody>
					${this.footer !== undefined || this.hasAttribute('paginate-external') || this.hasAttribute('paginate-internal') ? html`
						<tfoot>
							<tr>
								${this.footer !== undefined ? this.footer.map((f) => html`
									<td
										colspan="${ifDefined(f.colspan)}"
										justify="${ifDefined(f.justify)}"
										font-weight="${ifDefined(f.fontWeight)}"
									>${f.value !== undefined ? f.value : f}</td>
								`) : this.body !== undefined ? html`
									<td colspan="999" justify="center" icons>
										<cwc-icon-material-general class="icon action" name="firstPage" @click="${this._start.bind(this)}"></cwc-icon-material-general>
										<cwc-icon-material-general class="icon action" name="chevronLeft" @click="${this._back.bind(this)}"></cwc-icon-material-general>
										<input class="page-number" type="number" max="${this._pageCount}" min="1" .value="${this._page}" @input="${this._change.bind(this)}" />
										<cwc-icon-material-general class="icon action" name="chevronRight" @click="${this._forward.bind(this)}"></cwc-icon-material-general>
										<cwc-icon-material-general class="icon action" name="lastPage" @click="${this._end.bind(this)}"></cwc-icon-material-general>
										<cwc-base-tag class="page-count">${this._pageCount}</cwc-base-tag>
									</td>
								` : html`
									<td colspan="999" empty></td>
								`}
							</tr>
						</tfoot>
					` : ''}
				</table>

				${this.body === undefined || this.hasAttribute('loading') ? html`
					<div class="loading-table-background"></div>
					<div class="loading-table">
						<cwc-icon-material-image class="icon loading" name="rotateRight"></cwc-icon-material-image>
					</div>
				` : ''}
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
		return ['header', 'body', 'footer'];
	}

	/**
	 * @public @name propertyChanged
	 * @description Callback run when an observed property changes value
	 * @param {String} property The property that changed
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	propertyChanged(property, oldValue, newValue) {
		if (property === 'body') {
			if (this.hasAttribute('paginate-internal') && newValue) this._pageCount = Math.ceil(newValue.length / this._pageSize);
			this._order();
		}

		this.updateTemplate();
	}

	/**
	 * @public @static @get @name observedAttributes
	 * @description Lifecycle hook that sets attributes to observe on the element
	 * 
	 * @return {Array} An array of string property names (camelcase)
	 */
	static get observedAttributes() {
		return ['page-size', 'page-count', 'page', 'loading'];
	}

	/**
	 * @public @name attributeChanged
	 * @description Callback run when an observed property changes value
	 * @param {String} attribute The attribute that changed
	 * @param {Mixed} oldValue The old value
	 * @param {Mixed} newValue The new value
	 */
	attributeChanged(attribute, oldValue, newValue) {
		switch (attribute) {
			case 'page-size': this._pageSize = newValue; break;
			case 'page-count': this._pageCount = newValue; break;
			case 'page': this._page = newValue; break;
		} 
		
		this.updateTemplate();
	}

	/**
	 * @public @name _order
	 * @description Change the order of the data
	 * @param {Number} idx The index of the column to order
	 * @param {Event} ev The event that kicked the method
	 */
	_order(idx, ev) {	
		// set on load?
		if (idx === undefined) idx = this.header.findIndex((h) => ['asc', 'desc'].indexOf(h.order) >= 0); 
		else {
			// switch direction as it was a click
			switch (this.header[idx].order) {
				case 'asc': this.header[idx].order = 'desc'; break;
				case 'desc': this.header[idx].order = 'asc'; break;
				case '': this.header[idx].order = 'asc'; break;
			}
		}

		// remove other heading directions
		for (let i = 0; i < this.header.length; i++) if (i !== idx && this.header[i].order) this.header[i].order = '';

		// event or order
		if (!this.header[idx]) return;

		this.dispatchEvent(new CustomEvent('order', { detail: { index: idx, order: this.header[idx].order } }));
		if (this.hasAttribute('paginate-external')) return;
		else {
			this.body = this.body.sort((a, b) => {
				if ((a[idx].order ? a[idx].order : a[idx]) < (b[idx].order ? b[idx].order : b[idx])) return this.header[idx].order === 'asc' ? -1 : 1;
				if ((a[idx].order ? a[idx].order : a[idx]) > (b[idx].order ? b[idx].order : b[idx])) return this.header[idx].order === 'asc' ? 1 : -1;
				return 0;
			});
		}
		
		this.updateTemplate();
	}

	/**
	 * @public @name _page
	 * @description Change the page of the paginated data
	 * @param {Event} ev The event that kicked the method
	 */
	_change(ev) {
		if (!ev.target.value) return;
		
		let page = Number(ev.target.value);
		page = page > this._pageCount ? this._pageCount : page;
		page = page < 1 ? 1 : page;

		clearTimeout(this._externalPageDebounce);
		this._externalPageDebounce = setTimeout(() => this.dispatchEvent(new CustomEvent('page', { detail: { page: page } })), 1000);
		if (this.hasAttribute('paginate-external')) {
			ev.target.value = page;
			return;
		}
		
		this._page = page;
		this.updateTemplate();
	}

	/**
	 * @public @name _start
	 * @description Change the start of the data set, first page
	 * @param {Event} ev The event that kicked the method
	 */
	_start(ev) {
		this.dispatchEvent(new CustomEvent('start'));
		if (this.hasAttribute('paginate-external')) return;

		this._page = 1;
		this.updateTemplate();
	}

	/**
	 * @public @name _end
	 * @description Change the end of the data set, last page
	 * @param {Event} ev The event that kicked the method
	 */
	_end(ev) {
		this.dispatchEvent(new CustomEvent('end'));
		if (this.hasAttribute('paginate-external')) return;

		this._page = this._pageCount;
		this.updateTemplate();
	}

	/**
	 * @public @name _back
	 * @description Change back one page
	 * @param {Event} ev The event that kicked the method
	 */
	_back(ev) {
		this.dispatchEvent(new CustomEvent('back'));
		if (this.hasAttribute('paginate-external')) return;

		if (this._page < 2) return;
		this._page--;
		this.updateTemplate();
	}

	/**
	 * @public @name _forward
	 * @description Change forward one page
	 * @param {Event} ev The event that kicked the method
	 */
	_forward(ev) {
		this.dispatchEvent(new CustomEvent('forward'));
		if (this.hasAttribute('paginate-external')) return;

		if (this._page >= this._pageCount) return;
		this._page++;
		this.updateTemplate();
	}

	/**
	 * @public @name _paginate
	 * @description Paginate the data set internally
	 * @param {Number} idx The index of hte data row
	 * @return {Boolean} deciding to hide or show rows based on if its paginated
	 */
	_paginate(idx) {
		if (!this.hasAttribute('paginate-internal')) return true;

		return idx >= this._pageSize * (this._page - 1) && idx < this._pageSize * this._page;
	}

	/**
	 * @public @name _action
	 * @description Emit an event action, telling allowing the parent to subscribe and to things
	 * @param {String} event The name of the event we want to emit
	 * @param {Object} row The row of data that emitted the action
	 */
	_action(event, row) {
		this.dispatchEvent(new CustomEvent(event, { detail: row }))
	} 
}

customElements.define('cwc-layout-table', CwcLayoutTable);