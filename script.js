function coffeeShop() {

    return {

        mobileMenu: false,
        cartOpen: false,

        search: '',
        category: 'Semua',

        toast: '',

        products: [

            {
                id: 1,
                name: 'Espresso',
                price: 18000,
                category: 'Coffee',
                description: 'Kopi espresso dengan rasa kuat dan aroma yang khas.',
                image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80'
            },

            {
                id: 2,
                name: 'Cappuccino',
                price: 25000,
                category: 'Coffee',
                description: 'Perpaduan espresso, susu, dan foam yang creamy.',
                image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80'
            },

            {
                id: 3,
                name: 'Caffe Latte',
                price: 27000,
                category: 'Coffee',
                description: 'Kopi dengan susu lembut.',
                image: 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&w=800&q=80'
            },

            {
                id: 4,
                name: 'Caramel Macchiato',
                price: 30000,
                category: 'Coffee',
                description: 'Kopi creamy dengan rasa caramel.',
                image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=800&q=80'
            },

            {
                id: 5,
                name: 'Matcha Latte',
                price: 28000,
                category: 'Non Coffee',
                description: 'Matcha latte lembut.',
                image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800&q=80'
            },

            {
                id: 6,
                name: 'Chocolate',
                price: 26000,
                category: 'Non Coffee',
                description: 'Minuman cokelat creamy.',
                image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80'
            }

        ],


        cart: [],


        customer: {

            name: '',
            phone: '',
            address: '',
            note: ''

        },


        order: {

            name: '',
            phone: '',
            address: '',
            note: '',
            items: [],
            total: 0

        },


        init() {

            const savedCart =
                localStorage.getItem('coffeeCart');

            if (savedCart) {

                try {

                    this.cart = JSON.parse(savedCart);

                } catch (error) {

                    this.cart = [];

                }

            }


            const savedOrder =
                localStorage.getItem('coffeeOrder');

            if (savedOrder) {

                try {

                    this.order = JSON.parse(savedOrder);

                } catch (error) {

                    this.order = {
                        name: '',
                        phone: '',
                        address: '',
                        note: '',
                        items: [],
                        total: 0
                    };

                }

            }

        },


        get filteredProducts() {

            return this.products.filter(product => {

                const searchText =
                    this.search
                        .toLowerCase()
                        .trim();

                const productName =
                    product.name.toLowerCase();

                const productCategory =
                    product.category.toLowerCase();


                const cocokSearch =
                    searchText === '' ||
                    productName.includes(searchText) ||
                    productCategory.includes(searchText);


                const cocokKategori =
                    this.category === 'Semua' ||
                    product.category === this.category;


                return cocokSearch && cocokKategori;

            });

        },


        addToCart(product) {

            const existingItem =
                this.cart.find(
                    item => item.id === product.id
                );


            if (existingItem) {

                existingItem.quantity++;

            } else {

                this.cart.push({

                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    quantity: 1

                });

            }


            this.saveCart();


            this.showToast(
                product.name +
                ' ditambahkan ke keranjang ☕'
            );

        },


        removeFromCart(id) {

            this.cart =
                this.cart.filter(
                    item => item.id !== id
                );

            this.saveCart();

        },


        increase(id) {

            const item =
                this.cart.find(
                    item => item.id === id
                );


            if (item) {

                item.quantity++;

            }


            this.saveCart();

        },


        decrease(id) {

            const item =
                this.cart.find(
                    item => item.id === id
                );


            if (!item) return;


            if (item.quantity > 1) {

                item.quantity--;

            } else {

                this.removeFromCart(id);

                return;

            }


            this.saveCart();

        },


        saveCart() {

            localStorage.setItem(
                'coffeeCart',
                JSON.stringify(this.cart)
            );

        },


        get totalItems() {

            return this.cart.reduce(

                (total, item) =>
                    total + item.quantity,

                0

            );

        },


        get totalPrice() {

            return this.cart.reduce(

                (total, item) =>
                    total +
                    (item.price * item.quantity),

                0

            );

        },


        formatPrice(price) {

            return new Intl.NumberFormat(
                'id-ID'
            ).format(price);

        },


        showToast(message) {

            this.toast = message;


            setTimeout(() => {

                this.toast = '';

            }, 2500);

        },


        /*
        ====================================
        CHECKOUT
        ====================================
        */

        checkout() {

            if (this.cart.length === 0) {

                alert(
                    'Keranjang masih kosong.'
                );

                return;

            }


            window.location.href =
                'pemesanan.html';

        },


        /*
        ====================================
        KIRIM PESANAN
        ====================================
        */

        submitOrder() {

            if (this.cart.length === 0) {

                alert(
                    'Keranjang masih kosong.'
                );

                return;

            }


            this.order = {

                name: this.customer.name,

                phone: this.customer.phone,

                address: this.customer.address,

                note: this.customer.note,

                items: JSON.parse(
                    JSON.stringify(this.cart)
                ),

                total: this.totalPrice

            };


            localStorage.setItem(

                'coffeeOrder',

                JSON.stringify(this.order)

            );


            /*
            Kosongkan keranjang
            setelah pesanan dibuat.
            */

            this.cart = [];


            localStorage.removeItem(
                'coffeeCart'
            );


            /*
            Pindah ke halaman hasil.
            */

            window.location.href =
                'hasil-pemesanan.html';

        }

    };

}