
//class WordCounter{

//    #view;

//    constructor() {
//      this.#view = document.querySelector(".word_counter");
//    console.log(this.#view);
//   }

//    get numWords() {
//        return this.#view.querySelector("p").innerText.split(/\s+/g).length;
//    }


//}


class WordCounter extends HTMLElement {
    constructor() {
        super();

        console.log("componet constructor");
    }

    get numWords() {
        return this.querySelector("p").innerText.split(/\s+/g)
    }

    createElement(tag , content) {
        const elem = document.createElement(tag);
        this.appendChild(elem);
        elem.innerText = content
    }

    createAudio (url) {
        const audio = document.createElement("audio");
        audio.src = url;
        audio.controls = true;
        this.appendChild(audio)

    }

    connectedCallback() {
        console.log("Custom element added to page.");
      }
    
      disconnectedCallback() {
        console.log("Custom element removed from page.");
      }
    
      adoptedCallback() {
        console.log("Custom element moved to new page.");
      }
    
      attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
      }
    
}



customElements.define('word-counter' , WordCounter);

window.onload = () => {

    const wordCounter = document.querySelector("word-counter");

    //const wordCounter = new WordCounter();
    //console.log(wordCounter.numWords);

    //wordCounter.innerHTML = "<p>Hello World!</p>";

    const p = wordCounter.querySelector("p");
    //console.log(wordCounter.numWords);

    wordCounter.createElement("label" , "Hello World");
    console.log(p);
    wordCounter.createAudio("https://www.youtube.com/watch?v=xy3AcmW0lrQ")
}

    


