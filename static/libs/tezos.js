// main tz1QLLbmqmrnfy7pBSzLCsY4RGSoB7t7Y72q
// let mnem = 'course casual original captain luggage husband knock october balance learn floor phone wheat bike snake'
// let keys = eztz.crypto.generateKeys(mnem, 'iyuxlmea.qitsymvq@tezos.example.orgd0fe1QkS4V')
// let keys = eztz.crypto.extractKeys('edsk3DNDUhzxh9vVZV4PN8KTTP9uLYRVqYedSDr12DuJmaS63cu7DV')

// recp tz1YWtADpgGehcTFqxMapiJcfLgzzL79aDJQ
// let mnem = 'cruise pill rhythm enter remain flat sense traffic goat paper blossom super disagree mother speed'
// let keys = eztz.crypto.generateKeys(mnem, 'gugmtvax.nuekgxlw@tezos.example.orgaEVLOPaRD3')
// let keys = eztz.crypto.extractKeys('edsk4UAnyu14JfR4n7yW3aqr1mAEpWAn6WXiyaAFJnvCP1tCR1ibbA')

// let addr = 'KT1REci1iEvCLJYYigY3TupRvBugRmdWNWTv'
// let addr = 'KT1TpKkwKzGwMrWrGnPp9KixhraD2dtE5wE5'

function balance (keys) {
  eztz.node.setProvider('http://alphanet-node.tzscan.io')
  let account = keys.pkh
  $('#account').html(account)
  eztz.rpc.getBalance(account).then(function (res) {
    $('#balance').html(res / 1000000)
  }).catch(function (e) {
    console.log(e)
  })
}

function pingContract (keys, addr) {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  eztz.contract.send(addr, account, keys, 0, '(Right (Left Unit))', 100000, 400000, 60000)
    .then(function (res) {
      success(res)
    })
    .catch(function (e) {
      error(e)
    })
}

function updateDelay (keys, addr, delay, timeType) {
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  // [{prim: "Left", args: [{prim: "Pair", args: [{int: "2"}, {string: "hour"}]}]}]
  eztz.contract.send(addr, account, keys, 0, '(Left (Pair ' + delay + ' "' + timeType + '"))', 100000, 400000, 60000)
    .then(function (res) {
      success(res)
    })
    .catch(function (e) {
      error(e)
    })
}

function receiveProperty (keys, addr) {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  // [{prim: "Right", args: [{prim: "Right", args: [{prim: "Left", args: [{prim: "Unit"}]}]}]}]
  eztz.contract.send(addr, account, keys, 0, '(Right (Right (Right (Left Unit))))', 100000, 400000, 60000)
    .then(function (res) {
      success(res)
    })
    .catch(function (e) {
      error(e)
    })
}

function changeOwner (keys, addr, newOwner) {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  // [{prim: "Right", args: [{prim: "Right", args: [{prim: "Left", args: [{prim: "Unit"}]}]}]}]
  eztz.contract.send(addr, account, keys, 0, '(Right (Right (Right (Right (Right \"' + newOwner + '\")))))', 100000, 400000, 60000)
    .then(function (res) {
      success(res)
    })
    .catch(function (e) {
      error(e)
    })
}

function success (res) {
  try {
    console.log(res)
    let message = res.hash
    $('#alerts').append('' +
      '<div class="alert alert-success" id="success-notification">' +
      '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
      '    <strong>Success!</strong>  Transaction: ' + message +
      '</div>')
  } catch {
    $('#alerts').append('' +
      '<div class="alert alert-info" id="error-notification">\n' +
      '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
      '    <strong>Info!</strong>  Can\'t find sended transaction.' +
      '</div>')
  }
}

function error (e) {
  console.log(e)
  try {
    let message = e.errors[1].with.args[0].string
    console.log(e)
    $('#alerts').append('' +
      '<div class="alert alert-warning" id="warning-notification">' +
      '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
      '    <strong>Warning!</strong>' + '  ' + message +
      '</div>')
  } catch {
    $('#alerts').append('' +
      '<div class="alert alert-danger" id="error-notification">\n' +
      '    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>\n' +
      '    <strong>Error!</strong>  Can\'t send transaction.' +
      '</div>')
  }
}

function getKeysByPhrase (mnem, pass) {
  return eztz.crypto.generateKeys(mnem, pass)
}

function getKeysByKey (pKey) {
  return eztz.crypto.extractKeys(pKey)
}
