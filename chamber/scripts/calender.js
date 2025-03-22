const calendarGrid = document.getElementById('calendar-grid');
const currentMonthElement = document.getElementById('current-month');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Event dates (example)
const eventDates = [
  new Date(currentYear, currentMonth, 5),
  new Date(currentYear, currentMonth, 15),
  new Date(currentYear, currentMonth, 25),
];

// Function to render the calendar
function renderCalendar(month, year) {
  calendarGrid.innerHTML = ''; // Clear the calendar

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  currentMonthElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement('div');
    calendarGrid.appendChild(emptyCell);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.textContent = day;

    // Check if the day is an event day
    const currentDay = new Date(year, month, day);
    if (eventDates.some((eventDate) => eventDate.toDateString() === currentDay.toDateString())) {
      dayCell.classList.add('event-day');
    }

    calendarGrid.appendChild(dayCell);
  }
}

// Event listeners for previous and next month buttons
prevMonthButton.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

// Render the initial calendar
renderCalendar(currentMonth, currentYear);