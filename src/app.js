var app = (function () {
    return {
        calcCleanPrice: calcCleanPrice
    };

    function calcCleanPrice() {
        var price = core.cleanPrice({
            nominal: $('#nominal').val(),
            term: $('#term').val(),
            couponRate: $('#couponrate').val() / 100,
            marketRate: $('#marketrate').val() / 100,
            couponFrequency: $('#couponfrequency').val()
        });
        $('#bondprice').val(round(price));
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }
})()