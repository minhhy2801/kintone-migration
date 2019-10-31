# migration-kintone-tool

migration-kintone-tool is a command line utility for migrateion fields, layouts of kintone App.

## Version 
0.0.2

## How to Build
### Requirement
- Clone this repository
- Install [nodejs](https://nodejs.org/en/)
```
// Check node version
$ node -v 
```
- Install npm   
``$ npm install``

## Usage
```text
Usage:  
        node index.js [OPTIONS]

    Application Commands:
        Migrate based on config: 
            migrate-app, s
        
        Migrate same domain: 
            migrate-app-same-domain, masd
            Application Options:
                -a, --app-id <APP_ID>                AppId target to migrate
                -d, --domain <FQDN>               Domain name (specify the FQDN)
                -u, --username <USER>           User's log in name
                -p, --password <PASS>           User's password
        
        Migrate difference domain: 
            migrate-app-difference-domain, madd
            Application Options:
                -a, --app-id <APP_ID>                        AppId target to migrate
                -d, --domain <FQDN>                       Domain name of app target to migrate (specify the FQDN)
                -u, --username <USER>                   User's log in name of app target to migrate 
                -p, --password <PASS>                   User's password of app target to migrate 
                -t, --domain-migrate <FQDN_MIGRATE>        Domain name of app migrate (specify the FQDN)
                -n, --username-migrate <USER_MIGRATE>    User's log in name of app migrate 
                -k, --password-migrate <PASS_MIGRATE>    User's password of app migrate 
        -V, --version Version of cli-kintone

    Help Options:
        -h, --help    Show this help message
```
## Examples
### Migrate app based on default config
- Edit TARGET & MIGRATE in file config.js
```
    TARGET: {
        DOMAIN: 'DOMAIN_TARGET',
        APP_ID: 1,
        USERNAME: 'USERNAME_TARGET',
        PASSWORD: 'PASSWORD_TARGET'
    }, MIGRATE: {
        DOMAIN: 'DOMAIN_MIGRATE',
        APP_ID: 1,
        USERNAME: 'USERNAME_MIGRATE',
        PASSWORD: 'PASSWORD_MIGRATE'
    }
```
- Run command line  
``$ node index.js migrate-app``
or
``$ node index.js s``

### Migrate app in same domain
``$ node index.js migrate-app-same-domain --app-id <APP_ID> --domain <FQDN> --username <USER> --password <PASS> ``  
or  
``$ node index.js masd -a <APP_ID> -d <FQDN> -u <USER> -p <PASS>``


### Migrate app in difference domain
``$ node index.js migrate-app-difference-domain --app-id <APP_ID> --domain <FQDN> --username <USER> --password <PASS> --domain-migrate <FQDN_MIGRATE> --username-migrate <USER_MIGRATE> --password-migrate <PASS_MIGRATE>``  
or  
``$ node index.js madd -a <APP_ID> -d <FQDN> -u <USER> -p <PASS> -t <FQDN_MIGRATE> -n <USER_MIGRATE> -k <PASS_MIGRATE>``