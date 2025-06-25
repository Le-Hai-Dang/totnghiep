document.querySelector('.scroll-indicator')?.addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
});

// Thêm smooth scroll cho tất cả các liên kết điều hướng trên menu
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('header nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Nếu là liên kết trỏ đến một id trên trang
            const href = this.getAttribute('href');
            if (href?.startsWith('#')) {
                e.preventDefault();
                
                // Nếu là link trang chủ, cuộn lên đầu trang
                if (href === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Các link khác, cuộn đến section tương ứng
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        // Thêm hiệu ứng highlight cho menu item được chọn
                        navLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                        
                        targetSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
});

// Tạo hiệu ứng sao lấp lánh - tối ưu để giảm việc tạo node quá nhiều
function createStarField() {
    const starField = document.getElementById('starField');
    if (!starField) return;
    
    const numberOfStars = Math.min(200, Math.floor(window.innerWidth * window.innerHeight / 3000)); // Giảm số sao trên màn hình nhỏ
    const fragment = document.createDocumentFragment(); // Sử dụng fragment để tối ưu DOM thao tác
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size
        const size = Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random position
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';
        
        // Random opacity
        star.style.opacity = '0';
        
        // Animation delay
        const delay = Math.random() * 3;
        star.style.animation = `fadeIn 2s forwards ${delay}s, pulse ${Math.random() * 3 + 2}s infinite ${delay + 2}s alternate`;
        
        fragment.appendChild(star);
    }
    
    starField.appendChild(fragment);
}

// Sử dụng requestAnimationFrame để tối ưu hiệu ứng theo dõi chuột
let mouseMoveThrottleId;
document.addEventListener('mousemove', (e) => {
    // Throttle mouse move event
    if (mouseMoveThrottleId) return;
    
    mouseMoveThrottleId = requestAnimationFrame(() => {
        const elements = document.querySelectorAll('.liquid-glass');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (!isElementInViewport(rect)) return; // Bỏ qua các element không trong viewport
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            element.style.setProperty('--mouse-x', `${x}px`);
            element.style.setProperty('--mouse-y', `${y}px`);
        });
        
        mouseMoveThrottleId = null;
    });
});

// Kiểm tra element có trong viewport không
function isElementInViewport(rect) {
    return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Đảm bảo không có vấn đề scroll ngang khi các icon di chuyển
function preventOverflow() {
    const container = document.querySelector('.main-container');
    const titleContainer = document.querySelector('.title-container');
    
    // Đặt chiều cao cố định cho container chứa các icon
    if (titleContainer) {
        titleContainer.style.height = '400px';
        titleContainer.style.position = 'relative';
    }
    
    // Đảm bảo container chính không bị overflow
    if (container) {
        container.style.overflow = 'hidden';
    }
    
    // Thiết lập overflow cho body
    document.body.style.overflowX = 'hidden';
    
    // Đảm bảo các icon không gây ra vấn đề scroll
    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.pointerEvents = 'none';
    });
}

// Hiệu ứng animation khi scroll - sử dụng Intersection Observer
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                if (target.classList.contains('about-container') ||
                    target.classList.contains('section-title') ||
                    target.classList.contains('tutorial-step') ||
                    target.classList.contains('contact-container')) {
                    
                    target.classList.add('animate');
                }
                
                // Không theo dõi phần tử này nữa sau khi đã kích hoạt animation
                sectionObserver.unobserve(target);
            }
        });
    },
    { threshold: 0.2 } // Khi phần tử hiển thị 20% trong viewport
);

// Đăng ký các phần tử cần theo dõi với Intersection Observer
function setupScrollAnimations() {
    const elements = [
        ...document.querySelectorAll('.about-container'),
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.tutorial-step'),
        ...document.querySelectorAll('.contact-container')
    ];
    
    elements.forEach(el => sectionObserver.observe(el));
}

// Menu active observer
const menuObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveMenu(id);
            }
        });
    },
    { 
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px' // Offset để kích hoạt sớm hơn
    }
);

// Đăng ký các section cần theo dõi cho menu
function setupMenuObserver() {
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => menuObserver.observe(section));
    
    // Xử lý đặc biệt cho trang chủ khi ở đầu trang
    window.addEventListener('scroll', () => {
        if (window.scrollY < 200) {
            updateActiveMenu('home');
        }
    }, { passive: true });
}

// Cập nhật menu active
function updateActiveMenu(currentSectionId) {
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        if (currentSectionId === 'home' && href === '#') {
            link.classList.add('active');
        } 
        else if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Khởi tạo trang
window.addEventListener('load', () => {
    createStarField();
    preventOverflow();
    setupScrollAnimations();
    setupMenuObserver();
    
    // Đánh dấu menu trang chủ active ban đầu
    updateActiveMenu('home');
}, { passive: true });

// Tối ưu resize event bằng throttling
let resizeTimeout;
window.addEventListener('resize', () => {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        preventOverflow();
    }, 100);
}, { passive: true }); 