const program = require('commander');
const migrateAppBasedOnConfig = require('./migrateAppBasedOnConfig')
const migrateNewApp = require('./migrateNewApp')
var clc = require("cli-color");

program.version('0.0.1');

// Commands
program
    .command('migrate-app')
    .description('Migrate app based on Config')
    .alias('s')
    .action(() => {
        migrateAppBasedOnConfig.run()
    })

// Options
// <username> <password> <appCopyId>
program
    .command('new-app-same-domain')
    .description('new-app-same-domain')
    .alias('nasd')
    .option('-a, --app-id <appId>', 'kintone appCopyId')
    .option('-d, --domain <domain>', 'kintone domain', '')
    .option('-u, --username <username>', 'kintone username', '')
    .option('-p, --password <password>', 'kintone password', '')
    .action((option) => {
        if (option.domain != ''
            && option.username != ''
            && option.password != ''
            && option.appId != undefined) {
            migrateNewApp.run(option.appId, option.domain, option.username, option.password, 'nasd')
        }
        else console.log(clc.red('Wrong syntax!'));
    })

program
    .command('new-app-difference-domain')
    .description('new-app-difference-domain')
    .alias('nadd')
    .option('-d, --domain <domain>', 'kintone domain')
    .option('-u, --username <username>', 'kintone username')
    .option('-p, --password <password>', 'kintone password')
    .option('-a, --app-id <appCopyId>', 'kintone appCopyId')
    .option('-dt, --domain-target <domainTarget>', 'kintone domain')
    .option('-ut, --username-target <usernameTarget>', 'kintone username')
    .option('-pt, --password-target <passwordTarget>', 'kintone password')
    .action((domain, username, password, appCopyId, domainTarget, usernameTarget, passwordTarget) => {
        if (domain != undefined && username != undefined && password != undefined && appCopyId != undefined
            && domainTarget != undefined && usernameTarget != undefined && passwordTarget != undefined) {
            migrateNewApp.run(appCopyId, domain, username, password, 'nadd',
                domainTarget, usernameTarget, passwordTarget)
        }
        else console.log(clc.red('Wrong syntax!'));
    })

program.parse(process.argv);







