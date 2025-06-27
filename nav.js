function initNavbarAuth() {

    let isLoggedIn = false;
    let currentUser = null;


    const authButtons = document.getElementById('authButtons');
    const userIcons = document.getElementById('userIcons');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAvatar = document.getElementById('userAvatar');
    const profileAvatar = document.getElementById('profileAvatar');
    const profileName = document.getElementById('profileName');
    const profileEmail = document.getElementById('profileEmail');
    const authPage = document.getElementById('authPage');
    const closeAuth = document.getElementById('closeAuth');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const switchToSignup = document.getElementById('switchToSignup');


    if (loginBtn) loginBtn.addEventListener('click', showLoginForm);
    if (signupBtn) signupBtn.addEventListener('click', showSignupForm);
    if (closeAuth) closeAuth.addEventListener('click', closeAuthModal);
    if (showSignup) showSignup.addEventListener('click', switchToSignupForm);
    if (showLogin) showLogin.addEventListener('click', switchToLoginForm);
    if (switchToSignup) switchToSignup.addEventListener('click', switchToSignupForm);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);


    function showLoginForm() {
        authPage.style.display = 'flex';
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function showSignupForm() {
        authPage.style.display = 'flex';
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    function closeAuthModal() {
        authPage.style.display = 'none';
    }

    function switchToSignupForm(e) {
        e.preventDefault();
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    }

    function switchToLoginForm(e) {
        e.preventDefault();
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (email && password) {
            const initials = email.substring(0, 2).toUpperCase();
            currentUser = {
                name: email.split('@')[0],
                fullName: email.split('@')[0],
                initials: initials,
                email: email,
                savedCourses: [],
                notifications: []
            };

            updateUI();
            closeAuthModal();
            saveToLocalStorage();
            isLoggedIn = true;
        }
    }

    function handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;

        if (name && email && password && password === confirmPassword) {
            const initials = name.substring(0, 2).toUpperCase();
            currentUser = {
                name: name.split(' ')[0],
                fullName: name,
                initials: initials,
                email: email,
                savedCourses: [],
                notifications: []
            };

            updateUI();
            closeAuthModal();
            saveToLocalStorage();
            isLoggedIn = true;
        }
    }

    function handleLogout() {
        isLoggedIn = false;
        currentUser = null;
        authButtons.style.display = 'flex';
        userIcons.style.display = 'none';
        clearLocalStorage();
    }

    function updateUI() {
        if (currentUser) {
            userAvatar.textContent = currentUser.initials;
            profileAvatar.textContent = currentUser.initials;
            profileName.textContent = currentUser.fullName;
            profileEmail.textContent = currentUser.email;
            authButtons.style.display = 'none';
            userIcons.style.display = 'flex';
        }
    }

    function saveToLocalStorage() {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userInitials', currentUser.initials);
        localStorage.setItem('userEmail', currentUser.email);
        localStorage.setItem('userName', currentUser.fullName);
    }

    function clearLocalStorage() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInitials');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
    }

    function checkAuthState() {
        const loggedIn = localStorage.getItem('isLoggedIn');
        const initials = localStorage.getItem('userInitials');
        const email = localStorage.getItem('userEmail');
        const name = localStorage.getItem('userName');

        if (loggedIn === 'true' && initials) {
            currentUser = {
                name: name ? name.split(' ')[0] : 'User',
                fullName: name || 'Demo User',
                initials: initials,
                email: email || 'user@example.com',
                savedCourses: [],
                notifications: []
            };
            updateUI();
        }
    }


    checkAuthState();
}


if (document.getElementById('authButtons')) {
    initNavbarAuth();
} else {
    document.addEventListener('navbarLoaded', function () {
        initNavbarAuth();
    });
}


window.performSearch = function () {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {

        window.location.href = `courses.html?search=${encodeURIComponent(searchTerm)}`;
    }
};


function initSearchFunctionality() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn) {
        searchBtn.addEventListener('click', window.performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                window.performSearch();
            }
        });
    }
}


initSearchFunctionality();


document.addEventListener('navbarLoaded', initSearchFunctionality);


document.addEventListener('DOMContentLoaded', initSearchFunctionality);
