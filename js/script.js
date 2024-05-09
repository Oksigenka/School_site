document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.header .navbar')
    navbar.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove('active');
        })
    });

    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.add('active');
    }
    document.querySelector('#close-navbar').onclick = () => {
        navbar.classList.remove('active');
    };

    const registerBtn = document.querySelector('.account-form .register-btn')
    const loginBtn = document.querySelector('.account-form .login-btn')

    registerBtn.addEventListener("click", () => {
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
        document.querySelector('.account-form .login-form').classList.remove('active');
        document.querySelector('.account-form .register-form').classList.add('active');
    });

    loginBtn.addEventListener("click", () => {
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
        document.querySelector('.account-form .login-form').classList.add('active');
        document.querySelector('.account-form .register-form').classList.remove('active');
    });

    const accountForm = document.querySelector('.account-form')

    document.querySelector('#account-btn').onclick = () => {
        accountForm.classList.add('active');
    }
    document.querySelector('#close-form').onclick = () => {
        accountForm.classList.remove('active');
    };

    // var swiper = new Swiper(".home-slide", {
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    //     loop: true,
    //     grabCursir: true,
    // });
    // var swiper = new Swiper(".home-slide", {
    //     zoom: true,
    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    //     loop: true,
    //     grabCursir: true,
    // });
    var swiper = new Swiper(".home-slide", {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        grabCursir: true,
    });
    // var swiper = new Swiper(".teachers-slider", {
    //     loop: true,
    //     grabCursir: true,
    //     spaceBetween: 20,
    //     breakpoints: {
    //         0: {
    //             slidesPerView: 1,
    //         },
    //         768: {
    //             slidesPerView: 2,
    //         },
    //         991: {
    //             slidesPerView: 3,
    //         },
    //     },
    // });

    var swiper = new Swiper(".teachers-slider", {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        grabCursir: true,
    });

    const according = document.querySelectorAll('.faq .accordion-container .accordion');
    according.forEach(acco => {
        acco.onclick = () => {
            according.forEach(dion => dion.classList.remove('active'));
            acco.classList.toggle('active');
        };
    });

    // document.addEventListener('DOMContentLoaded', function () {
    //     const according = document.querySelectorAll('.faq .accordion-container .accordion');
    //     according.forEach(acco => {
    //         acco.onclick = () => {
    //             acco.classList.toggle('active');
    //         };
    //     });
    // });



    // document.querySelector('.load-more .btn').onclick = () => {
    //     document.querySelectorAll('.courses .box-container .hide').forEach(show => {
    //         show.style.display = 'block';
    //     });
    //     document.querySelector('.load-more .btn').style.display = 'none';
    // };
    const loadMoreBtn = document.querySelector('.load-more .btn');

    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            document.querySelectorAll('.courses .box-container .hide').forEach(show => {
                show.style.display = 'block';
            });
            loadMoreBtn.style.display = 'none';
        };
    }


    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const messageForm = document.getElementById("messageForm");
    const loginBtn1 = document.getElementById('login');
    const registerBtn1 = document.getElementById('register');
    const submit = document.getElementById('submit');

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");
        if (email.value == "" || password.value == "") {
            alert("Ensure you input a value in both fields!");
        } else {
            alert("This form has been successfully submitted!");
            console.log(`This form has a username of ${email.value} and password of ${password.value}`);
            email.value = "";
            password.value = "";
        }
    });

    loginBtn1.addEventListener('click', (e) => {
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");

        email = email.value;
        localStorage.setItem('loginEmail', email);
        password = password.value;
        localStorage.setItem('loginPassword', password);
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("registerName");
        const email = document.getElementById("registerEmail");
        const password = document.getElementById("registerPassword");
        const confPassword = document.getElementById("confirmPassword");
        if (name.value == "" || email.value == "" || password.value == "" || confPassword.value == "") {
            alert("Ensure you input a value in both fields!");
        } else {
            alert("This form has been successfully submitted!");
            console.log(`This form has a username of ${email.value} and password of ${password.value}`);
            name.value = "";
            email.value = "";
            password.value = "";
            confPassword.value = "";
        }
    });

    registerBtn1.addEventListener('click', (e) => {
        const name = document.getElementById("registerName");
        const email = document.getElementById("registerEmail");
        const password = document.getElementById("registerPassword");
        const confPassword = document.getElementById("confirmPassword");

        name = name.value;
        localStorage.setItem('registerName', name);
        email = email.value;
        localStorage.setItem('registerEmail', email);
        password = password.value;
        localStorage.setItem('registerPassword', password);
        confPassword = confPassword.value;
        localStorage.setItem('confirmPassword', confPassword);
    });

    messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const number = document.getElementById("number");
        const message = document.getElementById("message");
        if (name.value == "" || email.value == "" || message.value == "") {
            alert("Ensure you input a value in both fields!");
        } else {
            alert("This form has been successfully submitted!");
            console.log(`This form has a username of ${email.value} and password of ${name.value}`);
            name.value = "";
            email.value = "";
            number.value = "";
            message.value = "";
        }
    });

    submit.addEventListener('click', (e) => {
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const number = document.getElementById("number");
        const message = document.getElementById("message");

        name = name.value;
        localStorage.setItem('name', name);
        email = email.value;
        localStorage.setItem('email', email);
        number = number.value;
        localStorage.setItem('number', number);
        message = message.value;
        localStorage.setItem('message', message);
    });
});


function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
    console.log(error);
}
function renderButton() {
    gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}