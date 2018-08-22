window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true; // This will keep updating the results as we speak

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  // Node list to an array
  const transcript = Array.from(e.results)
    .map(result => result[0]).map(result => result.transcript)
    .join('');

  p.textContent = transcript;

  // Create a new paragraph after each pause
  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
  console.log(transcript);
});

// Run the function again when we stop speaking
recognition.addEventListener('end', recognition.start);

recognition.start();
