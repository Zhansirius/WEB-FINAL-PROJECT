
/* STALZONE AUTHENTICATION */

document.addEventListener("DOMContentLoaded", function() {

    const USERS_KEY = "stalzoneUsers";
    const SESSION_KEY = "stalzoneCurrentUser";

    function getUsers() {
        return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    }

    function getCurrentUser() {
        const email = localStorage.getItem(SESSION_KEY);

        return getUsers().find(function(user) {
            return user.email === email;
        });
    }

    // Create authentication buttons
    const navbar = document.querySelector(".navbar-nav");

    if (navbar) {
        const authButtons = document.createElement("li");

        authButtons.className = "nav-item auth-nav-item";

        authButtons.innerHTML = `
            <a href="#" id="signupOpen" class="nav-link custom-nav-link">
                SIGN UP
            </a>
            <a href="#" id="loginOpen" class="nav-link custom-nav-link">
                LOG IN
            </a>
            <a href="Profile.html" id="profileOpen"
               class="nav-link custom-nav-link" style="display:none;">
                PROFILE
            </a>
            <a href="#" id="logoutBtn"
               class="nav-link custom-nav-link" style="display:none;">
                LOG OUT
            </a>
        `;

        navbar.appendChild(authButtons);
    }

    // Authentication window
    const authHTML = `
        <div id="authOverlay" class="auth-overlay">

            <div class="auth-box">

                <button type="button" id="authClose"
                        class="auth-close">&times;</button>

                <div id="signupSection">

                    <h2>CREATE ACCOUNT</h2>

                    <form id="signupForm" novalidate>

                        <label for="authName">Name</label>
                        <input id="authName" type="text"
                               placeholder="Your name">

                        <label for="authEmail">Email</label>
                        <input id="authEmail" type="text"
                               placeholder="example@mail.com">

                        <label for="authPhone">Phone</label>
                        <input id="authPhone" type="text"
                               placeholder="+77001234567">

                        <label for="authPassword">Password</label>
                        <input id="authPassword" type="password"
                               placeholder="Create password">

                        <label for="authConfirm">Confirm Password</label>
                        <input id="authConfirm" type="password"
                               placeholder="Repeat password">

                        <p id="signupError" class="auth-message"></p>

                        <button class="auth-submit" type="submit">
                            SIGN UP
                        </button>

                    </form>

                    <p class="auth-switch">
                        Already registered?
                        <a href="#" id="switchLogin">Log In</a>
                    </p>

                </div>

                <div id="loginSection" style="display:none;">

                    <h2>WELCOME BACK</h2>

                    <form id="loginForm" novalidate>

                        <label for="loginEmail">Email</label>
                        <input id="loginEmail" type="text"
                               placeholder="Your email">

                        <label for="loginPassword">Password</label>
                        <input id="loginPassword" type="password"
                               placeholder="Your password">

                        <p id="loginError" class="auth-message"></p>

                        <button class="auth-submit" type="submit">
                            LOG IN
                        </button>

                    </form>

                    <p class="auth-switch">
                        Don't have an account?
                        <a href="#" id="switchSignup">Sign Up</a>
                    </p>

                </div>

            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", authHTML);

    const overlay = document.getElementById("authOverlay");

    function openSignup() {
        overlay.style.display = "flex";
        document.getElementById("signupSection").style.display = "block";
        document.getElementById("loginSection").style.display = "none";
    }

    function openLogin() {
        overlay.style.display = "flex";
        document.getElementById("signupSection").style.display = "none";
        document.getElementById("loginSection").style.display = "block";
    }

    function closeAuth() {
        overlay.style.display = "none";
    }

    document.getElementById("signupOpen")?.addEventListener(
        "click", function(e) {
            e.preventDefault();
            openSignup();
        }
    );

    document.getElementById("loginOpen")?.addEventListener(
        "click", function(e) {
            e.preventDefault();
            openLogin();
        }
    );

    document.getElementById("authClose").addEventListener(
        "click", closeAuth
    );

    overlay.addEventListener("click", function(e) {
        if (e.target === overlay) {
            closeAuth();
        }
    });

    document.getElementById("switchLogin").addEventListener(
        "click", function(e) {
            e.preventDefault();
            openLogin();
        }
    );

    document.getElementById("switchSignup").addEventListener(
        "click", function(e) {
            e.preventDefault();
            openSignup();
        }
    );

    // SIGN UP
    document.getElementById("signupForm").addEventListener(
        "submit", function(e) {

            e.preventDefault();

            const name = document.getElementById("authName").value.trim();
            const email = document.getElementById("authEmail").value.trim().toLowerCase();
            const phone = document.getElementById("authPhone").value.trim();
            const password = document.getElementById("authPassword").value;
            const confirm = document.getElementById("authConfirm").value;

            const error = document.getElementById("signupError");

            error.style.color = "#ff5555";

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?[0-9\s()-]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

            if (!name || !email || !phone || !password || !confirm) {
                error.textContent = "Please fill in all fields.";
                return;
            }

            if (!emailRegex.test(email)) {
                error.textContent = "Enter a valid email address.";
                return;
            }

            const digits = phone.replace(/\D/g, "");

            if (!phoneRegex.test(phone) ||
                digits.length < 10 || digits.length > 15) {
                error.textContent = "Enter a valid phone number.";
                return;
            }

            if (!passwordRegex.test(password)) {
                error.textContent =
                    "Password needs 8 characters, uppercase, lowercase and a number.";
                return;
            }

            if (password !== confirm) {
                error.textContent = "Passwords do not match.";
                return;
            }

            const users = getUsers();

            if (users.some(user => user.email === email)) {
                error.textContent = "This email is already registered.";
                return;
            }

            users.push({
                name: name,
                email: email,
                phone: phone,
                password: password
            });

            localStorage.setItem(USERS_KEY, JSON.stringify(users));

            document.getElementById("loginEmail").value = email;
            document.getElementById("signupForm").reset();

            document.getElementById("loginError").style.color = "#28a745";
            document.getElementById("loginError").textContent =
                "Registration successful. Please log in.";

            openLogin();
        }
    );

    // LOG IN
    document.getElementById("loginForm").addEventListener(
        "submit", function(e) {

            e.preventDefault();

            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;

            const error = document.getElementById("loginError");

            if (!email || !password) {
                error.style.color = "#ff5555";
                error.textContent = "Enter your email and password.";
                return;
            }

            const user = getUsers().find(function(item) {
                return item.email === email &&
                       item.password === password;
            });

            if (!user) {
                error.style.color = "#ff5555";
                error.textContent = "Incorrect email or password.";
                return;
            }

            localStorage.setItem(SESSION_KEY, user.email);

            window.location.href = "Profile.html";
        }
    );

    // NAVBAR STATE
    const currentUser = getCurrentUser();

    const signupOpen = document.getElementById("signupOpen");
    const loginOpen = document.getElementById("loginOpen");
    const profileOpen = document.getElementById("profileOpen");
    const logoutBtn = document.getElementById("logoutBtn");

    if (currentUser) {
        signupOpen.style.display = "none";
        loginOpen.style.display = "none";
        profileOpen.style.display = "block";
        logoutBtn.style.display = "block";
    }

    logoutBtn?.addEventListener("click", function(e) {
        e.preventDefault();

        localStorage.removeItem(SESSION_KEY);

        window.location.href = "index.html";
    });

    // PROFILE PAGE
    const profileContent = document.getElementById("profileContent");

    if (profileContent) {

        const user = getCurrentUser();

        if (!user) {
            profileContent.innerHTML = `
                <h2>ACCESS DENIED</h2>
                <p>Please log in to view your profile.</p>
                <button class="auth-submit" id="profileLogin">
                    LOG IN
                </button>
            `;

            document.getElementById("profileLogin").addEventListener(
                "click", openLogin
            );

            return;
        }

        profileContent.innerHTML = `
            <div class="profile-card">
                <div class="profile-avatar">☢</div>
                <h2>WELCOME TO THE ZONE</h2>
                <h3 id="userName"></h3>
                <p>Email: <span id="userEmail"></span></p>
                <p>Phone: <span id="userPhone"></span></p>
                <p class="profile-status">Account Status: Active</p>
                <button class="auth-submit" id="profileLogout">
                    LOG OUT
                </button>
            </div>
        `;

        document.getElementById("userName").textContent = user.name;
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userPhone").textContent = user.phone;

        document.getElementById("profileLogout").addEventListener(
            "click", function() {
                localStorage.removeItem(SESSION_KEY);
                window.location.href = "index.html";
            }
        );
    }

});
