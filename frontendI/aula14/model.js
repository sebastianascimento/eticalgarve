 export default class GalleryModel {

    #modelData;
    constructor() {

    }

    async initialize(url) {
        const req = await fetch(url);
        this.#modelData = await req.json();
        this.#modelData = {storageData, ...obj};

        console.log(this.#modelData);
        
        localStorage.setItem("web-gallery" , JSON.stringify(this.#modelData));

        const test = localStorage.getItem("web-gallery");
    }

    get data() {
        return this.#modelData
    }

}