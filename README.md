<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>

<h3 align="center">LWC Print Label</h3>

---

<p align="center"> Printing a label from LWC to be used in the field service mobile app. 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

When we mention Build Tasks, these are built in commands to VSCode launched using Cmd + Shift + b on Mac or Ctrl + Shift + b on Windows.

### Prerequisites

What things you need to install the software and how to install them.

* Ensure that Python, Salesforce CLI and CumulusCI are installed on the local machine

* If not already, confirm that you want to install the VSCode Extension Recommendations, which should appear at the bottom right if you have not already installed them.

### Development

A step by step series of examples that tell you how to get a development env running.

1. Create a new branch in Github and open it within VSCode. Create a new development scratch org using build task "[ORG]: Remove and Create New Developer Org (Alias 'dev')". This will create a new scratch org, based on the orgs/dev.json file, with the alias 'dev'. If you have previously captured configuration, this will be automatically loaded back in.

2. Make the changes you need to within the scratch org.

3. Retrieve changes made using the task "[SAVE]: Retrieve Changes from org"

4. Once you have all the changes saved within the project. Move onto local testing mentioned below.

5. Once tests have completed, save changes back to the GitHub branch and create a Pull Request to merge the changes into the main branch.

## 🔧 Running the tests <a name = "tests"></a>

Once you have completed development within a dev org, create a qa org using the build task called "[ORG]: Remove and Create New QA/Testing Org (Alias 'qa')". This will create a scratch org which is the same as the dev org and you can then test deploy your solution there before deploying to any other orgs.

## 🚀 Deployment <a name = "deployment"></a>

To deploy this solution:

1. Connect to the target salesforce org using "Q BRIX [CONNECT]: Connect to a Production Org/TSO and Deploy Solution" if production and "[CONNECT]: Connect to a Sandbox and Deploy Solution" if the target org is a scratch org or sandbox.

2. Run the task "[DEPLOY]: Deploy entire solution to specified org"

## ⛏️ Built Using <a name = "built_using"></a>

- [CumulusCI](https://cumulusci.readthedocs.io/en/latest) - Build Automation and CLI
- [Salesforce DX](https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_install_cli.htm) - CLI
- [Python](https://www.python.org/downloads/) - Software Platform
- [NodeJs](https://nodejs.org/en/) - Server Environment

## 📚 Resources <a name = "resources"></a>
Field Service Mobile + LWC Offline Trailblazer Group: (https://trailhead.salesforce.com/trailblazer-community/groups/0F94S000000GwNLSA0)
Salesforce Help Article: (https://help.salesforce.com/s/articleView?id=sf.mfs_overview_lwc.htm&type=5)
Great SFS Mobile + LWC Guide by Derek Anderson: (https://org62.my.salesforce.com/sfc/p/#000000000062/a/3y000002FJwH/hsCEmnlg7cusBaZKYUjpPfjpoNnKX8bV1HSTZ5fQZAA)

## ✍️ Authors <a name = "authors"></a>


