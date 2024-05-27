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
            width: 500px;
            height: 500px;
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
                width: 100%;
                height: 100%;
                background-position: center;
                background-size: cover;

            }
        </style>
        <div class="item"></div>
`
class WebGallery extends HTMLElement {

    static observedAttributes = ['data-url'];

    shadowRoot = null;
    #galleryData = null;
    #imagesContainer = null;
    #intervalId = null;
    #currentItemIndex = 0;
    #items= 0
    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.#imagesContainer = this.shadowRoot.querySelector("#images-container");
        const imageContainer = this.shadowRoot.querySelector('#images-container');
        const item = itemTemplate.content.cloneNode(true);
        imageContainer.appendChild(item);

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

     async attributeChangedCallback(attrName , oldVal , newVal){

        switch (attrName) {
            case 'data-url':
                const req = await fetch(this.getAttribute('data-url'));
                this.#galleryData = await req.json();
                this.#render();
                break;
        
            default:
                break;
        }

    }

    //PRIVATE
    #render() {
        this.#galleryData.forEach((item)=> {
            const clone = itemTemplate.content.cloneNode(true);
            const element = clone.querySelector(".item");
            element.style.backgroudImage = `url(${item.imageUrl})`;

            this.#imagesContainer.appendChild(clone);
        });


    }


    #playPause() {
        if(this.#intervalId != null) {
            clearInterval(this.#intervalId)
            this.#intervalId = null;
        }else {
           this.#intervalId = setInterval(() => {

                console.log(this.#items[this.#currentItemIndex]);
                this.#currentItemIndex++;
                if(this.#currentItemIndex >= this.#imagesContainer.children.lengtgh) this.#currentItemIndex = 0;
            }, 3000);
        }
    }



    //SETTERS GETTERS
    get dataUrl() {
        return this.getAttribute('data-url' , value);
    }
    
    set  dataUrl(value) {
        this.setAttribute('data-url' , value);
    }

}
customElements.define('web-gallery', WebGallery);