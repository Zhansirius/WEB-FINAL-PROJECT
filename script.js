document.addEventListener("DOMContentLoaded", () => {
    /* 1. Light / Dark Mode Toggle with localStorage */
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        toggleBtns.forEach(btn => btn.textContent = "Dark Mode");
    } else {
        toggleBtns.forEach(btn => btn.textContent = "Light Mode");
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.body.classList.toggle("light-mode");

            let theme = "dark";
            if (document.body.classList.contains("light-mode")) {
                theme = "light";
                toggleBtns.forEach(b => b.textContent = "Dark Mode");
            } else {
                toggleBtns.forEach(b => b.textContent = "Light Mode");
            }

            localStorage.setItem("theme", theme);
        });
    });

    /* 2. FAQ Accordion */
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector("span");
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                if (icon) icon.textContent = "-";
            } else {
                answer.style.display = "none";
                if (icon) icon.textContent = "+";
            }
        });
    });

    /* 3. Contact Us Popup & Validation */
    const contactBtn = document.getElementById("contactUsBtn");
    const popupForm = document.getElementById("popupForm");
    const closePopup = document.getElementById("closePopup");

    if (contactBtn && popupForm) {
        contactBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            popupForm.style.display = "flex";
        });
    }

    if (closePopup && popupForm) {
        closePopup.addEventListener("click", () => {
            popupForm.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (popupForm && e.target === popupForm) {
            popupForm.style.display = "none";
        }
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("popEmail").value.trim();
            const password = document.getElementById("popPassword").value;
            const confirm = document.getElementById("popConfirm").value;

            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");
            const confirmError = document.getElementById("confirmError");

            let isValid = true;

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailError.style.display = "block";
                isValid = false;
            } else {
                emailError.style.display = "none";
            }

            if (password.length < 6) {
                passwordError.style.display = "block";
                isValid = false;
            } else {
                passwordError.style.display = "none";
            }

            if (password !== confirm) {
                confirmError.style.display = "block";
                isValid = false;
            } else {
                confirmError.style.display = "none";
            }

            if (isValid) {
                alert("Form sent successfully!");
                form.reset();
                popupForm.style.display = "none";
            }
        });
    }

    /* 4. Change Background Color */
    const changeBackgroundBtn = document.getElementById("changeBackgroundBtn");
    const backgroundColors = [
        "#0b0b0b",
        "#102a43",
        "#243b2f",
        "#3b243a",
        "#302b1d"
    ];
    let backgroundColorIndex = 0;

    if (changeBackgroundBtn) {
        changeBackgroundBtn.addEventListener("click", function () {
            backgroundColorIndex = (backgroundColorIndex + 1) % backgroundColors.length;
            document.body.style.backgroundColor = backgroundColors[backgroundColorIndex];
        });
    }

    /* 5. Page Transition Animation */
    const overlay = document.getElementById("pageOverlay");
    if (overlay) {
        overlay.classList.remove("active");
    }

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (
                href &&
                !href.startsWith("#") &&
                !href.startsWith("http") &&
                href !== "#" &&
                link.id !== "contactUsBtn"
            ) {
                e.preventDefault();
                if (overlay) {
                    overlay.classList.add("active");
                    setTimeout(() => {
                        window.location.href = href;
                    }, 250);
                } else {
                    window.location.href = href;
                }
            }
        });
    });

    /* 6. Dynamic Greeting (Assignment 5 | Task 1) */
    const timeGreeting = document.getElementById("timeGreeting");
    if (timeGreeting) {
        const hour = new Date().getHours();
        let greeting;

        switch (true) {
            case hour < 12:
                greeting = "Good morning, Stalker!";
                break;
            case hour < 18:
                greeting = "Good afternoon, Stalker!";
                break;
            default:
                greeting = "Good evening, Stalker!";
        }

        timeGreeting.textContent = greeting;
    }

    /* 7. Keyboard Navigation (Assignment 5 | Task 2) */
    const menuLinks = document.querySelectorAll(".navbar-nav .nav-link");
    menuLinks.forEach((link, index) => {
        link.addEventListener("keydown", (event) => {
            let nextIndex = index;

            switch (event.key) {
                case "ArrowDown":
                case "ArrowRight":
                    nextIndex = (index + 1) % menuLinks.length;
                    break;
                case "ArrowUp":
                case "ArrowLeft":
                    nextIndex = (index - 1 + menuLinks.length) % menuLinks.length;
                    break;
                default:
                    return;
            }

            event.preventDefault();
            menuLinks[nextIndex].focus();
        });
    });
});

/* jQuery Features */
$(document).ready(function () {
    /* Scroll Progress Bar */
    $(window).on("scroll", function () {
        let scrollTop = $(window).scrollTop();
        let docHeight = $(document).height();
        let winHeight = $(window).height();
        let scrollable = docHeight - winHeight;
        let scrollPercent = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
        $("#scrollProgressBar").css("width", scrollPercent + "%");
    });

    /* Animated Number Counter */
    $(".counter").each(function () {
        let $this = $(this);
        let target = $this.data("target");

        $({ countNum: Number($this.text()) || 0 }).animate(
            { countNum: target },
            {
                duration: 2500,
                easing: "swing",
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            }
        );
    });

    /* Donate Form Loading Spinner & Toast Notification */
    $(".custom-form").on("submit", function (e) {
        e.preventDefault();

        let $form = $(this);
        let $btn = $form.find(".submit-btn");
        let $btnText = $btn.find(".btn-text");
        let $spinner = $btn.find(".spinner");

        $btn.prop("disabled", true);
        $btnText.hide();
        $spinner.show();

        setTimeout(function () {
            $btn.prop("disabled", false);
            $spinner.hide();
            $btnText.show();

            $form[0].reset();

            $("#toastNotification").text("Donated successfully!").fadeIn(400);

            setTimeout(function () {
                $("#toastNotification").fadeOut(400);
            }, 3000);
        }, 2000);
    });

    /* Copy to Clipboard Button */
    $(".copy-btn").on("click", function () {
        let $btn = $(this);
        let textToCopy = $btn.prev("p").text();

        navigator.clipboard.writeText(textToCopy).then(() => {
            let originalText = $btn.html();
            $btn.html("Copied to clipboard!");
            $btn.addClass("copied");

            setTimeout(() => {
                $btn.html(originalText);
                $btn.removeClass("copied");
            }, 2000);
        }).catch(err => {
            console.error("Copy error:", err);
        });
    });

    /* Search System, Autocomplete & Highlighting (Assignment 6 | Tasks 1, 2, 3) */
    let searchInput = $("#zoneSearch");
    let cards = $(".cards-section .card");
    const SEARCH_KEY = "stalzoneSearchQuery";

    let highlightElements = $(
        ".cards-section .card h3, " +
        ".cards-section .card p, " +
        ".faq-question, " +
        ".faq-answer p"
    );

    highlightElements.each(function () {
        $(this).data("original-html", $(this).html());
    });

    let suggestions = [];

    cards.each(function () {
        let title = $(this).find("h3").first().text().trim();
        if (title !== "" && !suggestions.includes(title)) {
            suggestions.push(title);
        }
    });

    $(".faq-question").each(function () {
        let question = $(this).clone().children().remove().end().text().trim();
        if (question !== "" && !suggestions.includes(question)) {
            suggestions.push(question);
        }
    });

    function showSuggestions(searchText) {
        let suggestionBox = $("#searchSuggestions");
        suggestionBox.empty();

        if (searchText === "") {
            suggestionBox.hide();
            return;
        }

        let matches = suggestions.filter(function (item) {
            return item.toLowerCase().includes(searchText);
        });

        matches.slice(0, 5).forEach(function (item) {
            let button = $("<button>")
                .attr("type", "button")
                .addClass("search-suggestion")
                .text(item);

            suggestionBox.append(button);
        });

        if (matches.length > 0) {
            suggestionBox.show();
        } else {
            suggestionBox.hide();
        }
    }

    function highlightTextNodes(element, regex) {
        let nodes = Array.from(element.childNodes);

        nodes.forEach(function (node) {
            if (node.nodeType === 3) {
                let text = node.nodeValue;
                let matches = text.match(regex);

                if (matches) {
                    let fragment = document.createDocumentFragment();
                    let lastIndex = 0;

                    regex.lastIndex = 0;
                    let match;

                    while ((match = regex.exec(text)) !== null) {
                        fragment.appendChild(
                            document.createTextNode(text.substring(lastIndex, match.index))
                        );

                        let span = document.createElement("span");
                        span.className = "search-highlight";
                        span.textContent = match[0];

                        fragment.appendChild(span);
                        lastIndex = regex.lastIndex;
                    }

                    fragment.appendChild(
                        document.createTextNode(text.substring(lastIndex))
                    );

                    node.parentNode.replaceChild(fragment, node);
                }
            } else if (node.nodeType === 1) {
                highlightTextNodes(node, regex);
            }
        });
    }

    function highlightSearch(searchText) {
        highlightElements.each(function () {
            $(this).html($(this).data("original-html"));
        });

        if (searchText === "") {
            return;
        }

        let escapedText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        let regex = new RegExp(escapedText, "gi");

        highlightElements.each(function () {
            highlightTextNodes(this, regex);
        });
    }

    function performSearch() {
        if (searchInput.length === 0) return;

        let searchText = searchInput.val().toLowerCase().trim();
        let visibleCards = 0;

        localStorage.setItem(SEARCH_KEY, searchText);

        cards.each(function () {
            let cardText = $(this).text().toLowerCase();
            let match = cardText.includes(searchText);

            $(this).toggleClass("d-none", !match);

            if (match) {
                visibleCards++;
            }
        });

        $("#searchResults").text("Found items: " + visibleCards);

        if (visibleCards === 0) {
            $("#noResults").show();
        } else {
            $("#noResults").hide();
        }

        showSuggestions(searchText);
        highlightSearch(searchText);
    }

    if (searchInput.length > 0) {
        searchInput.on("input", performSearch);

        let savedSearch = localStorage.getItem(SEARCH_KEY);
        if (savedSearch !== null && savedSearch !== "") {
            searchInput.val(savedSearch);
            performSearch();
        } else {
            $("#searchResults").text("Showing all items");
            $("#noResults").hide();
        }
    }

    $("#searchSuggestions").on("click", ".search-suggestion", function () {
        let selectedText = $(this).text();
        searchInput.val(selectedText);
        searchInput.trigger("input");
        $("#searchSuggestions").hide();
    });

    $(document).on("click", function (event) {
        if (!$(event.target).closest(".search-container").length) {
            $("#searchSuggestions").hide();
        }
    });

    /* Public API: Chernobyl Weather via Open-Meteo */
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=51.2763&longitude=30.2219&current_weather=true";

    if ($("#weatherWidget").length > 0) {
        $.ajax({
            url: weatherApiUrl,
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (data && data.current_weather) {
                    $("#weatherTemp").text(data.current_weather.temperature);
                    $("#weatherWind").text(data.current_weather.windspeed);

                    $("#weatherLoading").hide();
                    $("#weatherData").fadeIn();
                } else {
                    showWeatherError();
                }
            },
            error: function () {
                showWeatherError();
            }
        });
    }

    function showWeatherError() {
        $("#weatherLoading").hide();
        $("#weatherError").show();
    }
});