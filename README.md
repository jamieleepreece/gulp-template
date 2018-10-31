# gulp-template

Working template for Gulp.js. Optimised for both chops and remote work

[31/10/18] - Updated dependancies for OSX Mojave. Cleaned out some deprecated packages.

Installation:

It is highly advised to use the node package installer NVM "Node Version Manager" to handle installs of NPM. This is to avoid any strange permission errors caused by using 'sudo' while running NPM commands. NVM will allow you to select the desired release of node.js, while keeping your environment and permissions clean. Note! Please refrain from using sudo with NPM installations, as NVM will take care of any occurring permission issues.

You will not have to use 'sudo' after installing this.

## NVM Installation

The following will install the NVM package to your machine. If it throws a permission error, you may have to use super user (sudo). If issues are unresolved, contact a supervisor.
````
touch ~/.bash_profile
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
````

Now check your version:

```
nvm --version
```

Now check available versoins of node:

nvm ls-remote

Now install desired package:

nvm install 7.2.0



* NPM 6.4.1 ( npm install npm@6.4.1 )
* Gulp 6.4.1


Installation: 

Gulp
* npm install --global gulp
* npm link gulp
