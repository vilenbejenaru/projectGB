const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';
const app = Vue.createApp({
    data() {
        return {
            products: [],
            filteredProducts: [],
            searchProducts: '',
            cartItems: [],
            errorMessage: '',
        };
    },
    methods: {
        async getProducts() {
            const response = await fetch(
                `${BASE_URL}/602c166a89c4a60009ef7046`,
            );
            this.products = await response.json();
            this.filteredProducts = this.products;
        },

        addToCart(item) {
            let productInCart = false;
            for (const productsItem of this.cartItems) {
                if (productsItem.id === item.id) {
                    productInCart = true;
                    productsItem.quantity += 1;
                }
            }

            if (!productInCart) {
                this.cartItems.push({ ...item, quantity: 1 });
            }
        },

        filterProducts() {
            if (!this.products.length) this.filteredProducts = [];
            if (!this.searchProducts) this.filteredProducts = this.products;
            this.filteredProducts = this.products.filter((i) =>
                i.productName
                    .toLowerCase()
                    .includes(this.searchProducts.toLowerCase()),
            );
        },
    },
    mounted() {
        console.log(1);
        this.getProducts();
    },
});
app.component('cart-component', {
    props: ['cartItemsProps'],
    template: ` 
    <div></div>
    <button class="cart-button" type="button" @click="toggleCart()">{{showCart ? 'Close cart' : 'Show cart'}}</button>
    <section class="products__cart-list" v-if="showCart">
    <p>{{cartItems}}</p> 
    <div class="product" v-for="item in cartItems">
      <img class="product__img" src="https://picsum.photos/100/100" alt="фото товара">
      <h3 class="product__title">{{item ? item.productName : '' }}</h3>
      <p class="product__price">{{item ? item.price : ''}} руб.</p>
      <p class="product__description">В корзине {{item ? item.quantity : ''}} шт.</p>
      <button class="product__btn-remove" @click="removeFromCart(item.id)">Удалить</button>
    </div>
  </section>
  </div> 
    `,



    data() {
        return {
            showCart: false,
            errorMessage: '',
            cartItems: [],
            item: {
                id: null,
                price: null,
                productName: null,
                quantity: null,
            },
        };
    },
    methods: {
        toggleCart() {
            this.showCart = !this.showCart;
            this.cartItems = this.cartItemsProps;
        },
        removeFromCart(id) {
            let removeIndex = this.cartItems
                .map(function (item) {
                    return item.id;
                })
                .indexOf(id);
            this.cartItems.splice(removeIndex, 1);
            this.cartItems;
            app.cartItems = this.cartItems;
        },
    },
    mounted() {
        console.log(this.cartItemsProps);
    },
});
app.component('search-component', {
    template: `  
    <div class="search">
    <input class="search__input" id="inputSearch" type="text" placeholder="Поиск..." v-model="searchProducts"
      v-on:keyup="filterProducts">
    <button class="search__btn" id='searchBtn' type="submit">Искать</button>
  </div>`,
});
app.mount('#root');
