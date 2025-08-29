function task11(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 1 done"), 1000);
  });
}

function task22(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 2 done"), 2000);
  });
}

function task33(): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => resolve("Task 3 done"), 1500);
  });
}

async function run16() {
  try {
    const results = await Promise.all([task11(), task22(), task33()]);
    console.log(results); // In ra mảng kết quả từ cả 3 task
  } catch (error) {
    console.error("Error:", error);
  }
}

run16();
