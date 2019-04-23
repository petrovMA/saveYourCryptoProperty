function loadData () {
  eztz.node.setProvider('http://alphanet-node.tzscan.io')
  let mnem = 'mnemonic phrase'
  let keys = eztz.crypto.generateKeys(mnem, 'emailpassword')
  let account = keys.pkh
  $('#account').html(account)
  eztz.rpc.getBalance(account).then(function (res) {
    $('#balance').html(res)
  }).catch(function (e) {
    console.log(e)
  })
}
