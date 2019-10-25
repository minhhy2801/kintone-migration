const EXCEPT_FIELDS = [
    // 'Status',
    // 'Assignee',
    // 'Updated_datetime',
    // 'Created_datetime',
    // 'Categories',
    // 'Record_number',
    // 'Created_by',
    // 'Updated_by',
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
        APP_ID: 48,
        USERNAME: 'cybozu',
        PASSWORD: 'cybozu'
    },
    MIGRATE: {
        DOMAIN: 'minh-sc-1.cybozu-dev.com',
        APP_ID: 1,
        USERNAME: 'cybozu',
        PASSWORD: 'cybozu'
    },
    EXCEPT_FIELDS: EXCEPT_FIELDS
}
