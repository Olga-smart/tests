class Dropdown {
  constructor(component) {
    this.component = component;
    this.button = component.querySelector('.js-dropdown__button');
    this.list = component.querySelector('.js-dropdown__list');
    this.selectedValueInBtn = component.querySelector('.js-dropdown__selected-value-in-btn');
    this.input = component.querySelector('.js-dropdown__input');
    
    this.attachEventHandlers();
  }
  attachEventHandlers() {
    this.button.addEventListener('click', () => {
      this.list.classList.toggle('dropdown__list_visible');
      this.button.classList.toggle('dropdown__button_opened')
    });
    this.list.addEventListener('click', (event) => {
      let li = event.target.closest('li');
      if (!li) {
        return;
      }
      this.selectedValueInBtn.textContent = li.textContent;
      this.input.value = li.dataset.value;
      this.list.classList.remove('dropdown__list_visible');
      this.button.classList.add('dropdown__button_set');
      this.button.classList.remove('dropdown__button_opened');
    });
  }
}

window.addEventListener('load', () => {

  let dropdowns = document.querySelectorAll('.js-dropdown');
  for (let dropdown of dropdowns) {
    new Dropdown(dropdown);
  }

  let userMenus = document.querySelectorAll('.js-user-menu');
  for (let menu of userMenus) {
    let avatar = menu.querySelector('.js-user-menu__avatar');
    let name = menu.querySelector('.js-user-menu__name');
    let arr = name.textContent.split(' ');
    avatar.textContent = arr[1][0] + arr[0][0];
  }


  let progresses = document.querySelectorAll('.js-progress');
  for (let progress  of progresses) {
    let progressElement = progress.querySelector('.js-progress__progress');
    let value = progressElement.value;
    let max = progressElement.max;
    let signValue = progress.querySelector('.js-progress__sign-value');
    let signMax = progress.querySelector('.js-progress__sign-max');
    signValue.textContent = value;
    signMax.textContent = max;
  }
 
});
