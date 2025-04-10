const form = document.getElementById("propertyForm");
const token = localStorage.getItem("token");

if (!token) {
  alert("You must be logged in as a landlord to access this page.");
  window.location.href = "login.html";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const property = {
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
      body: JSON.stringify(property),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Property added successfully!");
      form.reset();
      window.location.href = "index.html";
    } else {
      alert(data.message || "Failed to add property.");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
});
