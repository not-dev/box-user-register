const BoxSDK = require('box-node-sdk')
const config = require('../boxapi.json')

const boxGetClient = () => {
  const sdk = BoxSDK.getPreconfiguredInstance(config)
  const client = sdk.getAppAuthClient('enterprise')
  console.log(client)
  return client
}

const boxAddUser = (client, userJson) => {
  /*
    client.enterprise.addUser(userJson.email, userJson.username)
      .then(user => console.log(`Success {name: ${user.name}, login: ${user.login}}`))
      .err(err => console.log(err))
    */
  console.log(userJson.email, userJson.username)
}

export { boxGetClient, boxAddUser }
