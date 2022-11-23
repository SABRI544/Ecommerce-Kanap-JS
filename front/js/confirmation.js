// recupérer de l'orderId via url et ajout dans le DOM

const value = window.location;
const url = new URL(value);
const id = url.searchParams.get("id");
const orderId = document.querySelector("#orderId");
orderId.innerHTML = id;
