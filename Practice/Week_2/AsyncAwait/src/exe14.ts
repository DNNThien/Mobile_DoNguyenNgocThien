function x3number(x: number): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(x * 3);
        }, 1000);
    })
}

async function run14() {
    var num = Math.floor(Math.random() * 1000)
    var result = await x3number(num);
    console.log('x =', num);
    console.log('x * 3 =', result);
}

run14()