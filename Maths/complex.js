class Complex extends MathsNumber {
    constructor(x, y) {
        super();
        this.real = new MathsNumber(x || 0);
        this.imaginary = new MathsNumber(y || 0);
        this.simplify();
    }
    valueOf() {
        if (this.imaginary !== 0) {
            return this.abs();
        }
        return this.real;
    }
    toString() {
        if (this.real && this.imaginary) {
            const sign = this.imaginary > 0 ? '+' : '';
            return `${this.real}${sign}${this.imaginary}i`;
        } else if (this.imaginary) {
            return `${this.imaginary}i`;
        }
        return `${this.real}`;
    }
    add(x) {
        if (typeof x === 'number') {
            this.real.add(x);
        } else if (x instanceof Complex) {
            this.real.add(x.real);
            this.imaginary.add(x.imaginary);
        } else if (x instanceof MathsNumber) {
            this.real.add(x);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        return this;
    }
    subtract(x) {
        if (typeof x === 'number') {
            this.real.subtract(x);
        } else if (x instanceof Complex) {
            this.real.subtract(x.real);
            this.imaginary.subtract(x.imaginary);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        return this;
    }
    multiply(x) {
        if (typeof x === 'number') {
            this.real.multiply(x);
            this.imaginary.multiply(x);
        } else if (x instanceof Complex) {
            x = x.clone().simplify();
            const real = this.real;
            const imaginary = this.imaginary;
            this.real = real.clone().multiply(x.real).subtract(imaginary.clone().multiply(x.imaginary));
            this.imaginary = real.clone().multiply(x.imaginary).add(imaginary.clone().multiply(x.real));
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        return this;
    }
    divide(x) {
        if (typeof x === 'number') {
            this.real.divide(x);
            this.imaginary.divide(x);
        } else if (x instanceof Complex) {
            x = x.clone().simplify();
            const r2i2 = x.real.clone().multiply(x.real).add(x.imaginary.clone().multiply(x.imaginary));
            const real = this.real;
            const imaginary = this.imaginary;
            this.real = real.clone().multiply(x.real).add(imaginary.clone().multiply(x.imaginary)).divide(r2i2);
            this.imaginary = imaginary.clone().multiply(x.real).subtract(real.clone().multiply(x.imaginary)).divide(r2i2);
        } else {
            throw new TypeError('expected Number or MathsNumber');
        }
        return this;
    }
    power(x) {
        if (typeof x !== 'number') {
            throw new TypeError('expected Number');
        }
        if (x === 0) {
            this.real = 1;
            this.imaginary = 0;
        } else {
            if (x < 0) {
                this.invert();
                x = -x;
            }
            const base = this.clone();
            while (x-- > 0) {
                this.multiply(base);
            }
        }
        return this;
    }
    abs() {
        const r2i2 = this.real.clone().multiply(this.real).add(this.imaginary.clone().multiply(this.imaginary));
        r2i2.simplify();
        return Math.sqrt(r2i2);
    }
    invert() {
        const r2i2 = this.real.clone().multiply(this.real).add(this.imaginary.clone().multiply(this.imaginary));
        this.real.divide(r2i2);
        this.imaginary.negate().divide(r2i2);
        return this;
    }
    negate() {
        this.real.negate();
        this.imaginary.negate();
        return this;
    }
    simplify() {
        if (this.real instanceof MathsNumber) {
            this.real.simplify();
        } else if (typeof this.real === 'number') {
            this.real = new MathsNumber(this.real);
        }
        if (this.imaginary instanceof MathsNumber) {
            this.imaginary.simplify();
        } else if (typeof this.imaginary === 'number') {
            this.imaginary = new MathsNumber(this.imaginary);
        }
        if (this.real instanceof Complex || this.imaginary instanceof Complex) {
            const complexReal = this.real;
            const complexImaginary = this.imaginary;
            this.real = complexReal.real.clone().add(complexImaginary.real);
            this.imaginary = complexReal.imaginary.clone().add(complexImaginary.imaginary);
        }
        return this;
    }
    clone() {
        return new Complex(this.real.clone(), this.imaginary.clone());
    }
}

