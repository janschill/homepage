(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const $burger = document.querySelector('.button-menu');
    const $navigationList = document.querySelector('.nav__list');

    $burger.addEventListener('click', () => {
      $navigationList.classList.toggle('nav__list--active');
    })
  })
})();
