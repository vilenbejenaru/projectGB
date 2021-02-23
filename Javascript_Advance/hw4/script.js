'use strict';
const API_URL =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render(index) {
        return `<div class="product">
        <img class="product__img" src="https://picsum.photos/100/100" alt="фото товара">
        <h3 class="product__title">${this.title}</h3>
        <p class="product__price">${this.price}</p>
        <button class="product__btn-add" onclick="cart.addProduct(${index})">В корзину</button>
    </div>`;
    }
}

class ProductsList {
    constructor() {
        this.products = [];
        this.tempProducts = [];

        this.listFilterProducts = [];
    }

    filterProducts(value) {
        // Здесь будем фильтровать список товаров
        this.listFilterProducts = [];
        const regexp = new RegExp(value, 'i');
        // this.tempProducts =
        this.tempProducts.forEach((product) => {
            if ( regexp.test(product.product_name)) {
              
                this.listFilterProducts.push(product);
            }
        });
        // console.log(this.listfilterProducts);
        this.fetchProducts(this.listFilterProducts);
        this.render();
    }

    fetchProducts(data) {
        if (data == null || data.length == 0) {
            this.products = [
                { product_name: 'Shirt', price: 150 },
                { product_name: 'Socks', price: 50 },
                { product_name: 'Jacket', price: 350 },
                { product_name: 'Shoes', price: 250 },
                { product_name: 'T-Shirt', price: 30 },
                { product_name: 'Dress', price: 650 },
                { product_name: 'Robe', price: 35 },
                { product_name: 'Pants', price: 50 },
                { product_name: 'Breeches', price: 150 },
                { product_name: 'Coat', price: 250 },
                { product_name: 'Sweater', price: 350 },
                { product_name: 'Vest', price: 150 },
            ];
            const fetchRequest = makeGETRequest(`${API_URL}/catalogData.json`);
            fetchRequest.then((data) => {
                data.forEach((product)=>{
                 this.products.push(product)
            })
            this.render()
            });



            this.tempProducts = this.products;
        } else {
            this.products = data;
        }
    }

    getSum() {
        let sum = 0;
        this.products.forEach((product) => {
            sum = sum + product.price;
        });
        return sum;
    }
    render() {
        let listHtml = '';
        this.products.forEach((product, index) => {
            const productItem = new ProductItem(
                product.product_name,
                product.price,
            );
            listHtml += productItem.render(index);
        });
        document.querySelector('.products-list').innerHTML = listHtml;
    }
}

const list = new ProductsList();
list.fetchProducts();
list.render();

class CartItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
    render(index) {
        return `<div class="product__cart">
        <img class="product__img" src="https://picsum.photos/100/100" alt="фото товара">
        <h3 class="product__title">${this.title}</h3>
        <p class="product__price">${this.price}</p>
        <input class="product__quantity" value="${this.quantity}"/>
        <button class="product__btn-add" >Добавить</button>
        <button class="product__btn-remove"onclick="cart.removeProduct(${index})">Удалить</button>
    </div>`;
    }
}

class CartList {
    constructor() {
        this.products = [];
    }
    addProduct(index) {
        this.products.push(list.products[index]);
    }
    removeProduct(index) {
        delete this.products[index];
        this.render();
    }

    render() {
        let listHtml = '';
        if (this.products.length > 0) {
            this.products.forEach((product, index) => {
                const productItem = new CartItem(
                    product.title,
                    product.price,
                    1,
                );
                listHtml += productItem.render(index);
            });
        } else {
            listHtml = 'Нет товаров в корзине';
        }
        document.querySelector('.products__cart-list').innerHTML = listHtml;
    }
}
const cart = new CartList();

// -------------------------------------------

// function makeGETRequest(url, callback) {
//     var xhr;

//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject('Microsoft.XMLHTTP');
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     };

//     xhr.open('GET', url, true);
//     xhr.send();
// }

async function makeGETRequest(url) {
    let returnData = null;
    const request = fetch(url);
    await request
        .catch((err) => {
            console.log(err);
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            returnData = data;
        });
    return returnData;
}

//   воспользуемся заглушками:
// ●	https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
// ●	/catalogData.json – получить список товаров;
// ●	/getBasket.json – получить содержимое корзины;
// ●	/addToBasket.json – добавить товар в корзину;
// ●	/deleteFromBasket.json – удалить товар из корзины.

let searchInput = document.getElementById('inputSearch');
let searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', (e) => {
    const value = searchInput.value;
    list.filterProducts(value);
});
