/**
 * for～of を使ってPromise配列をチェインしながら実行する。
 * （下のreduceバージョンと比べて如何に簡潔か確認）
 *
 * @async
 * @param {array} arr - Promise配列
 * @return {Object} Promiseオブジェクトを返す
 */
async function runPromiseInSequenseByForOf (arr) {
  let res
  for (const currentPromise of arr) {
    res = await currentPromise(res)
  }
  return res
}

/**
 * reduce を使ってPromise配列をチェインしながら実行する。
 *
 * @param {array} arr - Promise配列
 * @return {Object} Promiseオブジェクトを返す
 */
function runPromiseInSequense (arr) {
  return arr.reduce((promiseChain, currentPromise) => {
    return promiseChain.then((chainedResult) => {
      return currentPromise(chainedResult)
        .then((res) => res)
    })
  }, Promise.resolve())
}

// promise function 1
function p1 () {
  return new Promise((resolve, reject) => {
    resolve(5)
  })
}

// promise function 2
function p2 (a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2)
  })
}

// promise function 3
function p3 (a) {
  return new Promise((resolve, reject) => {
    resolve(a * 3)
  })
}

const promiseArr = [p1, p2, p3]

// Reduceバージョンで直列化
runPromiseInSequense(promiseArr)
  .then((res) => {
    console.log(res) // 30
  })

// For～of バージョンで直列化
runPromiseInSequenseByForOf(promiseArr)
  .then((res) => {
    console.log(res) // 30（結果は同じ）
  })
