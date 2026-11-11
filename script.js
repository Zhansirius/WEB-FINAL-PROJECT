document.addEventListener("DOMContentLoaded", () => {
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector("span");
            if (answer.style.display === "none" || answer.style.display === "") {
                answer.style.display = "block";
                icon.textContent = "-";
            } else {
                answer.style.display = "none";
                icon.textContent = "+";
            }
        });
    });

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
        if (e.target === popupForm) {
            popupForm.style.display = "none";
        }
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const email = document.getElementById("popEmail").value;
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
});

/* Task 4: Change Background Color */
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
    changeBackgroundBtn.addEventListener("click", function() {
        backgroundColorIndex++;

        if (backgroundColorIndex >= backgroundColors.length) {
            backgroundColorIndex = 0;
        }

        document.body.style.backgroundColor =
            backgroundColors[backgroundColorIndex];
    });
}

/* Task 5: Display Current Date and Time */
const currentDateTime = document.getElementById("currentDateTime");

function updateDateTime() {
    const now = new Date();

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    }).format(now);

    if (currentDateTime) {
        currentDateTime.textContent = formattedDate;
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

/* Page transition animation */
document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("pageOverlay");

    if (overlay) {
        overlay.classList.remove("active");
    }

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !href.startsWith("http") && href !== "#" && link.id !== "contactUsBtn") {
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
});

/* Sound Randomizer */
const playRandomSoundBtn = document.getElementById("playRandomSoundBtn");

const soundFiles = [
    "assets/sounds/sound1.mp3",
    "assets/sounds/sound2.mp3",
    "assets/sounds/sound3.mp3",
    "assets/sounds/sound4.mp3",
    "assets/sounds/sound5.mp3",
    "assets/sounds/sound6.mp3",
    "assets/sounds/sound7.mp3"
];

let currentAudio = null;
let lastSoundIndex = -1;

if (playRandomSoundBtn) {
    playRandomSoundBtn.addEventListener("click", function() {
        if (soundFiles.length === 0) return;

        let randomIndex;

        if (soundFiles.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * soundFiles.length);
            } while (randomIndex === lastSoundIndex);
        } else {
            randomIndex = 0;
        }

        lastSoundIndex = randomIndex;
        const selectedSound = soundFiles[randomIndex];

        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        currentAudio = new Audio(selectedSound);
        currentAudio.volume = 0.5;

        currentAudio.play().catch(error => {
            console.warn("Audio error:", error);
        });
    });
}

// Assignment 5 | Task 1: Dynamic greeting using switch
const timeGreeting = document.getElementById("timeGreeting");

function showGreeting() {
    if (!timeGreeting) return;

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

showGreeting();

// Assignment 5 | Task 2: Keyboard navigation
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(
        ".navbar-nav .nav-link"
    );

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
                    nextIndex =
                        (index - 1 + menuLinks.length) % menuLinks.length;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            menuLinks[nextIndex].focus();
        });
    });
});

// Task 0: Setup jQuery
$(document).ready(function() {
    console.log("jQuery is ready!");

    // Task 4: Colorful and Stylized Scroll Progress Bar
    $(window).scroll(function() {
        let scrollTop = $(window).scrollTop();
        let docHeight = $(document).height();
        let winHeight = $(window).height();
        let scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        $('#scrollProgressBar').css('width', scrollPercent + '%');
    });

    // Task 5: Animated Number Counter
    $('.counter').each(function() {
        let $this = $(this);
        let target = $this.data('target');
        
        $({ countNum: $this.text() }).animate({
            countNum: target
        }, {
            duration: 2500,
            easing: 'swing',
            step: function() {
                $this.text(Math.floor(this.countNum));
            },
            complete: function() {
                $this.text(this.countNum);
            }
        });
    });

    // Task 6 & 7: Loading spinner on Submit & Notification System
    $('.custom-form').on('submit', function(e) {
        e.preventDefault();
        
        let $btn = $(this).find('.submit-btn');
        let $btnText = $btn.find('.btn-text');
        let $spinner = $btn.find('.spinner');
        
        // Task 6: Spinner
        $btn.prop('disabled', true);
        $btnText.hide();
        $spinner.show();
        
        // Server processing simulation (2-second delay)
        setTimeout(function() {
            $btn.prop('disabled', false);
            $spinner.hide();
            $btnText.show();
            
            $('.custom-form')[0].reset();
            
            // Task 7: Notification
            $('#toastNotification').text("Donated successfully!").fadeIn(400);
            
            // Hide notification
            setTimeout(function() {
                $('#toastNotification').fadeOut(400);
            }, 3000);
            
        }, 2000);
    });

    // Task 8: Copy to Clipboard Button
    $('.copy-btn').on('click', function() {
        let $btn = $(this);
        // Extract text
        let textToCopy = $btn.prev('p').text();
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            let originalText = $btn.html();
            $btn.html('Copied to clipboard!');
            $btn.addClass('copied');

            setTimeout(() => {
                $btn.html(originalText);
                $btn.removeClass('copied');
            }, 2000);
        }).catch(err => {
            console.error('Copy error: ', err);
        });
    });

    // Assignment 6 | Task 1: Real-time Search and Live Filter
    let searchInput = $('#zoneSearch');
    let cards = $('.cards-section .card');

    searchInput.on('keyup', function() {
        let searchText = $(this).val().toLowerCase();
        let visibleCards = 0;

        cards.filter(function() {
            let cardText = $(this).text().toLowerCase();
            let match = cardText.includes(searchText);
            let cardColumn = $(this).closest('.col-md-4');

            if (cardColumn.length > 0) {
                cardColumn.toggleClass('d-none', !match);
            } else {
                $(this).toggleClass('d-none', !match);
            }

            if (match) {
                visibleCards++;
            }

            return match;
        });

        $('#searchResults').text('Found items: ' + visibleCards);

        if (visibleCards === 0) {
            $('#noResults').show();
        } else {
            $('#noResults').hide();
        }

        showSuggestions(searchText);
        highlightSearch(searchText);
    });

    // Assignment 6 | Task 2: Autocomplete Search Suggestions
    let suggestions = [];

    cards.each(function() {
        let title = $(this).find('h3').first().text().trim();

        if (title !== '' && !suggestions.includes(title)) {
            suggestions.push(title);
        }
    });

    $('.faq-question').each(function() {
        let question = $(this).clone()
            .children()
            .remove()
            .end()
            .text()
            .trim();

        if (question !== '' && !suggestions.includes(question)) {
            suggestions.push(question);
        }
    });

    function showSuggestions(searchText) {
        let suggestionBox = $('#searchSuggestions');
        suggestionBox.empty();

        if (searchText === '') {
            suggestionBox.hide();
            return;
        }

        let matches = suggestions.filter(function(item) {
            return item.toLowerCase().includes(searchText);
        });

        matches.slice(0, 5).forEach(function(item) {
            let button = $('<button>')
                .addClass('search-suggestion')
                .text(item);

            suggestionBox.append(button);
        });

        if (matches.length > 0) {
            suggestionBox.show();
        } else {
            suggestionBox.hide();
        }
    }

    // Select a suggestion
    $('#searchSuggestions').on('click', '.search-suggestion', function() {
        let selectedText = $(this).text();
        searchInput.val(selectedText);
        searchInput.trigger('keyup');
        $('#searchSuggestions').hide();
    });

    // Hide suggestions when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.search-container').length) {
            $('#searchSuggestions').hide();
        }
    });

    // Assignment 6 | Task 3: Search Highlighting
    let highlightElements = $(
        '.cards-section .card h3, ' +
        '.cards-section .card p, ' +
        '.faq-question, ' +
        '.faq-answer p'
    );

    // Save original HTML
    highlightElements.each(function() {
        $(this).data('original-html', $(this).html());
    });

    function highlightTextNodes(element, regex) {
        let nodes = Array.from(element.childNodes);

        nodes.forEach(function(node) {
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
                            document.createTextNode(
                                text.substring(lastIndex, match.index)
                            )
                        );

                        let span = document.createElement('span');
                        span.className = 'search-highlight';
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
        // Restore original content first
        highlightElements.each(function() {
            $(this).html($(this).data('original-html'));
        });

        if (searchText === '') {
            return;
        }

        // Escape special regex characters
        let escapedText = searchText.replace(
            /[.*+?^${}()|[\]\\]/g,
            '\\$&'
        );

        let regex = new RegExp(escapedText, 'gi');

        highlightElements.each(function() {
            highlightTextNodes(this, regex);
        });
    }

    // Assignment 6 | Task 9: Image Lazy Loading
    function loadImages() {
        let scrollPosition = $(window).scrollTop();
        let windowHeight = $(window).height();

        $('img[data-src]').each(function() {
            let image = $(this);
            let imagePosition = image.offset().top;

            // Check if image is near the visible area
            if (imagePosition < scrollPosition + windowHeight + 150) {
                let imageSource = image.attr('data-src');

                // Load the image
                image.attr('src', imageSource);

                // Remove data-src after loading
                image.removeAttr('data-src');
            }
        });
    }

    // Check images when scrolling
    $(window).on('scroll', function() {
        loadImages();
    });

    // Check images when page opens
    loadImages();
});

/* Light / Dark Mode Toggle with localStorage */
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    const currentTheme = localStorage.getItem("theme");

    // Apply saved theme on page load
    if (currentTheme === "light") {
        document.body.classList.add("light-mode");
        toggleBtns.forEach(btn => btn.textContent = "Dark Mode");
    } else {
        toggleBtns.forEach(btn => btn.textContent = "Light Mode");
    }

    // Event listener for toggle button
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
            
            // Save theme state to localStorage
            localStorage.setItem("theme", theme);
        });
    });
});

/* Public API: Chernobyl Weather via Open-Meteo */
$(document).ready(function() {
    // Координаты Чернобыля: 51.2763, 30.2219
    const weatherApiUrl = "https://api.open-meteo.com/v1/forecast?latitude=51.2763&longitude=30.2219&current_weather=true";

    if ($("#weatherWidget").length > 0) {
        $.ajax({
            url: weatherApiUrl,
            method: "GET",
            dataType: "json",
            success: function(data) {
                if (data && data.current_weather) {
                    const temp = data.current_weather.temperature;
                    const wind = data.current_weather.windspeed;

                    $("#weatherTemp").text(temp);
                    $("#weatherWind").text(wind);

                    $("#weatherLoading").hide();
                    $("#weatherData").fadeIn();
                } else {
                    showWeatherError();
                }
            },
            error: function() {
                showWeatherError();
            }
        });
    }

    function showWeatherError() {
        $("#weatherLoading").hide();
        $("#weatherError").show();
    }
});