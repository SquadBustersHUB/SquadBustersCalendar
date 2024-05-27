const calendarData = {
    "April 2024": {
        days: 30,
        startDay: 0, // Monday
        images: {
            23: { src: "April/imageapril23.png", text: "This is a test to see if it works." },
            25: { src: "April/imageapril25.png", text: "Event details for April 25nd" },
            26: { src: "April/imageapril26.png", text: "Event details for April 26nd" },
            // Add images and texts for other days if needed
        }
    },
    "May 2024": {
        days: 31,
        startDay: 3, // Wednesday
        images: {
            1: { src: "May/imagemay1.png", text: "Event details for May 1st" },
            2: { src: "May/imagemay2.png", text: "Event details for May 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "June 2024": {
        days: 30,
        startDay: 5, // Saturday
        images: {
            1: { src: "June/imagejune1.png", text: "Event details for June 1st" },
            2: { src: "June/imagejune2.png", text: "Event details for June 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "July 2024": {
        days: 31,
        startDay: 0, // Monday
        images: {
            1: { src: "July/imagejuly1.png", text: "Event details for July 1st" },
            2: { src: "July/imagejuly2.png", text: "Event details for July 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "August 2024": {
        days: 31,
        startDay: 3, // Thursday
        images: {
            1: { src: "August/imageaugust1.png", text: "Event details for August 1st" },
            2: { src: "August/imageaugust2.png", text: "Event details for August 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "September 2024": {
        days: 30,
        startDay: 6, // Sunday
        images: {
            1: { src: "September/imageseptember1.png", text: "Event details for September 1st" },
            2: { src: "September/imageseptember2.png", text: "Event details for September 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "October 2024": {
        days: 31,
        startDay: 1, // Tuesday
        images: {
            1: { src: "October/imageoctober1.png", text: "Event details for October 1st" },
            2: { src: "October/imageoctober2.png", text: "Event details for October 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "November 2024": {
        days: 30,
        startDay: 4, // Friday
        images: {
            1: { src: "November/imagenovember1.png", text: "Event details for November 1st" },
            2: { src: "November/imagenovember2.png", text: "Event details for November 2nd" },
            // Add images and texts for other days if needed
        }
    },
    "December 2024": {
        days: 31,
        startDay: 6, // Sunday
        images: {
            1: { src: "December/imagedecember1.png", text: "Event details for December 1st" },
             // Add images and texts for other days if needed
        }
    }
};

let currentMonthIndex = 1; // Assuming starting from May 2024
const months = Object.keys(calendarData);

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

    // Add click event listener for images
    const imagesInCalendar = document.querySelectorAll(".day-image");
    imagesInCalendar.forEach(image => {
        image.addEventListener("click", (event) => {
            const modal = document.getElementById("modal");
            const modalText = document.getElementById("modalText");
            modalText.innerHTML = event.target.dataset.text;
            modal.style.display = "block";
        });
    });

    // Add click event listener for modal close button
    const modalClose = document.querySelector(".close");
    modalClose.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
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

// Initialize the calendar
generateCalendar(months[currentMonthIndex]);
