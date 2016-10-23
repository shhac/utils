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

class MathsNumber {
    constructor(x) {
        if (x instanceof MathsNumber) {
            return x.clone();
        }
        if (typeof x === 'number') {
            this.value = x;
        }
    }
    valueOf() {
        return this.value;
    }
    toString(x) {
        return this.value.toString(x);
    }
    add(x) {
        this.value += x;
        return this;
    }
    subtract(x) {
        this.value -= x;
        return this;
    }
    multiply(x) {
        this.value *= x;
        return this;
    }
    divide(x) {
        this.value /= x;
        return this;
    }
    power(x) {
        this.value = Math.pow(this.value, x);
        return this;
    }
    abs() {
        this.value = Math.abs(this.value);
        return this;
    }
    invert() {
        this.value = 1 / this.value;
        return this;
    }
    negate() {
        this.value = -this.value;
        return this;
    }
    simplify() {
        if (this.value instanceof MathsNumber) {
            if (this.value.constructor === MathsNumber) {
                this.value.simplify();
                this.value = this.value.value;
            }
        }
        return this;
    }
    clone() {
        return new MathsNumber(this.value);
    }
}

