async function worker() {
    console.log("runner");
    let counter = 1;
    while (true) {
      if (counter % 2 === 0) {
        console.log(">>>> worker still working ");
      } else {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              console.log(JSON.stringify({ currentServerTime: new Date() }))
            );
          }, 5000)
        );
      }
      counter++;
    }
  }
  worker();