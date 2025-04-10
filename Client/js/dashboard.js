// Check if user is logged in
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
  alert("You're not logged in.");
  window.location.href = "login.html";
} else {
  document.getElementById("welcomeText").innerText = `Welcome, ${user.name}`;
  document.getElementById("roleText").innerText = `Role: ${user.role}`;

  // You can do role-based UI here
  if (user.role === "landlord") {
    // show landlord panel
  } else if (user.role === "tenant") {
    // show tenant panel
  } else if (user.role === "admin") {
    // show admin tools
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

// Role-based UI
if (user.role === "landlord") {
    document.getElementById("landlordPanel").style.display = "block";
  }
  
  // Handle Property Form
  const propertyForm = document.getElementById("propertyForm");
  if (propertyForm) {
    propertyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const propertyData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        location: document.getElementById("location").value,
        propertyType: document.getElementById("propertyType").value,
      };
  
      try {
        const res = await fetch("http://localhost:5000/api/properties/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        });
  
        const data = await res.json();
        if (res.ok) {
          alert("Property added successfully!");
          propertyForm.reset();
        } else {
          alert(data.message || "Error adding property.");
        }
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  }
  
