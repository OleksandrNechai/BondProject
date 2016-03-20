var core = (function() {

    return {
        dirtyPrice: dirtyPrice,
        cashFlow: cashFlow
    };

    function dirtyPrice(bond) {   
        var price = 0;
        var cashflow = cashFlow(bond);
        var dayCount_30_360 = function (fromDate, toDate) {

            var diffInMonthes = moment(toDate).diff(moment(fromDate), 'months', true);
            var daysBetween = 30 * Math.floor(diffInMonthes);
            if (diffInMonthes != Math.floor(diffInMonthes))
            {
                daysBetween += 30 - Math.min(30, moment(fromDate).date());            
                daysBetween += Math.min(30, moment(toDate).date());        
            }
          
            return daysBetween;
        }

        // TODO: improve - use binary search
        for(var i = 0; i < cashflow.length; i++)
        {
            if (cashflow[i].date > bond.date)
                {   break;  }
        }

        if(( i > 0) && (i < cashflow.length))
        {      
            var daysInPeriod = (bond.dayCountConvention == 3) ? dayCount_30_360(cashflow[i - 1].date, cashflow[i].date) :
                                moment(cashflow[i].date).diff(moment(cashflow[i - 1].date), 'days');
                daysInPeriod = (bond.dayCountConvention == 2) ? Math.min(365, daysInPeriod) : daysInPeriod;
            var daysAccrued = (bond.dayCountConvention == 3) ? dayCount_30_360(bond.date, cashflow[i].date) :
                                moment(cashflow[i].date).diff(moment(bond.date), 'days');
                                                     
            price += cashflow[i].total * (1 / Math.pow(1 + (bond.marketRate / bond.couponFrequency), daysAccrued/daysInPeriod));
            for(var j = i + 1; j < cashflow.length; j++)
            {
                price += cashflow[j].total * (1/Math.pow(1 + (bond.marketRate/bond.couponFrequency), 1 + j - i));
            }
        }

        return price;
    }

    function cashFlow(bond) {
        var cashFlow = [];       

        var couponRate = Number(bond.couponRate / bond.couponFrequency);
        var numberOfPayments = bond.term * bond.couponFrequency;
        var couponPeriod = (bond.couponFrequency == 1) ? 12 :
                           (bond.couponFrequency == 2) ? 6 :
                           (bond.couponFrequency == 4) ? 3 : 1;
        var isEndOfMonth = (moment(bond.maturityDate)).isSame(moment(bond.maturityDate).endOf('month'), 'day');
        var adjustEndOfMonth = function (date) { return isEndOfMonth ? date.endOf('month') : date;  }
        var date = moment(bond.maturityDate).subtract(bond.term, 'Y');
        
        date = adjustEndOfMonth(date.add(couponPeriod, 'M'));
           
        switch (bond.bondType)
        {
            case 'Bullet': 
                for (var i = 0; i < numberOfPayments; i++) {
                    var couponAmount = Number(bond.nominal * couponRate);
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
                    date = adjustEndOfMonth(date.add(couponPeriod, 'M'));              
                }
                break;

            case 'Serial':                
                var remainingNominal = Number(bond.nominal);
                var redemptionAmount = Number(bond.nominal / numberOfPayments);
                var couponAmount = remainingNominal * couponRate;

                for (var i = 0; i < numberOfPayments; i++) {

                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: couponAmount,
                        redemption: redemptionAmount,
                        total: redemptionAmount + couponAmount,
                    });                    
                    remainingNominal -= redemptionAmount;
                    couponAmount = remainingNominal * couponRate;
                    date = adjustEndOfMonth(date.add(couponPeriod, 'M'));
                }
                break;

            case 'Annuity': 
                var remainingNominal = bond.nominal;
                var redemptionAmount = (bond.nominal * ((1 + couponRate) - 1)) / (Math.pow(1 + couponRate, numberOfPayments) - 1);
                var couponAmount = remainingNominal * couponRate;

                for (var i = 0; i < numberOfPayments; i++) {
                    cashFlow.push({
                        date: date.format("YYYY-MM-DD"),
                        coupon: couponAmount,
                        redemption: redemptionAmount,
                        total: redemptionAmount + couponAmount,
                    });                    
                    remainingNominal -= redemptionAmount;
                    couponAmount = remainingNominal * couponRate;
                    redemptionAmount *= 1 + couponRate;
                    date = adjustEndOfMonth(date.add(couponPeriod, 'M'));
                }
                break;

            default:
        }

        return cashFlow;
    }
})();
