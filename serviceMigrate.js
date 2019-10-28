const service = require('service.js')
// const kintoneRecord = new kintone.Record({ connection: kintoneConnection })

const kintoneApp = service.getKintoneAuth();
const getAllFormFields = (appId) => {
    return kintoneApp.getFormFields({ app: appId }).then(rsp => {
        return rsp.properties
    }).catch(err => {
        return err
    })
}

const addAllFormFields = (app, fields) => {
    return kintoneApp.addFormFields({ app, fields }).then(rsp => {
        return rsp
    }).catch(err => {
        return err
    })
}
const updateSpecialFields = (app, fields) => {
    return kintoneApp.updateFormFields({ app, fields }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err;
    });
}
const deployApp = (app, revision) => {
    const apps = [{ app, revision }];
    const revert = false;
    return kintoneApp.deployAppSettings({ apps, revert }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err
    });
}

const createNewApp = (name) => {
    return kintoneApp.addPreviewApp({ name }).then((rsp) => {
        return rsp
    }).catch((err) => {
        return err;
    });
}

const updateFormLayout = (app, layout) => {
    return kintoneApp.updateFormLayout({ app, layout }).then((rsp) => {
        return rsp
    }).catch((err) => {
        return err;
    });
}

const getDeployStatus = (app) => {
    const apps = [app];
    return kintoneApp.getAppDeployStatus({ apps }).then((rsp) => {
        return rsp.apps;
    }).catch((err) => {
        return err
    });
}
module.exports = {
    getAllFormFields,
    addAllFormFields,
    updateSpecialFields,
    deployApp,
    createNewApp,
    updateFormLayout,
    getDeployStatus
}
