const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Everything you can imagine is real.", author: "Pablo Picasso" },
    { text: "Creativity is intelligence having fun.", author: "Albert Einstein" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "Stay hungry, stay foolish.", author: "Whole Earth Catalog" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
    { text: "Good design is obvious. Great design is transparent.", author: "Joe Sparano" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi" }
];

class QuoteGenerator {
    constructor() {
        this.quoteBox = document.getElementById('quote-box');
        this.quoteText = document.getElementById('quote-text');
        this.quoteAuthor = document.getElementById('quote-author');
        this.newQuoteBtn = document.getElementById('new-quote-btn');
        
        this.init();
    }

    init() {
        this.newQuoteBtn.addEventListener('click', () => this.generateQuote());
        
        // Initial quote with a slight delay for animation
        setTimeout(() => this.generateQuote(), 500);
    }

    generateQuote() {
        // Fade out
        this.quoteBox.classList.remove('visible');

        setTimeout(() => {
            // Get random quote
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            
            // Update content
            this.quoteText.textContent = randomQuote.text;
            this.quoteAuthor.textContent = randomQuote.author;

            // Fade in
            this.quoteBox.classList.add('visible');
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', () => new QuoteGenerator());

// PWA: Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('web/sw.js', { scope: '/' })
            .then(reg => console.log('SW Registered'))
            .catch(err => console.log('SW Error', err));
    });
}
