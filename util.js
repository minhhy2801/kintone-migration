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

module.exports = {
    getAllSpecialCodeFieldsForUpdate,
    getAllFormFieldsForAdd,
    getAllSpecialCodeFieldsOfMigrate,
    getKeysDuplicated

}