function task111(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 1 done"), 1000);
  });
}

function task222(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 2 done"), 2000);
  });
}

function task333(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 3 done"), 1500);
  });
}

async function run17() {
  const tasks = [task111(), task222(), task333()];

  for await (const result of tasks) {
    console.log(result);
  }
}

run17();
