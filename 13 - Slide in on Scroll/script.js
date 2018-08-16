function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return (...args) => {
    const context = this;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (callNow) func.apply(context, args);
  };
}


const sliderImages = document.querySelectorAll('.slide-in');

function checkslide(e) {
  sliderImages.forEach((image) => {
    // scrollY + innerHeight; Gets the place we are on the page from the bottom of the page
    // image.height / 2; Slide in the image when it's half visible
    const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
    const imageBottom = image.offsetTop + image.height;
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrolledPast) {
      image.classList.add('active');
    } else {
      image.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkslide));
