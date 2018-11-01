# gulp-template

Working template for Gulp.js. Optimised for both chops and remote work

[31/10/18] - Updated dependancies for OSX Mojave. Cleaned out some deprecated packages.

Installation:

It is highly advised to use the node package installer NVM "Node Version Manager" to handle installs of NPM. This is to avoid any strange permission errors caused by using 'sudo' while running NPM commands. NVM will allow you to select the desired release of node.js, while keeping your environment and permissions clean. Note! Please refrain from using sudo with NPM installations, as NVM will take care of any occurring permission issues.

You will not have to use 'sudo' after installing this.

## Step 1 - (Optional) NVM Installation

The following will install the NVM package to your machine. If it throws a permission error, you may have to use super user (sudo) for just this installation!. If issues are unresolved, contact a supervisor.
````
touch ~/.bash_profile
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
````
Now check your version:
```
nvm --version
```
If NVM is successfully installed, run the following command to view the available node packages
````
nvm ls-remote
````
Install install desired package:
````
nvm install 7.2.0
````
You can now check what versions were installed
````
node -v
npm -v
````

## Step 2 - Gulp installation

Install the gulp environment onto your machine:
````
npm install gulp@latest
````
Check what version was installed:
````
gulp -v
````
link gulp to be used as a global:
````
npm link gulp
````

## Step 3 - Download Dependancies

The following command will now pull node_modules into your project and install any additional dependancies
````
npm install
````

Before launching gulp, configure the gulpfile.js to match your needs. This may be setting development to local, or adjusting sftp delays. You can also adjust whether gulp compiles all stylesheets at once (useful for project installs), or for only the saved stylesheet etc... 
This is just a starting template, so feel free to add in any additional packages and/or fork this branch.
