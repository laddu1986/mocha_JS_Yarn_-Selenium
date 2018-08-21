import * as lib from '../../../common';
import accountPage from 'web/page_objects/accountPage'
import { createAccount } from 'web/actions/account'
import { createSpace, goToDeveloperPortal, defaultAPIKey } from 'web/actions/space'
import { addUsers } from 'web/actions/metrics'
import { clickOnAudienceLink } from 'web/actions/navBar'
import { clickOnUsersTab, inputLabelDetails, verifyAddedLabels, clickAddLabelButton, addLabels, deleteLabels, verifyLabelDeleted, clickUserRowNo, labelErrMsg, labelSuggestions, verifyLabelCount, clickLabelCount, selectLabelFromSuggestions } from 'web/actions/users'
var apiKey

describe('User Labels Test', () => {
  before('Setup', () => {
    accountPage.open()
    createAccount()
    createSpace()
    goToDeveloperPortal()
    apiKey = defaultAPIKey()
  })

  before(async () => {
    await addUsers(6, apiKey)
  })

  describe('Tests Label error messages', () => {
    it('Display error message when Invalid character in entered', () => {
      gotoUsersTab()
      clickUserRowNo(1)
      clickAddLabelButton()
      const specialChar = (`!@#$%^&*()+{}|?<>~[]=÷"`).split('')[(Math.floor(Math.random() * 23))]
      inputLabelDetails([specialChar])
      expect(labelErrMsg()).to.equal(true, `Err msg is Not Visible when invalid char - '${specialChar}' is typed in Label input`)
    })

    it('Display error message when less than 2 characters is entered', () => {
      gotoUsersTab()
      clickUserRowNo(1)
      clickAddLabelButton()
      inputLabelDetails(['a'])
      expect(labelErrMsg()).to.equal(true, `Err msg is Not Visible when single char 'a' is typed in Label input`)
    })

    it('Display error message when duplicate label is entered', () => {
      gotoUsersTab()
      clickUserRowNo(1)
      clickAddLabelButton()
      inputLabelDetails(['testing duplicate label addition'])
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved')
      inputLabelDetails(['testing duplicate label addition'])
      expect(labelErrMsg()).to.equal(true, 'Err msg is Not Visible when duplicate label is typed in Label input')
    })

    it('Verify trimming of Leading and Trailing spaces in label names while Saving ', () => {
      gotoUsersTab()
      clickUserRowNo(2)
      clickAddLabelButton()
      inputLabelDetails(['    firstLabel   '])
      expect(verifyAddedLabels()).to.equal(true)
    })
  })

  describe('Test Add and Delete a Label', () => {
    it('Click on a user row to open side Panel', () => {
      gotoUsersTab()
      clickUserRowNo(3)
    })

    it('Enter a label and verify it gets Saved', () => {
      clickAddLabelButton()
      inputLabelDetails(['testLabel123'])
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved')
    })

    it('Delete the added Label', () => {
      deleteLabels(['testLabel123'])
      expect(verifyLabelDeleted()).to.equal(true, 'Label was not Deleted')
    })
  })

  describe('Test with Multiple Labels and Sorting', () => {
    it('Add multiple labels -> verify they are sorted alphabetically', () => {
      gotoUsersTab()
      clickUserRowNo(4);
      var labelCount = Math.floor((Math.random() * 10) + 4)
      addLabels(labelCount)
      expect(verifyAddedLabels()).to.equal(true, 'Labels were not Added/Saved')
    })


    it('Verify user row label count and clicking it re-directs to label details section', () => {
      gotoUsersTab()
      expect(verifyLabelCount()).to.equal(true, 'Label count incorrect in User row')
      clickLabelCount();
    })

    it('Delete labels and verify all labels are deleted', () => {
      deleteLabels()
      expect(verifyLabelDeleted()).to.equal(true, 'Labels were not Deleted')
    }, 2)
  })

  describe('Test Label suggestions', () => {
    it('Add labels to a user', () => {
      gotoUsersTab()
      clickUserRowNo(5)
      clickAddLabelButton()
      inputLabelDetails(['dropdown', 'dropbox', 'dropkick', 'drop the beat'])
    })

    it('Verify added labels appears in suggestions for other users', () => {
      gotoUsersTab()
      clickUserRowNo(6)
      clickAddLabelButton()
      expect(labelSuggestions('dr')).to.equal(true)
    })

    it('Select a label from suggestions and verify it is Saved', () => {
      selectLabelFromSuggestions('dropkick')
      expect(verifyAddedLabels()).to.equal(true, 'Label was not Added/Saved')
    })
  })
})

function gotoUsersTab() {
  clickOnAudienceLink()
  clickOnUsersTab()
}