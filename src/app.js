var app = (function () {
    return {
        calcPrice: calcDirtyPrice,
        calcCashFlow: calcCashFlow
    };

    function calcDirtyPrice() {      
        var price = core.dirtyPrice({
            nominal: $('#nominal').val(),
            term: $('#term').val(),
            bondType: $('#bondtype').val(),
            couponRate: $('#couponrate').val() / 100,
            couponFrequency: $('#couponfrequency').val(),
            dayCountConvention: $('#daycountconvention').val(),
            maturityDate: $('#maturitydate').val(),
            marketRate: $('#marketrate').val() / 100,
            date: $('#date').val()
        });
        $('#bondprice').val(round(price, 2));
    }

    function calcCashFlow() {
        var cashFlow = core.cashFlow({
            nominal: $('#nominal').val(),
            term: $('#term').val(),
            bondType: $('#bondtype').val(),
            couponRate: $('#couponrate').val() / 100,
            couponFrequency: $('#couponfrequency').val(),
            dayCountConvention: $('#daycountconvention').val(),
            maturityDate: $('#maturitydate').val(),
            marketRate: $('#marketrate').val() / 100,
            date: $('#date').val()
        });
        _.each(cashFlow, function (item) {  item.total = round(item.total, 2); 
                                            item.redemption = round(item.redemption, 4); 
                                            item.coupon = round(item.coupon, 4); });
        $('#cashflow-container').removeClass('table-hidden');
        $('#cashflow').bootstrapTable('load', cashFlow);
    }

    function round(number, decimals) {
        var multiplier = Math.pow(10, decimals);
        return Math.round(number * multiplier) / multiplier;
    }

})()