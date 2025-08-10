
// eslint-disable-next-line no-unused-vars
class GWCookies {

    constructor(document) {
        this.document = document || (typeof document !== "undefined" ? document : null);
    }
    
    /**
     * 
     * @param {Array<CookieData>} dataList 
     */
    
    saveCookies(dataList){
        
        if (!Array.isArray(dataList)) {
            throw new Error("Data list must be an array.");
        }

        for (const data of dataList) {
            if (!(data instanceof CookieData)) {
                throw new Error("Invalid cookie data format.");
            }

            // save each cookie
            let cookieValue = `${data.name}=${data.value}; expires=${data.expiryDate.toUTCString()}; path=/`;

            // Set SameSite=None if running on localhost
            if (window.location.hostname !== 'localhost') {
                
                cookieValue += '; SameSite=Strict; Secure'
            }

            this.document.cookie = cookieValue;
        }
    }
    
    async getCookie(name) {
        return new Promise((resolve, reject) => {
          const cookies = this.document.cookie.split('; ');
          for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) {
              resolve(cookieValue);
              return;
            }
          }
          reject(new Error(`Cookie with name ${name} not found.`));
        });
    }

    removeCookie(name) {
        this.document.cookie = name + "=;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    removeAllCookies() {
        const cookies = this.document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;Path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
}


class CookieData {
    constructor(name, value, expiryDate) {
        
        if (typeof name !== "string" || typeof value !== "string" || !(expiryDate instanceof Date) || name.length === 0) {
            throw new Error("Invalid CookieData format.");
        }

        this.name = name;
        this.value = value;
        this.expiryDate = expiryDate;
    }
}

function createCookieDate(timeInSec) {

    const timeInDays = timeInSec / (3600 * 24);

    const currentDate = new Date();

    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + timeInDays);
    

    return futureDate
}


export { GWCookies, CookieData, createCookieDate };