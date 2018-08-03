const secretCode = 'simeon';
const pressed = [];

window.addEventListener('keyup', (e) => {
  console.log(e.key);
  pressed.push(e.key);

  // Start splicing from the end
  // keeps only anough chras to match the length of a secret code
  pressed.splice(
    -secretCode.length - 1,
    pressed.length - secretCode.length);

  if (pressed.join('').includes(secretCode)) {
    console.log('DINGDING!!!');
    cornify_add();
  }
});
