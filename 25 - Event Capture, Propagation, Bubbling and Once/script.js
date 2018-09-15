const divs = document.querySelectorAll('div');
const btn = document.querySelector('button');

function logText(e) {
  console.log(this.classList.value);

  // Stops bubbling this event up
  e.stopPropagation();
}

divs.forEach(div => div.addEventListener('click', logText, {
  capture: false, // When true w/ stopPropagation, starts running from the top, click 3 => 'one'
  // When false, click 3 => 'three'
}),
);

// Fires only once
btn.addEventListener(
  'click',
  () => {
    console.log('click');
  },
  {
    once: true,
  },
);
