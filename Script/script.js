/** @format */

// ===== Loader =====
const loader = document.getElementById("loader");
const allCards = document.getElementById("allCards");
const issueCount = document.getElementById("issue-count");

let allIssues = [];

// show loader
function showLoader() {
  loader.style.display = "flex";
}

// hide loader
function hideLoader() {
  loader.style.display = "none";
}

// ===== Skeleton Loader =====
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

// ===== Issue Counter =====
function updateIssueCount(count) {
  issueCount.textContent = `${count} Issues`;
}

// ===== Render Cards =====
function renderIssues(issuesArray) {
  allCards.innerHTML = "";

  updateIssueCount(issuesArray.length);

  issuesArray.forEach((issue) => {
    const div = document.createElement("div");

    const borderColor =
      issue.status.toLowerCase() === "open"
        ? "border-[#00A96E]"
        : "border-[#A855F7]";

    const statusIcon =
      issue.status.toLowerCase() === "open"
        ? `<img src="./assets/Open-Status.png" alt="open">`
        : `<img src="./assets/Closed-Status.png" alt="closed">`;

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
                return `<div class="badge h-6 bg-[#FECACA] text-[#EF4444]">
                <i class="fa-solid fa-bug"></i>
                <span>${label.toUpperCase()}</span>
                </div>`;

              if (key === "help wanted")
                return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]">
                <i class="fa-brands fa-codepen"></i>
                <span>${label.toUpperCase()}</span>
                </div>`;

              if (key === "enhancement")
                return `<div class="badge h-6 text-[#00A96E] bg-[#BBF7D0]">
                <i class="fa-solid fa-meteor"></i>
                <span>${label.toUpperCase()}</span>
                </div>`;

              if (key === "documentation")
                return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]">
                <i class="fa-brands fa-codepen"></i>
                <span>${label.toUpperCase()}</span>
                </div>`;

              return "";
            })
            .join("")
        : "";

    div.innerHTML = `
    <div class="bg-white p-6 border-t-8 ${borderColor} rounded-md shadow-md space-y-7 justify-between w-80 min-h-80">

      <div class="flex justify-between">
        <div>${statusIcon}</div>

        <div class="badage rounded-full w-[80px] text-center ${statusupdate}">
          <p>${issue.priority}</p>
        </div>
      </div>

      <div class="space-y-3">
        <h2 class="font-bold line-clamp-1 text-md">
        ${issue.title}
        </h2>

        <p class="text-sm text-[#64748B] line-clamp-1">
        ${issue.description}
        </p>
      </div>

      <div class="flex gap-2 flex-wrap">
      ${labelsHTML}
      </div>

      <hr class="opacity-5">

      <div class="flex flex-col">
        <span>#1 by ${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>

    </div>
    `;

    allCards.appendChild(div);
  });
}

// ===== Fetch API =====
async function getIssues() {
  showLoader();
  showSkeletonCards(8);

  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );

    const result = await res.json();

    allIssues = result.data;

    renderIssues(allIssues);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

// ===== Button Active Color =====
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

// ===== Filters =====
document.getElementById("all-issues").addEventListener("click", (e) => {
  renderIssues(allIssues);
  setActiveButton(e.target);
});

document.getElementById("open-issues").addEventListener("click", (e) => {
  const openIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "open",
  );

  renderIssues(openIssues);
  setActiveButton(e.target);
});

document.getElementById("closed-issues").addEventListener("click", (e) => {
  const closedIssues = allIssues.filter(
    (issue) => issue.status.toLowerCase() === "closed",
  );

  renderIssues(closedIssues);
  setActiveButton(e.target);
});

// ===== Start =====
getIssues();
