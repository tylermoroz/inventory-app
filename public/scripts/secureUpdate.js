const form = document.getElementById("updateForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log("Form submit intercepted successfully!");

  let passwordPrompt = prompt("Enter Admin access password to update changes.");
  if (passwordPrompt === null) {
    alert("Submission cancelled.");
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
      alert("Password correct! Submitting changes...");
      const passwordInput = document.createElement("input");
      passwordInput.type = "hidden";
      passwordInput.name = "adminPassword";
      passwordInput.value = passwordPrompt;
      form.appendChild(passwordInput);
      form.submit();
    } else {
      alert("Incorrect password. Update denied.");
    }
  } catch (error) {
    console.error("Error communicating with the server:", error);
  }
});
