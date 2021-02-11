'use strict';

const products = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'T-Shirt', price: 30 },
    { title: 'Dress', price: 650 },
    { title: 'Robe', price: 35 },
    { title: 'Pants', price: 50 },
    { title: 'Breeches', price: 150 },
    { title: 'Coat', price: 250 },
    { title: 'Sweater', price: 350 },
    { title: 'Vest', price: 150 },
];

const productCardTemplate = ({ title, price }) => {
    return `<div class="product">
                      <img class="product__img" src="https://picsum.photos/100/100" alt="фото товара">
                      <h3 class="product__title">${title}</h3>
                      <p class="product__price">${price}</p>
                      <button class="product__btn-add">В корзину</button>
                  </div>`;
};

const renderProducts = () => {
    const productsList = products.map((item) => productCardTemplate(item)).join("");
    const wrapSection = document.querySelector('.products-list');
    console.log(wrapSection);
    wrapSection.innerHTML = productsList;
};

renderProducts();
