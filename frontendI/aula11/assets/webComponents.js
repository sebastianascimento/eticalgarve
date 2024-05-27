const template = document.createElement('template');
template.innerHTML = `
    <style>

        /*ELEMENTS*/
        * {
            font-family: system-ui, sans-serif;
        }
        button {
            border: none;
            background-color: green;
            padding: 10px 20px;
            cursor: pointer;
        }

        /*CLASSES*/
        .gallery {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            gap: 10px;
        }

        /*IDS*/
        #images-container {
            position: relative;
            display: flex;
            flex: 1;
            background-color: red;
        }
        #controls {
            display: flex;
            justify-content: space-between;
            background-color: blue;
        }
        #play-pause {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    </style>
    <div class="gallery">

        <div id="images-container"></div>

        <div id="controls">
            <button id="previous">Previous</button>
            <button id="next">Next</button>
        </div>

        <button id="play-pause">STOP</button>
        
    </div>
`;
const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
        <style>
            .item {
                position: absolute;
                inset: 0;
                opacity: 0;
                transition: opacity 0.8s;
                background-position: center;
                background-size: cover;

            }
        </style>
        <div class="item"></div>
`
class WebGallery extends HTMLElement {

    static observedAttributes = ['data-url', 'current-item'];

    shadowRoot = null;
    #galleryData = null;
    #imagesContainer = null;
    #intervalID = null;
    #items = [];
    #currentItemIndex = 0;
    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

        this.#imagesContainer = this.shadowRoot.querySelector("#images-container");

        this.shadowRoot.querySelector('#previous').onclick = () => {
            console.log('previous clicked');
        }

        this.shadowRoot.querySelector('#next').onclick = () => {
            console.log('next clicked');
        }

        this.shadowRoot.querySelector('#play-pause').onclick = () => {
            console.log('play pause clicked');
        }
    }

    async attributeChangedCallback(attrName, oldVal, newVal) {

        switch (attrName) {
            case 'data-url':
                const req = await fetch(this.getAttribute('data-url'));
                this.#galleryData = await req.json();
                this.#render();
                break;
            case 'current-item':
                this.#currentItemIndex = newVal;
                this.#render();
                break;
            
            default:
                break;
        }
    }

    //PRIVATE
    #render() {

        this.#items = [];
        this.#imagesContainer.innerHTML = ''; 
        this.#galleryData.forEach((item, index) => {

            const clone = itemTemplate.content.cloneNode(true);
            const element = clone.querySelector(".item");
            if(index === this.#currentItemIndex) element.style.opacity = 1;
            this.#items.push(element);
            element.style.backgroundImage = `url(${item.imageUrl})`;

            this.#imagesContainer.appendChild(clone);
        });

        this.#playPause();
    }

    #playPause() {

        if(this.#intervalID !== null) {
            clearInterval(this.#intervalID);
            this.#intervalID = null;
        } else {
            this.#intervalID = setInterval(() => {

                this.#items[this.#currentItemIndex].style.opacity = 0;
                this.#currentItemIndex++;
                if(this.#currentItemIndex >= this.#items.length) this.#currentItemIndex = 0;
                this.#items[this.#currentItemIndex].style.opacity = 1;

               //...
            }, 2000);
        }
    }

    //SETTERS GETTERS
    get dataURL() {
        return this.getAttribute('data-url');
    }
    set dataURL(value) {
        this.setAttribute('data-url', value);
    }

    get currentItem() {
        return this.getAttribute('current-index');
    }
    set currentItem(value) {
        this.setAttribute('current-index', value);
    }
}
customElements.define('web-gallery', WebGallery);