// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (mobileMenu.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.about-text, .menu-text, .review-card, .trust-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Order Now Button Functionality
    const orderButtons = document.querySelectorAll('.cta-button');
    
    orderButtons.forEach(button => {
        if (button.textContent.includes('Order Now')) {
            button.addEventListener('click', function() {
                showOrderModal();
            });
        }
    });

    // WhatsApp Order Buttons
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h2').textContent;
            const phoneNumber = '+919876543210'; // Replace with actual WhatsApp number
            const message = Hi! I would like to order: ${itemName};
            const whatsappUrl = https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)};
            window.open(whatsappUrl, '_blank');
        });
    });

    // Learn More Button
    const learnMoreBtn = document.querySelector('.cta-button-outline');
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            // Scroll to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Contact Us Button
    const contactButtons = document.querySelectorAll('.cta-button');
    
    contactButtons.forEach(button => {
        if (button.textContent.includes('Contact Us')) {
            button.addEventListener('click', function() {
                showContactModal();
            });
        }
    });

    // Cart Icon Functionality
    const cartIcon = document.querySelector('.cart-icon');
    let cartItems = [];
    
    cartIcon.addEventListener('click', function() {
        showCartModal();
    });

    // User Icon Functionality
    const userIcon = document.querySelector('.user-icon');
    
    userIcon.addEventListener('click', function() {
        showUserModal();
    });

    // Food Image Hover Effects
    const foodImages = document.querySelectorAll('.food-image-placeholder');
    
    foodImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08) rotate(2deg)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
    });

    // Review Card Interactions
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // Order Modal
    function showOrderModal() {
        const modal = document.createElement('div');
        modal.className = 'order-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Place Your Order</h3>
                <div class="menu-items">
                    <div class="order-item">
                        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23D2691E' width='100' height='100'/><text x='50' y='55' text-anchor='middle' fill='white' font-size='12'>Kulcha</text></svg>" alt="Amritsari Kulcha">
                        <div class="item-details">
                            <h4>Amritsari Kulcha with Choley</h4>
                            <p>₹180</p>
                        </div>
                        <button class="add-to-cart" data-item="Amritsari Kulcha" data-price="180">Add to Cart</button>
                    </div>
                    <div class="order-item">
                        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23CD853F' width='100' height='100'/><text x='50' y='55' text-anchor='middle' fill='white' font-size='12'>Chai</text></svg>" alt="Masala Chai">
                        <div class="item-details">
                            <h4>Traditional Masala Chai</h4>
                            <p>₹40</p>
                        </div>
                        <button class="add-to-cart" data-item="Masala Chai" data-price="40">Add to Cart</button>
                    </div>
                    <div class="order-item">
                        <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23DEB887' width='100' height='100'/><text x='50' y='55' text-anchor='middle' fill='white' font-size='12'>Bhature</text></svg>" alt="Choley Bhature">
                        <div class="item-details">
                            <h4>Choley Bhature</h4>
                            <p>₹160</p>
                        </div>
                        <button class="add-to-cart" data-item="Choley Bhature" data-price="160">Add to Cart</button>
                    </div>
                </div>
                <div class="order-summary">
                    <h4>Order Summary</h4>
                    <div id="cart-items"></div>
                    <div class="total">Total: ₹<span id="total-amount">0</span></div>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Add to cart functionality
        const addToCartButtons = modal.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const item = this.dataset.item;
                const price = parseInt(this.dataset.price);
                addToCart(item, price);
                updateCartDisplay();
                showNotification(${item} added to cart!);
            });
        });
        
        // Checkout functionality
        const checkoutBtn = modal.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length > 0) {
                document.body.removeChild(modal);
                showCheckoutModal();
            } else {
                showNotification('Please add items to cart first!', 'error');
            }
        });
        
        updateCartDisplay();
    }

    // Cart functionality
    function addToCart(item, price) {
        const existingItem = cartItems.find(cartItem => cartItem.name === item);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cartItems.push({ name: item, price: price, quantity: 1 });
        }
        updateCartIcon();
    }

    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const totalAmountElement = document.getElementById('total-amount');
        
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>₹${item.price * item.quantity}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
            });
            
            if (totalAmountElement) {
                totalAmountElement.textContent = total;
            }
        }
    }

    function updateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon');
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            cartIcon.style.position = 'relative';
            cartIcon.innerHTML = 🛒<span class="cart-badge">${totalItems}</span>;
        } else {
            cartIcon.innerHTML = '🛒';
        }
    }

    // Contact Modal
    function showContactModal() {
        const modal = document.createElement('div');
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Contact Kulcheywala</h3>
                <div class="contact-methods">
                    <div class="contact-method">
                        <h4>📞 Call Us</h4>
                        <p>+91 98765 43210</p>
                        <button onclick="window.open('tel:+919876543210')">Call Now</button>
                    </div>
                    <div class="contact-method">
                        <h4>📱 WhatsApp</h4>
                        <p>Quick orders and queries</p>
                        <button onclick="window.open('https://wa.me/919876543210')">Chat on WhatsApp</button>
                    </div>
                    <div class="contact-method">
                        <h4>📧 Email</h4>
                        <p>orders@kulcheywala.com</p>
                        <button onclick="window.open('mailto:orders@kulcheywala.com')">Send Email</button>
                    </div>
                    <div class="contact-method">
                        <h4>📍 Visit Us</h4>
                        <p>123 Food Street, Delhi, India</p>
                        <button onclick="window.open('https://maps.google.com')">Get Directions</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Cart Modal
    function showCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Your Cart</h3>
                <div id="cart-items-full"></div>
                <div class="cart-total">Total: ₹<span id="cart-total">0</span></div>
                <div class="cart-actions">
                    <button class="clear-cart">Clear Cart</button>
                    <button class="checkout-btn">Checkout</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Update cart display
        updateFullCartDisplay();
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Clear cart functionality
        const clearCartBtn = modal.querySelector('.clear-cart');
        clearCartBtn.addEventListener('click', function() {
            cartItems = [];
            updateFullCartDisplay();
            updateCartIcon();
            showNotification('Cart cleared!');
        });
        
        // Checkout functionality
        const checkoutBtn = modal.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length > 0) {
                document.body.removeChild(modal);
                showCheckoutModal();
            } else {
                showNotification('Your cart is empty!', 'error');
            }
        });
    }

    function updateFullCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items-full');
        const cartTotalElement = document.getElementById('cart-total');
        
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
            } else {
                cartItems.forEach((item, index) => {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'cart-item-full';
                    itemElement.innerHTML = `
                        <div class="item-info">
                            <h4>${item.name}</h4>
                            <p>₹${item.price} each</p>
                        </div>
                        <div class="item-controls">
                            <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="item-total">₹${item.price * item.quantity}</div>
                    `;
                    cartItemsContainer.appendChild(itemElement);
                    total += item.price * item.quantity;
                });
            }
            
            if (cartTotalElement) {
                cartTotalElement.textContent = total;
            }
        }
    }

    // Make changeQuantity function global
    window.changeQuantity = function(index, change) {
        cartItems[index].quantity += change;
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }
        updateFullCartDisplay();
        updateCartIcon();
    };

    // Checkout Modal
    function showCheckoutModal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const modal = document.createElement('div');
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Checkout</h3>
                <form class="checkout-form">
                    <div class="form-group">
                        <label for="customer-name">Full Name</label>
                        <input type="text" id="customer-name" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-phone">Phone Number</label>
                        <input type="tel" id="customer-phone" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-address">Delivery Address</label>
                        <textarea id="customer-address" rows="3" required></textarea>
                    </div>
                    <div class="order-summary-checkout">
                        <h4>Order Summary</h4>
                        <div id="checkout-items"></div>
                        <div class="checkout-total">Total: ₹${total}</div>
                    </div>
                    <button type="submit" class="place-order-btn">Place Order</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Update checkout items
        const checkoutItemsContainer = document.getElementById('checkout-items');
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            `;
            checkoutItemsContainer.appendChild(itemElement);
        });
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Form submission
        const form = modal.querySelector('.checkout-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('customer-name').value;
            const phone = document.getElementById('customer-phone').value;
            const address = document.getElementById('customer-address').value;
            
            // Simulate order placement
            showNotification('Order placed successfully! We will contact you shortly.', 'success');
            cartItems = [];
            updateCartIcon();
            document.body.removeChild(modal);
            
            // In a real application, you would send this data to a server
            console.log('Order placed:', { name, phone, address, items: cartItems, total });
        });
    }

    // User Modal
    function showUserModal() {
        const modal = document.createElement('div');
        modal.className = 'user-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>User Account</h3>
                <div class="user-options">
                    <button class="user-option">View Order History</button>
                    <button class="user-option">Update Profile</button>
                    <button class="user-option">Saved Addresses</button>
                    <button class="user-option">Loyalty Points</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        const closeModal = modal.querySelector('.close-modal');
        closeModal.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Notification System
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = notification ${type};
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#228B22' : '#DC143C'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 2000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #FFD700;
        color: #333;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(255, 215, 0, 0.3);
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = '#FFC107';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = '#FFD700';
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            const speed = scrolled * 0.5;
            hero.style.backgroundPosition = center ${speed}px;
        }
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Additional scroll-based animations can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);

    // Initialize animations for elements already in view
    const elementsInView = document.querySelectorAll('.hero-content, .trust-indicators');
    elementsInView.forEach(el => {
        el.classList.add('fade-in-up');
    });

    // Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // ESC key closes modals
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.order-modal, .contact-modal, .cart-modal, .checkout-modal, .user-modal');
            modals.forEach(modal => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            });
            
            // Close mobile menu
            if (navMenu.classList.contains('active')) {
                mobileMenu.click();
            }
        }
    });
});

// CSS for Modals
const modalStyles = `
.order-modal, .contact-modal, .cart-modal, .checkout-modal, .user-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
}

.modal-content {
    background: #FFF8DC;
    padding: 2rem;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    color: #8B4513;
    background: none;
    border: none;
}

.close-modal:hover {
    color: #5D4037;
}

.menu-items, .contact-methods, .user-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
}

.order-item, .contact-method {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-item img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
}

.item-details {
    flex: 1;
}

.item-details h4 {
    color: #8B4513;
    margin-bottom: 0.5rem;
}

.add-to-cart, .user-option {
    background: #FFD700;
    color: #333;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.3s ease;
}

.add-to-cart:hover, .user-option:hover {
    background: #FFC107;
}

.order-summary, .cart-total, .checkout-total {
    background: white;
    padding: 1rem;
    border-radius: 8px;
    margin-top: 1rem;
}

.cart-item, .checkout-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #E0E0E0;
}

.cart-item-full {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.item-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.qty-btn {
    background: #FFD700;
    color: #333;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    font-weight: bold;
}

.checkout-btn, .place-order-btn {
    background: #228B22;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    width: 100%;
    margin-top: 1rem;
}

.checkout-btn:hover, .place-order-btn:hover {
    background: #006400;
}

.clear-cart {
    background: #DC143C;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.clear-cart:hover {
    background: #B22222;
}

.cart-actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
}

.checkout-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #8B4513;
}

.form-group input,
.form-group textarea {
    padding: 12px;
    border: 1px solid #D2B48C;
    border-radius: 8px;
    font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #FFD700;
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #DC143C;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

@media (max-width: 480px) {
    .modal-content {
        padding: 1.5rem;
        margin: 10px;
    }
    
    .order-item, .contact-method {
        flex-direction: column;
        text-align: center;
    }
    
    .cart-actions {
        flex-direction: column;
    }
}
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);