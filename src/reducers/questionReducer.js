const parseFile = (file) => {

    
       
    let lines = file.split('\n');
    let questions = {questions:[]};
    let length = lines.length;
    let qflag = false;
    let aflag = false;
    let eflag = false;
    let aline = 0;

    let question = {
        questionText:'',
        correctAnswer:0,
        answers: [] 
    };

    let max = 10;

    for(var i = 0; i < length; i+=1){

        if (lines[i].substr(0,1) != "*") {
        switch(lines[i].substr(0,2).toUpperCase()) {
            case "@Q":
            
                if (question.correctAnswer != 0 && question.answers.length > 0 && question.questionText != '') {
                    questions.questions.push(question);
                }

                 question = {
                    questionText:'',
                    correctAnswer:0,
                    answers: []
                };

                qflag = true;
                aflag = false;
                eflag = false;
                
                break;
            case "@A":
                aline = 0;
                qflag = false;
                aflag = true;
                eflag = false;
                break;
            case "@E":
                qflag = false;
                aflag = false;
                eflag = true;
                break;
            default:
                if (qflag){
                    question.questionText = question.questionText + "\n" + lines[i];
               
                 
                } else if (aflag) {
                    if (aline == 0) {
                        question.correctAnswer = (Number(lines[i])-1);
                        aline = 1;
                    } else {
                        question.answers.push(lines[i])

                    }

                } else if (eflag) {
  
                    questions.questions.push(question);
               
                    question = {
                        questionText:'',
                        correctAnswer:0,
                        answers: []
                    };
                    eflag = false;                }

                break;

        }
    }
       
      
    }
  
  
   return questions;
}   

module.exports = parseFile;