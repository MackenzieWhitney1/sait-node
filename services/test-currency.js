const currency = require("../services/currency");

console.log(`50 CAD equals ${currency.canadianToUS(50)} USD.`);
console.log(`50 USD equals ${currency.UStoCanadian(50)} CAD.`);
console.log(`50 CAD equals ${currency.canadianToBritishPounds(50)} GBP.`);
console.log(`50 GBP equals ${currency.britishPoundsToCanadian(50)} CAD.`);