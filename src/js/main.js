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

class Progress {
  constructor(component) {
    this.component = component;
    this.progressElement = component.querySelector('.js-progress__progress');
    this.value = this.progressElement.value;
    this.max = this.progressElement.max;
    
    if (component.querySelector('.js-progress__sign-value') && component.querySelector('.js-progress__sign-max')) {
      this.signValue = component.querySelector('.js-progress__sign-value')
      this.signMax = component.querySelector('.js-progress__sign-max');
      this.signValue.textContent = this.value;
      this.signMax.textContent = this.max;
    }

    if (this.progressElement.classList.contains('js-progress__progress_with_arrow')) {
      let leftIndent = this.value * 100 / this.max;
      this.progressElement.style.setProperty('--left-indent', leftIndent + '%');
    }
  }
}

class TimerWithProgressBar {
  constructor(component) {
    this.component = component;
    this.progressElement = component.querySelector('.js-progress__progress');
    this.value = this.progressElement.value;
    this.max = this.progressElement.max;

    if (component.querySelector('.js-timer__sign-value')) {
      this.signValue = component.querySelector('.js-timer__sign-value');
      this.signValue.textContent = this.value;
    }

    if (component.querySelector('.js-timer__sign-max')) {
      this.maxValue = component.querySelector('.js-timer__sign-max');
      this.maxValue.textContent = this.max;
    }
  }
}

class Tabs {
  constructor(component) {
    this.component = component;
    this.tabList = component.querySelector('.js-tabs__list');
    this.activeItem = this.tabList.querySelector('.js-tabs__item_active');
    this.firstItem = this.tabList.firstElementChild;
    this.lastItem = this.tabList.lastElementChild;
    this.activeTabPane = document.querySelector(this.activeItem.dataset.target);
    this.previousButton = component.querySelector('.js-tabs__previous-button');
    this.nextButton = component.querySelector('.js-tabs__next-button');

    if (component.classList.contains('js-tabs_vertical')) {
      this.vertical = true;
    } else {
      this.vertical = false;
    }

    this.attachEventHandlers();
    this.activeItem.scrollIntoView({
      inline: 'center',
      block: 'center',
    });
  }

  attachEventHandlers() {
    this.tabList.addEventListener('click', (event) => {
      let target = event.target;

      if (!target.classList.contains('tabs__item')) return;
      if (target === this.activeItem) return;

      this.activeItem.classList.remove('tabs__item_active', 'js-tabs__item_active');
      this.activeItem = target;
      this.activeItem.classList.add('tabs__item_active', 'js-tabs__item_active');

      this.activeTabPane.classList.add('tab-pane_hidden');
      this.activeTabPane = document.querySelector(target.dataset.target);
      this.activeTabPane.classList.remove('tab-pane_hidden');
    });

    if (!this.vertical) {
      this.tabList.addEventListener('wheel', (event) => {
        event.preventDefault();
        this.tabList.scrollLeft += event.deltaY;
      });
    }    

    this.previousButton?.addEventListener('click', () => {
      if (this.activeItem === this.firstItem) return;

      this.activeItem.classList.remove('tabs__item_active', 'js-tabs__item_active');
      this.activeItem = this.activeItem.previousElementSibling;
      this.activeItem.classList.add('tabs__item_active', 'js-tabs__item_active');

      this.activeTabPane.classList.add('tab-pane_hidden');
      this.activeTabPane = document.querySelector(this.activeItem.dataset.target);
      this.activeTabPane.classList.remove('tab-pane_hidden');
    });

    this.nextButton?.addEventListener('click', () => {
      if (this.activeItem === this.lastItem) return;

      this.activeItem.classList.remove('tabs__item_active', 'js-tabs__item_active');
      this.activeItem = this.activeItem.nextElementSibling;
      this.activeItem.classList.add('tabs__item_active', 'js-tabs__item_active');

      this.activeTabPane.classList.add('tab-pane_hidden');
      this.activeTabPane = document.querySelector(this.activeItem.dataset.target);
      this.activeTabPane.classList.remove('tab-pane_hidden');
    });
  }
}

class ModalButton {
  constructor(button) {
    this.button = button;
    this.modal = document.querySelector(button.dataset.target);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.button.addEventListener('click', () => {
      this.modal.classList.add('modal_active');
    });
  }
}

class ModalWindow {
  constructor(component) {
    this.component = component;
    this.closeBtn = component.querySelector('.js-modal__close-btn');
    this.cancelBtn = component.querySelector('.js-modal__button_cancel');
    this.confirmBtn = component.querySelector('.js-modal__button_confirm'); 
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.closeBtn.addEventListener('click', () => {
      this.component.classList.remove('modal_active');
    });
    this.component.addEventListener('click', (event) => {
      if(event.target.closest('.js-modal__container')) return;
      this.component.classList.remove('modal_active');
    });
    this.cancelBtn.addEventListener('click', () => {
      this.component.classList.remove('modal_active');
    });
    this.confirmBtn.addEventListener('click', () => {
      this.component.classList.remove('modal_active');
    });
  }
}

class Burger {
  constructor(component) {
    this.component = component;
    this.menu = document.getElementById(component.dataset.target);
    this.attachEventHandlers();
  }

  attachEventHandlers() {
    this.component.addEventListener('click', () => {
    this.component.classList.toggle('burger_menu_open');
    this.menu.classList.toggle('side-menu_open');
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
    new Progress(progress);
  }

  let timersWithProgressBar = document.querySelectorAll('.js-timer_with_progress-bar');
  for (let timer of timersWithProgressBar) {
    new TimerWithProgressBar(timer); 
  }

  let tabsList = document.querySelectorAll('.js-tabs');
  for (let tabs of tabsList) {
    new Tabs(tabs);
  }

  let modalButtons = document.querySelectorAll('[data-toggle="modal"]');
  for (let button of modalButtons) {
    new ModalButton(button);
  }

  let modals = document.querySelectorAll('.js-modal');
  for (let modal of modals) {
    new ModalWindow(modal);
  }

  let burgers = document.querySelectorAll('.js-burger');
  for (let burger of burgers) {
    new Burger(burger);
  }
 
});
