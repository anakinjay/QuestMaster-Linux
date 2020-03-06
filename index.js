#!/usr/bin/env node

const inquirer = require('inquirer');
const color = require('colors');
const parseFile = require('./src/reducers/questionReducer');

const fs = require('fs');
const figlet = require('figlet');
const _ = require("underscore");




console.log(color.bold(color.red(figlet.textSync('Quest Master', {
  font: 'Chunky',
 //font: 'Cyberlarge',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}))));


let correctAnswers = 0;
let totalAnswers = 0;

function getFilesFromPath(path, extension) {
  let dir = fs.readdirSync( path );
  return dir.filter( elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')));
}

function results(answer, correct) {


  totalAnswers = totalAnswers +1;
  console.log("\n");
  if (answer == correct) {
    correctAnswers = correctAnswers +1;
    console.log(color.green("Correct! Great Job!"));
   
  } else {
    console.log(color.red("Incorrect! Correct answer was: "+color.green(correct)));
   
  }

  console.log(color.bold("Current Score: -- "+color.blue(Math.round((correctAnswers / totalAnswers) * 100) + '%')));

}

let files = getFilesFromPath("./", ".q");

if (files.length == 0 ) {
  console.log("No question files found. Please place your properly named and formatted question files in this directory");
  process.exit();

}

inquirer.prompt([{
  type: 'list',
  name: 'loadFile',
  message: 'Please choose a question file',
  choices: files,
 


}]).then(function (answers) {
 


  var content = fs.readFileSync(answers.loadFile,'utf8');
  content = parseFile(content);
  
  let questions = [];
  content.questions.forEach((row,i)=>{
    let rowData = row;


    
    let tmp = {
      type: 'list', 
      name: 'question_'+i, 
      message: color.bold(color.yellow(row.questionText)),

      filter: function (answer) {
        
        let row = rowData;
        
        results(answer, row.answers[row.correctAnswer]);
        var done = this.async()
        setTimeout(function() {
          done(null, true)
        }, 1000)
    
        
      },
        choices: row.answers

      };


   

    questions.push(tmp);
    


  });

  questions = _.shuffle(questions);

inquirer.prompt(questions).then(value=>{

  console.log(color.bold(color.red(figlet.textSync('Quest Complete!', {
    font: 'Chunky',
  // font: 'Cyberlarge',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  }))));
console.log(color.blue("-------------------------"));
console.log(color.bold.white("Final Score: -- "+color.green(Math.round((correctAnswers / totalAnswers) * 100) + '%')))

});



});


