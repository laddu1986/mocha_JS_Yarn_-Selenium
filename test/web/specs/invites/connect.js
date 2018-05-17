var mysql = require('mysql')
//let inviteToken

var con = mysql.createConnection({
  host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  user: 'rouser',
  password: 'R34d0nlyK3y',
  database: 'organization_dev'
});

// var inviteToken = con.query({ sql: "SELECT id from Invites WHERE email = 'someone@email.com';" },
//   function (err, result) {
//     if (err) throw err;
//     console.log('INVITE TOKEN 1 ' + result[0].id)
//     return result[0].id
//     done()

//   })

function exportInviteToken() {
  //console.log('INVITE TOKEN 2 ' + JSON.parse(inviteToken))
  con.query({ sql: "SELECT id from Invites WHERE email = 'someone@email.com';" },
    function (err, result) {
      if (err) throw err;
      console.log('INVITE TOKEN 1 ' + result[0].id)
      return result[0].id
    })
}


con.end()


console.log('INVITE TOKEN 2 ' + exportInviteToken)


//export { exportInviteToken }
