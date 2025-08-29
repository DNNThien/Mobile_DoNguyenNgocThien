function checkTimeDelay(ms: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(ms >= 1000)
                resolve('Valid');
            else reject('Invalid');
        }, ms);
    })
}

async function run3() {
    try{
        var result = await checkTimeDelay(700);
        console.log(result);
    } catch(error) {
        console.error(error);
    }
}

run3()