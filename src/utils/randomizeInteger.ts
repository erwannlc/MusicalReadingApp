export const randomizeInteger = (min: number, max: number) => {
  // here rand is from min to (max+1)
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};
