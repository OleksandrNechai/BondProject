describe("Bullet bond", function() {
    describe("When calculating clean price of valid bond", function() {
        var p = core.cleanPrice({
            nominal: 1000,
            term: 10,
            couponRate: 0.1,
            marketRate: 0.12,
            couponFrequency: 2
        });
        it("should return correct result", function() {
            expect(p).toBeCloseTo(885.301, 3);
        });
    });
});
