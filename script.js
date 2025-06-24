document.querySelector('.scroll-indicator').addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Tạo hiệu ứng sao lấp lánh
function createStarField() {
    const starField = document.getElementById('starField');
    const numberOfStars = 200;
    
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
        star.style.opacity = 0;
        
        // Animation delay
        const delay = Math.random() * 3;
        star.style.animation = `fadeIn 2s forwards ${delay}s, pulse ${Math.random() * 3 + 2}s infinite ${delay + 2}s alternate`;
        
        starField.appendChild(star);
    }
}

// Hiệu ứng theo dõi chuột cho Liquid Glass
document.addEventListener('mousemove', (e) => {
    const elements = document.querySelectorAll('.liquid-glass');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
    });
});

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

// Hiệu ứng mở đầu trang
function initialAnimation() {
    document.body.style.overflow = 'hidden';
    
    // Hiệu ứng mở đầu đặc biệt
    const initialOverlay = document.createElement('div');
    initialOverlay.className = 'initial-overlay';
    initialOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0b1030;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity 1s ease;
    `;
    
    const logo = document.createElement('div');
    logo.textContent = 'SMARTHOME';
    logo.style.cssText = `
        font-size: 60px;
        font-weight: bold;
        color: white;
        letter-spacing: 10px;
        transform: scale(0);
        transition: transform 0.8s ease;
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
    `;
    
    initialOverlay.appendChild(logo);
    document.body.appendChild(initialOverlay);
    
    // Hiệu ứng logo phóng to rồi thu nhỏ
    setTimeout(() => {
        logo.style.transform = 'scale(1.5)';
    }, 100);
    
    setTimeout(() => {
        logo.style.transform = 'scale(1)';
    }, 900);
    
    // Fade out overlay
    setTimeout(() => {
        initialOverlay.style.opacity = '0';
    }, 1800);
    
    // Xóa overlay và cho phép scroll
    setTimeout(() => {
        initialOverlay.remove();
        document.body.style.overflow = '';
    }, 2800);
}

// Hiệu ứng animation khi scroll
function handleScrollAnimations() {
    const aboutContainer = document.querySelector('.about-container');
    const sectionTitle = document.querySelector('.section-title');
    const tutorialSteps = document.querySelectorAll('.tutorial-step');
    const scrollPosition = window.scrollY + window.innerHeight * 0.8;
    
    // Kiểm tra xem about-section có hiển thị trong viewport không
    if (aboutContainer) {
        const elementPosition = aboutContainer.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > elementPosition) {
            aboutContainer.classList.add('animate');
        }
    }
    
    // Kiểm tra tiêu đề section hướng dẫn
    if (sectionTitle) {
        const titlePosition = sectionTitle.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > titlePosition) {
            sectionTitle.classList.add('animate');
        }
    }
    
    // Kiểm tra từng step trong tutorial-section
    tutorialSteps.forEach(step => {
        const stepPosition = step.getBoundingClientRect().top + window.scrollY;
        
        if (scrollPosition > stepPosition) {
            step.classList.add('animate');
        }
    });
}

window.addEventListener('load', () => {
    createStarField();
    initialAnimation();
    preventOverflow();
    
    // Chạy ngay khi trang load để kích hoạt hiệu ứng nếu phần tử đã hiển thị trong viewport
    setTimeout(handleScrollAnimations, 100);
});

window.addEventListener('resize', preventOverflow);
window.addEventListener('scroll', handleScrollAnimations); 