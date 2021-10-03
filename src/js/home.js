const button = document.getElementById('generate-bio')

function cycleVisibility(ev) {
  ev.preventDefault();

  // get a nodeList of all the divs
  const nlist = document.querySelectorAll('.hero-text p');

  for (let i = 0; i < nlist.length; i++) {

    // if div is active, that class name will be removed
    if (nlist[i].className.includes('active')) {
      nlist[i].classList.remove('active');

      // check wheter you're at the end of nodeList 
      const nextIndex = i < nlist.length - 1 ? i + 1 : 0;

      // and add the class that makes next (or first) div visible
      nlist[nextIndex].classList.add('active');

      // exit the loop
      break;
    }
  }
}

button.onmousedown = function() {
  button.classList.remove('clicked');
}
button.addEventListener('click', cycleVisibility, false);
