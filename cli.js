#!/usr/bin/env node

process.title = 'sync-travis';

var chalk = require('chalk');
var inquirer = require('inquirer');
var symbol = require('log-symbols');
var user = require('git-user-name');
var name = require('git-username');

var username = name() || user();
var sync = require('./');

run(function (env) {
  sync(env, function (err, res) {
    if (err) {
      console.log('  ' + symbol.warning + ' ' + chalk.yellow(err.message));
    }
    if (res && res.result === true) {
      console.log('  ' + symbol.success + ' ' + chalk.green('sync is in progress.'), '(more projects take longer to sync)');
    }
  });
});

function run(cb) {
  console.log(chalk.cyan('  Please provide your github username and password:'));
  console.log(chalk.gray('  (answers are never stored):'));
  console.log();

  var prompts = [];

  prompts.push({
    type: "input",
    name: 'username',
    message: chalk.bold('username'),
    default: username
  });

  prompts.push({
    type: "password",
    name: 'password',
    message: chalk.bold('password'),
    default: null
  });

  inquirer.prompt(prompts, function (answer) {
    console.log()
    if(answer) {
      console.log('  ' + symbol.success, chalk.gray('sending request'));
      cb(answer);
    } else {
      console.log(chalk.green('  Got it. All is good.'));
      process.exit(0);
    }
  });
}
