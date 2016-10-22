Maths = {
    gcd(x, y) {
        if (!x && !y) {
            return 1;
        }
        if (!x || !y) {
            return x || y;
        }
        let z = 0;
        do {
            z = x % y;
            x = y;
            y = z;
        } while (z !== 0);
        return x;
    },
    lcm(x, y) {
        if (!x || !y) {
            return 0;
        } else {
            return (x * y) / this.gcd(x,y);
        }
    },
    sgn(x){
        if (x > 0) {
            return 1;
        }
        if (x === 0) {
            return 0;
        }
        return -1;
    }
};

