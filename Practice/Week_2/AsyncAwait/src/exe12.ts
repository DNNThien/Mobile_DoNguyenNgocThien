function simulateTask(ms: number): Promise<string> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('SUCCESS')
        }, ms);
    })
}

async function run() {
    var result = await simulateTask(2000);
    console.log(result)
}

run()