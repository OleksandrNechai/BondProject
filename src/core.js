var core = (function() {

    return {
        dirtyPrice: dirtyPrice,
        cashFlow: cashFlow
    };

    function dirtyPrice(bond) {   
        var price = 0;
        var cashflow = cashFlow(bond);

        // TODO: improve - use binary search
        for(var i = 0; i < cashflow.length; i++)
        {
            if (cashflow[i].date > bond.date)
                {   break;  }
        }

        if(( i > 0) && (i < cashflow.length))
        {      
           var daysInPeriod = moment(cashflow[i].date).diff(moment(cashflow[i - 1].date), 'days');
           var daysAccrued = moment(cashflow[i].date).diff(moment(bond.date), 'days');
           daysInPeriod = (bond.dayCountConvention == 3) ? Math.min(360, daysInPeriod) :
                          (bond.dayCountConvention == 2) ? Math.min(365, daysInPeriod) :  daysInPeriod;
           
            price += cashflow[i].total * (1 / Math.pow(1 + (bond.marketRate / bond.couponFrequency), bond.couponFrequency * (daysAccrued/daysInPeriod)));

            for(var j = i + 1; j < cashflow.length; j++)
            {
                price += cashflow[j].total * (1/Math.pow(1 + (bond.marketRate/bond.couponFrequency), bond.couponFrequency * (1 + j - i)));
            }
        }
        
        return price;
    }

    function cashFlow(bond) {
        var cashFlow = [];       

        var numberOfPayments = bond.term * bond.couponFrequency;
        var couponPeriod = (bond.couponFrequency == 1) ? 12 :
                           (bond.couponFrequency == 2) ? 6 :
                           (bond.couponFrequency == 4) ? 3 : 1;
        var date = moment(bond.maturityDate).subtract(bond.term, 'Y');
        date = date.add(couponPeriod, 'M');
           
        switch (bond.bondType)
        {
            case 'Bullet': 
                for (var i = 0; i < numberOfPayments; i++) {
                    var couponAmount = Number(bond.nominal * bond.couponRate);
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
                var couponAmount = round(remainingNominal * Number(bond.couponRate));

                for (var i = 0; i < numberOfPayments; i++) {

                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: couponAmount,
                        redemption: redemptionAmount,
                        total: redemptionAmount + couponAmount,
                    });                    
                    remainingNominal -= redemptionAmount;
                    couponAmount = remainingNominal * Number(bond.couponRate);
                    date = date.add(couponPeriod, 'M');
                }
                break;

            case 'Annuity': 
                var remainingNominal = bond.nominal;
                var redemptionAmount = (bond.nominal * ((1 + bond.couponRate) - 1)) / (Math.pow(1 + bond.couponRate, numberOfPayments) - 1);
                var couponAmount = remainingNominal * Number(bond.couponRate);

                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: couponAmount,
                        redemption: redemptionAmount,
                        total: redemptionAmount + couponAmount,
                    });                    
                    remainingNominal -= redemptionAmount;
                    couponAmount = remainingNominal * Number(bond.couponRate);
                    redemptionAmount *= 1 + bond.couponRate;
                    date = date.add(couponPeriod, 'M');
                }
                break;

            default:
        }

        return cashFlow;
    }
})();
