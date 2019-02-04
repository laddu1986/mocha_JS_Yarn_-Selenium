import * as lib from '../../common';
import accountPage from 'page_objects/accountPage';
import { createAccount } from 'actions/account';
import { createSpace } from 'actions/space';
import { goToExperiencePage } from 'actions/navBar';
import * as constants from 'constants.json';
import {
    clickCreateTemplate,
    createExperienceTemplate,
    goToTemplateTab,
    deleteProperty,
    addProperty
} from 'actions/experienceTemplates.js';
var experienceTemplateName = `${lib.randomString.generate({ length: 7, charset: 'alphabetic' })}`,
    textProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
    integerProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`,
    boolProperty = `${lib.randomString.generate({ length: 5, charset: 'alphabetic' })}`;

describe(`Experience Template all attribute Tests`, () => {
    before(() => {
        accountPage.open();
        createAccount();
        createSpace();
        goToExperiencePage();
        goToTemplateTab();
        clickCreateTemplate();
        createExperienceTemplate(experienceTemplateName);
        addProperty(constants.TemplateProperties.Types.text, textProperty);
    });

    it('Verify text property attributes', () => {


    });
    it('Verify integer property attributes', () => {


    });
    it('Verify boolean property attributes', () => {


    });
});