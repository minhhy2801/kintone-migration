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
        else {
            console.log(clc.red('Wrong syntax!'));
            console.log(clc.red('node index.js --help to get more information'));
        }
    })

program
    .command('new-app-difference-domain')
    .description('new-app-difference-domain')
    .alias('nadd')
    .option('-d, --domain <domain>', 'kintone domain', '')
    .option('-u, --username <username>', 'kintone username', '')
    .option('-p, --password <password>', 'kintone password', '')
    .option('-a, --app-id <appId>', 'kintone appCopyId')
    .option('-t, --domain-target <domainTarget>', 'kintone domain', '')
    .option('-n, --username-target <usernameTarget>', 'kintone username', '')
    .option('-k, --password-target <passwordTarget>', 'kintone password', '')
    .action((options) => {
        if (options.domain != '' &&
            options.username != '' &&
            options.password != '' &&
            options.appId != undefined &&
            options.domainTarget != '' &&
            options.usernameTarget != '' &&
            options.passwordTarget != '') {

            migrateNewApp.run(options.appId, options.domain, options.username, options.password, 'nadd',
                options.domainTarget, options.usernameTarget, options.passwordTarget)
        }
        else {
            console.log(clc.red('Wrong syntax!'));
            console.log(clc.red('node index.js --help to get more information'));
        }
    })

program.parse(process.argv);







