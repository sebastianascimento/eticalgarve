/** LOCAL STORAGE */
let LSData = [];

const addItem = () => {
    LSData.push({title: "item 1", desc:"description 1"});
    updateLocalStorage();
}
const getItem = () => {
    console.log("LS item", JSON.parse(localStorage.getItem("car")));
}
const removeItem = () => {
    LSData.pop();
    updateLocalStorage();
}

const updateLocalStorage = () => {
    localStorage.setItem("car", JSON.stringify(LSData));
}

/**INDEXED DB */
const indexedDB = window.indexedDB;
window.onload = () => {
    
    const req = indexedDB.open("CarsDB", 1);
    req.onerror = (error) => {
        console.error("error with the indexedDB", error);
    }
    req.onupgradeneeded = () => {
        const db = req.result;
        const store = db.createObjectStore("cars", {keyPath: "id"});
        store.createIndex("cars_color", ["color"], {unique: false});
        store.createIndex("color_and_make", ["color", "make"], {unique: false});
    }
}

const addCar = () => {

    const req = indexedDB.open("CarsDB", 1);
    req.onsuccess = () => {
        console.log("success");
        const db = req.result;
        const transaction = db.transaction("cars", "readwrite");
        const store = transaction.objectStore("cars");
        store.add({id:1, color:"red", make:"mazda"});
    }
}
const getCar = () => {
    // const transaction = db.transaction("cars", "readwrite");
    // const store = transaction.objectStore("cars");
}
const removeCar = () => {
    // const transaction = db.transaction("cars", "readwrite");
    // const store = transaction.objectStore("cars");
}