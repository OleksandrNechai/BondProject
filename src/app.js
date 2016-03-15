var app = (function () {
    return {
        calcPrice: calcDirtyPrice,
        calcCashFlow: calcCashFlow
    };

    function calcDirtyPrice() {
        var price = core.dirtyPrice({
            nominal: $('#nominal').val(),
            term: $('#term').val(),
            bondtype: $('#bondtype').val(),
            couponRate: $('#couponrate').val() / 100,
            couponFrequency: $('#couponfrequency').val(),
            daycountconvention: $('#daycountconvention').val(),
            maturitydate: $('#maturitydate').val(),
            marketRate: $('#marketrate').val() / 100,
            date: $('#date').val()
        });
        $('#bondprice').val(round(price));
    }

    function calcCashFlow() {
        var cashflow = core.cashFlow({
            nominal: $('#nominal').val(),
            term: $('#term').val(),
            bondtype: $('#bondtype').val(),
            couponRate: $('#couponrate').val() / 100,
            couponFrequency: $('#couponfrequency').val(),
            daycountconvention: $('#daycountconvention').val(),
            maturitydate: $('#maturitydate').val(),
            marketRate: $('#marketrate').val() / 100,
            date: $('#date').val()
        });
        $('#cashflow').bootstrapTable('load', //cashflow
            {date: '1212', coupon: 12, redemption: 10, total: 22}
        );
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }
})()