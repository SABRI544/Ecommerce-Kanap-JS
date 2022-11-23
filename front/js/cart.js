const cartPrice = document.getElementsByClassName("cart__price");
const cartOrder = document.getElementsByClassName("cart__order");
let cart = [];
let total = 0;

cart = recupItem();

cart.forEach((item) => display(item));

/**
 * récupére les produits du localStorage
 * @return { Promise } tab
 */

function recupItem() {
  const numberOfItems = localStorage.length;
  let tab = [];
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || "";
    const itemObjet = JSON.parse(item);
    tab.push(itemObjet);

    console.log(i);
    console.log(itemObjet);
    console.log(numberOfItems);
    console.log(item);
  }

  return tab;
}

/**
 * Affiche les données de chaque produit du panier avec fetch
 * @param { Object } item
 * @return { HTMLElement }
 */

async function display(item) {
  id = item.id;
  color = item.color;
  console.log(color);
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((produit) => {
      const cartSection = document.getElementById("cart__items");

      cartSection.innerHTML += `<article class="cart__item" data-id="${produit._id}" data-color="${item.color}">
      <div class="cart__item__img">
        <img src="${produit.imageUrl}" alt="${produit.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${produit.name}</h2>
          <p>${item.color}</p> 
          <p>${produit.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" )" min="1" max="100" value="${item.quantity}"
          </div>
          <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
          </div>
        </div>

      </div>
    </article>`;

      modifierQuantité();
      supprimerItem();
      totalQuantityPrice();
    });
}

// Modifie la quantité

function modifierQuantité() {
  let input = document.getElementsByClassName("itemQuantity");

  Object.values(input).forEach((quantity) => {
    quantity.addEventListener("change", function () {
      let article = quantity.closest("article");
      console.log(article);
      let color = article.getAttribute("data-color");
      let id = article.getAttribute("data-id");
      let newQuantity = quantity.value;

      let data = {
        id,
        color,
        quantity: newQuantity,
      };

      localStorage.setItem(id + "-" + color, JSON.stringify(data)); //sauvegarde dans le localStorage
      changeProductQuantity(id, color, newQuantity);
      console.log(newQuantity);
      totalQuantityPrice();
    });
  });
}

/**
 * Changement quantité produit et update du localStorage
 * @param { string } id
 * @param { String } color
 * @param { String } newQuantity
 */

function changeProductQuantity(id, color, newQuantity) {
  let idUnique = `${id}-${color}`;
  const data = {
    id: id,
    color: color,
    quantity: newQuantity,
  };

  localStorage.setItem(idUnique, JSON.stringify(data));
  cart = recupItem();
  totalQuantityPrice();
}

// Prix total et quantité totale des produits dans le panier
async function totalQuantityPrice() {
  let quantitytotal = 0;
  let total = 0;

  for (let item of cart) {
    let id = item.id;
    console.log(item.id);
    quantitytotal += parseInt(item.quantity);
    let response = await fetch(`http://localhost:3000/api/products/${id}`);
    let product = await response.json();
    total += product.price * parseInt(item.quantity);
    console.log(product);
  }
  document.getElementById("totalPrice").innerHTML = total;
  document.getElementById("totalQuantity").innerHTML = quantitytotal;

  console.log(quantitytotal);
}

// Supprimer un article dans le panier
function supprimerItem() {
  let deleteButton = document.getElementsByClassName("deleteItem");

  Object.values(deleteButton).forEach((deleteProduct) => {
    deleteProduct.addEventListener("click", function () {
      let article = deleteProduct.closest("article");
      let id = article.getAttribute("data-id");
      let color = article.getAttribute("data-color");
      let idUnique = `${id}-${color}`;
      localStorage.removeItem(idUnique, color);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id && cart[i].color == color) cart.splice(i, 1);
      }

      totalQuantityPrice();
      alert("Votre produit à été retiré du panier");
      article.remove();
    });
  });
}

//formulaire

//Déclaration des variables et éléments du DOM pour formulaire contact
const prenom = document.getElementById("firstName");
const nom = document.getElementById("lastName");
const adresse = document.getElementById("address");
const ville = document.getElementById("city");
const mail = document.getElementById("email");

let valuePrenom, valueNom, valueAdresse, valueVille, valueMail;
//prenom
prenom.addEventListener("input", function (e) {
  valuePrenom;

  if (e.target.value.length == 0) {
    console.log("rien");
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    valuePrenom = null;
    console.log(valuePrenom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    erreur = document.getElementById(
      "firstNameErrorMsg"
    ).innerHTML = `<p>Le Prénom doit etre compris entre 3 et 25 caractéres<p>`;
    valuePrenom = null;
    console.log("trop court ou long");
  }

  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    erreur = document.getElementById("firstNameErrorMsg").innerHTML = "";
    valuePrenom = e.target.value;
    console.log("succes");
    console.log(valuePrenom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Prénom ne contient pas de caractéres spéciaux,chiffre ou accent";
    valuePrenom = null;
  }
});

//nom
nom.addEventListener("input", function (e) {
  valueNom;

  if (e.target.value.length == 0) {
    console.log("rien");
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    valueNom = null;
    console.log(valueNom);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    erreur = document.getElementById(
      "lastNameErrorMsg"
    ).innerHTML = `<p>Le nom doit etre compris entre 3 et 25 caractéres<p>`;
    valueNom = null;
    console.log("trop court ou long");
  }

  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    erreur = document.getElementById("lastNameErrorMsg").innerHTML = "";
    valueNom = e.target.value;
    console.log("succes");
    console.log(valueNom);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Nom ne contient pas de caractéres spéciaux,chiffre ou accent";
    valueNom = null;
  }
});

// adresse

adresse.addEventListener("input", function (e) {
  valueAdresse;

  if (e.target.value.length == 0) {
    console.log("rien");
    document.getElementById("addressErrorMsg").innerHTML = "";
    valueAdresse = null;
    console.log(valueAdresse);
  } else if (e.target.value.length < 3 || e.target.value.length > 35) {
    erreur = document.getElementById(
      "addressErrorMsg"
    ).innerHTML = `<p>Adresse doit etre compris entre 3 et 35 caractéres<p>`;
    valueAdresse = null;
    console.log("trop court ou long");
  }

  if (e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/)) {
    erreur = document.getElementById("addressErrorMsg").innerHTML = "";
    valueAdresse = e.target.value;
    console.log("succes");
    console.log(valueAdresse);
  }
  if (
    !e.target.value.match(/^[0-9]{1,3} [a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 35
  ) {
    document.getElementById("addressErrorMsg").innerHTML =
      "Adresse commence par des chiffres et des lettres et ne contient pas de caractéres spéciaux,chiffre ou accent";
    valueAdresse = null;
  }
});

//ville
ville.addEventListener("input", function (e) {
  valueVille;

  if (e.target.value.length == 0) {
    console.log("rien");
    document.getElementById("cityErrorMsg").innerHTML = "";
    valueVille = null;
    console.log(valueVille);
  } else if (e.target.value.length < 3 || e.target.value.length > 25) {
    erreur = document.getElementById(
      "cityErrorMsg"
    ).innerHTML = `<p>La ville doit etre compris entre 3 et 25 caractéres<p>`;
    valueVille = null;
    console.log("trop court ou long");
  }

  if (e.target.value.match(/^[a-z A-Z]{3,25}$/)) {
    erreur = document.getElementById("cityErrorMsg").innerHTML = "";
    valueVille = e.target.value;
    console.log("succes");
    console.log(valueVille);
  }
  if (
    !e.target.value.match(/^[a-z A-Z]{3,25}$/) &&
    e.target.value.length > 3 &&
    e.target.value.length < 25
  ) {
    document.getElementById("cityErrorMsg").innerHTML =
      "Ville ne contient pas de caractéres spéciaux,chiffre ou accent";
    valueVille = null;
  }
});

// email regex /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

mail.addEventListener("input", (e) => {
  if (e.target.value.length == 0) {
    document.getElementById("emailErrorMsg").innerHTML = "";
    valueMail = null;
    console.log(valueMail);
  } else if (e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    document.getElementById("emailErrorMsg").innerHTML = "";
    valueMail = e.target.value;
    console.log(valueMail);
  }
  if (
    !e.target.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) &&
    !e.target.value.length == 0
  ) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Email incorrect exemple: johndoe@gmail.com";
    valueMail = null;
  }
});

//order commande

const orderform = document.getElementById("order");
if (cart == null || cart.length < 1) {
  alert("votre panier est vide");
  window.location.href = "index.html";
} else {
  orderform.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("post stopper");
    console.log(cart);
    if (
      valuePrenom &&
      valueNom &&
      valueAdresse &&
      valueVille &&
      valueMail &&
      cart.length > 0
    ) {
      console.log("c good envoie");
      // id du panier
      const numberOfProducts = localStorage.length;

      const ids = [];
      for (let i = 0; i < numberOfProducts; i++) {
        key = localStorage.key(i);
        let id = key.split("-")[0];

        console.log(id);

        ids.push(id);
      }
      // objet du formulaire
      const data = {
        contact: {
          firstName: valuePrenom,
          lastName: valueNom,
          address: valueAdresse,
          city: valueVille,
          email: valueMail,
        },
        products: ids,
      };
      console.log(data);
      post(data);
    } else {
      return alert(
        `Veuillez vérifier que tous les champs du formulaire sont correctement remplis.`
      );
    }
  });
}

/**
 * fetch post avec data et id
 * @param { Array } data
 * @return { Object } data.orderId
 */

function post(data) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",

    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    //Envoi de l'objet au format JSON
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      localStorage.clear();

      window.location.href = "./confirmation.html?id=" + data.orderId;
    })
    .catch(() => {
      alert("Une erreur est survenue, merci de revenir plus tard.");
    });
}
