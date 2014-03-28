#multicraft-tests

Testing framework for Multicraft - make sure your development of themes or functionality doesn't break stuff. Test locally or on a service like Travis. Licensed under the GPL. Essentially:

 * You must disclose the source of any modifications to this testing framework.
 * You must state any changes that were made to the source.
 * You must keep notices of copyright ("Copyright 2014 MCProHosting"), and the license, in any derivatives.
 * You may not hold MCProHosting or its affiliates liable for anything relating to this testing framework or its use.
 * You may not redistribute modifications of this software.

## Usage

### Prerequisites

#### PHP

*Ensure you're using PHP >= 5.4*. Older versions (that are often the default in package managers like yum and apt) do not have the CLI web server that this runs tests on. You will need to update your sources, or install it directly:

 * Instructions for CentOS and other RHEL-based distros [here](http://www.rackspace.com/knowledge_center/article/installing-rhel-epel-repo-on-centos-5x-or-6x).
 * PPA for Debian-based systems [here](https://launchpad.net/~ondrej/+archive/php5).
 * Most recent source [here](http://php.net/downloads.php).

You must also ensure you have the SQLite adapter enabled.

#### Node.js

Ensure that you're running a reasonably modern version of Node.js, with the NPM package manager. Installation *will* fail if you use a deprecated version of Node, which usually occurs in most package managers by default. You will need to update your sources, or install it directly:

 * Instructions for EPEL on CentOS [here](http://www.rackspace.com/knowledge_center/article/installing-rhel-epel-repo-on-centos-5x-or-6x).
 * PPA for Debian-based systems [here](https://launchpad.net/~chris-lea/+archive/node.js).
 * Most recent binaries and sources [here](http://nodejs.org/download/).

#### Local Readying...

 1. Run `npm-install` while cd'd into this repo's directory.
 2. Clone your panel into the "panel" directory by running `git clone <panel .git> panel`

### Running Tests

Run, from the command line:

```
node test.js
```

This will run a full suite of tests against the panel. In order to update the panel after you make changes and push it into version control, simply:

```
cd panel && git pull
```

> Note: do **not** run your panel in production out of this test environment! Each time tests are run, an artificial environment is set up which will wipe any data and application from the panel.
