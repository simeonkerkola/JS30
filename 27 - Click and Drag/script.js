const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  // We subtract the slider.offsetLeft in case theres
  // a margin between the page and the slider
  startX = e.pageX - slider.offsetLeft;

  // Save the initial state of scroll left when we click
  scrollLeft = slider.scrollLeft;
  console.log(startX);
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;

  // Every px moved, slide 3px
  const walk = (x - startX) * 3;
  console.log(walk);
  slider.scrollLeft = scrollLeft - walk;
});
