
const allCards = document.getElementById("allCards");

async function getIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const result = await res.json();

  allCards.innerHTML = "";

  const labelClass = {
    bug: "badge-soft badge-error",
    "help wanted": "badge-lg badge-warning",
    enhancement: "badge-success",
    documentation: "badge-info",
    "good first issue": "badge-accent"
  };

  result.data.forEach((issue) => {

    const div = document.createElement("div");

    const borderColor =
      issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";

    const statusIcon =
      issue.status === "open"
        ? `<img src="../assets/Open-Status.png" alt="open">`
        : `<img src="../assets/Closed-Status.png" alt="closed">`;

    div.innerHTML = `
    
    <div class="bg-white p-4 border-t-8 ${borderColor} rounded-md    shadow-md flex flex-col justify-between h-74">

      <!-- Header -->
      <div class="flex justify-between items-center">

        ${statusIcon}

        <span class="badge badge-error">
          ${issue.priority}
        </span>

      </div>

      <!-- Title + Description -->
      <div>
        <h2 class="font-bold text-md leading-tight">
          ${issue.title}
        </h2>

        <p class="text-sm text-[#64748B] line-clamp-2">
          ${issue.description}
        </p>
      </div>

      <!-- Labels -->
      <div class="flex flex-wrap gap-1">
        ${
          issue.labels && issue.labels.length > 0
            ? issue.labels
                .map(
                  (label) =>
                    `<span class="badge ${
                      labelClass[label.toLowerCase()] || "badge-outline"
                    }">${label}</span>`
                )
                .join("")
            : ""
        }
      </div>

      <hr class="opacity-20" />

      <!-- Footer -->
      <div class="flex justify-between text-xs text-gray-400">
        <span>Author: ${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>

    </div>
    `;

    allCards.appendChild(div);
  });
}

getIssues();
