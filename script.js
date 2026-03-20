document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollIndicator.style.width = scrolled + "%";

        // Active Nav Link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        // Scroll Top Visibility
        const scrollTop = document.querySelector('.scroll-top');
        if (window.scrollY > 500) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        }, 100);
    });

    // Hover effect for cursor
    const links = document.querySelectorAll('a, button, .member-card, .gallery-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = 'scale(2)';
            follower.style.background = 'rgba(0, 242, 254, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = 'scale(1)';
            follower.style.background = 'transparent';
        });
    });

    // Scroll Reveal Animations
    ScrollReveal().reveal('[data-reveal="bottom"]', {
        distance: '60px',
        origin: 'bottom',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 100
    });

    ScrollReveal().reveal('[data-reveal="top"]', {
        distance: '60px',
        origin: 'top',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    ScrollReveal().reveal('[data-reveal="left"]', {
        distance: '60px',
        origin: 'left',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    ScrollReveal().reveal('[data-reveal="right"]', {
        distance: '60px',
        origin: 'right',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)'
    });

    ScrollReveal().reveal('[data-reveal="zoom"]', {
        scale: 0.85,
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 100
    });

    ScrollReveal().reveal('[data-reveal="fade"]', {
        opacity: 0,
        duration: 1000,
        delay: 200,
        easing: 'ease-in-out',
        interval: 100
    });

    // Member Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const memberCards = document.querySelectorAll('.member-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            memberCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Gallery Filtering
    const gFilterBtns = document.querySelectorAll('.g-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    gFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-gfilter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-gcat') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal Logic
    const modal = document.getElementById('memberModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-more-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.member-card');
            const name = card.querySelector('h3').innerText;
            const nickname = card.querySelector('.card-front p').innerText;
            const branch = card.querySelector('.branch-tag').innerText;
            const meta = card.querySelector('.member-meta').innerHTML;
            const quote = card.querySelector('.member-quote').innerText;
            const imgSrc = card.querySelector('.member-img img').src;

            modalBody.innerHTML = `
                <div class="modal-flex">
                    <div class="modal-image">
                        <img src="${imgSrc}" alt="${name}">
                    </div>
                    <div class="modal-info">
                        <span class="badge">${branch}</span>
                        <h2>${name} <small>(${nickname})</small></h2>
                        <div class="modal-meta">
                            ${meta}
                        </div>
                        <p class="modal-quote">"${quote}"</p>
                        <div class="modal-bio">
                            <p>A valued member of the Colony Gang since day one. Known for being ${nickname}, they bring a unique energy to the group that makes every hangout special.</p>
                        </div>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-linkedin-in"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
            `;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Countdown Timer
    const countdown = () => {
        const targetDate = new Date('August 15, 2030 00:00:00').getTime();
        const now = new Date().getTime();
        const gap = targetDate - now;

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h;
        document.getElementById('minutes').innerText = m;
    };

    setInterval(countdown, 1000);

    // Scroll Top Click
    document.querySelector('.scroll-top').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
