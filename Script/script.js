/** @format */

// Global Variables
const allCards = document.getElementById("allCards");
const issueCount = document.getElementById("issue-count");

let allIssues = [];

// Skeleton Loader
function showSkeletonCards(count = 8) {
  allCards.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.className =
      "p-6 border-t-8 border-gray-200 bg-white rounded-md shadow-md animate-pulse space-y-4 w-80 min-h-80";
    div.innerHTML = `
      <div class="h-6 bg-gray-200 rounded w-1/3"></div>
      <div class="h-4 bg-gray-200 rounded w-2/3"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="flex gap-2">
        <div class="h-6 bg-gray-300 rounded w-16"></div>
        <div class="h-6 bg-gray-300 rounded w-20"></div>
      </div>
    `;
    allCards.appendChild(div);
  }
}

// Issue Counter
function updateIssueCount(count) {
  issueCount.textContent = `${count} Issues`;
}

// Render Issue Cards
function renderIssues(issuesArray) {
  allCards.innerHTML = "";
  updateIssueCount(issuesArray.length);

  issuesArray.forEach((issue) => {
    const div = document.createElement("div");

    // click listener to open modal
    div.addEventListener("click", () => openIssueModal(issue));

    const borderColor =
      issue.status.toLowerCase() === "open"
        ? "border-[#00A96E]"
        : "border-[#A855F7]";

    const statusIcon =
      issue.status.toLowerCase() === "open"
        ? `<img src="./assets/Open-Status.png">`
        : `<img src="./assets/Closed-Status.png">`;

    const statusupdate =
      issue.priority === "high"
        ? "bg-[#FECACA] text-[#EF4444]"
        : issue.priority === "low"
          ? "bg-[#EEEFF2] text-[#9CA3AF]"
          : "bg-[#FFF6D1] text-[#F59E0B]";

    const labelsHTML =
      issue.labels && issue.labels.length > 0
        ? issue.labels
            .map((label) => {
              const key = label.toLowerCase();
              if (key === "bug")
                return `<div class="badge h-6 bg-[#FECACA] text-[#EF4444]"><i class="fa-solid fa-bug"></i> ${label.toUpperCase()}</div>`;
              if (key === "help wanted")
                return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]"><i class="fa-brands fa-codepen"></i> ${label.toUpperCase()}</div>`;
              if (key === "enhancement")
                return `<div class="badge h-6 text-[#00A96E] bg-[#BBF7D0]"><i class="fa-solid fa-meteor"></i> ${label.toUpperCase()}</div>`;
              if (key === "documentation")
                return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]"><i class="fa-brands fa-codepen"></i> ${label.toUpperCase()}</div>`;
              return "";
            })
            .join("")
        : "";

    div.innerHTML = `
      <div class="bg-white p-6 border-t-8 ${borderColor} rounded-md shadow-md space-y-7 w-80 min-h-80 cursor-pointer">
        <div class="flex justify-between">
          <div>${statusIcon}</div>
          <div class="rounded-full w-[80px] text-center ${statusupdate}">
            ${issue.priority}
          </div>
        </div>
        <div class="space-y-3">
          <h2 class="font-bold line-clamp-1 text-md">${issue.title}</h2>
          <p class="text-sm text-[#64748B] line-clamp-1">${issue.description}</p>
        </div>
        <div class="flex gap-2 flex-wrap">${labelsHTML}</div>
        <hr class="opacity-5"/>
        <div class="flex flex-col text-sm text-gray-500">
          <span>by ${issue.author}</span>
          <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    allCards.appendChild(div);
  });
}

// Open Modal Function
function openIssueModal(issue) {
  // set modal values
  const modal = document.getElementById("issueModal");
  document.getElementById("modal-title").textContent = issue.title;
  document.getElementById("modal-description").textContent = issue.description;
  document.getElementById("modal-author").textContent = issue.author;
  document.getElementById("modal-date").textContent = new Date(
    issue.createdAt,
  ).toLocaleDateString();
  document.getElementById("modal-assignee").textContent =
    issue.assignee || "Unassigned";

  // Status badge
  const statusBadge = document.getElementById("modal-status");
  statusBadge.textContent = issue.status;
  statusBadge.className =
    issue.status.toLowerCase() === "open"
      ? "badge badge-success"
      : "badge badge-soft badge-primary";

  // Priority badge
  const priorityBadge = document.getElementById("modal-priority");
  priorityBadge.textContent = issue.priority;
  if (issue.priority === "high")
    priorityBadge.className = "badge bg-[#FECACA] text-[#EF4444]";
  else if (issue.priority === "medium")
    priorityBadge.className = "badge bg-[#FFF6D1] text-[#F59E0B]";
  else priorityBadge.className = "badge bg-[#EEEFF2] text-[#9CA3AF]";

  // Labels
  const modalLabels = document.getElementById("modal-labels");
  modalLabels.innerHTML = "";

  if (issue.labels && issue.labels.length > 0) {
    issue.labels.forEach((label) => {
      const key = label.toLowerCase();
      const div = document.createElement("div");
      div.classList.add("badge", "h-6", "flex", "items-center", "gap-1");

      if (key === "bug") {
        div.classList.add("bg-[#FECACA]", "text-[#EF4444]");
        div.innerHTML = `<i class="fa-solid fa-bug"></i> ${label.toUpperCase()}`;
      } else if (key === "help wanted") {
        div.classList.add("bg-[#FDE68A]", "text-[#D97706]");
        div.innerHTML = `<i class="fa-brands fa-codepen"></i> ${label.toUpperCase()}`;
      } else if (key === "enhancement") {
        div.classList.add("bg-[#BBF7D0]", "text-[#00A96E]");
        div.innerHTML = `<i class="fa-solid fa-meteor"></i> ${label.toUpperCase()}`;
      } else if (key === "documentation") {
        div.classList.add("bg-[#FDE68A]", "text-[#D97706]");
        div.innerHTML = `<i class="fa-brands fa-codepen"></i> ${label.toUpperCase()}`;
      } else {
        div.classList.add("bg-gray-200", "text-gray-600");
        div.textContent = label.toUpperCase();
      }

      modalLabels.appendChild(div);
    });
  }

  // Open modal (DaisyUI)
  modal.showModal();
}

// Fetch Issues
async function getIssues() {
  showSkeletonCards(8);
  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const result = await res.json();
    allIssues = result.data;
    renderIssues(allIssues);
  } catch (err) {
    console.log(err);
  }
}

// Filter Buttons
const buttons = document.querySelectorAll(
  "#all-issues, #open-issues, #closed-issues",
);
function setActiveButton(activeBtn) {
  buttons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });
  activeBtn.classList.remove("btn-outline");
  activeBtn.classList.add("btn-primary");
}

document.getElementById("all-issues").addEventListener("click", (e) => {
  renderIssues(allIssues);
  setActiveButton(e.target);
});
document.getElementById("open-issues").addEventListener("click", (e) => {
  renderIssues(allIssues.filter((i) => i.status.toLowerCase() === "open"));
  setActiveButton(e.target);
});
document.getElementById("closed-issues").addEventListener("click", (e) => {
  renderIssues(allIssues.filter((i) => i.status.toLowerCase() === "closed"));
  setActiveButton(e.target);
});

// Start App
getIssues();
