// MurmurhashV3
var p1A = function(a1A, M1A) {
    var H1A = M1A & 0xffff;
    var y1A = M1A - H1A;
    return (y1A * a1A | 0) + (H1A * a1A | 0) | 0;
}
  , Y1A = function(X1A, V6A, R6A) {
    var I6A = 0xcc9e2d51
      , f6A = 0x1b873593;
    var g1A = R6A;
    var B6A = V6A & ~0x3;
    for (var x6A = 0; x6A < B6A; x6A += 4) {
        var S1A = X1A.charCodeAt(x6A) & 0xff | (X1A.charCodeAt(x6A + 1) & 0xff) << 8 | (X1A.charCodeAt(x6A + 2) & 0xff) << 16 | (X1A.charCodeAt(x6A + 3) & 0xff) << 24;
        S1A = p1A(S1A, I6A);
        S1A = (S1A & 0x1ffff) << 15 | S1A >>> 17;
        S1A = p1A(S1A, f6A);
        g1A ^= S1A;
        g1A = (g1A & 0x7ffff) << 13 | g1A >>> 19;
        g1A = g1A * 5 + 0xe6546b64 | 0;
    }
    S1A = 0;
    switch (V6A % 4) {
    case 3:
        S1A = (X1A.charCodeAt(B6A + 2) & 0xff) << 16;
    case 2:
        S1A |= (X1A.charCodeAt(B6A + 1) & 0xff) << 8;
    case 1:
        S1A |= X1A.charCodeAt(B6A) & 0xff;
        S1A = p1A(S1A, I6A);
        S1A = (S1A & 0x1ffff) << 15 | S1A >>> 17;
        S1A = p1A(S1A, f6A);
        g1A ^= S1A;
    }
    g1A ^= V6A;
    g1A ^= g1A >>> 16;
    g1A = p1A(g1A, 0x85ebca6b);
    g1A ^= g1A >>> 13;
    g1A = p1A(g1A, 0xc2b2ae35);
    g1A ^= g1A >>> 16;
    return g1A;
};
module.exports = Y1A

