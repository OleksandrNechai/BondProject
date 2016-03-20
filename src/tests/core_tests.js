
describe("Bullet bond", function () {
    describe("Market rate = Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({                   
            nominal: 100,
            term: 1,
            bondType: 'Bullet',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function() {
            expect(dirtyprice).toBeCloseTo(100.00, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Bullet',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(99.92, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Bullet',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.03, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Bullet',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.08, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Bullet',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.16, 2);
        });
    });

});

describe("Serial bond", function () {
    describe("Market rate = Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 1200,
            term: 1,
            bondType: 'Serial',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.00, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 1200,
            term: 1,
            bondType: 'Serial',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(99.92, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 1200,
            term: 1,
            bondType: 'Serial',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.03, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 1200,
            term: 1,
            bondType: 'Serial',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.08, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 1200,
            term: 1,
            bondType: 'Serial',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(100.16, 2);
        });
    });

});

describe("Annuity bond", function () {
    describe("Market rate = Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Annuity',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(8.41, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Annuity',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(8.4, 2);
        });
    });

    describe("Market rate > Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Annuity',
            couponRate: 0.02,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.03,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(8.41, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, no Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Annuity',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-01'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(8.46, 2);
        });
    });

    describe("Market rate < Bond coupon, 1 coupon, 15 days of Accrued interest", function () {
        var dirtyprice = core.dirtyPrice({
            nominal: 100,
            term: 1,
            bondType: 'Annuity',
            couponRate: 0.03,
            couponFrequency: 12,
            dayCountConvention: 3,
            maturityDate: '2015-01-01',
            marketRate: 0.02,
            date: '2014-12-15'
        });
        it("passed", function () {
            expect(dirtyprice).toBeCloseTo(8.46, 2);
        });
    });

});

describe("Cash flow of Bullet bond", function () {
    describe("From date 10/01/2014, Maturity date 01/01/2015, term - 1 year", function () {
        var cashflow =
            _.each( core.cashFlowFromDate({
                        nominal: 100,
                        term: 1,
                        bondType: 'Bullet',
                        couponRate: 0.02,
                        couponFrequency: 12,
                        dayCountConvention: 3,
                        maturityDate: '2015-01-01',
                        marketRate: 0.02,
                        date: '2014-12-01',
                        fromDate: '2014-01-10'}), 
                    function (item) {
                        item.total = round(item.total, 2);
                        item.redemption = round(item.redemption, 4);
                        item.coupon = round(item.coupon, 4);
                    });
        it("passed", function () {
            expect(cashflow).toEqual(
                [   { date: '2014-02-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-03-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-04-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-05-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-06-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-07-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-08-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-09-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-10-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-11-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2014-12-01', coupon: 0.1667, redemption: 0, total: 0.17 },
                    { date: '2015-01-01', coupon: 0.1667, redemption: 100, total: 100.17 }
                ]);
        });
    });
});

describe("Cash flow of Serial bond", function () {
    describe("From date 10/01/2014, Maturity date 01/01/2015, term - 1 year", function () {
        var cashflow =
            _.each(core.cashFlowFromDate({
                nominal: 100,
                term: 1,
                bondType: 'Serial',
                couponRate: 0.02,
                couponFrequency: 12,
                dayCountConvention: 3,
                maturityDate: '2015-01-01',
                marketRate: 0.02,
                date: '2014-12-01',
                fromDate: '2014-01-10'
            }),
                    function (item) {
                        item.total = round(item.total, 2);
                        item.redemption = round(item.redemption, 4);
                        item.coupon = round(item.coupon, 4);
                    });
        it("passed", function () {
            expect(cashflow).toEqual(
                [   { date: '2014-02-01', coupon: 0.1667, redemption: 8.3333, total: 8.5 },
                    { date: '2014-03-01', coupon: 0.1528, redemption: 8.3333, total: 8.49 },
                    { date: '2014-04-01', coupon: 0.1389, redemption: 8.3333, total: 8.47 },
                    { date: '2014-05-01', coupon: 0.125, redemption: 8.3333, total: 8.46 },
                    { date: '2014-06-01', coupon: 0.1111, redemption: 8.3333, total: 8.44 },
                    { date: '2014-07-01', coupon: 0.0972, redemption: 8.3333, total: 8.43 },
                    { date: '2014-08-01', coupon: 0.0833, redemption: 8.3333, total: 8.42 },
                    { date: '2014-09-01', coupon: 0.0694, redemption: 8.3333, total: 8.4 },
                    { date: '2014-10-01', coupon: 0.0556, redemption: 8.3333, total: 8.39 },
                    { date: '2014-11-01', coupon: 0.0417, redemption: 8.3333, total: 8.38 },
                    { date: '2014-12-01', coupon: 0.0278, redemption: 8.3333, total: 8.36 },
                    { date: '2015-01-01', coupon: 0.0139, redemption: 8.3333, total: 8.35 }
                ]);
        });
    });
});


describe("Cash flow of Annuity bond", function () {
    describe("From date 10/01/2014, Maturity date 01/01/2015, term - 1 year", function () {
        var cashflow =
            _.each(core.cashFlowFromDate({
                nominal: 100,
                term: 1,
                bondType: 'Annuity',
                couponRate: 0.02,
                couponFrequency: 12,
                dayCountConvention: 3,
                maturityDate: '2015-01-01',
                marketRate: 0.02,
                date: '2014-12-01',
                fromDate: '2014-01-10'
            }),
                    function (item) {
                        item.total = round(item.total, 2);
                        item.redemption = round(item.redemption, 4);
                        item.coupon = round(item.coupon, 4);
                    });
        it("passed", function () {
            expect(cashflow).toEqual(
                [{ date: '2014-02-01', coupon: 0.1667, redemption: 8.2572, total: 8.42 },
                    { date: '2014-03-01', coupon: 0.1529, redemption: 8.271, total: 8.42 },
                    { date: '2014-04-01', coupon: 0.1391, redemption: 8.2848, total: 8.42 },
                    { date: '2014-05-01', coupon: 0.1253, redemption: 8.2986, total: 8.42 },
                    { date: '2014-06-01', coupon: 0.1115, redemption: 8.3124, total: 8.42 },
                    { date: '2014-07-01', coupon: 0.0976, redemption: 8.3263, total: 8.42 },
                    { date: '2014-08-01', coupon: 0.0837, redemption: 8.3401, total: 8.42 },
                    { date: '2014-09-01', coupon: 0.0698, redemption: 8.354, total: 8.42 },
                    { date: '2014-10-01', coupon: 0.0559, redemption: 8.368, total: 8.42 },
                    { date: '2014-11-01', coupon: 0.042, redemption: 8.3819, total: 8.42 },
                    { date: '2014-12-01', coupon: 0.028, redemption: 8.3959, total: 8.42 },
                    { date: '2015-01-01', coupon: 0.014, redemption: 8.4099, total: 8.42 }
                ]);
        });
    });
});

function round(number, decimals) {
    var multiplier = Math.pow(10, decimals);
    return Math.round(number * multiplier) / multiplier;
}


