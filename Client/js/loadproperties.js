window.addEventListener("DOMContentLoaded", fetchProperties);

async function fetchProperties() {
  const container = document.querySelector(".property-list");
  container.innerHTML = "<p>Loading properties...</p>";

  try {
    const res = await fetch("http://localhost:5000/api/properties");
    const data = await res.json();

    container.innerHTML = ""; // Clear old content

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((prop) => {
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
              <p class="card-text">${prop.description || 'No description'}</p>
              <p><strong>Location:</strong> ${prop.location}</p>
            </div>

            <div class="card-footer">
              <div class="card-author">
                <p class="author-name">By ${prop.createdBy?.name || 'Owner'}</p>
              </div>
            </div>
          </div>
        `;
        container.appendChild(li);
      });
    } else {
      container.innerHTML = "<p>No properties found.</p>";
    }
  } catch (err) {
    container.innerHTML = `<p>Error loading properties: ${err.message}</p>`;
  }
}
