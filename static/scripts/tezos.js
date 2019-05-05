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

function withdraw (keys, addr, dest, tz) {
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  let mtz = tz * 1000000
  eztz.contract.send(addr, account, keys, 0, '(Right (Right (Left (Pair "' + dest + '" ' + mtz + '))))', 100000, 400000, 60000)
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

function setRecipient (keys, addr, recipient) {
  // eztz.node.setDebugMode(true)
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  let account = keys.pkh
  // [{prim: "Right", args: [{prim: "Right", args: [{prim: "Left", args: [{prim: "Unit"}]}]}]}]
  eztz.contract.send(addr, account, keys, 0, '(Right (Right (Right (Right (Left "' + recipient + '")))))', 100000, 400000, 60000)
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
  eztz.contract.send(addr, account, keys, 0, '(Right (Right (Right (Right (Right "' + newOwner + '")))))', 100000, 400000, 60000)
    .then(function (res) {
      success(res)
    })
    .catch(function (e) {
      error(e)
    })
}

function watchContract(addr) {
  eztz.node.setProvider('https://alphanet-node.tzscan.io')
  
  eztz.contract.watch(addr, 2, function(s){
    console.log("New storage", s);
    // var candidateList = s.args[0];
    // for (var i=1; i<= candidateList.length; i++) {
    //   $("#candidate-" + i).html(candidateList[i-1].args[1].int);
    // }
    // $("#msg").html("");
  });
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

function deploy (keys) {
  eztz.rpc.originate(keys, 0, contract, 'Unit', false, false, false, 5000, 100000, 500).then(console.log);
}


let  contract =
  'parameter\n' +
  '  (or :_entries\n' +
  '     (pair %_Liq_entry_updateMaxDelay int string)\n' +
  '     (or (unit %_Liq_entry_ping)\n' +
  '         (or (pair %_Liq_entry_withdraw key_hash mutez)\n' +
  '             (or (unit %_Liq_entry_receiveProperty)\n' +
  '                 (or (key_hash %_Liq_entry_setReceiper) (address %_Liq_entry_changeOwner))))));\n' +
  'storage\n' +
  '  (pair :storage_\n' +
  '     (timestamp %last_ping)\n' +
  '     (pair (int %delay) (pair (address %owner) (key_hash %property_recipient))));\n' +
  'code { DUP ;\n' +
  '       DIP { CDR @storage_slash_1 } ;\n' +
  '       CAR @parameter_slash_2 ;\n' +
  '       LAMBDA @check_sender\n' +
  '         address\n' +
  '         unit\n' +
  '         { RENAME @owner_slash_3 ;\n' +
  '           SENDER ;\n' +
  '           DUUP @owner ;\n' +
  '           COMPARE ;\n' +
  '           NEQ ;\n' +
  '           IF { SENDER ; PUSH string "Not allowed operation for " ; PAIR ; FAILWITH }\n' +
  '              { UNIT } ;\n' +
  '           DIP { DROP } } ;\n' +
  '       DUUP @parameter ;\n' +
  '       IF_LEFT\n' +
  '         { RENAME @_delay_timeType_slash_5 ;\n' +
  '           DUUUUP @storage ;\n' +
  '           DUUP ;\n' +
  '           CAR @delay ;\n' +
  '           DUUUP ;\n' +
  '           CDR @timeType ;\n' +
  '           DUUUUUP @check_sender ;\n' +
  '           DUUUUP @storage ;\n' +
  '           CDDAR %owner ;\n' +
  '           EXEC ;\n' +
  '           DROP ;\n' +
  '           PUSH string "year" ;\n' +
  '           DUUP @timeType ;\n' +
  '           COMPARE ;\n' +
  '           EQ ;\n' +
  '           IF { DUUUP @storage ;\n' +
  '                DUP ;\n' +
  '                CAR %last_ping ;\n' +
  '                SWAP ;\n' +
  '                CDR ;\n' +
  '                CDR ;\n' +
  '                PUSH int 60 ;\n' +
  '                PUSH int 60 ;\n' +
  '                PUSH int 24 ;\n' +
  '                PUSH int 365 ;\n' +
  '                DUUUUUUUUP @delay ;\n' +
  '                MUL ;\n' +
  '                MUL ;\n' +
  '                MUL ;\n' +
  '                MUL ;\n' +
  '                PAIR %delay ;\n' +
  '                SWAP ;\n' +
  '                PAIR %last_ping ;\n' +
  '                NIL operation ;\n' +
  '                PAIR }\n' +
  '              { PUSH string "month" ;\n' +
  '                DUUP @timeType ;\n' +
  '                COMPARE ;\n' +
  '                EQ ;\n' +
  '                IF { DUUUP @storage ;\n' +
  '                     DUP ;\n' +
  '                     CAR %last_ping ;\n' +
  '                     SWAP ;\n' +
  '                     CDR ;\n' +
  '                     CDR ;\n' +
  '                     PUSH int 60 ;\n' +
  '                     PUSH int 60 ;\n' +
  '                     PUSH int 24 ;\n' +
  '                     PUSH int 30 ;\n' +
  '                     DUUUUUUUUP @delay ;\n' +
  '                     MUL ;\n' +
  '                     MUL ;\n' +
  '                     MUL ;\n' +
  '                     MUL ;\n' +
  '                     PAIR %delay ;\n' +
  '                     SWAP ;\n' +
  '                     PAIR %last_ping ;\n' +
  '                     NIL operation ;\n' +
  '                     PAIR }\n' +
  '                   { PUSH string "day" ;\n' +
  '                     DUUP @timeType ;\n' +
  '                     COMPARE ;\n' +
  '                     EQ ;\n' +
  '                     IF { DUUUP @storage ;\n' +
  '                          DUP ;\n' +
  '                          CAR %last_ping ;\n' +
  '                          SWAP ;\n' +
  '                          CDR ;\n' +
  '                          CDR ;\n' +
  '                          PUSH int 60 ;\n' +
  '                          PUSH int 60 ;\n' +
  '                          PUSH int 24 ;\n' +
  '                          DUUUUUUUP @delay ;\n' +
  '                          MUL ;\n' +
  '                          MUL ;\n' +
  '                          MUL ;\n' +
  '                          PAIR %delay ;\n' +
  '                          SWAP ;\n' +
  '                          PAIR %last_ping ;\n' +
  '                          NIL operation ;\n' +
  '                          PAIR }\n' +
  '                        { PUSH string "hour" ;\n' +
  '                          DUUP @timeType ;\n' +
  '                          COMPARE ;\n' +
  '                          EQ ;\n' +
  '                          IF { DUUUP @storage ;\n' +
  '                               DUP ;\n' +
  '                               CAR %last_ping ;\n' +
  '                               SWAP ;\n' +
  '                               CDR ;\n' +
  '                               CDR ;\n' +
  '                               PUSH int 60 ;\n' +
  '                               PUSH int 60 ;\n' +
  '                               DUUUUUUP @delay ;\n' +
  '                               MUL ;\n' +
  '                               MUL ;\n' +
  '                               PAIR %delay ;\n' +
  '                               SWAP ;\n' +
  '                               PAIR %last_ping ;\n' +
  '                               NIL operation ;\n' +
  '                               PAIR }\n' +
  '                             { PUSH string "minute" ;\n' +
  '                               DUUP @timeType ;\n' +
  '                               COMPARE ;\n' +
  '                               EQ ;\n' +
  '                               IF { DUUUP @storage ;\n' +
  '                                    DUP ;\n' +
  '                                    CAR %last_ping ;\n' +
  '                                    SWAP ;\n' +
  '                                    CDR ;\n' +
  '                                    CDR ;\n' +
  '                                    PUSH int 60 ;\n' +
  '                                    DUUUUUP @delay ;\n' +
  '                                    MUL ;\n' +
  '                                    PAIR %delay ;\n' +
  '                                    SWAP ;\n' +
  '                                    PAIR %last_ping ;\n' +
  '                                    NIL operation ;\n' +
  '                                    PAIR }\n' +
  '                                  { DUP @timeType ; PUSH string "Unsupported time type " ; PAIR ; FAILWITH } } } } } ;\n' +
  '           DIP { DROP ; DROP ; DROP ; DROP } }\n' +
  '         { IF_LEFT\n' +
  '             { RENAME @__slash_9 ;\n' +
  '               DUUUUP @storage ;\n' +
  '               DUUUP @check_sender ;\n' +
  '               DUUP @storage ;\n' +
  '               CDDAR %owner ;\n' +
  '               EXEC ;\n' +
  '               DROP ;\n' +
  '               DIP { DROP } ;\n' +
  '               CDR ;\n' +
  '               NOW ;\n' +
  '               PAIR %last_ping ;\n' +
  '               NIL operation ;\n' +
  '               PAIR }\n' +
  '             { IF_LEFT\n' +
  '                 { RENAME @_dest_amount_slash_11 ;\n' +
  '                   DUUUUP @storage ;\n' +
  '                   DUUUP @check_sender ;\n' +
  '                   DUUP @storage ;\n' +
  '                   CDDAR %owner ;\n' +
  '                   EXEC ;\n' +
  '                   DROP ;\n' +
  '                   DUUP ;\n' +
  '                   CAR @dest ;\n' +
  '                   IMPLICIT_ACCOUNT ;\n' +
  '                   DUUUP ;\n' +
  '                   DIIIP { DROP } ;\n' +
  '                   CDR @amount ;\n' +
  '                   UNIT ;\n' +
  '                   TRANSFER_TOKENS @transfer172 ;\n' +
  '                   SWAP ;\n' +
  '                   NIL operation ;\n' +
  '                   DUUUP ;\n' +
  '                   DIIIP { DROP } ;\n' +
  '                   CONS ;\n' +
  '                   PAIR }\n' +
  '                 { IF_LEFT\n' +
  '                     { RENAME @__slash_16 ;\n' +
  '                       DUUUUP @storage ;\n' +
  '                       DUUUP @check_sender ;\n' +
  '                       DUUP @storage ;\n' +
  '                       CDDDR %property_recipient ;\n' +
  '                       IMPLICIT_ACCOUNT ;\n' +
  '                       ADDRESS ;\n' +
  '                       EXEC ;\n' +
  '                       DROP ;\n' +
  '                       NOW ;\n' +
  '                       DUUP @storage ;\n' +
  '                       CDAR %delay ;\n' +
  '                       DUUUP @storage ;\n' +
  '                       CAR %last_ping ;\n' +
  '                       ADD ;\n' +
  '                       COMPARE ;\n' +
  '                       LT ;\n' +
  '                       IF { DUP @storage ;\n' +
  '                            CDDDR %property_recipient ;\n' +
  '                            IMPLICIT_ACCOUNT ;\n' +
  '                            BALANCE ;\n' +
  '                            UNIT ;\n' +
  '                            TRANSFER_TOKENS @transfer203 ;\n' +
  '                            DUUP @storage ;\n' +
  '                            NIL operation ;\n' +
  '                            DUUUP @transfer203 ;\n' +
  '                            DIIIP { DROP } ;\n' +
  '                            CONS ;\n' +
  '                            PAIR }\n' +
  '                          { NOW ; PUSH string "Too early " ; PAIR ; FAILWITH } ;\n' +
  '                       DIP { DROP ; DROP } }\n' +
  '                     { IF_LEFT\n' +
  '                         { RENAME @recipient_slash_19 ;\n' +
  '                           DUUUUP @storage ;\n' +
  '                           DUUUP @check_sender ;\n' +
  '                           DUUP @storage ;\n' +
  '                           CDDAR %owner ;\n' +
  '                           EXEC ;\n' +
  '                           DROP ;\n' +
  '                           SWAP ;\n' +
  '                           DUUP ;\n' +
  '                           CDDAR %owner ;\n' +
  '                           PAIR %owner %property_recipient ;\n' +
  '                           DUUP ;\n' +
  '                           CDAR %delay ;\n' +
  '                           PAIR %delay ;\n' +
  '                           SWAP ;\n' +
  '                           CAR %last_ping ;\n' +
  '                           PAIR %last_ping ;\n' +
  '                           NIL operation ;\n' +
  '                           PAIR }\n' +
  '                         { RENAME @new_owner_slash_21 ;\n' +
  '                           DUUUUP @storage ;\n' +
  '                           DUUUP @check_sender ;\n' +
  '                           DUUP @storage ;\n' +
  '                           CDDAR %owner ;\n' +
  '                           EXEC ;\n' +
  '                           DROP ;\n' +
  '                           DUP @storage ;\n' +
  '                           CDDDR %property_recipient ;\n' +
  '                           DUUUP @new_owner ;\n' +
  '                           DIIIP { DROP } ;\n' +
  '                           PAIR %owner %property_recipient ;\n' +
  '                           DUUP ;\n' +
  '                           CDAR %delay ;\n' +
  '                           PAIR %delay ;\n' +
  '                           SWAP ;\n' +
  '                           CAR %last_ping ;\n' +
  '                           PAIR %last_ping ;\n' +
  '                           NIL operation ;\n' +
  '                           PAIR } } } } } ;\n' +
  '       DIP { DROP ; DROP ; DROP } };\n'
