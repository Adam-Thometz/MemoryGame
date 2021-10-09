function shuffle(arr) {
  let counter = arr.length

  while (counter > 0) {
    let idx = Math.floor(Math.random() * counter)
    counter--

    let temp = arr[counter]
    arr[counter] = arr[idx]
    arr[idx] = temp
  }

  return arr
}