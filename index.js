let sort_algo = document.getElementById("algo");
let bars_container = document.getElementById("bars_container");
let slider = document.getElementById("slider");
let speed = document.getElementById("speed");
let randomize_array = document.getElementById("randomize_arr_btn");
let sort_btn = document.getElementById("sort_btn");
let minRange = 4;
let maxRange = 250;
let numOfBars = Math.floor(
  612 / (2 + (100 - slider.value).toFixed(2) * (49 / 80))
);
let heightFactor = 2;
let speedFactor = 1000;
let unsorted_array = new Array(numOfBars);

slider.addEventListener("input", function () {
  numOfBars = Math.floor(
    612 / (2 + (100 - slider.value).toFixed(2) * (49 / 80))
  );

  //   document.querySelectorAll(".bar").style.width =
  //     1 + (slider.value - 20) * (49 / 130) + "px";

  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});
randomize_array.addEventListener("click", () => {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }
  return array;
}

function renderBars(array) {
  bars_container.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.width =
      1 + (100 - slider.value).toFixed(2) * (49.0 / 80.0) + "px";
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  console.log(1);

  unsorted_array = createRandomArray();
  console.log(2);

  renderBars(unsorted_array);
  console.log(3);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
  let bar = document.getElementsByClassName("bar");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (j > 0) bar[j - 1].style.backgroundColor = "aqua";

      bar[j].style.backgroundColor = "green";
      bar[j + 1].style.backgroundColor = "red";
      if (array[j] > array[j + 1]) {
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        await sleep(speedFactor);

        bar[j].style.height = array[j] * heightFactor + "px";
        bar[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bar[j + 1].style.backgroundColor = "yellow";
        bar[j].style.backgroundColor = "yellow";
      }
      if (j == array.length - i - 2) {
        bar[j].style.backgroundColor = "aqua";
        bar[j + 1].style.backgroundColor = "aqua";
      }

      await sleep(speedFactor);
    }
    await sleep(speedFactor);
  }
}

async function insertionSort(array) {
  let bar = document.getElementsByClassName("bar");

  for (let i = 1; i < array.length; i++) {
    let c = array[i];
    bar[i].style.backgroundColor = "green";
    let j = i - 1;
    bar[j].style.backgroundColor = "red";

    for (; j >= 0; j--) {
      await sleep(speedFactor);

      if (array[j] > c) {
        array[j + 1] = array[j];
        array[j] = c;
        bar[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bar[j].style.height = array[j] * heightFactor + "px";
        bar[j + 1].style.backgroundColor = "red";
        bar[j].style.backgroundColor = "green";
        for (let k = 0; k < bar.length; k++) {
          if (k != j && k != j + 1) {
            bar[k].style.backgroundColor = "aqua";
          }
        }
      } else {
        break;
      }
    }
    await sleep(speedFactor);
    for (let k = 0; k < bar.length; k++) {
      bar[k].style.backgroundColor = "aqua";
    }
  }
}
async function selectionSort(arr) {
  let bar = document.getElementsByClassName("bar");

  for (let i = 0; i < arr.length; i++) {
    let mi = i;
    bar[mi].style.backgroundColor = "yellow";

    // bar[mi].style.backgroundColor = "red";

    for (let j = i + 1; j < arr.length; j++) {
      // await sleep(speedFactor);

      bar[j].style.backgroundColor = "green";

      if (arr[j] < arr[mi]) {
        bar[mi].style.backgroundColor = "aqua";

        mi = j;
        bar[mi].style.backgroundColor = "red";
      }

      // for (let k = 0; k < bar.length; k++) {
      //   if (k != j && k != mi) {
      //     bar[k].style.backgroundColor = "aqua";
      //   }
    }
    await sleep(speedFactor);

    let temp = arr[i];
    arr[i] = arr[mi];
    arr[mi] = temp;
    bar[i].style.height = arr[i] * heightFactor + "px";
    bar[mi].style.height = arr[mi] * heightFactor + "px";
    // bar[i].style.backgroundColor = "red";
    // bar[mi].style.backgroundColor = "yellow";
    bar[mi].style.backgroundColor = "aqua";
  }
}

function swap(arr, i, j) {
  let bar = document.getElementsByClassName("bar");

  let temp = arr[j];
  arr[j] = arr[i];
  arr[i] = temp;

  bar[i].style.height = arr[i] * heightFactor + "px";
  bar[j].style.height = arr[j] * heightFactor + "px";
}

function partition(arr, s, e) {
  let pivot = arr[e];
  let si = s;
  for (let j = s; j < e; j++) {
    if (arr[j] < pivot) {
      swap(arr, j, si);
      si++;
    }
  }
  swap(arr, si, e);
  return si;
}

async function quickSort(arr, s, e) {
  let bar = document.getElementsByClassName("bar");
  if (s < e) {
    let pi = partition(arr, s, e);

    quickSort(arr, s, pi - 1);
    quickSort(arr, pi + 1, e);
  }
}

function merge(arr, s, e, mid) {
  console.log("merge");
  let bar = document.getElementsByClassName("bar");

  let left = new Array(mid - s + 1);
  let right = new Array(e - mid);

  // left.forEach((element, index) => {
  //   element = arr[s + index];
  // });

  // right.forEach((element, index) => {
  //   element = arr[mid + 1 + index];
  // });

  for (let i = 0; i < left.length; i++) {
    left[i] = arr[s + i];
  }
  for (let i = 0; i < right.length; i++) {
    right[i] = arr[mid + i + 1];
  }

  let i = s;
  let k = 0;
  let j = 0;
  while (j < left.length && k < right.length) {
    if (left[j] < right[k]) {
      arr[i] = left[j];
      bar[i].style.height = arr[i] * heightFactor + "px";
      // console.log("while");

      j++;
      i++;
    } else {
      arr[i] = right[k];
      bar[i].style.height = arr[i] * heightFactor + "px";

      i++;
      k++;
    }
  }

  while (j < left.length) {
    arr[i] = left[j];
    bar[i].style.height = arr[i] * heightFactor + "px";

    j++;
    i++;
  }
  while (k < right.length) {
    arr[i] = right[k];
    bar[i].style.height = arr[i] * heightFactor + "px";

    k++;
    i++;
  }
}

function mergeSort(arr, s, e) {
  if (s < e) {
    // console.log(s + " ");
    let mid = s + parseInt((e - s) / 2);
    // let mid = parseInt((s + e) / 2);
    mergeSort(arr, s, mid);
    mergeSort(arr, mid + 1, e);

    merge(arr, s, e, mid);
  }
}

sort_btn.addEventListener("click", function () {
  switch (sort_algo.value) {
    case "bubble":
      bubbleSort(unsorted_array);
      break;

    case "selection":
      selectionSort(unsorted_array);
      break;

    case "insertion":
      insertionSort(unsorted_array);
      break;

    case "quick":
      quickSort(unsorted_array, 0, unsorted_array.length - 1);
      break;

    case "merge":
      mergeSort(unsorted_array, 0, unsorted_array.length - 1);
      break;

    case "heap":
      heapSort(unsorted_array);
      break;
    default:
      bubbleSort(unsorted_array);
      break;
  }
});
