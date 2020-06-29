const asyncFunc = (func:(...args:any) => any) => {
  return new Promise((resolve) => {
    setTimeout(resolve)
  })
    .then(func)
    .catch(err => console.error(err))
}

const sleep = (sec: number) => {
  console.log('sleeping')
  return new Promise((resolve) => {
    setTimeout(resolve, sec * 1000)
  })
}

export { asyncFunc, sleep }
