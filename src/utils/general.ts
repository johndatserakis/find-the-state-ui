export const pinkyPromise = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('I pinky promise!');
    }, time);
  });
};
