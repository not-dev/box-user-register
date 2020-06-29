const BoxSDK = require('box-node-sdk')

const boxGetClient = () => {
  return new Promise((resolve, reject) => {
    try {
      const config = require('../boxapi.json')
      const sdk = BoxSDK.getPreconfiguredInstance(config)
      const client = sdk.getAppAuthClient('enterprise')
      console.log(client)
      resolve(client)
    } catch (e) {
      if (e.code === 'MODULE_NOT_FOUND') {
        reject(Error('Config Not Found'))
      }
    }
  })
}

const boxAddUser = (client, userJson) => {
  return new Promise((resolve, reject) => {
    console.log(userJson.email, userJson.username)
    if (client) {
      client.enterprise.addUser(userJson.email, userJson.username)
        .then(res => {
          console.log(`Success {name: ${res.name}, login: ${res.login}}`)
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
