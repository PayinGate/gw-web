/* eslint-disable no-unused-vars */
class GWLocalStorage {
    getItem(name) {
        return new Promise((resolve, reject) => {
            const value = localStorage.getItem(name);
            if(value) {
                resolve(value);
            }
            else {
                reject(new Error(`Item ${name} wasn't found in storage.`));
            }
        });
    }

    saveToStorage(dataList) {

        if (!Array.isArray(dataList)) {
            throw new Error("Data list must be an array.");
        }

        for ( const data of dataList ) {
            if(data.name && data.value) localStorage.setItem(data.name, data.value);
        }
    }

    removeFromStorage(name) {
        localStorage.removeItem(name);
    }

    clear() {
        localStorage.clear();
    }

}

class LocalStorageData {
    constructor(name, value) {
        if (typeof name !== "string" ) throw new Error("Invalid LocalStorageDta format.");
    
        this.name = name;
        this.value = value;
    }
}


export { LocalStorageData, GWLocalStorage };