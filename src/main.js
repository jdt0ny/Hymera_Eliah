// Importa le dipendenze
import AOS from 'aos';
import feather from 'feather-icons';

// Inizializza AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Inizializza Feather Icons
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    setupEventListeners();
});

// Configura tutti gli event listener
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            
            // Toggle tra le icone menu/chiudi
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.setAttribute('data-feather', isExpanded ? 'menu' : 'x');
                feather.replace();
            }
        });
    }
    
    // Login/Register form toggle
    setupAuthForms();
    
    // Smooth scrolling per i link di navigazione
    setupSmoothScrolling();
    
    // Funzionalità per mostrare/nascondere la password
    setupPasswordToggles();
    
    // Gestione del logout
    setupLogout();
}

// Gestione dei form di autenticazione
function setupAuthForms() {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (!loginTab || !registerTab || !loginForm || !registerForm) return;
    
    function switchToLogin() {
        loginTab.classList.add('bg-gradient-to-r', 'from-green-500', 'to-purple-600');
        loginTab.classList.remove('bg-gray-800');
        loginTab.setAttribute('aria-selected', 'true');
        
        registerTab.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-purple-600');
        registerTab.classList.add('bg-gray-800');
        registerTab.setAttribute('aria-selected', 'false');
        
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        document.getElementById('login-heading').textContent = 'Welcome Back';
    }
    
    function switchToRegister() {
        registerTab.classList.add('bg-gradient-to-r', 'from-green-500', 'to-purple-600');
        registerTab.classList.remove('bg-gray-800');
        registerTab.setAttribute('aria-selected', 'true');
        
        loginTab.classList.remove('bg-gradient-to-r', 'from-green-500', 'to-purple-600');
        loginTab.classList.add('bg-gray-800');
        loginTab.setAttribute('aria-selected', 'false');
        
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        document.getElementById('login-heading').textContent = 'Create Account';
    }
    
    loginTab.addEventListener('click', switchToLogin);
    registerTab.addEventListener('click', switchToRegister);
    
    // Validazione dei form
    setupFormValidation();
    
    // Indicatore di forza password
    setupPasswordStrengthMeter();
}

// Configura la validazione dei form
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Validazione aggiuntiva per il form di registrazione
            if (form.id === 'register-form') {
                const password = document.getElementById('register-password');
                const confirmPassword = document.getElementById('confirm-password');
                
                if (password.value !== confirmPassword.value) {
                    e.preventDefault();
                    confirmPassword.setCustomValidity('Le password non corrispondono');
                    confirmPassword.reportValidity();
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }
            
            form.classList.add('was-validated');
        }, false);
    });
}

// Configura l'indicatore di forza della password
function setupPasswordStrengthMeter() {
    const passwordInput = document.getElementById('register-password');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthText = document.getElementById('password-strength');
        
        if (!strengthText) return;
        
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.match(/[a-z]+/)) strength++;
        if (password.match(/[A-Z]+/)) strength++;
        if (password.match(/[0-9]+/)) strength++;
        if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;
        
        const strengthClasses = [
            'text-red-500', 'text-orange-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'
        ];
        const strengthTexts = [
            'Molto Debole', 'Debole', 'Media', 'Forte', 'Molto Forte'
        ];
        
        strengthText.className = 'text-sm mt-1 ' + strengthClasses[strength - 1];
        strengthText.textContent = 'Sicurezza: ' + strengthTexts[strength - 1];
    });
}

// Configura lo scrolling fluido
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Chiudi il menu mobile se aperto
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    document.getElementById('mobile-menu-button').click();
                }
                
                // Scorri all'elemento target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Aggiorna l'URL senza ricaricare la pagina
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Gestisci il pulsante indietro/avanti del browser
    window.addEventListener('popstate', function() {
        const hash = window.location.hash;
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Configura i toggle per mostrare/nascondere la password
function setupPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Cambia l'icona
            const icon = this.querySelector('i');
            if (icon) {
                icon.setAttribute('data-feather', type === 'password' ? 'eye' : 'eye-off');
                feather.replace();
            }
        });
    });
}

// Configura il logout
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (!logoutBtn) return;
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Qui andrebbe la chiamata API per il logout
        // Per ora simuliamo il reindirizzamento alla pagina di login
        window.location.href = '#login';
        
        // Nascondi la dashboard e mostra il form di login
        const dashboard = document.getElementById('dashboard');
        const loginSection = document.getElementById('login');
        
        if (dashboard) dashboard.classList.add('hidden');
        if (loginSection) loginSection.classList.remove('hidden');
        
        // Resetta i form
        document.querySelectorAll('form').forEach(form => form.reset());
    });
}
