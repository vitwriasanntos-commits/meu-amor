// ========================= //
// CONTADOR
// ========================= //
const startDate = new Date("2025-02-10");
function updateCounter(){
  const today = new Date();
  const diff = today.getTime() - startDate.getTime();
  const days = Math.floor(diff / (1000*60*60*24));
  document.getElementById("contador").innerHTML = `${days} DAYS TOGETHER`;
}
updateCounter();

// ========================= //
// CONTROLAR EXIBIÇÃO DA CARTA
// ========================= //
function openLetter(){
  const letter = document.getElementById("letter");
  if(letter.style.display === "block"){
    letter.style.display = "none";
  }else{
    letter.style.display = "block";
    letter.scrollIntoView({ behavior:"smooth" });
  }
}

// ========================= //
// ESTRELAS DE FUNDO
// ========================= //
const stars = document.getElementById("stars");
for(let i=0; i<180; i++){
  const star = document.createElement("div");
  star.style.position = "absolute";
  star.style.width = Math.random()*3+1+"px";
  star.style.height = star.style.width;
  star.style.background = "white";
  star.style.left = Math.random()*100+"vw";
  star.style.top = Math.random()*5000+"px";
  star.style.opacity = Math.random();
  star.style.animation = `twinkle ${ Math.random()*4+2 }s infinite`;
  stars.appendChild(star);
}

// ========================= //
// MECÂNICA COMPLETA DO JOGO (TOMODACHI JUMP)
// ========================= //
const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameScreen = document.getElementById("gameScreen");
const jumpButton = document.getElementById("jumpButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameScoreDisplay = document.getElementById("gameScore");

let score = 0;
let isPlaying = true;
let scoreInterval;

obstacle.classList.add("obstacle-move");

function jump(e) {
  if(e) {
    e.stopPropagation();
  }

  if (!isPlaying) {
    return;
  }

  if (player.classList.contains("jump")) return;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
  }, 520);
}

jumpButton.addEventListener("click", jump);

jumpButton.addEventListener("touchstart", (e) => {
  e.preventDefault();
  jump(e);
});

gameScreen.addEventListener("click", (e) => {
  if (!isPlaying) {
    resetGame();
  } else if (e.target !== jumpButton && !jumpButton.contains(e.target)) {
    jump(e);
  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" || e.code === "ArrowUp") {
    e.preventDefault();

    if (!isPlaying) {
      resetGame();
    } else {
      jump(e);
    }
  }
});

function startScore() {
  scoreInterval = setInterval(() => {
    if (isPlaying) {
      score++;
      gameScoreDisplay.innerText = `SCORE: ${score}`;
    }
  }, 100);
}
startScore();

const checkCollision = setInterval(() => {
  if (!isPlaying) return;

  const playerBottom = parseInt(
    window.getComputedStyle(player).getPropertyValue("bottom")
  );

  const obstacleRect = obstacle.getBoundingClientRect();
  const playerRect = player.getBoundingClientRect();

  if (
    obstacleRect.left < playerRect.right - 10 &&
    obstacleRect.right > playerRect.left + 10 &&
    playerBottom <= 44
  ) {
    isPlaying = false;
    obstacle.classList.remove("obstacle-move");
    clearInterval(scoreInterval);
    gameOverScreen.style.display = "flex";
  }
}, 10);

function resetGame() {
  score = 0;
  gameScoreDisplay.innerText = `SCORE: 0`;
  gameOverScreen.style.display = "none";
  isPlaying = true;

  obstacle.classList.remove("obstacle-move");
  void obstacle.offsetWidth;
  obstacle.classList.add("obstacle-move");

  clearInterval(scoreInterval);
  startScore();
}

// ========================= //
// UFOS PASSANDO VOANDO
// ========================= //
setInterval(() => {
  const ufo = document.createElement("div");
  ufo.innerHTML = "🛸";
  ufo.style.position = "fixed";
  ufo.style.left = "-100px";
  ufo.style.top = Math.random() * 60 + 10 + "%";
  ufo.style.fontSize = "35px";
  ufo.style.opacity = ".8";
  ufo.style.zIndex = "9998";
  ufo.style.pointerEvents = "none";

  document.body.appendChild(ufo);

  ufo.animate(
    [
      { transform: "translateX(0)" },
      { transform: `translateX(calc(100vw + 250px))` }
    ],
    {
      duration: 12000,
      easing: "linear"
    }
  );

  setTimeout(() => {
    ufo.remove();
  }, 12000);
}, 25000);

// ========================= //
// CURSOR TRAIL
// ========================= //
const particles = ["+", "*", "✨", "💙"];

document.addEventListener("mousemove", createTrail);
document.addEventListener("touchmove", createTrail);

function createTrail(e){
  const particle = document.createElement("div");

  particle.innerHTML =
    particles[Math.floor(Math.random() * particles.length)];

  particle.style.position = "fixed";
  particle.style.color = "#8ab4ff";
  particle.style.pointerEvents = "none";
  particle.style.zIndex = "9999";
  particle.style.fontSize = (8 + Math.random() * 6) + "px";

  let x = e.touches ? e.touches[0].clientX : e.clientX;
  let y = e.touches ? e.touches[0].clientY : e.clientY;

  particle.style.left = x + "px";
  particle.style.top = y + "px";

  document.body.appendChild(particle);

  particle.animate(
    [
      { opacity: 1, transform: "translateY(0)" },
      {
        opacity: 0,
        transform: `translate(${(Math.random()-0.5)*40}px, -40px)`
      }
    ],
    {
      duration: 900,
      easing: "ease-out"
    }
  );

  setTimeout(() => {
    particle.remove();
  }, 900);
}

// ========================= //
// CONTROLE DE ÁUDIO
// ========================= //
const music = document.getElementById("bgMusic");

if (music) {
  document.addEventListener(
    "click",
    () => {
      if (music.paused) {
        music.volume = 0.15;
        music.play().catch(() => {
          console.log("Áudio aguardando interação.");
        });
      }
    },
    { once: true }
  );
}

function toggleMusic() {
  const music = document.getElementById("bgMusic");
  const btn = document.querySelector(".botao-musica");

  if (music) {
    if (music.paused) {
      music.play();
      btn.innerHTML = "🔊 SOUND: ON";
    } else {
      music.pause();
      btn.innerHTML = "🔇 SOUND: OFF";
    }
  }
}
