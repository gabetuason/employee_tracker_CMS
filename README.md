# employee_tracker_CMS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A command-line application to manage a company's employee database. Allows non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). The db file contains a schema.sql and seeds.sql, which contains department, role and employee values.

Uses the [Inquirer package](https://www.npmjs.com/package/inquirer/v/8.2.4) and Node.js v16. Also inside is a Package.json for metadata and dependencies, which allow package managers like `npm init` to install. See installation and usage for proper use of the application. This application is built for the purpose of managing a company's employee database using SQL queries (located in the index.js).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

Assure that node.js is installed preferably version 16 (stable), found on https://nodejs.org/en/download/. To make sure the application is running correctly, the user needs to install packages. To install these packages, the user should run the following command in the terminal: `npm i inquirer@8.2.4` or `npm i`. When installing, it is important that you are in the correct directory otherwise issues may transpire.

Please also install these packages:
- `npm install mysql2` 
- `npm install dotenv` for sensitive information
- `npm install console.table --save` to print MySQL rows to the console.

Also make a .env file for user details, this is sensitive information.
- `DB_USER = "root"`
- `DB_PASSWORD = "Your Password"`

## Usage

For correct usage. Run the following commands in your terminal:
1. mysql -u root -p 
2. Enter your password 
3. source ./db/schema.sql;
4. source ./db/seeds.sql;


After installing the required files/packages above and running the commands. In your prefered terminal type: `node index.js` or `node index` to run the application. You will be shown options such as: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role. Please make sure you fill each section specifically for adding the employees, roles and department. 

![screenshot]()

Please view video demonstration below for example of usage.

Video: https://watch.screencastify.com/v/kMVtyv1jyCBuew6eNfLF 

## License

The project is licensed under: MIT License. To see the license permissions for commercial and non-commercial use, check the link https://opensource.org/licenses/MIT

## Contributing

This is an open source application, feel free to use the employee_tracker_CMS. It is important to mention me as a contributor for distribution or modifications.
  
## Tests

During use, it should have node_modules and package-lock.json added in the file directory. To see if application processed accordingly, databases should show updated entries when using sql queries. 
  
## Questions

For any questions about the application, please contact gabetuason24@gmail.com or view the github https://github.com/gabetuason to find me
