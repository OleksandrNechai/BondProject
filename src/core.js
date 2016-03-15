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
        return cleanprice;
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
           
        switch (bond.bondType)
        {
            case 'Bullet': 
                for (var i = 0; i < numberOfPayments; i++) {
                    var couponAmount = Number(bond.nominal * bond.couponRate);
                    if (i != numberOfPayments - 1)  {
                        cashFlow.push({
                            date: '2016-01-01',
                            coupon: couponAmount,
                            redemption: 0,
                            total: couponAmount,
                        });
                    } else {
                        cashFlow.push({
                            date: '2016-01-01',
                            coupon: couponAmount,
                            redemption: bond.nominal,
                            total: couponAmount  + Number(bond.nominal),
                        });
                    }                   
                }
                break;

            case 'Serial':                
                var remainingNominal = Number(bond.nominal);
                var redemptionAmount = Number(bond.nominal / numberOfPayments);
                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: '2016-01-01',
                        coupon: remainingNominal * Number(bond.couponRate),
                        redemption: redemptionAmount,
                        total: redemptionAmount + (remainingNominal * Number(bond.couponRate)),
                    });                    
                    remainingNominal -= redemptionAmount;
                }
                break;

            case 'Annuity': 
                var remainingNominal = bond.nominal;
                var redemptionAmount = (bond.nominal * ((1 + bond.couponRate) - 1)) / (Math.pow(1 + bond.couponRate, numberOfPayments) - 1);
                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: '2016-01-01',
                        coupon: remainingNominal * bond.couponRate,
                        redemption: redemptionAmount,
                        total: redemptionAmount + (remainingNominal * bond.couponRate),
                    });            
                    remainingNominal -= redemptionAmount;
                    redemptionAmount *= 1 + bond.couponRate;                   
                }
                break;

            default:
        }

        return cashFlow;
    }

})();
