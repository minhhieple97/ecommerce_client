export const updateObject = (oldObject, updatePropperties) => {
  return {
    ...oldObject,
    ...updatePropperties,
  };
};
export const setValueInLocalStorage = () => {

};


export const showAverage = (p) => {
  if (p && p.ratings) {
    const ratingsArray = p.ratings;
    const length = ratingsArray.length;
    console.log({ ratingsArray })
    const total = ratingsArray.reduce((result, el) => {
      result += el.star;
      return result;
    }, 0);
    const average = total / length;
    console.log({ average })
    return average;
  }
};
