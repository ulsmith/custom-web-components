import { CustomHTMLElement, html, ifDefined } from '../../../custom-web-component/index.js';

import '../icon/material/cwc-icon-material-general.js';
import '../icon/material/cwc-icon-material-image.js';
import '../base/cwc-base-tag.js';
import '../control/cwc-control-button.js';

/**
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

		this.heading;
		this.body;
		this.footer;

		if (this.hasAttribute('paginate-internal')) this.setAttribute('loading', '');
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
				}

				table { width: 100%; border-collapse: collapse; border-style: hidden; }

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
					right: var(--cwc-layout-table--footer--page-count--padding, 10px);
					top: 50%;
					transform: translateY(-50%);
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
							${this.heading && this.heading.length ? this.heading.map((h, i) => html`
								<th
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
										colspan="${ifDefined(c.colspan)}"
										justify="${ifDefined(c.justify)}"
										font-weight="${ifDefined(c.fontWeight)}"
										?evented="${c.event}"
									>
										${c.value === undefined ? c : c.link !== undefined ? html`
											<a href="${c.link}">${c.value}</a>
										` : c.event !== undefined ? html`
											<cwc-control-button @click="${this._action.bind(this, c.event, r)}">${c.value}</cwc-control-button>
										` : c.value}
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
		if (property === 'body' && this.hasAttribute('paginate-internal') && newValue) {
			this.removeAttribute('loading');
			this._pageCount = Math.ceil(newValue.length / this._pageSize);
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
		// set direction
		switch (this.heading[idx].order) {
			case 'asc': this.heading[idx].order = 'desc'; break;
			case 'desc': this.heading[idx].order = 'asc'; break;
			case '': this.heading[idx].order = 'asc'; break;
		}
		// remove other heading directions
		for (let i = 0; i < this.heading.length; i++) if (i !== idx && this.heading[i].order) this.heading[i].order = '';

		// event or order
		if (this.hasAttribute('paginate-external')) return this.dispatchEvent(new CustomEvent('order', { detail: { index: idx, order: this.heading[idx].order } }));
		else {
			this.body = this.body.sort((a, b) => {
				if (a[idx] < b[idx]) return this.heading[idx].order === 'asc' ? -1 : 1;
				if (a[idx] > b[idx]) return this.heading[idx].order === 'asc' ? 1 : -1;
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

		if (this.hasAttribute('paginate-external')) {
			clearTimeout(this._externalPageDebounce);
			this._externalPageDebounce = setTimeout(() => this.dispatchEvent(new CustomEvent('page', { detail: { page: page } })), 1000);
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
		if (this.hasAttribute('paginate-external')) return this.dispatchEvent(new CustomEvent('start'));

		this._page = 1;
		this.updateTemplate();
	}

	/**
	 * @public @name _end
	 * @description Change the end of the data set, last page
	 * @param {Event} ev The event that kicked the method
	 */
	_end(ev) {
		if (this.hasAttribute('paginate-external')) return this.dispatchEvent(new CustomEvent('end'));

		this._page = this._pageCount;
		this.updateTemplate();
	}

	/**
	 * @public @name _back
	 * @description Change back one page
	 * @param {Event} ev The event that kicked the method
	 */
	_back(ev) {
		if (this.hasAttribute('paginate-external')) return this.dispatchEvent(new CustomEvent('back'));

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
		if (this.hasAttribute('paginate-external')) return this.dispatchEvent(new CustomEvent('forward'));

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
		this.dispatchEvent(new CustomEvent(event, { detail: { row: row } }))
	} 
}

customElements.define('cwc-layout-table', CwcLayoutTable);