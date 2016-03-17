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
            for(var j = i; j < cashflow.length; j++)
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
                        coupon: remainingNominal * Number(bond.couponRate),
                        redemption: redemptionAmount,
                        total: redemptionAmount + (remainingNominal * Number(bond.couponRate)),
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
                        coupon: remainingNominal * bond.couponRate,
                        redemption: redemptionAmount,
                        total: redemptionAmount + (remainingNominal * bond.couponRate),
                    });            
                    remainingNominal -= redemptionAmount;
                    redemptionAmount *=(1 + bond.couponRate);
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
