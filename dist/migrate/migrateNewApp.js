"use strict";

const service = require('../util/service');

const util = require('../util/util');

var clc = require("cli-color");

const createListApps = async (listAppIds, domain, username, password, domainPaste, usernamePaste, passwordPaste) => {
  try {
    listAppIds = [...new Set(listAppIds)];
    let listCreatedApp = {};

    for (let i = 0; i < listAppIds.length; i++) {
      listCreatedApp[listAppIds[i]] = await run(listAppIds[i], domain, username, password, domainPaste, usernamePaste, passwordPaste);
    }

    return listCreatedApp;
  } catch (error) {
    console.log(error);
  }
};

const run = async (appCopy, domain, username, password, domainPaste, usernamePaste, passwordPaste) => {
  const kintoneAppCopy = service.getKintoneAuth(domain, username, password);
  let kintoneAppPaste = null;

  if (domain == domainPaste) {
    kintoneAppPaste = kintoneAppCopy;
  } else if (domain != domainPaste) {
    kintoneAppPaste = service.getKintoneAuth(domainPaste, usernamePaste, passwordPaste);
  }

  try {
    const appInfor = await service.getInformationApp(appCopy, kintoneAppCopy);
    const newApp = await service.createNewApp(appInfor.name, kintoneAppPaste);
    await service.deployApp(newApp.app, newApp.revision, kintoneAppPaste);
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(clc.green(`Created new app id: ${newApp.app}!`));
    let fieldsCopy = await service.getAllFormFields(appCopy, kintoneAppCopy);
    let listAppIds = util.getAppIdsOfRelatedRecordLookup(fieldsCopy, appCopy);
    let listNewAppIds = await createListApps(listAppIds, domain, username, password, domainPaste, usernamePaste, passwordPaste);
    await new Promise(resolve => setTimeout(resolve, 5000));
    fieldsCopy = util.setFieldsCopyRelatedRecordLookup(fieldsCopy, listNewAppIds, appCopy, newApp.app);
    let fieldsPaste = await service.getAllFormFields(newApp.app, kintoneAppPaste);
    const updateFields = util.getAllSpecialCodeFieldsForUpdate(fieldsPaste, fieldsCopy);
    const updateSpecialFields = await service.updateSpecialFields(newApp.app, updateFields, kintoneAppPaste);
    await service.deployApp(newApp.app, updateSpecialFields.revision, kintoneAppPaste);
    await new Promise(resolve => setTimeout(resolve, 5000));
    const allFieldsForAdd = util.getAllFormFieldsForAdd(fieldsCopy, fieldsPaste);
    const resultAddFields = await service.addAllFormFields(newApp.app, allFieldsForAdd, kintoneAppPaste);
    await service.deployApp(newApp.app, resultAddFields.revision, kintoneAppPaste);
    await new Promise(resolve => setTimeout(resolve, 5000));
    const layouts = await service.getFormLayoutApp(appCopy, kintoneAppCopy);
    const updateLayout = await service.updateFormLayout(newApp.app, layouts, kintoneAppPaste);

    if (updateLayout.hasOwnProperty('revision')) {
      await service.deployApp(newApp.app, updateLayout.revision, kintoneAppPaste);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    let generalSettingsCopy = await service.getGeneralSettingsApp(appCopy, kintoneAppCopy);
    delete generalSettingsCopy['revision'];
    generalSettingsCopy = {
      app: newApp.app,
      ...generalSettingsCopy
    };
    const updateSettings = await service.updateGeneralSettingsApp(generalSettingsCopy, kintoneAppPaste);
    await service.deployApp(newApp.app, updateSettings.revision, kintoneAppPaste);
    await new Promise(resolve => setTimeout(resolve, 5000));
    let listViewsCopy = await service.getViewsApp(appCopy, kintoneAppCopy);
    let updateViews = await service.updateViewsApp(newApp.app, listViewsCopy, kintoneAppPaste);

    if (updateViews.hasOwnProperty('revision')) {
      service.deployApp(newApp.app, updateViews.revision, kintoneAppPaste).then(rsp => {
        console.log(clc.green(`Migrate views app id ${newApp.app} successfully!`));
      }).catch(err => {
        console.log(clc.red(`Deploy views app id ${newApp.app} fail!`));
      });
    } else {
      console.log(clc.red(`Migrate views app id ${newApp.app} fail!`));
    }

    return newApp.app;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  run
};