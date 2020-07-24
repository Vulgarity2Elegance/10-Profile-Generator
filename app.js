const inquirer = require("inquirer");

// Create an array contains all team information
const team = [];

// Inquiring info about user's engineer and create the engineer class accordingly.
const Engineer = require("./lib/Engineer");

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
      },
      {
        type: "number",
        name: "id",
        message: "What is your engineer's id?",
        validate: (value) => !isNaN(value) || "Please enter a number.",
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?",
      },
    ])
    .then((res) => {
      const engineer = new Engineer(res.name, res.id, res.email, res.github);
      team.push(engineer);
      addMember();
    });
}

// Inquiring info about user's inter and create the inter class accordingly.
const Intern = require("./lib/Intern");

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
      },
      {
        type: "number",
        name: "id",
        message: "What is your intern's id?",
        validate: (value) => !isNaN(value) || "Please enter a number.",
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
      },
    ])
    .then((res) => {
      const intern = new Intern(res.name, res.id, res.email, res.school);
      team.push(intern);
      addMember();
    });
}

// Inquiring info about user's manager and create the manager class accordingly.
const Manager = require("./lib/Manager");

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
      },
      {
        type: "number",
        name: "id",
        message: "What is your manager's id?",
        validate: (value) => !isNaN(value) || "Please enter a number.",
      },
      {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
      },
      {
        type: "number",
        name: "officeNumber",
        message: "What is your manager's office number?",
        validate: (value) => !isNaN(value) || "Please enter a number.",
      },
    ])
    .then((res) => {
      const manager = new Manager(
        res.name,
        res.id,
        res.email,
        res.officeNumber
      );
      team.push(manager);
      addMember();
    });
}

// Inquiring which type of team member a manager would like to add.
function addMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "memberType",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members.",
        ],
      },
    ])
    .then((res) => {
      switch (res.memberType) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        default:
          generateRoster();
      }
    });
}

// Generating team.html to the OUTPUT_DIR
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function generateRoster() {
  // Synchronously check, using node.js, if a file or directory exists.
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(outputPath, render(team), "utf-8");
}

createManager();
