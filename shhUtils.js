(function (frameworkName = '__', global = window, setGlobal = true) {
    class ShhUtils {
        caseStart(str) {
            const re = /(?:^|\s)\w/g;
            return str.toLowerCase().replace(re, m => m.toUpperCase());
        }
        caseName(str) {
            const re = /\b\w/g;
            return str.toLowerCase().replace(re, m => m.toUpperCase());
        }
        itemAt(haystack, needle) {
            const haystackType = this.getType(haystack);
            const needleType = this.getType(needle);
            if (['Array', 'String'].indexOf(haystackType) !== -1) {
                if (needleType === 'Number') {
                    needle = this.modulo(needle, haystack.length);
                }
            }
            return haystack[needle];
        }
        setItemAt(haystack, needle, value) {
            const haystackType = this.getType(haystack);
            const needleType = this.getType(needle);
            if (haystackType === 'Array' && needleType === 'Number') {
                needle = this.modulo(needle, haystack.length);
            }
            haystack[needle] = value;
            return haystack;
        }
        modulo(i, j) {
            if (j === 0) {
                return 0;
            }
            if (j < 0) {
                return -this.modulo(-i, -j);
            }
            i = i % j;
            if (i < 0) {
                i += j;
            }
            return i;
        }
        swap(haystack, i, j) {
            const haystackType = this.getType(haystack);
            if (haystackType === 'String') {
                return haystack.slice(0, i) +
                    this.itemAt(haystack, j) +
                    haystack.slice(i + 1, j) +
                    this.itemAt(haystack, i) +
                    (j + 1 === 0 ? '' : haystack.slice(j + 1));
            }
            const iValue = this.itemAt(haystack, i);
            const jValue = this.itemAt(haystack, j);
            this.setItemAt(haystack, i, jValue);
            this.setItemAt(haystack, j, iValue);
            return haystack;
        }
        getType(obj) {
            const typeofResult = typeof obj;
            if (typeofResult !== 'object') {
                return this.caseStart(typeofResult);
            }
            if (obj === null) {
                return 'Null';
            }
            if (obj.constructor && obj.constructor.name) {
                if (typeof obj.constructor.name === 'string') {
                    return obj.constructor.name;
                }
            }
            return typeofResult;
        }
        isType(haystack, testType) {
            return this.getType(haystack) === testType;
        }
        sameType(haystackA, haystackB) {
            return this.getType(haystackA) === this.getType(haystackB);
        }
    }
    
    const shhUtils = new ShhUtils(); 
    if (setGlobal) {
        global[frameworkName] = shhUtils;
    }
    return shhUtils;
}());

