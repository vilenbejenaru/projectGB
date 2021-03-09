const BASE_URL = 'http://localhost:3000';
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
            const response = await fetch(`${BASE_URL}/product-list`);
            this.products = await response.json();
            this.filteredProducts = this.products;
        },
        async toggleCart() {
            this.showCart = !this.showCart;
            const response = await fetch(`${BASE_URL}/product-cart`);
            this.cartItems = await response.json();
        },
        addToCart(item) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            };
            fetch(`${BASE_URL}/product-cart`, requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.postId = data.id;
                })
                .catch((error) => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        removeFromCart(id) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id }),
            };
            fetch(`${BASE_URL}/product-delete`, requestOptions)
                .then(async (response) => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.postId = data.id;
                })
                .catch((error) => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
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
