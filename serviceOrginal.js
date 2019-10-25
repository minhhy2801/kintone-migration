const kintone = require('@kintone/kintone-js-sdk')
const config = require('./config')

let kintoneAuth = new kintone.Auth()

kintoneAuth.setPasswordAuth({ username: config.ORIGINAL.USERNAME, password: config.ORIGINAL.PASSWORD })
const kintoneConnection = new kintone.Connection({
    domain: config.ORIGINAL.DOMAIN,
    auth: kintoneAuth
})

const kintoneApp = new kintone.App({ connection: kintoneConnection })
const kintoneRecord = new kintone.Record({ connection: kintoneConnection })

const getAllFormFields = (appId) => {
    return kintoneApp.getFormFields({ app: appId }).then(rsp => {
        return rsp.properties
    }).catch(err => {
        return err
    })
}
const getInformationOfApp = (id) => {
    return kintoneApp.getApp({ id }).then((rsp) => {
        return rsp;
    }).catch((err) => {
        return err
    });
}

const getFormLayoutOfApp = (app) => {
    return kintoneApp.getFormLayout({app}).then((rsp) => {
        // console.log(rsp.layout);
        return rsp.layout;
      }).catch((err) => {
        return err;
      });
}

module.exports = {
    getAllFormFields,
    getInformationOfApp,
    getFormLayoutOfApp
}
