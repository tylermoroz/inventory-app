const deleteForms = document.querySelectorAll(".delete-form");

deleteForms.forEach((form) => {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const passwordPrompt = prompt(
      "Enter Admin access password to delete item."
    );
    if (passwordPrompt === null) {
      alert("Deletion cancelled.");
      return;
    }

    try {
      const response = await fetch("/api/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passwordAttempt: passwordPrompt }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Password correct! Deleting item...");
        const passwordInput = document.createElement("input");
        passwordInput.type = "hidden";
        passwordInput.name = "adminPassword";
        passwordInput.value = passwordPrompt;
        form.appendChild(passwordInput);
        form.submit();
      } else {
        alert("Incorrect password. Deletion denied.");
      }
    } catch (error) {
      console.error("Error communicating with the server:", error);
    }
  });
});
