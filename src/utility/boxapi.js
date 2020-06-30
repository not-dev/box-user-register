const BoxSDK = require('box-node-sdk')

const boxGetClient = async () => {
  const response = await fetch(process.env.PUBLIC_URL + '/boxapi.json')
  const config = await response.json()
  const sdk = BoxSDK.getPreconfiguredInstance(config)
  const client = sdk.getAppAuthClient('enterprise')
  console.log(client)
  return client
}

const boxAddUser = (client, userJson) => {
  return new Promise((resolve, reject) => {
    console.log(userJson.email, userJson.username)
    if (client) {
      client.enterprise.addUser(userJson.email, userJson.username)
        .then(res => {
          console.log(`Success-${res.name}`)
          resolve(res)
        })
        .err(err => {
          console.error(err)
          reject(err)
        })
    } else {
      reject(Error('Auth Error'))
    }
  })
}

export { boxGetClient, boxAddUser }
