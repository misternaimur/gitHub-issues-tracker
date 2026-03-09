
// login.js

if (!localStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
}



const allCards = document.getElementById("allCards");

async function getIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const result = await res.json();

  allCards.innerHTML = "";

  const labelClass = {
    bug: "badge-soft badge-error",
    "help wanted": "badge-lg badge-warning",
    enhancement: "badge-success ",
    documentation: "",
    "good first issue": "badge-accent"
  };

  result.data.forEach((issue) => {

    const div = document.createElement("div");

    const borderColor =
      issue.status === "open" ? "border-[#00A96E]" : "border-[#A855F7]";

    const statusIcon =
      issue.status === "open"?`<img src="./assets/Open-Status.png" alt="open">`
        : `<img src="./assets/Closed-Status.png" alt="closed">`;

    const statusupdate =
    issue.priority === "high"
      ? "bg-[#FECACA] text-[#EF4444]"
      : issue.priority === "low"
      ? "bg-[#EEEFF2] text-[#9CA3AF]"
      : "bg-[#FFF6D1] text-[#F59E0B]";


      const labelTemplates = {
        bug: `<div class="badge h-6 bg-[#FECACA] text-[#EF4444]">
          <i class="fa-solid fa-bug"></i>
          <span>BUG</span>
        </div>`,

        "help wanted": `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]">
          <i class="fa-brands fa-codepen"></i>
          <span>help wanted</span>
        </div>`,

        enhancement: `<div class="badge h-6 text-[#00A96E] bg-[#BBF7D0]">
          <i class="fa-solid fa-meteor"></i>
          <span>Enhancement</span>
        </div>`,
      };



    const labelupdate =
      (issue.labels =
      div.innerHTML =
        `

             
      <div class="bg-white p-6 border-t-8 ${borderColor} rounded-md  shadow-md space-y-7 justify-between w-80  min-h-80">

      <!-- Header -->
       <div class="flex justify-between  ">
        <div class="">
            ${statusIcon}
        </div>
        <div class="badage rounded-full w-[80px] text-center ${statusupdate}">
            <p>${issue.priority}</p>
        </div>
       </div>

      <!-- Title + Description -->
      <div class="space-y-3">
        <h2 class="font-bold  line-clamp-1 text-md">
          ${issue.title}
        </h2>

        <p class="text-sm text-[#64748B] line-clamp-1">
        ${issue.description}
         </p>
      </div>

      <!-- Labels -->
      <div class="flex gap-2 flex-wrap">
${
  issue.labels && issue.labels.length > 0
    ? issue.labels
        .map((label) => {
          const key = label.toLowerCase();

          if (key === "bug") {
            return `<div class="badge h-6 bg-[#FECACA] text-[#EF4444]">
              <i class="fa-solid fa-bug"></i>
              <span>${label.toUpperCase()}</span>
            </div>`;
          }

          if (key === "help wanted") {
            return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]">
              <i class="fa-brands fa-codepen"></i>
              <span>${label.toUpperCase()}</span>
            </div>`;
          }

          if (key === "enhancement") {
            return `<div class="badge h-6 items-center text-[#00A96E] bg-[#BBF7D0]">
              <i class="fa-solid fa-meteor"></i>
              <span>${label.toUpperCase()}</span>
            </div>`;
          }

          if (key === "documentation") {
            return `<div class="badge h-6 bg-[#FDE68A] text-[#D97706]">
              <i class="fa-brands fa-codepen"></i>
              <span>${label.toUpperCase()}</span>
            </div>`;
          }

          return "";
        })
        .join("")
    : ""
}
</div

      <hr class="opacity-5">
    

      <!-- Footer -->
      <div class="flex flex-col">
        <span>#1 by ${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>

    </div>
    

    `);

    allCards.appendChild(div);
  });
}

getIssues();
