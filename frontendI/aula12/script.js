window.onload = () => {
    const webGallery = document.querySelector("web-gallery");


    webGallery.addEventListener("ready", (event) => {
        console.log("gallery ready", event.detail.numberOfImages);
    });
    webGallery.addEventListener("play-pause", (event) => {
        console.log("gallery playing", event.detail.isPlaying);
    });


    webGallery.currentItem = 2;
    webGallery.dataURL = "assets/gallery_data.json";
}