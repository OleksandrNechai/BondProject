
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


