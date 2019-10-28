const EXCEPT_FIELDS = [
    'CREATOR',
    'MODIFIER',
    'RECORD_NUMBER',
    'CREATED_TIME',
    'CATEGORY',
    'UPDATED_TIME',
    'STATUS',
    'STATUS_ASSIGNEE'

]
module.exports = {
    ORIGINAL: {
        // DOMAIN: 'test1-1.cybozu-dev.com',
        DOMAIN: 'minh-sc-1.cybozu-dev.com',
        APP_ID: 98,
        USERNAME: 'cybozu',
        PASSWORD: 'cybozu'
    },
    MIGRATE: {
        // DOMAIN: 'test1-1.cybozu-dev.com',
        DOMAIN: 'minh-sc-1.cybozu-dev.com',
        APP_ID: 142,
        USERNAME: 'cybozu',
        PASSWORD: 'cybozu'
    },
    EXCEPT_FIELDS: EXCEPT_FIELDS
}
