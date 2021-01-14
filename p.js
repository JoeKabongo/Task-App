let p = new Promise((resolve, reject) => {
  let a = 1 + 1;
  if (a === 3) {
    resolve(a);
  } else {
    reject('NOOO');
  }
});

p.then((message) => console.log(message)).catch((err) => console.log(err));
