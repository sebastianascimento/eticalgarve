
const templete = document.createElement('template');
templete.innerHTML =`
    <style>
        .gallery{
            display: flex;
            width: 500px;
            height: 500px;
        }

        #images-container {
            display: flex;
            flex: 1;
            backgorund-color: red;
        }
    </style>
    <div class="gallery">
        <div id="images-container"> </div>
        <div id="controls">
            <button> Previous </button>
            <button> Next </button>
    </div>
`;

const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
        <style>
            .item{
                width: 100%;
                height: 100%;
                background-image: url
                backgorund-position: center;
                background-size: cover;
            }
        </style>
        <div class="item"></div>
`

class WebGallery extends HTMLElement {

    shadowRoot = null;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});

        //const div = document.createElement('div');
        div.innerText= "This is a Div";
        this.shadowRoot.appendChild(templeta.content.cloneNode(true));
    }
}
customElements