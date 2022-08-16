export function checkEmpty(array) {
  let arr = array.map((subArray) => {
    let res;
    res = subArray.some((value) => {
      return !value;
    });
    return res;
  });
  if (arr.includes(true)) {
    return true;
  } else {
    return false;
  }
}
