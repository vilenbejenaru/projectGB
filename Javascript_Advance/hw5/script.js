const BASE_URL = 'https://mock-api-builder.vercel.app/api/schema/get';
const app = Vue.createApp({
    data() {
        return {
            products: [],
            filteredProducts: [],
            searchProducts: '',
            showCart: false,
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
        toggleCart() {
            this.showCart = !this.showCart;
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
        removeFromCart(id) {
            let removeIndex = this.cartItems
                .map(function (item) {
                    return item.id;
                })
                .indexOf(id);
            this.cartItems.splice(removeIndex, 1);
            this.cartItems;
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

app.mount('#root');
