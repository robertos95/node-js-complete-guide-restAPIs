// const p = Promise.resolve({ id: 1 });
// p.then((result) => console.log(result));

// const p2 = Promise.reject(new Error('Reason for rejection'));
// p2.catch(err => console.log(err.message))

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1");
    resolve(1);
  }, 3000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2");
    resolve(2);
  }, 2000);
});

Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));

Promise.race([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message));
