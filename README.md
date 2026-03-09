


### **API Endpoints:**
###  **All Issues:** 
  - https://phi-lab-server.vercel.app/api/v1/lab/issues 


###  **Single Issue:**
   - https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}

   - Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33


###  **Search Issue:** https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}

   - Example:  https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications



    - 1️⃣ What is the difference between var, let, and const?


    - 2️⃣ What is the spread operator (...)?


    - 3️⃣ What is the difference between map(), filter(), and forEach()?
    - 4️⃣ What is an arrow function?

    
    - 5️⃣ What are template literals?


---




    <div class="bg-white p-4 border-t-8 ${borderColor} rounded-md    shadow-md flex flex-col justify-between h-89 ">

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
                    `<p class="badge ${ labelClass[label] || "badge-outline"}">${label}</p>`
                )
                .join("")
            : ""
        }
      </div>


      <!-- Footer -->
      <div class="flex justify-between text-xs text-gray-400">
        <span>Author: ${issue.author}</span>
        <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>

    </div>