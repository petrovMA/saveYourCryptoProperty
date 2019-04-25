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

  // eztz.node.setProvider('https://alphanet-node.tzscan.io')
  eztz.node.setProvider('http://209.250.227.9:8732')
  // eztz.node.query(`/chains/main/blocks/head/context/contracts/KT1A5oZVuRWrejXmLgr7bcsa4fGc1b3WLn5V/big_map_get`, {
  //   'key': {
  //     'string': 'KT1A5oZVuRWrejXmLgr7bcsa4fGc1b3WLn5V'
  //   },
  //   'type': {
  //     'prim': 'address'
  //   }
  // }).then(console.log).catch(console.error)

  /*
  eztz.node.query("/chains/main/blocks/head/context/contracts/KT1A5oZVuRWrejXmLgr7bcsa4fGc1b3WLn5V").then(function(res){
    console.log(res);
  }).catch(function(e){console.log(e)});

  console.log('Opresult!!!') // Operation result*/

  let mnem = 'course casual original captain luggage husband knock october balance learn floor phone wheat bike snake'
  let keys = eztz.crypto.generateKeys(mnem, 'iyuxlmea.qitsymvq@tezos.example.orgd0fe1QkS4V')
  let account = keys.pkh

  let addr = 'KT1A5oZVuRWrejXmLgr7bcsa4fGc1b3WLn5V'
  eztz.contract.send(addr, account, keys, 6, '{\'prim\':\'Left\',\'args\':[{\'string\':\'123qweqweqwe\'}]}', 100000, 400000, 60000)

  // let addr = 'tz1YWtADpgGehcTFqxMapiJcfLgzzL79aDJQ'
  // eztz.contract.send(addr, account, keys, 6, 'Unit', 100000, 400000, 60000)

    .then(function (res) {
      console.log('Operation result!!!') // Operation result
      console.log(res) // Operation result
    }).catch(function (e) {
      console.log(e)
  })
/*  let e = 'KT1REci1iEvCLJYYigY3TupRvBugRmdWNWTv'
  let r = 100 + ''
  let n = '"Unit"'
  let i = .5 + ''
  // eztz.contract.send(contract, keys, amount, '(Left (Pair "test" 1))', fee, gasLimit, storageLimit)
  eztz.contract.send().then(function (res) {
    $('#balance').html(res)
  }).catch(function (e) {
    console.log(e)
  })*/
}

/*
vote address:
KT1A5oZVuRWrejXmLgr7bcsa4fGc1b3WLn5V
* */
