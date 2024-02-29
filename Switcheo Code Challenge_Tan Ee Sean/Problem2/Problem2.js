new Vue({
    el: '#app',
    data: {
        tokenFrom: '',
        tokenTo: '',
        amount: '',
        exchangeRate: null,
        result: null,
        showResult: false,
        prices: null
    },
    methods: {
        async submitForm() {
            // Fetch token prices
            const pricesResponse = await fetch('https://interview.switcheo.com/prices.json');
            this.prices = await pricesResponse.json();

            // Calculate exchange rate and result
            this.exchangeRate = this.prices[this.tokenTo] / this.prices[this.tokenFrom];
            this.result = this.amount * this.exchangeRate;

            // Display results
            this.showResult = true;
        }
    }
});
