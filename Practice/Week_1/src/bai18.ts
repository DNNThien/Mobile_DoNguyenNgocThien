class MathUtil {
    static add(a: number, b: number): number {
        return a + b;
    }
    static subtract(a: number, b: number): number {
        return a - b;
    }
    static multiply(a: number, b: number): number {
        return a * b;
    }
    static divide(a: number, b: number): number {
        if(b == 0)
            throw new Error(`Cannot divide by zero`);
        return a / b;
    }
}

console.log(MathUtil.add(5, 3));        // 8
console.log(MathUtil.subtract(10, 4));  // 6
console.log(MathUtil.multiply(6, 7));   // 42
console.log(MathUtil.divide(20, 5));    // 4