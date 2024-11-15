document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const messageForm = document.getElementById("messageForm");
    const messageList = document.getElementById("messageList");

    // Register Form
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("regUsername").value;
            const password = document.getElementById("regPassword").value;
            localStorage.setItem(username, password);
            alert("Registration successful!");
            window.location.href = "index.html";
        });
    }

    // Login Form
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;
            const storedPassword = localStorage.getItem(username);

            if (storedPassword === password) {
                sessionStorage.setItem("authenticatedUser", username);
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials");
            }
        });
    }

    // Logout
    window.logout = () => {
        sessionStorage.removeItem("authenticatedUser");
        window.location.href = "index.html";
    };

    // Message Form
    if (messageForm) {
        messageForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const content = document.getElementById("messageContent").value;
            const username = sessionStorage.getItem("authenticatedUser");

            if (username) {
                let messages = JSON.parse(localStorage.getItem("messages")) || [];
                messages.push({ user: username, content });
                localStorage.setItem("messages", JSON.stringify(messages));
                alert("Message posted!");
                displayMessages();
            } else {
                alert("Please log in to post messages.");
            }
        });
    }

    // Display Messages
    if (messageList) {
        displayMessages();
    }

    function displayMessages() {
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messageList.innerHTML = "";

        messages.forEach((msg, index) => {
            const li = document.createElement("li");
            li.textContent = `User: ${msg.user} - Message: ${msg.content}`;
            li.addEventListener("click", () => {
                sessionStorage.setItem("selectedMessage", JSON.stringify(msg));
                window.location.href = "message.html";
            });
            messageList.appendChild(li);
        });
    }

    // Message Details
    if (document.getElementById("messageDetails")) {
        const msg = JSON.parse(sessionStorage.getItem("selectedMessage"));
        if (msg) {
            document.getElementById("messageDetails").textContent = `User: ${msg.user} - Message: ${msg.content}`;
        } else {
            document.getElementById("messageDetails").textContent = "No message selected.";
        }
    }
});
