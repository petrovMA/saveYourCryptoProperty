function loadData () {
  eztz.node.setProvider('http://alphanet-node.tzscan.io')
  let mnem = 'course casual original captain luggage husband knock october balance learn floor phone wheat bike snake'
  let keys = eztz.crypto.generateKeys(mnem, 'iyuxlmea.qitsymvq@tezos.example.orgd0fe1QkS4V')
  let account = keys.pkh
  $('#account').html(account)
  eztz.rpc.getBalance(account).then(function (res) {
    $('#balance').html(res / 1000000)
  }).catch(function (e) {
    console.log(e)
  })
}

function pingContract () {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')

  let mnem = 'course casual original captain luggage husband knock october balance learn floor phone wheat bike snake'
  let keys = eztz.crypto.generateKeys(mnem, 'iyuxlmea.qitsymvq@tezos.example.orgd0fe1QkS4V')
  let account = keys.pkh

  let addr = 'KT1REci1iEvCLJYYigY3TupRvBugRmdWNWTv'
  eztz.contract.send(addr, account, keys, 6, '(Right (Left Unit))', 100000, 400000, 60000)
    .then(function (res) {
      console.log('Operation result!!!') // Operation result
      console.log(res) // Operation result
    }).catch(function (e) {
      console.log(e)
    })
}

function receiveProperty () {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')

  let mnem = 'cruise pill rhythm enter remain flat sense traffic goat paper blossom super disagree mother speed'
  let keys = eztz.crypto.generateKeys(mnem, 'gugmtvax.nuekgxlw@tezos.example.orgaEVLOPaRD3')
  let account = keys.pkh

  let addr = 'KT1REci1iEvCLJYYigY3TupRvBugRmdWNWTv'
  // [{prim: "Right", args: [{prim: "Right", args: [{prim: "Left", args: [{prim: "Unit"}]}]}]}]
  eztz.contract.send(addr, account, keys, 6, '(Right (Right (Right (Left Unit))))', 100000, 400000, 60000)
    .then(function (res) {
      console.log('Operation result!!!') // Operation result
      console.log(res) // Operation result
    }).catch(function (e) {
      console.log(e)
    })
}
