document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const burger = document.querySelector('.burger');
    const navList = document.querySelector('.nav__list');
    
    if (burger && navList) {
        const toggleMenu = () => {
            const isExpanded = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', !isExpanded);
            burger.classList.toggle('active');
            navList.classList.toggle('active');
        };

        burger.addEventListener('click', toggleMenu);
        
        // Поддержка клавиатуры
        burger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (burger && navList) {
                burger.classList.remove('active');
                navList.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Анимации при прокрутке
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Фильтрация работ в портфолио
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            portfolioItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Обработка формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Здесь можно добавить AJAX-запрос или другую логику отправки
            alert('Спасибо! Ваше сообщение отправлено.');
            this.reset();
        });
    }
});