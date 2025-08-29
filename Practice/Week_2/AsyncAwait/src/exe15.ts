function task1(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 1 done"), 1000);
  });
}

function task2(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 2 done"), 1000);
  });
}

function task3(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 3 done"), 1000);
  });
}
async function run15() {
  const result1 = await task1();
  console.log(result1);

  const result2 = await task2();
  console.log(result2);

  const result3 = await task3();
  console.log(result3);

  console.log("All tasks completed sequentially!");
}

run15();
