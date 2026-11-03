// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Shaka Golden Old Fashioned",
        category: "cocktails",
        price: "R 140",
        description: "Single-malt scotch whiskey, 24k gold leaf flakes, smoked cinnamon bark bitters, orange peel.",
        badge: "Signature"
    },
    {
        id: 2,
        name: "Smoked Tomahawk Steak (800g)",
        category: "mains",
        price: "R 490",
        description: "Prime dry-aged beef braai-grilled over wild rosemary wood, served with truffle butter.",
        badge: "Chef Choice"
    },
    {
        id: 3,
        name: "African Sunset Spritz",
        category: "cocktails",
        price: "R 125",
        description: "Craft marula liquor, prosecco, fresh blood orange juice, aromatic mint sprigs.",
        badge: "Popular"
    },
    {
        id: 4,
        name: "Flame-Kissed Lamb Chops",
        category: "mains",
        price: "R 280",
        description: "Marinated in lemon, garlic, and wild thyme herbs with roasted honey glazed baby carrots.",
        badge: "Must Try"
    },
    {
        id: 5,
        name: "Glenfiddich 18yr Reserve Shot",
        category: "spirits",
        price: "R 180",
        description: "Rich and complex single malt scotch aged in Spanish Oloroso and American oak casks.",
        badge: "Rare"
    },
    {
        id: 6,
        name: "Crispy Peri-Peri Chicken Wings",
        category: "starters",
        price: "R 110",
        description: "Char-grilled wings tossed in signature house-blend spicy peri-peri garlic glaze.",
        badge: "Starter"
    }
];

// Age Verification Modal logic
function confirmAge(isLegal) {
    const modal = document.getElementById('ageModal');
    const error = document.getElementById('ageError');
    if (isLegal) {
        modal.classList.add('hidden');
        localStorage.setItem('shaka_age_verified', 'true');
    } else {
        error.classList.remove('hidden');
    }
}

// Render Menu Items
function renderMenu(category = 'all') {
    const container = document.getElementById('menuContainer');
    if (!container) return;
    
    const filtered = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    container.innerHTML = filtered.map(item => `
        <div class="glass-card p-6 rounded-2xl flex flex-col justify-between">
            <div>
                <div class="flex justify-between items-start gap-4 mb-2">
                    <h3 class="text-xl font-bold text-white font-serif">${item.name}</h3>
                    <span class="text-gold font-bold font-serif text-lg whitespace-nowrap">${item.price}</span>
                </div>
                <p class="text-gray-400 text-sm mb-4 leading-relaxed">${item.description}</p>
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <span class="text-xs px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold uppercase tracking-wider">${item.badge}</span>
                <button onclick="orderNotification('${item.name}')" class="text-xs text-gray-300 hover:text-gold flex items-center gap-1 font-semibold transition">
                    <i class="fa-solid fa-plus text-gold"></i> Add to Order
                </button>
            </div>
        </div>
    `).join('');
}

// Filter menu buttons active state
function filterMenu(category) {
    document.querySelectorAll('.menu-tab').forEach(btn => {
        btn.classList.remove('bg-gold', 'text-dark-900', 'border-gold', 'active');
        btn.classList.add('bg-dark-800', 'text-gray-300', 'border-gray-700');
    });
    if (event && event.target) {
        event.target.classList.add('bg-gold', 'text-dark-900', 'border-gold', 'active');
        event.target.classList.remove('bg-dark-800', 'text-gray-300', 'border-gray-700');
    }
    renderMenu(category);
}

// Handle Reservation Form Submit
function handleReservation(e) {
    e.preventDefault();
    const successToast = document.getElementById('reservationSuccess');
    if (successToast) {
        successToast.classList.remove('hidden');
        e.target.reset();
        setTimeout(() => {
            successToast.classList.add('hidden');
        }, 6000);
    }
}

// Order notification alert
function orderNotification(itemName) {
    alert(`${itemName} added to your table order draft!`);
}

// Initialize Menu & Check Age Verification on DOM Load
window.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    if (localStorage.getItem('shaka_age_verified') === 'true') {
        const modal = document.getElementById('ageModal');
        if (modal) modal.classList.add('hidden');
    }

    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) mobileMenu.classList.toggle('hidden');
        });
    }
});
