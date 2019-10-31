const program = require('commander');
const migrateAppBasedOnConfig = require('./migrateAppBasedOnConfig')
const migrateNewApp = require('./migrateNewApp')
const clc = require("cli-color");

program.version('0.0.2');

// Migrate app bases on Config
program
    .command('migrate-app')
    .description('Migrate app based on Config')
    .alias('s')
    .action(() => {
        migrateAppBasedOnConfig.run()
    })

// Migrate new app in same domain
program
    .command('migrate-app-same-domain')
    .description('Migrate new app in same domain')
    .alias('masd')
    .option('-a, --app-id <appId>', 'kintone appCopyId')
    .option('-d, --domain <domain>', 'kintone domain', '')
    .option('-u, --username <username>', 'kintone username', '')
    .option('-p, --password <password>', 'kintone password', '')
    .action((option) => {
        if (option.domain != ''
            && option.username != ''
            && option.password != ''
            && option.appId != undefined) {
            migrateNewApp.run(option.appId, option.domain, option.username, option.password,
                option.domain, option.username, option.password)
        }
        else {
            console.log(clc.red('Wrong syntax!'));
            console.log(clc.red('node index.js --help to get more information'));
        }
    })

// Migrate new app in difference domain
program
    .command('migrate-app-difference-domain')
    .description('Migrate new app in difference domain')
    .alias('madd')
    .option('-d, --domain <domain>', 'kintone domain', '')
    .option('-u, --username <username>', 'kintone username', '')
    .option('-p, --password <password>', 'kintone password', '')
    .option('-a, --app-id <appId>', 'kintone appCopyId')
    .option('-t, --domain-migrate <domainTarget>', 'kintone domain', '')
    .option('-n, --username-migrate <usernameTarget>', 'kintone username', '')
    .option('-k, --password-migrate <passwordTarget>', 'kintone password', '')
    .action((options) => {
        if (options.domain != '' &&
            options.username != '' &&
            options.password != '' &&
            options.appId != undefined &&
            options.domainTarget != '' &&
            options.usernameTarget != '' &&
            options.passwordTarget != '') {

            migrateNewApp.run(options.appId, options.domain, options.username, options.password,
                options.domainTarget, options.usernameTarget, options.passwordTarget)
        }
        else {
            console.log(clc.red('Wrong syntax!'));
            console.log(clc.red('node index.js --help to get more information'));
        }
    })

program.parse(process.argv);







