function toTwoDecimalPlaces(num) {
    num = parseFloat(num);
    return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
  });
}


export default toTwoDecimalPlaces;