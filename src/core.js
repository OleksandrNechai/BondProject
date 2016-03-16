var core = (function() {

    return {
        dirtyPrice: dirtyPrice,
        cashFlow: cashFlow
    };

    function dirtyPrice(bond) {   
        return cleanPrice(bond) + accruedInterest(bond);
    }

    function cleanPrice(bond) {
        var couponPaymentsCount = bond.term * bond.couponFrequency;
        var couponValue = bond.nominal * bond.couponRate / bond.couponFrequency;
        var requiredMarketYield = bond.marketRate / bond.couponFrequency;
        var n = Math.pow(1 + requiredMarketYield, couponPaymentsCount);
        var cleanprice = couponValue * ((1 - (1 / n))) / requiredMarketYield + bond.nominal / n;     
        return round(cleanprice);
    }

    function accruedInterest(bond) {
        var accruedinterest = getNextPaymentAmount(bond);
        accruedinterest = Math.pow(accruedinterest, 1);
        return accruedinterest;
    }

    function daysBetweenYears(dayCountConvention, fromYear, toYear) {
        switch(dayCountConvention)
        {

        }
        return days;
    }

    function daysToEndOfYear(dayCountConvention, date) {

    }

    function daysFromBeginOfYear(dayCountConvention, date) {

    }

    function getNextPaymentAmount(bond)
    {
        return 1;
    }

    function cashFlow(bond) {
        var cashFlow = [];       

        var numberOfPayments = bond.term * bond.couponFrequency;
        var couponPeriod = (bond.couponFrequency == 1) ? 12 :
                           (bond.couponFrequency == 2) ? 6 :
                           (bond.couponFrequency == 4) ? 3 : 1;
        var date = moment(bond.maturityDate).subtract(bond.term, 'Y');      
           
        switch (bond.bondType)
        {
            case 'Bullet': 
                for (var i = 0; i < numberOfPayments; i++) {
                    var couponAmount = round(Number(bond.nominal * bond.couponRate));
                    if (i != numberOfPayments - 1)  {
                        cashFlow.push({
                            date: date.format("YYYY-MM-DD"),
                            coupon: couponAmount,
                            redemption: 0,
                            total: couponAmount,
                        });
                    } else {
                        cashFlow.push({
                            date: date.format("YYYY-MM-DD"),
                            coupon: couponAmount,
                            redemption: bond.nominal,
                            total: couponAmount  + Number(bond.nominal),
                        });
                    }
                    date = date.add(couponPeriod, 'M');              
                }
                break;

            case 'Serial':                
                var remainingNominal = Number(bond.nominal);
                var redemptionAmount = round(Number(bond.nominal / numberOfPayments));
                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: round(remainingNominal * Number(bond.couponRate)),
                        redemption: redemptionAmount,
                        total: redemptionAmount + round((remainingNominal * Number(bond.couponRate))),
                    });                    
                    remainingNominal -= redemptionAmount;
                    date = date.add(couponPeriod, 'M')
                }
                break;

            case 'Annuity': 
                var remainingNominal = bond.nominal;
                var redemptionAmount = round((bond.nominal * ((1 + bond.couponRate) - 1)) / (Math.pow(1 + bond.couponRate, numberOfPayments) - 1));
                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: round(remainingNominal * bond.couponRate),
                        redemption: redemptionAmount,
                        total: redemptionAmount + round((remainingNominal * bond.couponRate)),
                    });            
                    remainingNominal -= redemptionAmount;
                    redemptionAmount = round(redemptionAmount * (1 + bond.couponRate));
                    date = date.add(couponPeriod, 'M')
                }
                break;

            default:
        }

        return cashFlow;
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }

})();
