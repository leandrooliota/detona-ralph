/**/
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        
    },
    values: {
        
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 30,
    },
    actions: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime <= 0) {
        playSound("game-over-curto")
        alert("Game Over! O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.4;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitbox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                /* deixar a posição nula para que o usuário não farme mais de um ponto por aparecimento*/
                state.values.hitPosition = null;
                playSound("hit4");
            };
        });
    });
}


// Criar a função para tocar a música
function playMusic() {
    // Criar um novo objeto de áudio
    let audio = new Audio(".src/audios/beat-animada.mp3");

    // Tentar iniciar a reprodução
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("A música começou a tocar!");
        }).catch(error => {
            console.log("Erro ao tentar tocar a música:", error);
        });
    }
}

// Adicionar um evento de clique à página para tocar a música no primeiro clique
document.body.addEventListener('click', playMusic, { once: true });

function initialize (){
    moveEnemy();
    setInterval(() => {
        if (parseInt(state.view.timeLeft.textContent) == 15){
            playSound("beat-tensa");
        }
    }, 1000);
    addListenerHitbox();
}

initialize();
