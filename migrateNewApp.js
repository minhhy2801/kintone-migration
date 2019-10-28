const service = require('./service')
const util = require('./util')
var clc = require("cli-color");

const run = async (appCopy, domain, username, password, flag, domainPaste, usernamePaste, passwordPaste) => {
    const kintoneAppCopy = service.getKintoneAuth(domain, username, password)
    let kintoneAppPaste = null
    if (flag == 'nasd') {
        kintoneAppPaste = kintoneAppCopy
    }
    else if (flag == 'nadd') {
        kintoneAppPaste = service.getKintoneAuth(domainPaste, usernamePaste, passwordPaste)
    }
    try {
        console.log(domain, username, password, flag, appCopy);

        const appInfor = await service.getInformationApp(appCopy, kintoneAppCopy);
        const newApp = await service.createNewApp(appInfor.name, kintoneAppPaste);
        await service.deployApp(newApp.app, newApp.revision, kintoneAppPaste);
        await new Promise(resolve => setTimeout(resolve, 3000))

        let fieldsCopy = await service.getAllFormFields(appCopy, kintoneAppCopy);
        let fieldsPaste = await service.getAllFormFields(newApp.app, kintoneAppPaste);

        const allFieldsForAdd = util.getAllFormFieldsForAdd(fieldsCopy, fieldsPaste)
        const resultAddFields = await service.addAllFormFields(newApp.app, allFieldsForAdd, kintoneAppPaste)
        await service.deployApp(newApp.app, resultAddFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 5000))

        const updateFields = util.getAllSpecialCodeFieldsForUpdate(fieldsPaste, fieldsCopy)
        const updateSpecialFields = await service.updateSpecialFields(newApp.app, updateFields, kintoneAppPaste)

        await service.deployApp(newApp.app, updateSpecialFields.revision, kintoneAppPaste)
        await new Promise(resolve => setTimeout(resolve, 5000))

        const layouts = await service.getFormLayoutApp(appCopy, kintoneAppCopy)
        const updateLayout = await service.updateFormLayout(newApp.app, layouts, kintoneAppPaste)

        if (updateLayout.hasOwnProperty('revision')) {
            service.deployApp(newApp.app, updateLayout.revision, kintoneAppPaste).then(rsp => {
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