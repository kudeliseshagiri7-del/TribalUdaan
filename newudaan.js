function showRegister() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("registerPage").classList.remove("hidden");
}


function showLogin() {
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}


function register() {
    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const message = document.getElementById("registerMessage");

    if (!name || !email || !password) {
        message.textContent = "Please fill in your name, email, and password.";
        return;
    }

    const account = { name, email, password };
    localStorage.setItem("tribalAccount", JSON.stringify(account));
    localStorage.setItem("tribalUser", JSON.stringify(account));
    localStorage.setItem("loggedIn", "true");
    openApplication(account);
}


function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    const account = JSON.parse(localStorage.getItem("tribalAccount"));

    if (!account || account.email !== email || account.password !== password) {
        message.textContent = "Invalid email or password.";
        return;
    }

    localStorage.setItem("tribalUser", JSON.stringify(account));
    localStorage.setItem("loggedIn", "true");
    openApplication(account);
}


function openApplication(account) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("registerPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");

    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");
    const certificateName = document.getElementById("certificateName");

    if (profileName) profileName.value = account.name;
    if (profileEmail) profileEmail.value = account.email;
    if (certificateName) certificateName.textContent = account.name;
}


function logout() {
    localStorage.removeItem("loggedIn");
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("loginMessage").textContent = "";
    document.getElementById("loginPassword").value = "";
}


function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.add("hidden");
    });

    const selected =
        document.getElementById(pageId);

    if (selected) {
        selected.classList.remove("hidden");
    }
}


function toggleDarkMode() {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem(
        "darkMode",
        dark
    );
}


function saveProfile() {

    const name =
        document.getElementById("profileName").value;

    const email =
        document.getElementById("profileEmail").value;

    const account =
        JSON.parse(
            localStorage.getItem("tribalAccount")
        );

    if (!account) return;

    account.name = name;
    account.email = email;

    localStorage.setItem(
        "tribalAccount",
        JSON.stringify(account)
    );
    localStorage.setItem(
        "tribalUser",
        JSON.stringify(account)
    );

    document.getElementById(
        "profileMessage"
    ).textContent =
        "✅ Profile updated successfully!";
}


function downloadCertificate() {

    const user =
        JSON.parse(
            localStorage.getItem("tribalAccount")
        );

    const name =
        user ? user.name : "Student";

    const certificate = `
TRIBAL UDAAN

CERTIFICATE OF COMPLETION

This certificate is proudly presented to

${name}

for successfully participating in the
Tribal Udaan Learning Program.

Learn | Prepare | Build your Future
`;

    const blob =
        new Blob(
            [certificate],
            { type: "text/plain" }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;
    a.download = "Tribal-Udaan-Certificate.txt";

    a.click();

    URL.revokeObjectURL(url);
}


window.onload = function () {

    if (
        localStorage.getItem("darkMode") === "true"
    ) {
        document.body.classList.add("dark");
    }

    if (
        localStorage.getItem("loggedIn") === "true"
    ) {

        document.getElementById("loginPage")
            .classList.add("hidden");

        document.getElementById("app")
            .classList.remove("hidden");

        const account = JSON.parse(localStorage.getItem("tribalAccount"));
        if (account) {
            openApplication(account);
        }
    }
};