import { CustomHTMLElement, html } from '../../../../custom-web-component/index.js';

const ICONS = {
	'nativescript': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NativeScript icon</title><path d="M1.77 1.76A5.68 5.68 0 0 1 5.8 0h12.6c1.37 0 2.65.6 3.83 1.76A5.43 5.43 0 0 1 24 5.7v12.77c0 1.34-.56 2.58-1.68 3.73A5.77 5.77 0 0 1 18.25 24H5.87a6.3 6.3 0 0 1-4.1-1.57C.69 21.45.1 20.03 0 18.13V5.73a5.21 5.21 0 0 1 1.77-3.97zm6.25 8.3l7.93 10.06h2.12c.49-.06.88-.2 1.17-.43.3-.23.5-.56.64-1v-4.94c.08-.95.67-1.54 1.77-1.75-1.1-.4-1.69-1.02-1.77-1.86V5.42c-.12-.44-.33-.8-.64-1.07a1.83 1.83 0 0 0-1.09-.47H16v10.2L8.02 3.87H5.79c-.56.1-.97.3-1.25.6S4.08 5.25 4 5.9v4.85c-.35.69-.9 1.1-1.65 1.25.85.16 1.4.61 1.65 1.36v4.77c.02.55.2 1 .54 1.37.33.36.7.53 1.1.5H8l.02-9.94z"></path></svg>`,
	'ndr': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NDR icon</title><path d="M5.184 19.325l-3.137-5.648v5.649H0V9.64h2.149l3.267 6.025V9.641h2.047v9.684zm2.279-9.684V.537H8.61v9.104zm0 13.822v-4.138H8.61v4.138zM12.037 9.64c2.395 0 3.63 1.147 3.63 3.368v2.918c0 2.28-1.19 3.398-3.63 3.398H8.61V9.641zm-.19 7.855c1.163 0 1.728-.581 1.728-1.771v-2.498c0-1.176-.58-1.757-1.727-1.757h-1.03v6.026zm9.845 1.83l-1.728-3.718h-1.161v3.717h-2.15V9.641h3.384c2.381 0 3.513.944 3.513 2.962 0 1.335-.493 2.134-1.597 2.613L24 19.326zm-1.568-5.475c.857 0 1.365-.494 1.365-1.32 0-.858-.377-1.177-1.365-1.177H18.76v2.498h1.365z"></path></svg>`,
	'nec': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NEC icon</title><path d="M.08 9.27H2c.44 0 .95.4 1.19.63l3.36 3.69V9.27H7.7v5.9h-2c-.36-.02-.71-.1-1.12-.49l-3.36-3.7v4.18H.08V9.27zM23.92 15.2c-1.37.19-2.75.2-4.14.09a6.21 6.21 0 01-2.34-.61c-.92-.48-1.22-1.54-1.2-2.5 0-.88.27-1.83 1.07-2.35A4.33 4.33 0 0119 9.27c1.62-.28 3.25-.22 4.84-.04v.84c-1.87-.36-3.85-.27-4.52.58a2.25 2.25 0 00-.48 1.5c0 .8.28 2 1.92 2.24 1.07.15 2.13.03 3.16-.15v.96zM12.2 14.28c.16 0 2.74.02 3.63 0v.88c-1.79.07-3.5.1-5.3.03-1.53-.06-1.8-.82-1.82-1.55V9.27h7.03v.84H11.2v1.5h4.15v.82h-4.15l.02 1.03c.02.57.3.78.99.82z"></path></svg>`,
	'neo4j': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Neo4j icon</title><path d="M22.717 8.417c-.014 2.959-2.412 5.321-5.391 5.309-2.946-.014-5.306-2.424-5.291-5.407.014-2.9 2.458-5.287 5.391-5.265 2.926.022 5.304 2.434 5.291 5.363zM9.813 24c-2.357.008-4.337-1.965-4.361-4.344-.024-2.33 1.955-4.33 4.295-4.34 2.438-.01 4.395 1.916 4.395 4.326.003 2.383-1.952 4.35-4.329 4.358zM8.923 2.84c0 1.562-1.286 2.847-2.841 2.839C4.533 5.672 3.221 4.35 3.246 2.82 3.271 1.268 4.588-.022 6.126 0c1.531.023 2.797 1.308 2.797 2.84zM21.9 11.948c-2.697 2.356-5 2.779-7.42 1.36-2.14-1.254-3.196-3.721-2.654-6.197.587-2.68 2.506-4.085 6.197-4.467C15.222.642 12.26.025 9.008.821c-.421.102-.241.261-.126.473.786 1.447.383 3.207-.942 4.151-1.325.943-3.126.755-4.218-.49-.322-.367-.427-.269-.654.063C.56 8.691.705 13.697 3.44 17.203c.492.631 1.027 1.219 1.691 1.71.75-3.208 3.394-4.251 5.519-3.888 2.593.442 4.002 2.602 3.758 5.787 3.516-.43 7.927-5.65 7.492-8.864zm-9.088-9.853c.462-.023.87.365.881.835.009.456-.347.827-.807.843-.506.017-.862-.32-.866-.818-.005-.476.328-.837.792-.86zM5.076 6.629c.48.009.853.401.832.876-.019.452-.398.804-.859.798-.46-.006-.821-.366-.828-.827-.007-.483.369-.855.855-.847zm-.721 3.099c.003-.451.374-.824.829-.835.461-.011.825.335.844.803.02.489-.337.878-.813.887-.473.007-.863-.381-.86-.855zm.515 2.371c.023-.46.396-.806.858-.797.479.01.822.391.802.891-.019.468-.384.813-.846.797-.478-.014-.838-.409-.814-.891zm1.992 3.034c-.5.007-.857-.345-.851-.838.006-.46.371-.832.818-.836.47-.004.873.391.869.853-.002.452-.371.813-.836.821zm3.831-12.11c-.469.012-.868-.38-.866-.849.002-.481.384-.84.876-.826.462.013.814.376.813.837-.001.449-.372.827-.823.838zm5.008 15.122c-.494-.004-.856-.375-.838-.858.018-.446.402-.81.855-.808.479.004.85.393.833.875-.015.462-.37.792-.85.791zm1.534-1.77c-.482.011-.872-.367-.866-.84.005-.462.363-.822.825-.833.485-.011.864.356.863.841.001.455-.362.821-.822.832z"></path></svg>`,
	'neovim': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Neovim icon</title><path d="M2.902,4.998l3.864,5.754v12.151l-4.207-4.198V5.344L2.902,4.998 M2.97,4.287L2.107,5.158v13.734l5.112,5.101 v-13.38L2.97,4.287L2.97,4.287z M21.858,5.207L16.676,0v13.331l4.335,6.519c0,0,0.882-0.957,0.882-0.957L21.858,5.207z M7.215,0.001 l13.29,20.28L16.786,24L3.489,3.765L7.215,0.001z"></path></svg>`,
	'netapp': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>NetApp icon</title><path d="M0 2v20h9.33V10h5.34v12H24V2Z"></path></svg>`,
	'netflix': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Netflix icon</title><path d="M5.39.004l4.75 13.46v-.007l.376 1.06c2.088 5.908 3.21 9.075 3.216 9.082.004 0 .32.02.702.04 1.156.05 2.59.18 3.676.31.25.03.466.04.48.03l-4.71-13.36-.436-1.23-2.423-6.85c-.46-1.3-.85-2.408-.87-2.45L10.12 0H5.395zM13.898.012l-.01 5.306-.008 5.306-.437-1.232V9.39l-.565 11.81c.555 1.567.852 2.403.855 2.407.004.004.32.024.702.042 1.157.05 2.59.18 3.68.31.25.03.467.04.48.03s.02-5.42.017-12.01L18.604.01h-4.706zM5.39.002v11.99c0 6.594.007 11.995.015 12.003s.416-.03.907-.086c.49-.06 1.17-.13 1.51-.16.518-.05 2.068-.15 2.248-.15.052 0 .056-.27.063-5.08l.008-5.08.38 1.06.13.376.57-11.8-.19-.546-.88-2.44-.03-.087H5.39z"></path></svg>`,
	'netlify': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Netlify icon</title><path d="M16.934 8.519a1.044 1.044 0 0 1 .303.23l2.349-1.045-2.192-2.171-.491 2.954zM12.06 6.546a1.305 1.305 0 0 1 .209.574l3.497 1.482a1.044 1.044 0 0 1 .355-.177l.574-3.55-2.13-2.234-2.505 3.852v.053zm11.933 5.491l-3.748-3.748-2.548 1.044 6.264 2.662s.053.042.032.042zm-.627.606l-6.013-2.569a1.044 1.044 0 0 1-.7.407l-.647 3.957a1.044 1.044 0 0 1 .303.731l3.633.762 3.33-3.31v-.062zM15.4 9.25L12.132 7.86a1.2 1.2 0 0 1-1.044.543h-.199L8.185 12.58l7.225-3.132v.01a.887.887 0 0 1 0-.167.052.052 0 0 0-.01-.041zm3.967 7.308l-3.195-.658a1.096 1.096 0 0 1-.46.344l-.761 4.72 4.437-4.396s-.01.02-.021.02zm-4.469-.324a1.044 1.044 0 0 1-.616-.71l-5.95-1.222-.084.136 5.398 7.81.323-.324.919-5.67s.031.022.01.011zm-6.441-2.652l5.878 1.211a1.044 1.044 0 0 1 .824-.522l.637-3.894-.135-.115-7.308 3.132a1.817 1.817 0 0 1 .104.188zm-2.464.981l-.125-.125-2.537 1.044 1.232 1.222 1.399-2.172zm1.67.397a1.368 1.368 0 0 1-.563.125 1.389 1.389 0 0 1-.45-.073l-1.544 2.245 6.765 6.702 1.19-1.18zm-.95-2.641a1.702 1.702 0 0 1 .314 0 1.378 1.378 0 0 1 .344 0l2.735-4.25a1.19 1.19 0 0 1-.334-.824 1.242 1.242 0 0 1 0-.271l-3.32-1.535-2.672 2.6zm.303-7.402l3.237 1.378a1.242 1.242 0 0 1 .835-.282 1.357 1.357 0 0 1 .397.063l2.526-3.947L11.923.041 7.016 4.854s-.01.052 0 .063zm-1.21 8.164a1.566 1.566 0 0 1 .24-.334L3.278 8.613 0 11.797l5.804 1.284zm-.262.7L.533 12.735l2.203 2.235 2.777-1.18z"></path></svg>`,
	'newyorktimes': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>New York Times icon</title><path d="M21.272,14.815h-0.098c-0.747,2.049-2.335,3.681-4.363,4.483v-4.483l2.444-2.182l-2.444-2.182V7.397 c2.138,0.006,3.885-1.703,3.927-3.84c0-2.629-2.509-3.556-3.927-3.556c-0.367-0.007-0.734,0.033-1.091,0.12v0.131h0.556 c0.801-0.141,1.565,0.394,1.706,1.195C17.99,1.491,17.996,1.537,18,1.583c-0.033,0.789-0.7,1.401-1.488,1.367 c-0.02-0.001-0.041-0.002-0.061-0.004c-2.444,0-5.323-1.985-8.454-1.985C5.547,0.83,3.448,2.692,3.284,5.139 C3.208,6.671,4.258,8.031,5.76,8.346v-0.12C5.301,7.931,5.041,7.407,5.084,6.862c0.074-1.015,0.957-1.779,1.973-1.705 C7.068,5.159,7.08,5.16,7.091,5.161c2.629,0,6.872,2.182,9.501,2.182h0.098v3.142l-2.444,2.182l2.444,2.182v4.549 c-0.978,0.322-2.003,0.481-3.033,0.469c-1.673,0.084-3.318-0.456-4.614-1.516l4.429-1.985V7.451l-6.196,2.727 c0.592-1.75,1.895-3.168,3.589-3.905V6.175c-4.516,1.004-8.138,4.243-8.138,8.705c0,5.193,4.025,9.12,9.818,9.12 c6.011,0,8.727-4.363,8.727-8.814V14.815z M8.858,18.186c-1.363-1.362-2.091-3.235-2.007-5.16c-0.016-0.88,0.109-1.756,0.371-2.596 l2.051-0.938v8.476L8.858,18.186z"></path></svg>`,
	'nextDotJs': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Next.js icon</title><path d="M17.813 22.502c-.089.047-.084.066.005.021a.228.228 0 0 0 .07-.047c0-.016-.002-.014-.075.026zm.178-.094c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.071c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.117-.07c-.042.033-.042.035.009.009.028-.014.052-.03.052-.035 0-.019-.012-.014-.061.026zm.162-.105c-.082.052-.108.087-.035.047.052-.03.136-.094.122-.096a.466.466 0 0 0-.087.049zM11.214.006c-.052.005-.216.021-.364.033-3.408.307-6.601 2.146-8.623 4.973a11.876 11.876 0 0 0-2.118 5.243c-.096.659-.108.854-.108 1.748s.012 1.088.108 1.748c.652 4.506 3.859 8.292 8.208 9.695.779.251 1.6.422 2.533.525.364.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.206-.106.246-.134.218-.157a231.73 231.73 0 0 1-1.954-2.62l-1.919-2.592-2.404-3.558a332.01 332.01 0 0 0-2.421-3.556c-.009-.002-.019 1.579-.023 3.509-.007 3.38-.009 3.516-.052 3.596a.424.424 0 0 1-.206.213c-.075.038-.141.045-.495.045H7.81l-.108-.068a.442.442 0 0 1-.157-.171l-.049-.106.005-4.703.007-4.705.073-.091a.637.637 0 0 1 .174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 0 1 2.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.34 12.34 0 0 0 2.465-2.163 11.94 11.94 0 0 0 2.824-6.134c.096-.659.108-.854.108-1.748s-.012-1.088-.108-1.748c-.652-4.506-3.859-8.292-8.208-9.695a12.552 12.552 0 0 0-2.498-.523c-.225-.023-1.776-.049-1.97-.03zm4.912 7.258a.471.471 0 0 1 .237.277c.019.061.023 1.365.019 4.304l-.007 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.009-3.096.023-3.15a.484.484 0 0 1 .232-.296c.096-.049.131-.054.5-.054.347 0 .408.005.486.047z"></path></svg>`,
	'nextcloud': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nextcloud icon</title><path d="M12.018 6.537c-2.5 0-4.6 1.712-5.241 4.015-.56-1.232-1.793-2.105-3.225-2.105A3.569 3.569 0 0 0 0 12a3.569 3.569 0 0 0 3.552 3.553c1.432 0 2.664-.874 3.224-2.106.641 2.304 2.742 4.016 5.242 4.016 2.487 0 4.576-1.693 5.231-3.977.569 1.21 1.783 2.067 3.198 2.067A3.568 3.568 0 0 0 24 12a3.569 3.569 0 0 0-3.553-3.553c-1.416 0-2.63.858-3.199 2.067-.654-2.284-2.743-3.978-5.23-3.977zm0 2.085c1.878 0 3.378 1.5 3.378 3.378 0 1.878-1.5 3.378-3.378 3.378A3.362 3.362 0 0 1 8.641 12c0-1.878 1.5-3.378 3.377-3.378zm-8.466 1.91c.822 0 1.467.645 1.467 1.468s-.644 1.467-1.467 1.468A1.452 1.452 0 0 1 2.085 12c0-.823.644-1.467 1.467-1.467zm16.895 0c.823 0 1.468.645 1.468 1.468s-.645 1.468-1.468 1.468A1.452 1.452 0 0 1 18.98 12c0-.823.644-1.467 1.467-1.467z"></path></svg>`,
	'nextdoor': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Nextdoor icon</title><path d="M23.993 9.816L12 2.473l-4.12 2.524V2.473H4.124v4.819L.004 9.816l1.961 3.202 2.16-1.315v9.826h15.749v-9.826l2.159 1.315 1.96-3.202"></path></svg>`,
	'nfc': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>NFC icon</title><path d="M23.96 1.98A1.89 1.89 0 0022.14.2c-1.1-.07-4.66-.12-5.69-.12 1.83 1.26 2.08 3.64 2.26 8.06.1 2.62 0 11.8 0 12.2l-.05 2.5-9.63-9.64v-3l7.66 7.65c.02-1.52.04-3.5.04-5.3 0-1.76-.03-3.35-.08-4.2-.29-4.81-.74-7.07-3.25-7.96a7.88 7.88 0 00-2.68-.35c-1 0-7.87 0-8.87.05A1.85 1.85 0 00.05 1.9c-.06.98-.07 19.17 0 20.17.05.98.8 1.72 1.8 1.78 1.1.06 4.67.07 5.7.07-1.83-1.26-2.08-3.64-2.26-8.06-.1-2.62 0-11.8 0-12.2l.05-2.5 9.63 9.64v3L7.3 6.16c-.02 1.52-.04 3.5-.04 5.3 0 1.76.03 3.35.08 4.2.29 4.81.74 7.07 3.25 7.95.77.28 1.49.34 2.68.36 1 0 7.87 0 8.86-.05a1.85 1.85 0 001.82-1.81c.05-.98.06-19.13 0-20.12Z"></path></svg>`,
	'nginx': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NGINX icon</title><path d="M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z"></path></svg>`,
	'niconico': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>niconico icon</title><path d="M.4787 7.534v12.1279A2.0213 2.0213 0 0 0 2.5 21.6832h2.3888l1.323 2.0948a.4778.4778 0 0 0 .4043.2205.4778.4778 0 0 0 .441-.2205l1.323-2.0948h6.9828l1.323 2.0948a.4778.4778 0 0 0 .441.2205c.1838 0 .3308-.0735.4043-.2205l1.323-2.0948h2.6462a2.0213 2.0213 0 0 0 2.0213-2.0213V7.5339a2.0213 2.0213 0 0 0-2.0213-1.9845h-7.681l4.4468-4.4469L17.1637 0l-5.1452 5.1452L6.8 0 5.6973 1.1025l4.4102 4.4102H2.5367a2.0213 2.0213 0 0 0-2.058 2.058z"></path></svg>`,
	'nim': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nim icon</title><path d="M12.095 2.9s-.92.778-1.857 1.55c-.964-.032-2.856.199-3.88.598C5.412 4.408 4.582 3.7 4.582 3.7s-.709 1.305-1.154 2.07c-.662.377-1.325.8-1.917 1.36C.824 6.84.026 6.482 0 6.471c.911 1.966 1.524 3.935 3.19 5.119 2.654-4.483 14.983-4.07 17.691-.025 1.75-.977 2.43-3.078 3.119-5.018-.075.026-1.012.362-1.619.61-.363-.423-1.217-1.072-1.702-1.385a96.008 96.008 0 00-1.131-2.122s-.794.632-1.715 1.322c-1.243-.246-2.747-.544-4.012-.47A52.988 52.988 0 0112.095 2.9z M.942 10.65l2.189 5.671c3.801 5.366 13.508 5.739 17.74.104 1.001-2.415 2.352-5.808 2.352-5.808-1.086 1.721-2.852 2.909-3.94 3.549-.774.453-2.558.727-2.558.727l-4.684-2.597-4.71 2.545s-1.761-.303-2.558-.701c-1.608-.919-2.69-2.004-3.83-3.49z"></path></svg>`,
	'nintendo': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nintendo icon</title><path d="M0 .6h7.1l9.85 15.9V.6H24v22.8h-7.04L7.06 7.5v15.9H0V.6"></path></svg>`,
	'nintendo3ds': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nintendo 3DS icon</title><path d="M17.653 16.63a.712.712 0 1 0 1.424 0 .712.712 0 1 0-1.424 0m-9.45 4.238h7.575c.3 0 .524-.225.544-.524v-5.175c-.02-.282-.263-.525-.544-.507H8.203a.54.54 0 0 0-.544.525v5.156c0 .301.244.525.544.525zm13.051-3.525a.729.729 0 0 0 .73-.729.73.73 0 1 0-.73.729zm-1.443-.019a.714.714 0 1 0 .001 1.427.714.714 0 0 0-.001-1.427zm-.713-2.137a.712.712 0 1 0 1.424 0 .712.712 0 1 0-1.424 0M2.54 16.612a1.65 1.65 0 1 0 3.3 0 1.65 1.65 0 1 0-3.3 0M21.272 0H2.728A2.73 2.73 0 0 0-.01 2.72v18.542C.009 22.781 1.228 24 2.728 24h18.526a2.753 2.753 0 0 0 2.756-2.719V2.737C23.991 1.219 22.772 0 21.272 0zm1.913 21.281a1.92 1.92 0 0 1-1.912 1.912H2.728a1.92 1.92 0 0 1-1.913-1.912v-8.456h22.369v8.456zm0-9.694H.815v-8.85A1.92 1.92 0 0 1 2.728.824h18.544c1.049 0 1.912.863 1.912 1.913v8.85 M17.409 3.112H6.534c-.3 0-.544.263-.544.563V9.15c0 .3.226.563.544.563h10.875a.548.548 0 0 0 .544-.563V3.656a.543.543 0 0 0-.544-.544z"></path></svg>`,
	'nintendogamecube': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nintendo GameCube icon</title><path d="M6.815 15.128l4.704 2.715V12.41L6.813 9.696v5.433zM4.79 16.296l6.73 3.883V24L1.48 18.207V6.617l3.31 1.91v7.77zM12 6.146L7.297 8.864 12 11.58l4.705-2.717L12 6.147zM12 3.813l5.66 3.275 3.31-1.91L12 0 1.973 5.79 5.28 7.697 12 3.813zm7.208 12.483v-3.948l-2.023 1.167v1.614l-4.704 2.715v.005-5.436L22.52 6.62v11.588l-10.04 5.795v-3.817l6.728-3.888z"></path></svg>`,
	'nintendonetwork': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nintendo Network icon</title><path d="M19.9645 8.6861a.645.645 0 0 1-.5193-.2664c-2.1109-2.893-5.5554-4.624-9.2154-4.624a11.4744 11.4744 0 0 0-4.6887.9864.6413.6413 0 0 1-.8493-.3375.6563.6563 0 0 1 .3325-.8593 12.7795 12.7795 0 0 1 5.2055-1.0946c4.0672 0 7.9003 1.9265 10.2527 5.1544a.66.66 0 0 1-.137.9128.6326.6326 0 0 1-.381.1282M.9023 8.9788c0-.4919.411-.8892.9178-.8892h2.3313c.2104 0 .3636-.0958.5566-.2291a9.2229 9.2229 0 0 1 5.2677-1.6339c5.01 0 9.0735 3.9415 9.0735 8.802v8.0771a.9078.9078 0 0 1-.9216.8942h-2.9551a.909.909 0 0 1-.924-.8942v-8.0771c0-2.289-1.9116-4.1457-4.274-4.1457-2.3599 0-4.2715 1.8555-4.2715 4.1457v8.0771A.909.909 0 0 1 4.779 24H1.824a.9078.9078 0 0 1-.9216-.8942V8.98M4.302 2.5915a14.5479 14.5479 0 0 1 5.98-1.274c4.822 0 9.0747 2.3288 11.6488 5.8792a.6397.6397 0 0 0 .9041.1408.67.67 0 0 0 .137-.9228C20.155 2.528 15.5162 0 10.281 0a15.7907 15.7907 0 0 0-6.502 1.3873.6625.6625 0 0 0-.33.8693.6401.6401 0 0 0 .8518.3362Z"></path></svg>`,
	'nintendoswitch': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nintendo Switch icon</title><path d="M14.176 24h3.674c3.376 0 6.15-2.774 6.15-6.15V6.15C24 2.775 21.226 0 17.85 0H14.1c-.074 0-.15.074-.15.15v23.7c-.001.076.075.15.226.15zm4.574-13.199c1.351 0 2.399 1.125 2.399 2.398 0 1.352-1.125 2.4-2.399 2.4-1.35 0-2.4-1.049-2.4-2.4-.075-1.349 1.05-2.398 2.4-2.398zM11.4 0H6.15C2.775 0 0 2.775 0 6.15v11.7C0 21.226 2.775 24 6.15 24h5.25c.074 0 .15-.074.15-.149V.15c.001-.076-.075-.15-.15-.15zM9.676 22.051H6.15c-2.326 0-4.201-1.875-4.201-4.201V6.15c0-2.326 1.875-4.201 4.201-4.201H9.6l.076 20.102zM3.75 7.199c0 1.275.975 2.25 2.25 2.25s2.25-.975 2.25-2.25c0-1.273-.975-2.25-2.25-2.25s-2.25.977-2.25 2.25z"></path></svg>`,
	'nissan': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nissan icon</title><path d="M12.036 1.728c-4.896 0-9.024 3.24-10.224 7.632-.516.06-.768.096-.984.156-.684.156-.828.396-.828.888v3.324c0 .48.516.816.876.876.36.072.588.096.96.132h.004c1.24 4.35 5.329 7.536 10.196 7.536 4.866 0 8.965-3.196 10.195-7.543a8.07 8.07 0 00.893-.125c.36-.06.876-.396.876-.876v-3.324c0-.492-.144-.732-.828-.888-.206-.057-.451-.093-.919-.148a.074.074 0 01-.005-.032c-1.212-4.392-5.328-7.608-10.212-7.608zm.012 2.424c3.456 0 6.408 2.112 7.56 5.076 0 .012.012.024.012.024l.014.005c-2.49-.094-5.706-.197-7.634-.197-1.902 0-5.052.1-7.529.193l.005-.001c1.152-2.976 4.104-5.1 7.572-5.1zm-5.652 6.516h.648c.06 0 .072.024.072.072v2.52c0 .06-.012.084-.084.084H6.42c-.072 0-.084-.012-.084-.084v-2.52c0-.048.012-.072.06-.072zm2.148.012h1.92c.072 0 .096.012.096.072v.432c0 .06-.024.084-.096.072H8.58c-.084 0-.12.036-.132.12v.108c0 .06.036.108.12.12.216.036.912.084 1.176.108.468.048.816.132.912.576 0 .036.012.156.012.288 0 .084 0 .192-.024.288-.084.42-.396.504-.9.504h-1.98c-.072 0-.084-.012-.084-.084v-.42c0-.072.012-.084.084-.084h2.004c.084 0 .108-.024.12-.084v-.18c-.012-.048-.024-.12-.132-.132a35.656 35.656 0 01-1.332-.12c-.576-.06-.72-.3-.744-.516-.012-.072-.012-.168-.012-.252 0-.072 0-.18.012-.264.084-.372.36-.552.864-.552zm3.408 0h1.92c.072 0 .096.012.096.072v.432c0 .06-.024.084-.096.072h-1.884c-.084 0-.12.036-.132.12v.108c0 .06.024.108.12.12.216.036.912.084 1.164.108.468.048.816.132.912.576 0 .036.012.156.012.288 0 .084 0 .192-.024.288-.084.42-.396.504-.9.504h-1.968c-.072 0-.084-.012-.084-.084v-.42c0-.072.012-.084.084-.084h2.004c.084 0 .108-.024.12-.084v-.18c-.012-.048-.036-.12-.132-.132a35.65 35.65 0 01-1.332-.12c-.576-.06-.708-.3-.744-.516-.012-.072-.012-.168-.012-.252 0-.072 0-.18.012-.264.084-.372.36-.552.864-.552zm-9.324.012h.612c.456 0 .516-.012.684.228.132.216 1.2 1.86 1.2 1.86v-2.004c0-.06.012-.084.084-.084h.528c.072 0 .084.024.084.084v2.508c0 .072-.012.084-.084.084h-.72c-.42 0-.456 0-.6-.24-.288-.456-1.176-1.812-1.176-1.812v1.968c0 .072-.012.084-.084.084h-.528c-.072 0-.084-.012-.084-.084v-2.508c0-.06.012-.084.084-.084zm13.416 0c.132 0 .228 0 .264.012.432.012.36-.036.564.408.108.252.876 1.896.996 2.184.036.084.012.072-.084.072h-.66c-.036 0-.072-.012-.084-.048 0-.012-.084-.204-.204-.48h-1.548c-.12.276-.216.48-.216.48-.012.024-.036.048-.084.048h-.636c-.096 0-.132 0-.072-.12l.012-.024c.3-.66 1.008-2.244 1.008-2.244.144-.3.072-.276.48-.276.108-.012.132-.012.264-.012zm2.304 0h.612c.456 0 .516-.012.684.228.144.216 1.2 1.86 1.2 1.86v-2.004c0-.06.012-.084.084-.084h.528c.072 0 .084.024.084.084v2.508c0 .072-.012.084-.084.084h-.72c-.42 0-.456 0-.6-.24-.3-.456-1.176-1.812-1.176-1.812v1.968c0 .072-.012.084-.084.084h-.528c-.072 0-.084-.012-.084-.084v-2.508c0-.06.012-.084.084-.084zm-2.268.6c-.036 0-.072 0-.084.012-.036 0-.06.012-.072.036 0 .012-.192.468-.396.936h1.068c-.156-.396-.336-.792-.384-.924-.012-.036-.036-.048-.06-.048-.012-.012-.048-.012-.072-.012zm3.48 3.59c-.003.014-.024.047-.024.058-1.2 2.88-4.104 4.92-7.5 4.92-3.42 0-6.336-2.064-7.524-4.968l-.023-.007c2.176.11 4.994.223 7.511.223 2.538 0 5.376-.114 7.56-.225Z"></path></svg>`,
	'nixos': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>NixOS icon</title><path d="M7.352 1.592l-1.364.002L5.32 2.75l1.557 2.713-3.137-.008-1.32 2.34H14.11l-1.353-2.332-3.192-.006-2.214-3.865zm6.175 0l-2.687.025 5.846 10.127 1.341-2.34-1.59-2.765 2.24-3.85-.683-1.182h-1.336l-1.57 2.705-1.56-2.72zm6.887 4.195l-5.846 10.125 2.696-.008 1.601-2.76 4.453.016.682-1.183-.666-1.157-3.13-.008L21.778 8.1l-1.365-2.313zM9.432 8.086l-2.696.008-1.601 2.76-4.453-.016L0 12.02l.666 1.157 3.13.008-1.575 2.71 1.365 2.315L9.432 8.086zM7.33 12.25l-.006.01-.002-.004-1.342 2.34 1.59 2.765-2.24 3.85.684 1.182H7.35l.004-.006h.001l1.567-2.698 1.558 2.72 2.688-.026-.004-.006h.01L7.33 12.25zm2.55 3.93l1.354 2.332 3.192.006 2.215 3.865 1.363-.002.668-1.156-1.557-2.713 3.137.008 1.32-2.34H9.881Z"></path></svg>`,
	'nodeDotJs': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Node.js icon</title><path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"></path></svg>`,
	'nodeRed': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Node-RED icon</title><path d="M3 0C1.338 0 0 1.338 0 3v6.107h2.858c1.092 0 1.97.868 1.964 1.96v.021c.812-.095 1.312-.352 1.674-.683.416-.382.69-.91 1.016-1.499.325-.59.71-1.244 1.408-1.723.575-.395 1.355-.644 2.384-.686v-.45c0-1.092.88-1.976 1.972-1.976h7.893c1.091 0 1.974.884 1.974 1.976v1.942c0 1.091-.883 2.029-1.974 2.029h-7.893c-1.092 0-1.972-.938-1.972-2.03v-.453c-.853.037-1.408.236-1.798.504-.48.33-.774.802-1.086 1.368-.312.565-.63 1.22-1.222 1.763l-.077.069c3.071.415 4.465 1.555 5.651 2.593 1.39 1.215 2.476 2.275 6.3 2.288v-.46c0-1.092.894-1.946 1.986-1.946H24V3c0-1.662-1.338-3-3-3zm10.276 5.41c-.369 0-.687.268-.687.637v1.942c0 .368.318.636.687.636h7.892a.614.614 0 0 0 .635-.636V6.047a.614.614 0 0 0-.635-.636zM0 10.448v3.267h2.858a.696.696 0 0 0 .678-.69v-1.942c0-.368-.31-.635-.678-.635zm4.821 1.67v.907A1.965 1.965 0 0 1 2.858 15H0v6c0 1.662 1.338 3 3 3h18c1.662 0 3-1.338 3-3v-1.393h-2.942c-1.092 0-1.986-.913-1.986-2.005v-.445c-4.046-.032-5.598-1.333-6.983-2.544-1.437-1.257-2.751-2.431-7.268-2.496zM21.058 15a.644.644 0 0 0-.647.66v1.942c0 .368.278.612.647.612H24V15z"></path></svg>`,
	'nodemon': html`<svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Nodemon icon</title><path d="M22.33 7.851l-.716-.398c1.101-1.569 1.758-3.927.934-7.453 0 0-1.857 5.029-5.59 4.863l-4.37-2.431a1.171 1.171 0 0 0-.536-.15h-.101a1.183 1.183 0 0 0-.538.15L7.042 4.863C3.309 5.03 1.452 0 1.452 0c-.825 3.526-.166 5.884.934 7.453l-.716.398a1.133 1.133 0 0 0-.589.988l.022 14.591c0 .203.109.392.294.491a.58.58 0 0 0 .584 0l5.79-3.204c.366-.211.589-.582.589-.987v-6.817c0-.406.223-.783.588-.984l2.465-1.372a1.19 1.19 0 0 1 .59-.154c.2 0 .407.05.585.154l2.465 1.372c.365.201.588.578.588.984v6.817c0 .405.226.779.59.987l5.788 3.204a.59.59 0 0 0 .589 0 .564.564 0 0 0 .292-.491l.019-14.591a1.129 1.129 0 0 0-.589-.988z"></path></svg>`,
	'nokia': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nokia icon</title><path d="M1.163 13.954H.008v-3.89h1.997l2.292 2.904v-2.904h1.155v3.89H3.495L1.163 11v2.954m9.814-1.203c0 .54-.097.727-.257.906-.244.266-.6.346-1.288.346H7.46c-.686 0-1.043-.08-1.288-.346-.16-.179-.256-.365-.256-.906v-1.5c0-.54.096-.726.256-.905.245-.266.602-.347 1.288-.347h1.972c.687 0 1.044.08 1.288.347.16.179.257.365.257.906v1.499m-1.593.267c.264 0 .356-.016.42-.073.059-.053.085-.121.085-.35v-1.187c0-.229-.026-.297-.085-.35-.064-.058-.156-.073-.42-.073H7.509c-.264 0-.357.015-.42.073-.06.053-.085.121-.085.35v1.187c0 .229.026.297.085.35.063.057.156.073.42.073h1.875m3.271-2.954v3.89h-1.207v-3.89h1.207m2.039 0h1.593l-2.15 1.82 2.425 2.07h-1.705l-2.202-2.029 2.039-1.86m2.09 0h1.207v3.889h-1.207m5.808 0l-.357-.678H19.9l-.353.678h-1.333l2.139-3.89h1.5l2.139 3.89h-1.4m-2.273-1.522h1.5l-.75-1.409-.75 1.409"></path></svg>`,
	'notion': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Notion icon</title><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"></path></svg>`,
	'notist': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Notist icon</title><path d="M5.934 3.801c-1.099.11-2.288.4-3.038.74-1.069.499-1.259.869-.909 1.868.36 1.04.19 2.308-1 7.505C.109 17.79-.04 18.6.01 19.32c.04.47.09.63.29.79.22.179.33.189 1.688.129 3.408-.17 4.057-.22 4.267-.34.24-.13.25-.2.44-1.758.32-2.868 1.788-7.155 3.027-8.894 1.06-1.479 2.359-2.128 3.098-1.549.78.62.76 1.559-.13 4.147-.68 1.999-.79 2.428-.909 3.617-.15 1.46.13 2.489.96 3.408.849.94 2.118 1.409 3.846 1.409 1.64 0 2.968-.41 4.377-1.339 1.29-.86 2.828-2.608 3.008-3.428.1-.41-.07-.859-.35-.969-.41-.15-.65-.04-1.389.63-.859.78-1.249.949-2.008.889-1.01-.08-1.45-.66-1.45-1.919 0-.899.09-1.349.65-3.317.79-2.728.93-3.967.58-5.027-.57-1.768-2.978-2.538-5.646-1.798-1.449.41-3.238 1.449-4.597 2.688-.38.34-.68.59-.68.56 0-.02.07-.35.16-.72.34-1.499.2-2.248-.479-2.598-.39-.2-1.599-.26-2.828-.13z"></path></svg>`,
	'npm': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NPM icon</title><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"></path></svg>`,
	'nucleo': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nucleo icon</title><path d="M7.247 22.499c1.488.661 3.058 1.075 4.794 1.075 1.736 0 3.39-.414 4.795-1.075-1.57-1.075-3.224-2.397-4.795-3.803-1.57 1.406-3.224 2.728-4.794 3.803zm14.715-4.63A11.75 11.75 0 0 0 23.532 12c0-1.736-.413-3.39-1.074-4.795-1.736 2.563-4.216 5.456-7.027 8.267-.579.579-1.24 1.24-1.902 1.819-.248-.248-.496-.496-.826-.744a20.637 20.637 0 0 0 1.901-1.902c3.059-3.058 5.622-6.117 7.275-8.68 1.901-2.893 2.397-4.712 1.57-5.621-.082-.166-.495-.331-.909-.331-.992 0-2.645.744-4.63 2.067-1.735-.992-3.72-1.654-5.869-1.654-2.15 0-4.133.579-5.87 1.654C4.189.757 2.535.013 1.543.013 1.046.013.716.178.468.426-1.516 2.41 4.684 10.1 9.313 14.728c5.456 5.456 10.913 9.259 13.227 9.259.496 0 .827-.165 1.075-.413.827-.827.33-2.728-1.57-5.622l-.083-.083zm.578-16.781c.083 0 .248 0 .331.082.248.248.165 1.323-1.488 3.968-.661-.909-1.488-1.818-2.48-2.48 1.653-.992 2.893-1.57 3.637-1.57zM2.7 5.138C1.294 2.906.88 1.501 1.212 1.17c.082-.082.248-.082.33-.082.744 0 1.984.578 3.638 1.57a17.58 17.58 0 0 0-2.48 2.48zM22.87 22.83c-.083.082-.248.082-.33.082-.745 0-1.985-.578-3.638-1.57.91-.662 1.819-1.488 2.48-2.48 1.653 2.645 1.736 3.72 1.488 3.968zm-12.152-5.374c-.744-.661-1.488-1.323-2.15-2.067-2.728-2.728-5.373-5.786-7.027-8.266C.881 8.61.468 10.264.468 11.917c0 2.15.578 4.134 1.57 5.87l-.082.082C.054 20.763-.442 22.582.385 23.491c.248.248.661.413 1.075.413 1.818 0 5.539-2.314 9.672-5.952a3.13 3.13 0 0 1-.413-.496zm-9.177 5.456c-.082 0-.248 0-.33-.082-.248-.248-.166-1.323 1.488-3.968.661.909 1.488 1.736 2.48 2.48-1.654.992-2.894 1.57-3.638 1.57z"></path></svg>`,
	'nuget': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>NuGet icon</title><path d="M17.67 21.633a3.995 3.995 0 1 1 0-7.99 3.995 3.995 0 0 1 0 7.99m-7.969-9.157a2.497 2.497 0 1 1 0-4.994 2.497 2.497 0 0 1 0 4.994m8.145-7.795h-6.667a6.156 6.156 0 0 0-6.154 6.155v6.667a6.154 6.154 0 0 0 6.154 6.154h6.667A6.154 6.154 0 0 0 24 17.503v-6.667a6.155 6.155 0 0 0-6.154-6.155M3.995 2.339a1.998 1.998 0 1 1-3.996 0 1.998 1.998 0 0 1 3.996 0"></path></svg>`,
	'nuke': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nuke icon</title><path d="M12.293.004c6.625.162 11.865 5.664 11.703 12.29-.162 6.625-5.664 11.865-12.29 11.703C5.081 23.835-.159 18.333.003 11.707l.001-.025C.18 5.066 5.678-.158 12.293.004zm0 1.238c-5.941-.164-10.89 4.52-11.054 10.461s4.52 10.89 10.461 11.054c5.941.164 10.89-4.52 11.054-10.461l.001-.025c.15-5.932-4.53-10.866-10.462-11.029zm5.842 8.302h2.4c.976 0 .682-.873.682-.873a9.587 9.587 0 0 0-2.111-3.431l-.005.011a10.052 10.052 0 0 0-3.355-2.329.612.612 0 0 0-.894.622c-.044.802-.142 2.395-.142 2.395s.016.769-.627.769c-.813.011-1.489-.044-1.489-.044a2.314 2.314 0 0 1-1.255-.545L8.868 3.511a1.09 1.09 0 0 0-1.407-.196 9.758 9.758 0 0 0-4.713 5.384c-.256.714.333.806.731.806h6a2.086 2.086 0 0 1 1.68.627c.785.824 1.331 1.369 1.331 1.369s.48.54 1.26 1.358c.431.459.632 1.089.545 1.713 0 0-.295 5.744-.295 6-.027.398.038.993.769.775a9.756 9.756 0 0 0 5.618-4.424 1.091 1.091 0 0 0-.12-1.418l-2.471-2.607a2.303 2.303 0 0 1-.496-1.282s-.022-.682.033-1.489c.044-.643.802-.583.802-.583zm-2.362 1.374c-.475.469-1.484.229-2.22-.545-.736-.775-.924-1.801-.45-2.254.475-.453 1.502-.239 2.239.536.737.774.906 1.794.431 2.263z"></path></svg>`,
	'nutanix': html`<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Nutanix icon</title><path d="M.393 3.617A.395.395 0 000 4.012c0 .12.054.225.139.297l8.507 7.404a.39.39 0 01-.013.588l-8.52 7.412a.393.393 0 00.28.67h4.86c.103 0 .195-.04.265-.104l9.17-7.98a.396.396 0 00.001-.596L5.518 3.721a.386.386 0 00-.264-.104H.393zm18.359 0a.389.389 0 00-.273.113l-4.717 4.106a.392.392 0 00-.04.564l2.428 2.114a.393.393 0 00.291.129.394.394 0 00.278-.118l7.127-6.203a.389.389 0 00.154-.31.395.395 0 00-.393-.395h-4.855zm-2.31 9.742c-.116 0-.22.05-.292.13l-2.427 2.113a.392.392 0 00.039.564l4.717 4.104c.07.07.166.113.273.113h4.855a.393.393 0 00.239-.705l-7.127-6.203a.393.393 0 00-.278-.116Z"></path></svg>`,
	'nuxtDotJs': html`<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Nuxt.js icon</title><path d="M19.724 20.272l.023-.045a.74.74 0 0 0 .053-.117l.002-.005a1.16 1.16 0 0 0 .054-.607l.001.007a1.795 1.795 0 0 0-.235-.623l.005.008-5.317-9.353-.812-1.42-.807 1.42-5.314 9.353a1.85 1.85 0 0 0-.204.604l-.001.011a1.257 1.257 0 0 0 .08.713l-.003-.008a.809.809 0 0 0 .05.102l-.002-.004c.16.275.5.602 1.25.602h9.898c.157 0 .925-.032 1.28-.637zm-6.227-9.316l4.859 8.548H8.64zm10.249 7.934L16.73 6.53c-.072-.13-.477-.787-1.182-.787-.317 0-.772.135-1.142.785l-.907 1.59.807 1.42 1.25-2.212 6.941 12.18h-2.64a1.187 1.187 0 0 1-.058.608l.003-.008a.772.772 0 0 1-.057.126l.002-.004-.023.045c-.355.605-1.122.637-1.272.637h4.129c.152 0 .917-.032 1.272-.637.157-.275.27-.737-.107-1.382zM7.304 20.307a.989.989 0 0 1-.045-.092l-.002-.006a1.228 1.228 0 0 1-.084-.712l-.001.007H1.501L9.93 4.672l2.767 4.864.802-1.42-2.412-4.249c-.067-.122-.475-.777-1.177-.777-.317 0-.772.137-1.142.787L.23 18.889c-.072.13-.425.812-.075 1.417.16.275.5.602 1.25.602h7.151c-.745 0-1.09-.322-1.25-.602z"></path></svg>`,
	'nvidia': html`<svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24"><title>NVIDIA icon</title><path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"></path></svg>`
}

/**
 * @public @name CWCIconBrandPrefixN
 * @extends CustomHTMLElement
 * @description Custom Web Component, common component, brand icons
 * @author Paul Smith <p@ulsmith.net>
 * @copyright 2020 and up Custom Web Component <custom-web-component.net> <ulsmith.net> <p@ulsmith.net>
 * 
 * @attribute {String} name The name of the icon to display
 *
 * @example
 * <cwc-icon-brand-prefix-n name="foo"></cwc-icon-brand-prefix-n>
 */
class CWCIconBrandPrefixN extends CustomHTMLElement {

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
customElements.define('cwc-icon-brand-prefix-n', CWCIconBrandPrefixN);