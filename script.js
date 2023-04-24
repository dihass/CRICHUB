const start = document.querySelector(".start button");
const rules_box = document.querySelector(".rules_box");
const quit = rules_box.querySelector(".other .quit");
const restart = rules_box.querySelector(".other .restart");
const quiz = document.querySelector(".quiz");
const result = document.querySelector(".result");
const answer_list = document.querySelector(".answer_list");
const timeline = document.querySelector("header .timeline");
const timeText = document.querySelector(".timer .time_left");
const timeCount = document.querySelector(".timer .time");

start.onclick = ()=>{
    rules_box.classList.add("activeInfo"); 
}

quit.onclick = ()=>{
    rules_box.classList.remove("activeInfo");
}

restart.onclick = ()=>{
    rules_box.classList.remove("activeInfo"); 
    quiz.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(10); 
    startTimerLine(0); 
}

let timeValue =  10;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let timeConsumed = 0;

const restart_quiz = result.querySelector(".other .restart");
const quit_quiz = result.querySelector(".other .quit");


restart_quiz.onclick = ()=>{
    quiz.classList.add("activeQuiz"); 
    result.classList.remove("activeResult"); 
    timeValue = 10; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_button.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_button = document.querySelector(".footer .next_button");
const bottom_ques_counter = document.querySelector(".footer .total_question");


next_button.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_button.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


function showQuetions(index){
    const question = document.querySelector(".question");

    
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    question.innerHTML = que_tag; 
    answer_list.innerHTML = option_tag; 
    
    const option = answer_list.querySelectorAll(".option");

    
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    clearInterval(counter); 
    clearInterval(counterLine); 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = answer_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
        timeConsumed+=4;
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");
        timeConsumed+=5;

        for(i=0; i < allOptions; i++){
            if(answer_list.children[i].textContent == correcAns){ 
                answer_list.children[i].setAttribute("class", "option correct"); 
                answer_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        answer_list.children[i].classList.add("disabled"); 
    }
    next_button.classList.add("show"); 
}

function showResult(){
    rules_box.classList.remove("activeInfo"); 
    quiz.classList.remove("activeQuiz"); 
    result.classList.add("activeResult"); 
    const scoreText = result.querySelector(".score");
    if (userScore > 3){ 
        
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span><br><span>The total time you spent is<p>'+ timeConsumed +'</p>seconds.</span>';
        scoreText.innerHTML = scoreTag;  
    }
    else if(userScore > 1){ 
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span><br><span>The total time you spent is<p>'+ timeConsumed +'</p>seconds.</span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ 
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span><br><span>The total time you spent is<p>'+ timeConsumed +'</p>seconds.</span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--; 
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            const allOptions = answer_list.children.length; 
            let correcAns = questions[que_count].answer; 
            for(i=0; i < allOptions; i++){
                if(answer_list.children[i].textContent == correcAns){ 
                    answer_list.children[i].setAttribute("class", "option correct"); 
                    answer_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                    console.log("Time Off: Auto selected correct answer.");
                    timeConsumed+=6;
                }
            }
            for(i=0; i < allOptions; i++){
                answer_list.children[i].classList.add("disabled"); 
            }
            next_button.classList.add("show"); 
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 20);
    function timer(){
        time += 1; 
        timeline.style.width = time + "px"; 
        if(time > 549){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  
}