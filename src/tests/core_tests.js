describe("Valid data is passed", function() {
    it("should calculate clean bond price", function() {
        var p = cleanPrice({
            nominal: 1000,
            term: 10,
            couponRate: 0.1,
            marketRate: 0.12,
            couponFrequency: 2
        });
        expect(p).toBeCloseTo(885.301, 3);
    });
});
