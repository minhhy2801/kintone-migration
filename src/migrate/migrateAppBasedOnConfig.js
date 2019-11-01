const service = require('../util/service')
const config = require('../util/config')
const util = require('../util/util')
const migrateNewApp = require('./migrateNewApp')
const clc = require("cli-color");

const kintoneAppCopy = service.getKintoneAuth(config.TARGET.DOMAIN, config.TARGET.USERNAME, config.TARGET.PASSWORD)
const kintoneAppPaste = service.getKintoneAuth(config.MIGRATE.DOMAIN, config.MIGRATE.USERNAME, config.MIGRATE.PASSWORD)

const appCopy = config.TARGET.APP_ID
const appPaste = config.MIGRATE.APP_ID

const createListApps = async (listAppIds) => {
    try {
        listAppIds = [...new Set(listAppIds)]
        let listCreatedApp = {}
        for (let i = 0; i < listAppIds.length; i++) {
            listCreatedApp[listAppIds[i]] = await migrateNewApp.run(listAppIds[i],
                config.TARGET.DOMAIN, config.TARGET.USERNAME, config.TARGET.PASSWORD,
                config.MIGRATE.DOMAIN, config.MIGRATE.USERNAME, config.MIGRATE.PASSWORD)
        }
        return listCreatedApp
    } catch (error) {
        console.log(error);
    }
}

const run = async () => {
    try {
        let fieldsCopy = await service.getAllFormFields(appCopy, kintoneAppCopy);
        let listAppIds = util.getAppIdsOfRelatedRecordLookup(fieldsCopy, appCopy)
        let listNewAppIds = await createListApps(listAppIds)
        await new Promise(resolve => setTimeout(resolve, 3000))
        fieldsCopy = util.setFieldsCopyRelatedRecordLookup(fieldsCopy, listNewAppIds, appCopy, appPaste)

        let fieldsPaste = await service.getAllFormFields(appPaste, kintoneAppPaste);
        const updateFields = util.getAllSpecialCodeFieldsForUpdate(fieldsPaste, fieldsCopy)
        const updateSpecialFields = await service.updateSpecialFields(appPaste, updateFields, kintoneAppPaste)

        await service.deployApp(appPaste, updateSpecialFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 5000))

        const fieldsForAdd = util.getAllFormFieldsForAdd(fieldsCopy, fieldsPaste)
        const resultAddFields = await service.addAllFormFields(appPaste, fieldsForAdd, kintoneAppPaste)

        await service.deployApp(appPaste, resultAddFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 3000))

        const layouts = await service.getFormLayoutApp(appCopy, kintoneAppCopy)
        const updateLayout = await service.updateFormLayout(appPaste, layouts, kintoneAppPaste)

        if (updateLayout.hasOwnProperty('revision')) {
            service.deployApp(appPaste, updateLayout.revision, kintoneAppPaste).then(rsp => {
                console.log(clc.green(`Migrate app id ${appPaste} successfully!`))
            }).catch(err => {
                console.log(clc.red(`Deploy app id ${appPaste} fail!`))
            })
        } else {
            console.log(clc.red(`Migrate app id ${appPaste} fail!`))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { run }