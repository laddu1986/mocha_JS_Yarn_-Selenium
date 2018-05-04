import OrgDashboardPage from '../page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from '../actions/actions'
import * as lib from '../../common';
import SpaceDashboardPage from '../page_objects/spaceDashboardPage';
import { AssertionError } from 'assert';

function inviteTeammate(inviteMail) {
  click(OrgDashboardPage.inviteTeammateButton)
  setValue(OrgDashboardPage.inviteEmailInput, inviteMail)
  click(OrgDashboardPage.sendInviteButton)
  //waitForElement(OrgDashboardPage.pendingInviteCircle)
}

export { inviteTeammate }
