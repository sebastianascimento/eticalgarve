window.onload = () => {
    const webGallery = document.querySelector("web-gallery");
    webGallery.dataURL = "assets/gallery_data.json";
    webGallery.addEventListener("ready" , (ev) => {
        console.log("gallery ready" , ev.detail.numberOfImages);
    })
}