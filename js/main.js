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
    
    if (categoryBtns.length > 0 && portfolioItems.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                try {
                    // Удаляем активный класс у всех кнопок
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    // Добавляем активный класс текущей кнопке
                    this.classList.add('active');
                    
                    const category = this.dataset.category;
                    
                    portfolioItems.forEach(item => {
                        if (category === 'all' || item.dataset.category === category) {
                            item.style.display = 'block';
                            item.setAttribute('aria-hidden', 'false');
                        } else {
                            item.style.display = 'none';
                            item.setAttribute('aria-hidden', 'true');
                        }
                    });
                } catch (error) {
                    console.error('Ошибка при фильтрации работ:', error);
                }
            });
        });
    }
    
    // Обработка формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            try {
                const formData = new FormData(this);
                const submitButton = this.querySelector('button[type="submit"]');
                
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Отправка...';
                }
                
                // Здесь можно добавить AJAX-запрос
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     body: formData
                // });
                
                // if (!response.ok) throw new Error('Ошибка отправки формы');
                
                alert('Спасибо! Ваше сообщение отправлено.');
                this.reset();
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
            } finally {
                const submitButton = this.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Отправить';
                }
            }
        });
    }
});