export function parseArr(arr) {
  let concatArr = [];

  function concat(value) {
    if (Array.isArray(value)) {
      for (let item of value) {
        if (Array.isArray(item)) concat(item);
        else concatArr.push(item);
      }
    } else {
      concatArr.push(value);
    }
  }

  concat(arr);
  return concatArr;
}

export function sortByTypeArr(arr) {
  let sortArr = [[], [], []];

  for (let item of arr) {
    switch (typeof item) {
      case "string":
        sortArr[0].push({ label: JSON.stringify(item), value: item });
        break;
      case "number":
        sortArr[1].push({ label: JSON.stringify(item), value: item });
        break;
      case "object":
        sortArr[2].push({ label: JSON.stringify(item), value: item });
        break;
    }
  }

  return sortArr;
}
