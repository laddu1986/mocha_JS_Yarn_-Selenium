import * as lib from '../../common';
import OrgDashboardPage from 'web/page_objects/orgDashboardPage'
import { setValue, click, waitForEnabled, waitForElement } from 'web/actions/actions'
import SpaceDashboardPage from 'web/page_objects/spaceDashboardPage';
import { AssertionError } from 'assert';

function inviteTeammate(inviteMail) {
  click(OrgDashboardPage.inviteTeammateButton)
  setValue(OrgDashboardPage.inviteEmailInput, inviteMail)
  click(OrgDashboardPage.sendInviteButton)
  //waitForElement(OrgDashboardPage.pendingInviteCircle)
}

export { inviteTeammate }
