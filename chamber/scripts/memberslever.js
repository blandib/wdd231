async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) {
      throw new Error("Failed to fetch JSON data");
    }
    const members = await response.json();
    console.log("Fetched members:", members); // Debugging

    // Filter members by membership level
    const goldMembers = members.filter((member) => member.membershipLevel === "gold");
    const silverMembers = members.filter((member) => member.membershipLevel === "silver");
    const platinumMembers = members.filter((member) => member.membershipLevel === "platinum");

    // Randomly select one member from each category
    const selectedGold = goldMembers[Math.floor(Math.random() * goldMembers.length)];
    const selectedSilver = silverMembers[Math.floor(Math.random() * silverMembers.length)];
    const selectedPlatinum = platinumMembers[Math.floor(Math.random() * platinumMembers.length)];

    const selectedMembers = [selectedGold, selectedSilver, selectedPlatinum];
    console.log("Selected members:", selectedMembers); // Debugging

    // Display the selected members
    const spotlightCards = document.getElementById("spotlight-cards");
    spotlightCards.innerHTML = selectedMembers
      .map(
        (member) => `
        <div class="spotlight-card">
          <img src="${member.images}" alt="${member.name} Logo">
          <h3>${member.name}</h3>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
          <p><strong>Membership:</strong> ${member.membershipLevel.toUpperCase()}</p>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error("Error loading spotlights:", error);
    document.getElementById("spotlight-cards").innerHTML =
      "<p>Error loading spotlight members.</p>";
  }
}

loadSpotlights();

    