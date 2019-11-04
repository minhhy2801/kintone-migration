const kintone = require('@kintone/kintone-js-sdk')

const getKintoneAuth = (domain, username, password) => {
    let auth = new kintone.Auth()
    auth.setPasswordAuth({ username, password })
    const connection = new kintone.Connection({ domain, auth })
    const kintoneApp = new kintone.App({ connection })
    return kintoneApp;
}

const getAllFormFields = (appId, kintoneApp) => {
    return kintoneApp.getFormFields({ app: appId }).then(rsp => {
        return rsp.properties
    }).catch(err => {
        return err
    })
}

const addAllFormFields = (app, fields, kintoneApp) => {
    return kintoneApp.addFormFields({ app, fields }).then(rsp => {
        return rsp
    }).catch(err => {
        return err
    })
}
const updateSpecialFields = (app, fields, kintoneApp) => {
    return kintoneApp.updateFormFields({ app, fields }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err;
    });
}
const deployApp = (app, revision, kintoneApp) => {
    const apps = [{ app, revision }];
    const revert = false;
    return kintoneApp.deployAppSettings({ apps, revert }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err
    });
}

const createNewApp = (name, kintoneApp) => {
    return kintoneApp.addPreviewApp({ name }).then((rsp) => {
        return rsp
    }).catch((err) => {
        return err;
    });
}

const getDeployStatus = (apps, kintoneApp) => {
    return kintoneApp.getAppDeployStatus({ apps }).then((rsp) => {
        return rsp.apps;
    }).catch((err) => {
        return err
    });
}

const getInformationApp = (id, kintoneApp) => {
    return kintoneApp.getApp({ id }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err
    });
}

const updateFormLayout = (app, layout, kintoneApp) => {
    return kintoneApp.updateFormLayout({ app, layout }).then((rsp) => {
        return rsp
    }).catch((err) => {
        return err;
    });
}

const getFormLayoutApp = (app, kintoneApp) => {
    return kintoneApp.getFormLayout({ app }).then((rsp) => {
        return rsp.layout;
    }).catch((err) => {
        return err;
    });
}

const getViewsApp = (app, kintoneApp) => {
    return kintoneApp.getViews({ app }).then((rsp) => {
        return rsp.views;
    }).catch((err) => {
        return err;
    });
}

const updateViewsApp = (app, views, kintoneApp) => {
    return kintoneApp.updateViews({ app, views }).then((rsp) => {
        return rsp
    }).catch((err) => {
        return err;
    });
}

const getGeneralSettingsApp = (app, kintoneApp) => {
    return kintoneApp.getGeneralSettings({ app }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err;
    });
}

const updateGeneralSettingsApp = (params, kintoneApp) => {
    return kintoneApp.updateGeneralSettings(params).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err;
    });
}

module.exports = {
    getKintoneAuth,
    getFormLayoutApp,
    updateFormLayout,
    getInformationApp,
    getDeployStatus,
    createNewApp,
    deployApp,
    updateSpecialFields,
    addAllFormFields,
    getAllFormFields,
    getViewsApp,
    updateViewsApp,
    getGeneralSettingsApp,
    updateGeneralSettingsApp
}