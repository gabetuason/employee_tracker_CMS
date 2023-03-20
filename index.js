// Required packages for sql and inquirer
const inquirer = require('inquirer');
const mysql = require('mysql2');
// console.table package is used to format the output of the query results in a table format.
const cTable = require('console.table');
// Load environment variables from a '.env' file, which is not included in the code snippet. This is useful for storing sensitive information
require('dotenv').config();

const db = mysql.createConnection({
  host: 'localhost', // 127.0.0.1
  user: process.env.DB_USER, // Database User (root)
  password: process.env.DB_PASSWORD, // Database password
  database: 'employee_db', // name of database
});
console.log(`-------------------------------------------` );
console.log(`Welcome to the Employee Tracker Manager App !!!` );
console.log(`-------------------------------------------` );

// Prompts the user to choose from a list of options for managing the employee database
// If there is an error, it will be thrown.
db.connect((err) => {
  if (err) throw err;
  homeApp();
});

// HomeApp that uses the inquirer module to prompt the user with a list of options to choose from. 
// Based on the user's selection, the function then executes a specific block of code by using a switch statement.
function homeApp() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
          'view all departments',
          'view all roles',
          'view all employees',
          'add a department',
          'add a role',
          'add an employee',
          'update an employee role',
          'quit',
        ],
      },
    ])
    .then((response) => {
      switch (response.options) {
        case 'view all departments':
          displayDepartments();
          break;
        case 'view all roles':
          displayRoles();
          break;
        case 'view all employees':
          displayEmployees();
          break;
        case 'add a department':
          addDepartments();
          break;
        case 'add a role':
          addRoles();
          break;
        case 'add an employee':
          addEmployees();
          break;
        case 'update an employee role':
          updateStaffRole();
          break;
        case 'quit':
          console.log(`-------------------------------------------` );
          console.log(`Shutting Down App` );
          console.log(`-------------------------------------------` );
          db.end();
          break;
      }
    });
}

function displayDepartments() {
    // selects all data from the department table in the database
  db.query('SELECT * FROM department', (err, result) => {
    if (err) throw err;
    // displays the resulting data as a table in the console
    console.table(result);
    // returns to the home menu prompt
    homeApp();
  });
}

function displayEmployees() {
     // db query that selects data from multiple tables and joins them based on the employee's role and manager ids. After order by employee id
  db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
      AS department, role.salary, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
      FROM employee JOIN role 
      ON employee.role_id = role.id JOIN department 
      ON role.department_id = department.id 
      LEFT JOIN employee AS manager 
      ON employee.manager_id = manager.id 
      ORDER BY employee.id`, (err, result) => {
    if (err) throw err;
    console.table(result);
    homeApp();
  });
}

function displayRoles() {
     // selects data from the role and department tables and joins them based on the department id.
  db.query(
    'SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id', (err, result) => {
    if (err) throw err;
    console.table(result);
    homeApp();
  });
}

function addRoles() {
// prompts the user to input information about a new role to add to the database.
  db.query('SELECT * FROM department', (err, department) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of the role ?:',
                      validate: (input) => {
            if (input.trim() === '') {
            return "Cannot be left blank.";
            }
                return true;
                }
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for the role ?:',
                      validate: (input) => {
            if (input.trim() === '') {
            return "Cannot be left blank.";
            }
                return true;
                }
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'Which department does this role belong to ?:',
          choices: department.map((depart) => ({ name: depart.name, value: depart.id })),
        },
      ])
      .then((response) => {
        db.query('INSERT INTO role SET ?', response, (err, result) => {
          if (err) throw err;
          console.log('The new role has been added !');
          homeApp();
        });
      });
  });
}

// updating the role for employee
function updateStaffRole() {
  db.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;

    db.query('SELECT * FROM role', (err, roles) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update: ?',
            choices: employees.map((staff) => ({ name: `${staff.first_name} ${staff.last_name}`, value: staff.id })),
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'Choose the role of the new employee:',
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
          },
        ])
        .then((response) => {
          db.query('UPDATE employee SET role_id = ? WHERE id = ?', [response.role_id, response.employee_id], (err, result) => {
            if (err) throw err;
            console.log('Employee role has been updated successfully !');
            homeApp();
          });
        });
    });
  });
}

// This function prompts the user to enter the name of the department they want to add
function addDepartments() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department ?:',
                    validate: (input) => {
            if (input.trim() === '') {
            return "Cannot be left blank.";
            }
                return true;
                }
      },
    ])
    .then((response) => {
        // Once the user enters the department name, this function inserts the new department into the department table in the database
      db.query('INSERT INTO department SET ?', { name: response.name }, (err, result) => {
        if (err) throw err;
        // If the insertion was successful, log a message to the console
        console.log('Department added in the database !');
        homeApp();
      });
    });
}

function addEmployees() {
// adds a new employee to the database. It starts by querying the database for all roles and employees to be used later in the inquirer prompt. 
  db.query('SELECT * FROM role', (err, roles) => {
    if (err) throw err;

    db.query('SELECT * FROM employee', (err, employees) => {
      if (err) throw err;
// prompts the user to enter the employee's first name, last name, role, and manager
// The list of managers includes the option of selecting "None" and a list of existing employees to choose from.
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name ?:",
            validate: (input) => {
            if (input.trim() === '') {
            return "Cannot be left blank.";
            }
                return true;
                }
          },
          {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name ?:",
            validate: (input) => {
            if (input.trim() === '') {
            return "Cannot be left blank.";
            }
                return true;
                }
          },
          {
            type: 'list',
            name: 'role_id',
            message: "Choose the role of the employee:",
            choices: roles.map((role) => ({ name: role.title, value: role.id })),
          },
          {
            // creates a new array of objects with the name and value properties.
            type: 'list',
            name: 'manager_id',
            message: "Select the employee's manager:",
            choices: [
              { name: 'No Manager', value: null },...employees.map((employ) => // The resulting array is then concatenated with the { name: 'none', value: null } object using the spread operator.
              ({ name: `${employ.first_name} ${employ.last_name}`, value: employ.id })),
            ],
          },
        ])
        .then((response) => { db.query('INSERT INTO employee SET ?', response, (err, result) => { if (err) throw err;
            console.log('Added employee to the database !');
            homeApp();
          });
        });
    });
  });
}

