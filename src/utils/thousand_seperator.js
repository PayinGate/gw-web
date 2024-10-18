/* eslint-disable no-extend-native */
export default function thousandSeperator(){
    console.log(this);
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

if(!String.prototype.thousandSeperator) {
    String.prototype.thousandSeperator = thousandSeperator;
}