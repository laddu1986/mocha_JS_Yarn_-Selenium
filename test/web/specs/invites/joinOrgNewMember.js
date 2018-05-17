import * as lib from '../../../common';
import { createAccount } from 'web/actions/createAccount';
import { createOrg } from 'web/actions/createOrg'
import { sendInviteButtonEnabled, sendInvite, verifyInviteCount, clickInviteTeammateButton, goToTeammatesPage, verifyInvite, goToOrganisationDashboard, inviteTeammate, invitationLink } from 'web/actions/inviteTeammate';
import SignInPage from 'web/page_objects/signInPage'
import { signOut } from 'web/actions/common'

var mysql = require('mysql');
let newMember;
//let con;
var values;


describe('Join an Organization via invitation email (Existing Account)', () => {


  // before((done) => {
  //   // SignInPage.open();
  //   // createAccount()
  //   // console.log(lib.testData.email + `\n` + lib.testData.password + `\n` + lib.testData.organization)

  //   // con = mysql.createConnection({
  //   //   host: 'dev-nextdb.cdiceoz5vyus.ap-southeast-2.rds.amazonaws.com',
  //   //   user: 'rouser',
  //   //   password: 'R34d0nlyK3y',
  //   //   database: 'organization_dev'
  //   // });
  //   // // con.connect()
  //   // // console.log(con)


  //   // values = con.query({
  //   //   sql: "SELECT id from Invites WHERE email = 'someone@email.com';"
  //   // })
  //   // done()


  // });





  // it('Invite a Non Existing member', () => {
  //   /*  newMember = `newfish_${lib.testData.email}`;
  //    inviteTeammate(newMember, '1') */
  // });

  // it('Sign Out', () => {
  //   // signOut()
  // });


  it('New Member clicks on the Invite link', () => {
    invitationLink()
  })


});

