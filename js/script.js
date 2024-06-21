const calendarData = {
    "April 2024": {
        days: 30,
        startDay: 0, // Monday
        images: {
            23: { src: "April/imageapril23.png", text: "Soft launch Squad Busters" },
            // Add images and texts for other days if needed
        }
    },
    "May 2024": {
        days: 31,
        startDay: 2, // Wednesday
        images: {
            29: { src: "May/imagemay29.png", text: "Global launch Squad Busters." },
            // Add images and texts for other days if needed
        }
    },
    "June 2024": {
        days: 30,
        startDay: 5, // Saturday
        images: {
            17: { src: "June/imagejune17.png", text: "The Ninja Goblin was the first ever skin in Squad Busters." },
            // Add images and texts for other days if needed
        }
    },
    "July 2024": {
        days: 31,
        startDay: 0, // Monday
        images: {

            // Add images and texts for other days if needed
        }
    },
    "August 2024": {
        days: 31,
        startDay: 3, // Thursday
        images: {

            // Add images and texts for other days if needed
        }
    },
    "September 2024": {
        days: 30,
        startDay: 6, // Sunday
        images: {

            // Add images and texts for other days if needed
        }
    },
    "October 2024": {
        days: 31,
        startDay: 1, // Tuesday
        images: {

            // Add images and texts for other days if needed
        }
    },
    "November 2024": {
        days: 30,
        startDay: 4, // Friday
        images: {

            // Add images and texts for other days if needed
        }
    },
    "December 2024": {
        days: 31,
        startDay: 6, // Sunday
        images: {

             // Add images and texts for other days if needed
        }
    }
};

const months = Object.keys(calendarData);

function getCurrentMonthIndex() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[currentMonth] + " " + currentYear;
    
    console.log("Current date: ", currentDate);
    console.log("Calculated current month name: ", currentMonthName);
    console.log("Months array: ", months);
    
    return months.indexOf(currentMonthName);
}

let currentMonthIndex = getCurrentMonthIndex();

if (currentMonthIndex === -1) {
    // Default to the first month if current month is not found (for debug purposes)
    currentMonthIndex = 0;
}

function generateCalendar(month) {
    const monthData = calendarData[month];
    const daysInMonth = monthData.days;
    const startDay = monthData.startDay;
    const images = monthData.images || {};
    const calendarBody = document.getElementById("calendarBody");
    const calendarHeader = document.getElementById("calendarHeader");

    calendarHeader.innerHTML = month;
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("td");

            if (i === 0 && j < startDay) {
                cell.innerHTML = "";
            } else if (date > daysInMonth) {
                cell.innerHTML = "";
            } else {
                cell.innerHTML = `<span class="day-number"><b>${date}</b></span>`;
                if (images[date]) {
                    cell.innerHTML += `<img src="${images[date].src}" alt="Image ${date}" class="day-image" data-text="${images[date].text}">`;
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }

    const imagesInCalendar = document.querySelectorAll(".day-image");
    imagesInCalendar.forEach(image => {
        image.addEventListener("click", (event) => {
            const modal = document.getElementById("modal");
            const modalText = document.getElementById("modalText");
            modalText.innerHTML = event.target.dataset.text;
            modal.style.display = "block";
        });
    });

    const modalClose = document.querySelector(".close");
    modalClose.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        const modal = document.getElementById("modal");
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

document.getElementById("prevMonth").addEventListener("click", () => {
    if (currentMonthIndex > 0) {
        currentMonthIndex--;
        generateCalendar(months[currentMonthIndex]);
    }
});

document.getElementById("nextMonth").addEventListener("click", () => {
    if (currentMonthIndex < months.length - 1) {
        currentMonthIndex++;
        generateCalendar(months[currentMonthIndex]);
    }
});

generateCalendar(months[currentMonthIndex]);

const suggestionForm = document.getElementById("suggestionForm");
    const suggestionInput = document.getElementById("suggestionInput");
    const suggestionsList = document.getElementById("suggestionsList");

    function loadSuggestions() {
        const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
        suggestionsList.innerHTML = '';
        suggestions.forEach((suggestion, index) => {
            const suggestionItem = document.createElement("div");
            suggestionItem.className = "suggestion-item";
            suggestionItem.innerHTML = `
                <h3>Suggestion ${index + 1}</h3>
                <p>${suggestion.text}</p>
                <div class="comments-list" id="commentsList${index}"></div>
                <form class="comment-form" data-index="${index}">
                    <input type="text" class="comment-input" placeholder="Add a comment" required>
                    <button type="submit" class="comment-button">Comment</button>
                </form>
            `;
            suggestionsList.appendChild(suggestionItem);
            loadComments(index, suggestion.comments);
        });
    }

    function loadComments(suggestionIndex, comments) {
        const commentsList = document.getElementById(`commentsList${suggestionIndex}`);
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentItem = document.createElement("div");
            commentItem.className = "comment-item";
            commentItem.textContent = comment;
            commentsList.appendChild(commentItem);
        });
    }

    suggestionForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const suggestionText = suggestionInput.value.trim();
        if (suggestionText) {
            const suggestions = JSON.parse(localStorage.getItem("suggestions")) || [];
            suggestions.push({ text: suggestionText, comments: [] });
            localStorage.setItem("suggestions", JSON.stringify(suggestions));
            suggestionInput.value = '';
            loadSuggestions();
        }
    });

    suggestionsList.addEventListener("submit", (event) => {
        if (event.target.classList.contains("comment-form")) {
            event.preventDefault();
            const commentInput = event.target.querySelector(".comment-input");
            const commentText = commentInput.value.trim();
            const suggestionIndex = event.target.dataset.index;
            if (commentText) {
                const suggestions = JSON.parse(localStorage.getItem("suggestions"));
                suggestions[suggestionIndex].comments.push(commentText);
                localStorage.setItem("suggestions", JSON.stringify(suggestions));
                commentInput.value = '';
                loadComments(suggestionIndex, suggestions[suggestionIndex].comments);
            }
        }
    });

    loadSuggestions();
});
