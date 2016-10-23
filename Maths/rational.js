class Rational extends MathsNumber {
    constructor(x, y) {
        super();
        this.numerator = new MathsNumber(x || 0);
        this.denominator = new MathsNumber(y || 1);
        this.reduce();
        this.normalise();
    }
    reduce() {
        this.simplify();
        const gcd = Maths.gcd(this.numerator, this.denominator);
        if (gcd && gcd !== 1) {
            this.numerator.divide(gcd);
            this.denominator.divide(gcd);
        }
    }
    normalise() {
        if (this.denominator < 0) {
            this.numerator.negate();
            this.denominator.negate();
        }
    }
    valueOf() {
        this.simplify();
        return this.numerator.divide(this.denominator).valueOf();
    }
    toString() {
        this.normalise();
        return `${this.numerator}/${this.denominator}`;
    }
    add(x) {
        if (typeof x === 'number') {
            x = this.denominator.clone().multiply(x);
            this.numerator.add(x);
        } else if (x instanceof Rational) {
            this.numerator.multiply(x.denominator);
            this.denominator.multiply(x.denominator);
            this.numerator.add(x.numerator.clone().multiply(this.denominator));
        } else if (x instanceof MathsNumber) {
            x = this.denominator.clone().multiply(x);
            this.numerator.add(x);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    subtract(x) {
        if (typeof x === 'number') {
            x = this.denominator.clone().multiply(x);
            this.numerator.subtract(x);
        } else if (x instanceof Rational) {
            this.numerator.multiply(x.denominator);
            this.denominator.multiply(x.denominator);
            this.numerator.subtract(x.numerator.clone().multiply(this.denominator));
        } else if (x instanceof MathsNumber) {
            x = this.denominator.clone().multiply(x);
            this.numerator.subtract(x);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    multiply(x) {
        if (typeof x === 'number') {
            this.numerator.multiply(x);
        } else if (x instanceof Rational) {
            this.numerator.multiply(x.numerator);
            this.denominator.multiply(x.denominator);
        } else if (x instanceof MathsNumber) {
            this.numerator.multiply(x);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        this.reduce();
        this.normalise();
        return this;
    }
    divide(x) {
        if (typeof x === 'number') {
            this.denominator.multiply(x);
        } else if (x instanceof Rational) {
            this.numerator.multiply(x.denominator);
            this.denominator.multiply(x.numerator);
        } else if (x instanceof MathsNumber) {
            this.denominator.multiply(x);
        } else {
            throw new TypeError('expected Number or MathsNumber');
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
            this.numerator = new MathsNumber(1);
            this.denominator = new MathsNumber(1);
        } else {
            if (x < 0) {
                this.inverse();
            }
            this.numerator = this.numerator.power(x);
            this.denominator = this.denominator.power(x);
            this.reduce();
            this.normalise();
        }
        return this;
    }
    abs() {
        this.normalise();
        this.numerator = this.numerator.abs();
        return this;
    }
    invert() {
        const numerator = this.numerator;
        this.numerator = this.denominator;
        this.denominator = numerator;
        return this;
    }
    negate() {
        this.numerator.negate();
        return this;
    }
    simplify() {
        if (this.numerator instanceof Rational) {
            this.numerator.simplify();
            this.denominator.multiply(this.numerator.denominator);
            this.numerator = this.numerator.numerator;
        }
        if (this.denominator instanceof Rational) {
            this.denominator.simplify();
            this.numerator.multiply(this.denominator.denominator);
            this.denominator = this.denominator.numerator;
        }
        return this;
    }
    clone() {
        return new Rational(this.numerator, this.denominator);
    }
}

