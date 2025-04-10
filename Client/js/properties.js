const propertyList = document.getElementById("propertyList");

async function fetchProperties() {
  try {
    const res = await fetch("http://localhost:5000/api/properties");
    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      data.forEach((prop) => {
        const div = document.createElement("div");
        div.className = "property-card";
        div.innerHTML = `
          <h3>${prop.title}</h3>
          <p>${prop.description || "No description"}</p>
          <p><strong>Type:</strong> ${prop.propertyType}</p>
          <p><strong>Price:</strong> ₹${prop.price}</p>
          <p><strong>Location:</strong> ${prop.location}</p>
          <p><strong>Posted By:</strong> ${prop.createdBy?.name || "Unknown"}</p>
          <hr>
        `;
        propertyList.appendChild(div);
      });
    } else {
      propertyList.innerHTML = "<p>No properties available.</p>";
    }
  } catch (err) {
    propertyList.innerHTML = `<p>Error loading properties: ${err.message}</p>`;
  }
}

fetchProperties();
