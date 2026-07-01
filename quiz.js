const questions = [
    {
        q: "Capital of India?",
        options: ["Mumbai","Delhi","Kolkata","Chennai"],
        answer: "Delhi"
    },
    {
        q: "2 + 2 = ?",
        options: ["3","4","5","6"],
        answer: "4"
    },
    {
        q: "JS stands for?",
        options: ["JavaStyle","JavaScript","JustScript","JScript"],
        answer: "JavaScript"
    }
];

let index = 0;
let score = 0;

function loadQuestion(){
    let q = questions[index];

    document.getElementById("question").textContent = q.q;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(opt => {
        let btn = document.createElement("div");
        btn.classList.add("option");
        btn.textContent = opt;

        btn.onclick = () => checkAnswer(opt);

        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected){
    if(selected === questions[index].answer){
        score++;
    }
}

function nextQuestion(){
    index++;

    if(index < questions.length){
        loadQuestion();
    } else {
        document.getElementById("question").textContent = "Quiz Finished!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("score").textContent =
            `Score: ${score}/${questions.length}`;
    }
}

loadQuestion();