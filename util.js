const config = require('./config')

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

const getAppIdsOfRelatedRecordLookup = (fieldsCopy, appCopy) => {
    let listAppIds = []
    for (const key in fieldsCopy) {
        if (fieldsCopy.hasOwnProperty(key)) {
            let element = fieldsCopy[key];
            if (element.type == 'REFERENCE_TABLE') {
                if (element.referenceTable.relatedApp.app != appCopy)
                    listAppIds.push(element.referenceTable.relatedApp.app)
            }
            else if (element.hasOwnProperty('lookup')) {
                if (element.lookup.relatedApp.app != appCopy)
                    listAppIds.push(element.lookup.relatedApp.app)
            }
        }
    }
    return listAppIds;
}

const setFieldsCopyRelatedRecordLookup = (fieldsCopy, listNewAppIds, appCopy, appPaste) => {
    for (const key in fieldsCopy) {
        if (fieldsCopy.hasOwnProperty(key)) {
            let element = fieldsCopy[key];
            if (element.type == 'REFERENCE_TABLE') {
                let appId = element.referenceTable.relatedApp.app
                if (appId != appCopy && listNewAppIds.hasOwnProperty(appId)) {
                    fieldsCopy[key].referenceTable.relatedApp.app = listNewAppIds[appId]
                } else {
                    fieldsCopy[key].referenceTable.relatedApp.app = appPaste
                }
            } else if (element.hasOwnProperty('lookup')) {
                let appId = element.lookup.relatedApp.app
                if (appId != appCopy && listNewAppIds.hasOwnProperty(appId)) {
                    fieldsCopy[key].lookup.relatedApp.app = listNewAppIds[appId]
                } else {
                    fieldsCopy[key].lookup.relatedApp.app = appPaste
                }
            }
        }
    }
    return fieldsCopy
}
module.exports = {
    getAllSpecialCodeFieldsForUpdate,
    getAllFormFieldsForAdd,
    getAllSpecialCodeFieldsOfMigrate,
    getKeysDuplicated,
    getAppIdsOfRelatedRecordLookup,
    setFieldsCopyRelatedRecordLookup
}