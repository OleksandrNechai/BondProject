describe("Bullet bond", function() {
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
        it("expect", function() {
            expect(dirtyprice).toBeCloseTo(100.00, 2);
        });
    });
});
