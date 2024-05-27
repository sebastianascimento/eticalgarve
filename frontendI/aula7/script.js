window.onload = async () => {

    // if ("serviceWorker" in navigator) {
    //   try {
    //     const registration = await navigator.serviceWorker.register("serviceWorker.js");
    //   } catch (error) {
    //     console.error("Error registering Service Worker:", error);
    //   }
    // } else {
    //   alert("service worker not supported, use a chromium based browser.");
    // }
   
    const page1 = document.querySelector("#page1");
    const page2 = document.querySelector("#page2");
    document.querySelector("#next").onclick = () => {
      page1.style.display = "none";
      page2.style.display = "flex";
    }
    document.querySelector("#previous").onclick = () => {
      page1.style.display = "flex";
      page2.style.display = "none";
      
    }
  };