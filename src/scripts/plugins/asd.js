class Menu {
    constructor(options) {
        this.button = document.querySelector(options.buttonSelector);
        this.menu = document.querySelector(options.menuSelector);
        this.htmlElement = document.querySelector(options.htmlElementSelector);
        this.animationDuration = options.animationDuration || 300;
        this.isAnimation = false;
        this.init();
    }

    init() {
        if (this.button && this.menu && this.htmlElement) {
            // opacity 300ms ease
            this.menu.style.transition = `opacity ${this.animationDuration}ms ease, transform ${this.animationDuration}ms ease`;

            // Начальное состояние меню [скрыто]
            this.menu.style.opacity = '0';
            this.menu.style.transform = 'translateY(-100%)';
            this.menu.style.display = 'none';

            this.setupEvents();

        } else {
            console.error('Не найдены HTML-селекторы')
        }
    }

    setupEvents() {
        // Обработчик клика по кнопке меню
        this.button.addEventListener('click', (event) => {
            if (!this.menu.contains(event.target) && !this.button.contains(event.target)) {
                event.stopPropagation();
                this.toggleMenu();
            }
        });
        // Обработчик клика по документу
        document.addEventListener('click', (event) => {
            if(!this.menu.contains(event.target) && !this.button.contains(event.target)) {
                this.closeMenu();
            }
        })
        // Обработчик нажатия клавиши Esc
        document.addEventListener('keydown', (event) => {
            if(event.key === 'Escape') {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        if (this.menu.style.display === 'none' || this.menu.style.display === '') {
            this.openMenu();
        } else {
            this.closeMenu()
        }
    }

    openMenu() {
        if(this.isAnimation) return;

        this.isAnimation = true;

        this.menu.style.display = 'block';
        this.htmlElement.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            this.menu.style.opacity = '1';
            this.menu.style.transform = 'translateY(0)';
        });

        setTimeout(() => {
            this.isAnimation = false;
        }, this.animationDuration)

    }

    closeMenu() {
        if (this.isAnimation || this.menu.style.display === 'none') return;

        this.isAnimation = true;

        // Анимация исчезновения
        this.menu.style.opacity = '0';
        this.menu.style.transform = 'translateY(-100%)';

        setTimeout(() => {
            this.menu.style.display = 'none';
            this.htmlElement.style.overflow = '';
            this.isAnimation = false;
        }, this.animationDuration);
    }
}

export default Menu;
