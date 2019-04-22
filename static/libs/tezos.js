function loadData() {
  
  eztz.node.setProvider("http://alphanet-node.tzscan.io");
  var mnem = "mnemonic phrase";
  var keys = eztz.crypto.generateKeys(mnem, "emailpassword");
  
  let account = keys.pkh;
  $("#account").html(account);
  
  eztz.rpc.getBalance(account).then(function(res){
    $("#balance").html(res);
  }).catch(function(e){
    console.log(e);
  });
}
