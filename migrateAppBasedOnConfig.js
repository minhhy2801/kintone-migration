const service = require('./service')
const config = require('./config')
const util = require('./util')
var clc = require("cli-color");

const kintoneAppCopy = service.getKintoneAuth(config.ORIGINAL.DOMAIN, config.ORIGINAL.USERNAME, config.ORIGINAL.PASSWORD)
const kintoneAppPaste = service.getKintoneAuth(config.MIGRATE.DOMAIN, config.MIGRATE.USERNAME, config.MIGRATE.PASSWORD)

const appCopy = config.ORIGINAL.APP_ID
const appPaste = config.MIGRATE.APP_ID

const run = async () => {
    try {
        let fieldsCopy = await service.getAllFormFields(appCopy, kintoneAppCopy);
        let fieldsPaste = await service.getAllFormFields(appPaste, kintoneAppPaste);

        const fieldsForAdd = util.getAllFormFieldsForAdd(fieldsCopy, fieldsPaste)
        const resultAddFields = await service.addAllFormFields(appPaste, fieldsForAdd, kintoneAppPaste)

        await service.deployApp(appPaste, resultAddFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 3000))
        console.log(clc.green('Add fields for config app!'));

        const updateFields = util.getAllSpecialCodeFieldsForUpdate(fieldsPaste, fieldsCopy)
        const updateSpecialFields = await service.updateSpecialFields(appPaste, updateFields, kintoneAppPaste)

        await service.deployApp(appPaste, updateSpecialFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 5000))
        console.log(clc.green('Update system fields for config app!'));

        const layouts = await service.getFormLayoutApp(appCopy, kintoneAppCopy)
        const updateLayout = await service.updateFormLayout(appPaste, layouts, kintoneAppPaste)
        console.log(clc.green('Add layout for config app!'));
        
        if (updateLayout.hasOwnProperty('revision')) {
            service.deployApp(appPaste, updateLayout.revision, kintoneAppPaste).then(rsp => {
                console.log(clc.green('Migrate Succesull'))
            }).catch(err => {
                console.log(clc.red('Deploy Fail!'))
            })
        } else {
            console.log(clc.red('Migrate Fail!'))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = { run }