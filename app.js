// Step elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// Stickers container
const stickerContainer = document.getElementById('stickerContainer');

// Start button → remove birthday sticker & move to Step2
document.getElementById('startBtn').onclick = () => {
  const birthdaySticker = document.querySelector('#step1 .sticker');
  if(birthdaySticker) birthdaySticker.remove();
  showStep(step2);
};

// Function to switch steps
function showStep(step) {
  [step1, step2, step3].forEach(s => s.classList.remove('active'));
  step.classList.add('active');
}

// Q&A questions
const questions = [
  { q: "Do you hate jews?", options: ["Yes", "Who don't"], stickers: ["image/us.png","image/us.png"] },
  { q: "Who loves you the most?", options: ["Me","Me","Me"], stickers: ["image/love cat.png","image/love cat.png","image/love cat.png"] },
  { q: "Do I sound cringe?", options: ["Yes","No"], stickers: ["image/sad.png","image/love bear.png"] }
];

let currentQuestion = 0;
const questionText = document.getElementById('questionText');
const optionBtns = document.querySelectorAll('.optionBtn');

// Load first question
function loadQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.q;
  optionBtns.forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.onclick = () => handleAnswer(q,i);
  });
}

// Handle answer
function handleAnswer(q,i) {
  if(q.stickers && q.stickers[i]) addSticker(q.stickers[i], moveToNextQuestion);
  else moveToNextQuestion();
}

// Move to next question or final
function moveToNextQuestion() {
  currentQuestion++;
  if(currentQuestion < questions.length) loadQuestion();
  else setTimeout(() => { 
    showStep(step3); 
    showFinalMessage(); 
  },800);
}

// Add sticker for Q&A
function addSticker(url, callback) {
  const img = document.createElement('img');
  img.src = url;
  img.classList.add('sticker','pop');
  img.style.top = Math.random()*60+20+'%';
  img.style.left = Math.random()*60+20+'%';
  stickerContainer.appendChild(img);
  setTimeout(()=> { img.remove(); if(callback) callback(); }, 2000);
}

// Final message flexbox + emoji rain
function showFinalMessage() {
  step3.innerHTML = '';
  const messageBox = document.createElement('div');
  messageBox.classList.add('final-message-box');
  messageBox.innerHTML = `
    <h2>Janamdin ki hardik subhkamnaye apko meri jaan 🥰</h2>
    <p>Tera best decision meko insta pe add karna hi hoga, baki toh sare galat h</p>
    <p>Aur 🤨 tu bohot pyari h ngl aur han sundaar bhi, nice dost ho ❤️💖</p>
    <P> (Bro don't judge me han ek hi chiz toh perfectly ata h mujhe 😅)</p>
    <p> Oh haan hail "HITLER" and ilysm 🫡💜</p>
  `
  step3.appendChild(messageBox);
  startEmojiRain();
}

// Emoji rain
function startEmojiRain() {
  const emojis = ["💖","❤️","💌","🌸","✨"];
  setInterval(()=>{
    const e = document.createElement('div');
    e.classList.add('emoji-rain');
    e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    e.style.left = Math.random()*90+"%";
    e.style.fontSize = Math.random()*30+20+"px";
    e.style.animationDuration = (Math.random()*3+3) + "s"; // 3-6 sec fall
    step3.appendChild(e);

    // Remove after animation completes
    setTimeout(()=> e.remove(), 6000);
  }, 300);
}
document.getElementById('startBtn').onclick = () => {
  // Remove birthday sticker
  const birthdaySticker = document.querySelector('#step1 .sticker');
  if(birthdaySticker) birthdaySticker.remove();

  // Show Step2
  showStep(step2);

  // Play music
  const music = document.getElementById('birthdayMusic');
  music.play().catch(() => {
    console.log("Autoplay blocked, user interaction required."); 
  });
};



// Load first question
loadQuestion();
