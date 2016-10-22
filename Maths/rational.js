class Rational {
    constructor(x, y) {
        this.numerator = x;
        this.denominator = y;
        this.reduce();
        this.normalise();
    }
    reduce() {
        const gcd = Maths.gcd(this.numerator, this.denominator);
        if (gcd && gcd !== 1) {
            this.numerator /= gcd;
            this.denominator /= gcd;
        }
    }
    normalise() {
        if (this.denominator < 0) {
            this.numerator = -this.numerator;
            this.denominator = -this.denominator;
        }
    }
    valueOf() {
        return this.numerator / this.denominator;
    }
    toString() {
        this.normalise();
        return `${this.numerator}/${this.denominator}`;
    }
    add(x) {
        if (typeof x === 'number') {
            x *= this.denominator;
            this.numerator += x;
        } else if (x instanceof Rational) {
            this.numerator *= x.denominator;
            this.denominator *= x.denominator;
            this.numerator += x.numerator * this.denominator;
        } else {
            throw new TypeError('expected Number or Rational');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    subtract(x) {
        if (typeof x === 'number') {
            x *= this.denominator;
            this.numerator -= x;
        } else if (x instanceof Rational) {
            this.numerator *= x.denominator;
            this.denominator *= x.denominator;
            this.numerator -= x.numerator * this.denominator;
        } else {
            throw new TypeError('expected Number or Rational');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    multiply(x) {
        if (typeof x === 'number') {
            this.numerator *= x;
        } else if (x instanceof Rational) {
            this.numerator *= x.numerator;
            this.denominator *= x.denominator;
        } else {
            throw new TypeError('expected Number or Rational');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    divide(x) {
        if (typeof x === 'number') {
            this.denominator *= x;
        } else if (x instanceof Rational) {
            this.numerator *= x.denominator;
            this.denominator *= x.numerator;
        } else {
            throw new TypeError('expected Number or Rational');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    power(x) {
        if (typeof x !== 'number') {
            throw new TypeError('expected Number');
        }
        if (x === 0) {
            this.numerator = 1;
            this.denominator = 1;
        } else {
            if (x < 0) {
                this.inverse();
            }
            this.numerator = Math.pow(this.numerator, x);
            this.denominator = Math.pow(this.denominator, x);
            this.reduce();
            this.normalise();
        }
        return this;
    }
    abs() {
        this.normalise();
        this.numerator = Math.abs(this.numerator);
        return this;
    }
    invert() {
        const numerator = this.numerator;
        this.numerator = this.denominator;
        this.denominator = numerator;
        return this;
    }
    clone() {
        return new Rational(this.numerator, this.denominator);
    }
}

