//Récupération de l'id du produit via l' URL

const value = window.location.search;
console.log(location);

const urlParams = new URLSearchParams(value);
console.log(value);

const id = urlParams.get("id");
console.log(id);

//Affichage du produit selon id

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((res) => {
    console.log(res);
    let img = document.querySelector(".item__img");

    img.innerHTML = `<img src="${res.imageUrl}" alt="${res.altTxt}">`;

    let title = document.getElementById("title");
    title.innerHTML = `<h1>${res.name}<h1>`;

    let price = document.getElementById("price");
    price.innerHTML = `<span>${res.price}<span>`;

    let description = document.getElementById("description");
    description.innerHTML = `<p>${res.description}<p>`;

    let colors = document.getElementById("colors");
    for (let color of res.colors) {
      colors.innerHTML += `<option value="${color}"> ${color}</option>`;
    }
  })
  .catch(() => {
    alert("Une erreur interne est survenue, merci de revenir plus tard.");
  });

//Ajouter un produit au panier

let bouton = document.querySelector("#addToCart");
console.log(bouton);
bouton.addEventListener("click", () => {
  console.log("click");
  let colors = document.querySelector("#colors").value;
  let quantity = document.querySelector("#quantity").value;

  if (
    colors == null ||
    quantity == null ||
    quantity == 0 ||
    quantity > 100 ||
    colors == ""
  ) {
    alert(
      "veuillez choisir la couleur et une quantité du produit entre 1 et 100"
    );
    return;
  }
  let idUnique = `${id}-${colors}`;
  let product = localStorage.getItem(idUnique);
  console.log(product);
  if (product) {
    product = parseInt(JSON.parse(product).quantity);
  } else {
    product = 0;
  }

  let data = {
    id: id,
    color: colors,
    quantity: product + parseInt(quantity),
  };

  localStorage.setItem(idUnique, JSON.stringify(data));
  window.location.href = "./cart.html";
});
