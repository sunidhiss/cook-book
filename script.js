
const searchBtn = document.getElementById("searchBtn");
const ingredientsInput = document.getElementById("ingredientInput");
const recipesContainer = document.getElementById("recipeList");

// CHANGE this to your actual backend URL (Render or localhost)
const BASE_URL = "http://localhost:5000";


searchBtn.addEventListener("click", async () => {
  const ingredients = ingredientsInput.value.trim();
  if (!ingredients) {
    alert("Please enter at least one ingredient!");
    return;
  }

  recipesContainer.innerHTML = "<p>Loading recipes...</p>";

  try {
    const res = await fetch(`${BASE_URL}/recipes/search?ingredients=${ingredients}`);
    const data = await res.json();

    if (!data.length) {
      recipesContainer.innerHTML = "<p>No recipes found 😞</p>";
      return;
    }

    recipesContainer.innerHTML = data
      .map(
        (r) => `
        <div class="recipe-card">
          <h3>${r.title}</h3>
          <ul>${r.ingredients.map((i) => `<li>${i}</li>`).join("")}</ul>
          ${
            r.youtube
              ? `<a href="${r.youtube}" target="_blank">🎥 Watch on YouTube</a>`
              : ""
          }
        </div>
      `
      )
      .join("");
  } catch (err) {
    console.error(err);
    recipesContainer.innerHTML = "<p>Something went wrong 😔</p>";
  }
});
