'use strict';

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
    }
    fetchProducts() {
        this.products = [
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
            const productItem = new ProductItem(product.title, product.price);
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

 async function makeGETRequest(url){
    let returnData=null;
    const  request=fetch(url);
    await request.catch(err=>{console.log(err)}).then(response=>{return response.json()}).then(data=>{console.log(data)});
    return returnData   
}

//   воспользуемся заглушками:
// ●	https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses – адрес API;
// ●	/catalogData.json – получить список товаров;
// ●	/getBasket.json – получить содержимое корзины;
// ●	/addToBasket.json – добавить товар в корзину;
// ●	/deleteFromBasket.json – удалить товар из корзины.

const API_URL =
    'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    // ...
    fetchGoods() {
    
        const fetchRequest = makeGETRequest(`${API_URL}/catalogData.json`);
        console.log(fetchRequest)
    }
    // ...
}
const goods = new GoodsList;
goods.fetchGoods();
