cleanPrice = function(bond) {
    var couponPaymentsCount = bond.term * bond.couponFrequency;
    var couponValue = bond.nominal * bond.couponRate / bond.couponFrequency;
    var requiredMarketYield = bond.marketRate / bond.couponFrequency;
    var n = Math.pow(1 + requiredMarketYield, couponPaymentsCount);
    var price = couponValue * ((1 - (1 / n))) / requiredMarketYield + bond.nominal / n;
    return price;
}
