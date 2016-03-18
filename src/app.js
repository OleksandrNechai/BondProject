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
        $('#bondprice').val(round(price));
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
        _.each(cashflow, function (element, index, list) { list[index].total = round(list[index].total); });
        $('#cashflow').removeClass('table-hidden');
        $('#cashflow').bootstrapTable('load', cashFlow);
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }

})()