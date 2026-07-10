"use strict";

/*
  ==========================================================
  SOUTHERNRUST WEBSITE SETTINGS
  ==========================================================

  Change your Discord invite link below.

  Example:
  const DISCORD_INVITE = "https://discord.gg/southernrust";

  Change NEXT_WIPE_DATE when you know the next wipe date.

  New Zealand daylight time:
  +13:00

  New Zealand standard time:
  +12:00

  Example:
  const NEXT_WIPE_DATE = "2026-08-06T19:00:00+12:00";
*/

const DISCORD_INVITE =
  "https://discord.gg/55vTyJVRf";

const NEXT_WIPE_DATE =
  "2026-08-06T19:00:00+12:00";

/*
  Server browser name.
  Change this if your final server name is different.
*/

const SERVER_NAME = "SouthernRust";

/*
  ==========================================================
  PAGE ELEMENTS
  ==========================================================
*/

const navbar = document.getElementById("navbar");

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const navLinks =
  document.getElementById("navLinks");

const discordLinks =
  document.querySelectorAll(".discord-link");

const serverNameElement =
  document.getElementById("serverName");

const copyServerButton =
  document.getElementById("copyServerButton");

const notification =
  document.getElementById("notification");

const currentYear =
  document.getElementById("currentYear");

const countdownDays =
  document.getElementById("countdownDays");

const countdownHours =
  document.getElementById("countdownHours");

const countdownMinutes =
  document.getElementById("countdownMinutes");

const countdownSeconds =
  document.getElementById("countdownSeconds");

const wipeDateText =
  document.getElementById("wipeDateText");

/*
  ==========================================================
  DISCORD LINKS
  ==========================================================
*/

function configureDiscordLinks() {
  discordLinks.forEach((link) => {
    link.href = DISCORD_INVITE;
  });
}

configureDiscordLinks();

/*
  ==========================================================
  SERVER NAME
  ==========================================================
*/

if (serverNameElement) {
  serverNameElement.textContent = SERVER_NAME;
}

/*
  ==========================================================
  MOBILE NAVIGATION
  ==========================================================
*/

function openMobileMenu() {
  mobileMenuButton.classList.add("active");
  navLinks.classList.add("active");
  document.body.classList.add("menu-open");

  mobileMenuButton.setAttribute(
    "aria-label",
    "Close navigation menu"
  );
}

function closeMobileMenu() {
  mobileMenuButton.classList.remove("active");
  navLinks.classList.remove("active");
  document.body.classList.remove("menu-open");

  mobileMenuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );
}

function toggleMobileMenu() {
  const menuIsOpen =
    navLinks.classList.contains("active");

  if (menuIsOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

if (mobileMenuButton) {
  mobileMenuButton.addEventListener(
    "click",
    toggleMobileMenu
  );
}

document
  .querySelectorAll(".nav-links a")
  .forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    closeMobileMenu();
  }
});

/*
  ==========================================================
  NAVBAR SCROLL EFFECT
  ==========================================================
*/

function updateNavbar() {
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbar);

updateNavbar();

/*
  ==========================================================
  COPY SERVER NAME
  ==========================================================
*/

async function copyServerName() {
  try {
    await navigator.clipboard.writeText(SERVER_NAME);

    showNotification(
      `${SERVER_NAME} copied to clipboard.`
    );

    copyServerButton.textContent = "Copied";

    window.setTimeout(() => {
      copyServerButton.textContent = "Copy";
    }, 1800);
  } catch (error) {
    /*
      Fallback for older browsers.
    */

    const temporaryInput =
      document.createElement("textarea");

    temporaryInput.value = SERVER_NAME;

    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";

    document.body.appendChild(temporaryInput);

    temporaryInput.focus();
    temporaryInput.select();

    document.execCommand("copy");

    temporaryInput.remove();

    showNotification(
      `${SERVER_NAME} copied to clipboard.`
    );
  }
}

if (copyServerButton) {
  copyServerButton.addEventListener(
    "click",
    copyServerName
  );
}

/*
  ==========================================================
  NOTIFICATION
  ==========================================================
*/

let notificationTimeout;

function showNotification(message) {
  if (!notification) {
    return;
  }

  window.clearTimeout(notificationTimeout);

  notification.textContent = message;
  notification.classList.add("show");

  notificationTimeout = window.setTimeout(() => {
    notification.classList.remove("show");
  }, 2500);
}

/*
  ==========================================================
  WIPE COUNTDOWN
  ==========================================================
*/

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function formatWipeDate(date) {
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Pacific/Auckland",
    timeZoneName: "short"
  }).format(date);
}

function updateCountdown() {
  const targetDate =
    new Date(NEXT_WIPE_DATE);

  const currentDate =
    new Date();

  const difference =
    targetDate.getTime() - currentDate.getTime();

  if (Number.isNaN(targetDate.getTime())) {
    wipeDateText.textContent =
      "Wipe date has not been configured.";

    return;
  }

  wipeDateText.textContent =
    `Scheduled for ${formatWipeDate(targetDate)}`;

  if (difference <= 0) {
    countdownDays.textContent = "00";
    countdownHours.textContent = "00";
    countdownMinutes.textContent = "00";
    countdownSeconds.textContent = "00";

    wipeDateText.textContent =
      "The scheduled wipe time has arrived.";

    return;
  }

  const totalSeconds =
    Math.floor(difference / 1000);

  const days =
    Math.floor(totalSeconds / 86400);

  const hours =
    Math.floor((totalSeconds % 86400) / 3600);

  const minutes =
    Math.floor((totalSeconds % 3600) / 60);

  const seconds =
    totalSeconds % 60;

  countdownDays.textContent =
    addLeadingZero(days);

  countdownHours.textContent =
    addLeadingZero(hours);

  countdownMinutes.textContent =
    addLeadingZero(minutes);

  countdownSeconds.textContent =
    addLeadingZero(seconds);
}

updateCountdown();

window.setInterval(
  updateCountdown,
  1000
);

/*
  ==========================================================
  CURRENT YEAR
  ==========================================================
*/

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

/*
  ==========================================================
  SMOOTH INTERNAL LINKS
  ==========================================================
*/

document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target =
        document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
