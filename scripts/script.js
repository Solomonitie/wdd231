// Setting the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Setting the last modified date
document.getElementById(
  "lastModified"
).textContent = `Last Update: ${document.lastModified}`;

// Courses array
const courses = [
  { name: "CSE 110", type: "CSE", completed: true, credits: 2},
  { name: "WDD 130", type: "WDD", completed: true, credits: 2},
  { name: "CSE 111", type: "CSE", completed: true, credits: 2},
  { name: "CSE 210", type: "CSE", completed: true, credits: 2},
  { name: "WDD 131", type: "WDD", completed: true, credits: 2},
  { name: "WDD 231", type: "WDD", completed: false, credits: 2},
];

// Function to display courses
function displayCourses(courseList) {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = ""; // Clear existing courses
  courseList.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.textContent = course.name;
    courseDiv.className = course.completed ? "completed" : "not-completed";
    coursesContainer.appendChild(courseDiv);
  });
}

// Filter courses based on type
function filterCourses(type) {
  let filteredCourses = courses;
  if (type !== "all") {
    filteredCourses = courses.filter((course) => course.type === type);
  }
  displayCourses(filteredCourses);
  displayTotalCredits(filteredCourses);

}

// Function to display total credits
function displayTotalCredits(courses) {
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const totalCreditsElement = document.getElementById('totalCredits');
  totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
}

// Menu toggle functionality
function toggleMenu() {
  const menuButton = document.getElementById("menu");
  const navigationList = document.querySelector("ul.navigation");
  
  // Toggle 'open' class on both the menu and the navigation list
  menuButton.classList.toggle("open");
  navigationList.classList.toggle("open"); // Show or hide the menu items
}

// Wait for the window to load before initializing event listeners and displaying content
window.onload = () => {
  // Initial display of courses and total credits
  displayCourses(courses);
  displayTotalCredits(courses);

  // Add event listener to the menu button for mobile menu toggle
  const menuButton = document.getElementById("menu");
  if (menuButton) {
    menuButton.addEventListener("click", toggleMenu);
  }
  // Add event listeners for filter buttons
  document.getElementById("filter-all").addEventListener("click", () => {
    filterCourses("all");
  });
  document.getElementById("filter-cse").addEventListener("click", () => {
    filterCourses("CSE");
  });
  document.getElementById("filter-wdd").addEventListener("click", () => {
    filterCourses("WDD");
  });


};