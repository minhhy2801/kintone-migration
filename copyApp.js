const serviceMigrate = require('./serviceMigrate')
const serviceOrginal = require('./serviceOrginal')
const config = require('./config')


// const newApp = async (appCopy) => {
//     try {
//         let appInfor = await serviceOrginal.getInformationOfApp(appCopy);
//         let newApp = await serviceMigrate.createNewApp(appInfor.name);
//         await serviceMigrate.deployApp(newApp.app, newApp.revision);
//         return newApp;
//     } catch (error) {
//         console.log(error);
//     }
// }

const copyFields = async (appCopy, appPaste) => {
    try {
        // let appInfor = await serviceOrginal.getInformationOfApp(appCopy);
        // let newApp = await serviceMigrate.createNewApp(appInfor.name);
        // await serviceMigrate.deployApp(newApp.app, newApp.revision);
        // await new Promise(resolve => setTimeout(resolve, 3000))

        // let allFormFieldsOrginal = await serviceOrginal.getAllFormFields(appCopy);
        // let allFormFieldsMigrate = await serviceMigrate.getAllFormFields(94);

        //         await serviceMigrate.deployApp(94, updateSpecialFields.revision);
        //         await new Promise(resolve => setTimeout(resolve, 3000))

        // const allFieldsForAdd = getAllFormFieldsForAdd(allFormFieldsOrginal, allFormFieldsMigrate);
        // const addAllFields = await serviceMigrate.addAllFormFields(94, allFieldsForAdd);

        // const allFieldsForUpdate = getAllFormFieldsForUpdate(allFormFieldsOrginal, allFormFieldsMigrate);
        // const updateFields = getAllSpecialCodeFieldsForUpdate(allFormFieldsMigrate, allFieldsForUpdate)
        // const updateSpecialFields = await serviceMigrate.updateSpecialFields(94, updateFields);

        // console.log(12221, updateFields);

        // console.log(1111, updateSpecialFields);

        // await serviceMigrate.deployApp(94, addAllFields.revision);

        // console.log(addAllFields.error.errorResponse.errors);

        // let layouts = await serviceOrginal.getFormLayoutOfApp(appCopy);

        // let updateLayout = await serviceMigrate.updateFormLayout(appPaste, layouts)

        // await serviceMigrate.deployApp(appPaste, updateLayout.revision);

    } catch (error) {
        console.log(error);
    }
}

const getKeysDuplicated = (allFormFieldsOrginal, allFormFieldsMigrate) => {
    const keysFieldsOrginal = Object.keys(allFormFieldsOrginal);
    const keysFieldsMigrate = Object.keys(allFormFieldsMigrate);
    return keysFieldsOrginal.filter(val => keysFieldsMigrate.includes(val));
}

const getAllFormFieldsForAdd = (allFormFieldsOrginal, allFormFieldsMigrate) => {
    const keysDuplicated = getKeysDuplicated(allFormFieldsOrginal, allFormFieldsMigrate)
    const listKeysRemove = [...keysDuplicated, ...config.EXCEPT_FIELDS]
    let tmpFields = { ...allFormFieldsOrginal }
    listKeysRemove.forEach(removeKey => {
        delete tmpFields[removeKey]
    });
    for (const key in tmpFields) {
        if (tmpFields.hasOwnProperty(key)) {
            const element = tmpFields[key];
            if (config.EXCEPT_FIELDS.includes(element['type'])) {
                delete tmpFields[element['code']]
            }
        }
    }
    return tmpFields;
}

const getAllSpecialCodeFieldsOfMigrate = (allFormFieldsMigrate) => {
    let results = {}
    for (const key in allFormFieldsMigrate) {
        if (allFormFieldsMigrate.hasOwnProperty(key)) {
            const element = allFormFieldsMigrate[key];
            if (config.EXCEPT_FIELDS.includes(element['type'])) {
                results[element['type']] = element['code']
            }
        }
    }
    return results;
}

const getAllSpecialCodeFieldsForUpdate = (allFormFieldsMigrate, allFieldsForUpdate) => {
    let codeFields = getAllSpecialCodeFieldsOfMigrate(allFormFieldsMigrate)
    let updateFields = {}

    for (const key in allFieldsForUpdate) {
        if (allFieldsForUpdate.hasOwnProperty(key)) {
            const element = allFieldsForUpdate[key];
            if (config.EXCEPT_FIELDS.includes(element['type'])) {
                let code = codeFields[element['type']];
                updateFields[code] = element
            }
        }
    }
    return updateFields
}


const testDeployNewApp = async (appCopy) => {
    try {
        let appInfor = await serviceOrginal.getInformationOfApp(appCopy);
        let newApp = await serviceMigrate.createNewApp(appInfor.name);
        await serviceMigrate.deployApp(newApp.app, newApp.revision);
        await new Promise(resolve => setTimeout(resolve, 3000))

        let allFormFieldsOrginal = await serviceOrginal.getAllFormFields(appCopy);
        let allFormFieldsMigrate = await serviceMigrate.getAllFormFields(newApp.app);

        const allFieldsForAdd = getAllFormFieldsForAdd(allFormFieldsOrginal, allFormFieldsMigrate)
        const addAllFields = await serviceMigrate.addAllFormFields(newApp.app, allFieldsForAdd)
        await serviceMigrate.deployApp(newApp.app, addAllFields.revision)
        await new Promise(resolve => setTimeout(resolve, 5000))

        const updateFields = getAllSpecialCodeFieldsForUpdate(allFormFieldsMigrate, allFormFieldsOrginal)
        const updateSpecialFields = await serviceMigrate.updateSpecialFields(newApp.app, updateFields)

        await serviceMigrate.deployApp(newApp.app, updateSpecialFields.revision)
        await new Promise(resolve => setTimeout(resolve, 5000))

        const layouts = await serviceOrginal.getFormLayoutOfApp(appCopy)
        const updateLayout = await serviceMigrate.updateFormLayout(newApp.app, layouts)
        let result = await serviceMigrate.deployApp(newApp.app, updateLayout.revision)
        console.log(updateLayout);
        
    } catch (error) {
        console.log(error);
    }
}

// testDeployNewApp(98)
console.log('111');

