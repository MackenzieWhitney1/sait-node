const cadToUSDRate = 0.76;
const cadToGPBRate = 0.57;

function roundTwo(amount){
    return Math.round(amount*100) / 100; 
}
exports.canadianToUS = canadian => roundTwo(canadian*cadToUSDRate);
exports.UStoCanadian = us => roundTwo(us / cadToUSDRate);
exports.canadianToBritishPounds = canadian => roundTwo(canadian*cadToGPBRate);
exports.britishPoundsToCanadian = britain => roundTwo(britain/ cadToGPBRate);