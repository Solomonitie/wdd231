"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const spotlightContainer = document.querySelector(".spotlight");
  if (spotlightContainer) {
    fetch("./data/members.json")
      .then((response) => response.json())
      .then((data) => {
        // Filter members with gold or silver membership levels
        const eligibleMembers = data.data.filter(
          (member) =>
            member.membershipLevel.includes("gold") ||
            member.membershipLevel.includes("silver")
        );

        // Randomly select 2-3 members
        const selectedMembers = [];
        const numberOfMembers = Math.min(
          eligibleMembers.length,
          Math.floor(Math.random() * 2) + 2
        );
        while (selectedMembers.length < numberOfMembers) {
          const randomIndex = Math.floor(
            Math.random() * eligibleMembers.length
          );
          selectedMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
        }

        // Render the members
        selectedMembers.forEach((member) => {
          const memberDiv = document.createElement("div");
          memberDiv.classList.add("member-card");
          memberDiv.innerHTML = `
              <img src="${member.image}" alt="${member.name} logo" width="100px" height="100px">
              <p>${member.name}</p>
          `;
          spotlightContainer.appendChild(memberDiv);
        });
      })
      .catch((error) => console.error("Error loading members:", error));
  }

  // Get all "Learn More" buttons
  const openButtons = document.querySelectorAll(".modal-open");
  const closeButtons = document.querySelectorAll(".modal-close");
  const modals = document.querySelectorAll(".modal");

  // Function to open a modal
  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "flex";
    });
  });

  // Function to close a modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (modal) modal.style.display = "none";
    });
  });

  // Close modal when clicking outside content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
});

const nav = document.querySelector(".header-nav");
const menuBtn = document.querySelector(".menu-btn");

//  getting current date
const date = new Date();
// getting the current month
let currentMonth = date.getMonth();
// getting the current year
let currentYear = date.getFullYear();

class Switch {
  constructor(switchMode) {
    this.switchBtn = switchMode;
    this.switchBtn.addEventListener("click", () => this.toggleStatus());
    this.switchBtn.addEventListener("keydown", (event) =>
      this.handleKeydown(event)
    );
  }

  handleKeydown(event) {
    // Only do something when space or return is pressed
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.toggleStatus();
    }
  }

  // Switch state of a switch
  toggleStatus() {
    const currentState = this.switchBtn.getAttribute("aria-checked") === "true";
    const switchDot = this.switchBtn.querySelector(".switch span");
    const newState = String(!currentState);

    this.switchBtn.setAttribute("aria-checked", newState);
    switchDot.classList.toggle("moveRight");
  }
}

// // Initialize switches
window.addEventListener("load", function () {
  // Initialize the Switch component on all matching DOM nodes
  Array.from(document.querySelectorAll("[role^=switch]")).forEach((element) => {
    new Switch(element);
  });
  displayChamberMembers();
});

// Displaying Chamber members and there membership status
function displayChamberMembers() {
  const memberCardBox = document.querySelector(".member-card-section");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  const renderMembers = function (members) {
    members.forEach((member) => {
      const html = `
        <div class="member-card">
            <figure>
              <div>
                <img src="${member.image}" alt="${
        member.name
      } logo" width="1000" height="623" loading="lazy">
              </div>
              <figcaption>${member.name}</figcaption>
            </figure>
            <div class="member-info-box">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}">${member.website.slice(8)}</a>
                <img src="${
                  member.membershipLevel
                }" alt="" width="45" height="64">
            </div>
        </div>
      `;
      memberCardBox.insertAdjacentHTML("afterbegin", html);
    });
  };

  const getMembersData = async function () {
    const membersUrl = "./data/members.json";
    const response = await fetch(membersUrl);
    const data = await response.json();
    renderMembers(data.data);
  };
  getMembersData();

  // ///////////////////////////////////////////////////////
  const saveView = function (view) {
    localStorage.setItem("localView", JSON.stringify(view));
  };

  const changeView = function () {
    const btn = this;

    if (memberCardBox.classList.contains("list")) {
      memberCardBox.classList.remove("list");
    } else {
      memberCardBox.classList.remove("grid");
    }
    memberCardBox.classList.add(btn.id.slice(0, 4));
    saveView(btn.id.slice(0, 4));
  };

  const theView = function () {
    const isView = JSON.parse(localStorage.getItem("localView"));
    if (isView && isView != 0) {
      memberCardBox.classList.add(isView);
    }
  };
  theView();

  gridBtn.addEventListener("click", changeView.bind(gridBtn));
  listBtn.addEventListener("click", changeView.bind(listBtn));
}

// //////////////////////////////////////////////
function toggleNav() {
  const toggleMenu = function () {
    nav.classList.toggle("show-nav");
  };

  menuBtn.addEventListener("click", toggleMenu);
}
toggleNav();

// ///////////////////////////////////////////////
// The active page functionality - highlight the current  active
// page
function activePage() {
  function setActiveLink() {
    const navLinks = document.querySelectorAll(".nav-links");
    const currentURL = window.location.href;

    navLinks.forEach((link) => {
      if (currentURL === link.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }
  setActiveLink();
}
