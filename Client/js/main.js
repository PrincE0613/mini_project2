const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

// Button logic
const authButtons = document.getElementById("authButtons");
const logoutBtn = document.getElementById("logoutBtn");
const addListingBtn = document.getElementById("addListingBtn");

if (token && user) {
  authButtons.style.display = "none";
  logoutBtn.style.display = "inline-block";

  if (user.role === "landlord") {
    addListingBtn.style.display = "inline-block";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
}

// Load properties
async function loadProperties() {
  const container = document.getElementById("propertyList");
  container.innerHTML = "";

  try {
    const res = await fetch("http://localhost:5000/api/properties");
    const properties = await res.json();

    if (!Array.isArray(properties) || properties.length === 0) {
      container.innerHTML = "<li><p>No properties available.</p></li>";
      return;
    }

    properties.forEach((prop) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="property-card">
          <figure class="card-banner">
            <img src="default-property.jpg" alt="${prop.title}" class="w-100" />
            <div class="card-badge ${prop.propertyType === 'rent' ? 'green' : 'orange'}">
              ${prop.propertyType === 'rent' ? 'For Rent' : 'For Sale'}
            </div>
          </figure>
          <div class="card-content">
            <div class="card-price"><strong>₹${prop.price}</strong></div>
            <h3 class="h3 card-title">${prop.title}</h3>
            <p class="card-text">${prop.description || "No description."}</p>
            <p><strong>Location:</strong> ${prop.location}</p>
          </div>
          <div class="card-footer">
            <div class="card-author">
              <p class="author-name">By ${prop.createdBy?.name || "Owner"}</p>
            </div>
          </div>
        </div>`;
      container.appendChild(li);
    });
  } catch (err) {
    container.innerHTML = `<li><p>Error loading properties: ${err.message}</p></li>`;
  }
}

window.addEventListener("DOMContentLoaded", loadProperties);
