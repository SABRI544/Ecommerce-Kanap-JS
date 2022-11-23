// Récupération des produits via l'API pour les afficher sur la page d'accueil

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((données) => {
    console.log(données);

    let sectionproduct = document.getElementById("items");
    for (let donnée of données)
      sectionproduct.innerHTML += `
            <a href="./product.html?id=${donnée._id}">
              <article>
                <img
                  src="${donnée.imageUrl}"
                  alt="${donnée.altTxt}"
                />
                <h3 class="productName">${donnée.name}</h3>
                <p class="productDescription">
                  ${donnée.description}
                </p>
              </article>
            </a>
          `;
  })
  .catch(() => {
    alert("Une erreur interne est survenue, merci de revenir plus tard.");
  });
