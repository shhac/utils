class Complex {
    constructor(x, y) {
        this.real = x;
        this.imaginary = y;
    }
    toString() {
        if (this.real && this.imaginary) {
            return `${this.real}${this.imaginary}i`;
        } else if (this.imaginary) {
            return `${this.imaginary}i`;
        }
        return `${this.real}`;
    }
    add(x) {
        if (typeof x === 'number') {
            this.real += x;
        } else if (x instanceof Complex) {
            this.real += x.real;
            this.imaginary += x.imaginary;
        } else {
            throw new TypeError('expected Number or Complex');
        }
        return this;
    }
    subtract(x) {
        if (typeof x === 'number') {
            this.real -= x;
        } else if (x instanceof Complex) {
            this.real -= x.real;
            this.imaginary -= x.imaginary;
        } else {
            throw new TypeError('expected Number or Complex');
        }
        return this;
    }
    multiply(x) {
        if (typeof x === 'number') {
            this.real *= x;
            this.imaginary *= x;
        } else if (x instanceof Complex) {
            this.real = this.real * x.real - this.imaginary * x.imaginary;
            this.real = this.real * x.imaginary + this.imaginary * x.real;
        } else {
            throw new TypeError('expected Number or Complex');
        }
        return this;
    }
    divide(x) {
        if (typeof x === 'number') {
            this.real /= x;
            this.imaginary /= x;
        } else if (x instanceof Complex) {
            const r2i2 = x.real * x.real + x.imaginary * x.imaginary;
            this.real = (this.real * x.real + this.imaginary * x.imaginary) / r2i2;
            this.imaginary = (this.imaginary * x.real - this.real * x.imaginary) / r2i2;
        } else {
            throw new TypeError('expected Number or Complex');
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
        const r2i2 = this.real * this.real + this.imaginary * this.imaginary;
        return Math.sqrt(r2i2);
    }
    invert() {
        const r2i2 = this.real * this.real + this.imaginary * this.imaginary;
        this.real = this.real / r2i2;
        this.imaginary = -this.imaginary / r2i2;
    }
    clone() {
        return new Complex(this.real, this.imaginary);
    }
}

