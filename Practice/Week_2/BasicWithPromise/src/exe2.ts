function testPromise(): Promise<number> {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(10);
        }, 1000);
    })
}

testPromise().then(num => {
    console.log(num)
})