export const btnUpEL = document.querySelector('.go-up');

window.addEventListener('scroll', onScrollWindow);

btnUpEL.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

function onScrollWindow() {
  if (scrollY > 600) {
    btnUpEL.classList.remove('hide');
    setTimeout(() => {
      btnUpEL.classList.remove('hiding');
    }, 300);
  } else
    setTimeout(() => {
      btnUpEL.classList.add('hiding');
      btnUpEL.classList.add('hide');
    }, 300);
}
