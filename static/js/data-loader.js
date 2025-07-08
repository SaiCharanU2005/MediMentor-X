// Data Loader for HealthBot AI
class DataLoader {
    constructor() {
        this.medicines = [];
        this.doctors = [];
        this.tests = [];
        this.hospitals = [];
        this.pharmacies = [];
        this.testInfo = [];
        this.medicineInfo = [];
        this.currentFilters = {
            medicine: 'all',
            doctor: '',
            test: 'all',
            hospital: '',
            pharmacy: ''
        };
        this.cart = [];
        this.orderHistory = [];
        this.orderIdCounter = 1001;
    }

    // Load all data files
    async loadAllData() {
        try {
            const [medicines, doctors, tests, hospitals, pharmacies, testInfo, medicineInfo] = await Promise.all([
                this.fetchData('/static/data/medicines.json'),
                this.fetchData('/static/data/doctors.json'),
                this.fetchData('/static/data/tests.json'),
                this.fetchData('/static/data/hospitals.json'),
                this.fetchData('/static/data/pharmacies.json'),
                this.fetchData('/static/data/test_info.json'),
                this.fetchData('/static/data/medicine_info.json')
            ]);

            this.medicines = medicines.medicines || [];
            this.doctors = doctors.doctors || [];
            this.tests = tests.tests || [];
            this.hospitals = hospitals.hospitals || [];
            this.pharmacies = pharmacies.pharmacies || [];
            this.testInfo = testInfo || [];
            this.medicineInfo = medicineInfo || [];

            this.initializeModules();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    // Fetch data from JSON file
    async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    // Initialize all modules
    initializeModules() {
        this.initializeMedicineModule();
        this.initializeDoctorModule();
        this.initializeTestModule();
        this.initializeHospitalModule();
        this.initializePharmacyModule();
    }

    // Initialize Medicine Module
    initializeMedicineModule() {
        const medicineGrid = document.querySelector('#delivery .medicine-grid');
        const categoryFilter = document.getElementById('medicineCategoryFilter');
        const goToCartBtn = document.getElementById('goToCartBtn');
        const floatingCartCount = document.getElementById('floatingCartCount');
        const checkoutBtn = document.getElementById('checkoutBtn');
        this.cart = [];
        this.medicineCategory = 'all';
        this.medicineGrid = medicineGrid;
        this.floatingCartCount = floatingCartCount;

        if (medicineGrid) {
            this.renderMedicines(this.medicines);
        }

        // Category dropdown filter
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.medicineCategory = e.target.value;
                const filtered = this.medicineCategory === 'all' ? this.medicines : this.medicines.filter(med => med.category === this.medicineCategory);
                this.renderMedicines(filtered);
            });
        }

        // Floating cart button scroll
        if (goToCartBtn) {
            goToCartBtn.addEventListener('click', () => {
                const cartSection = document.querySelector('.cart-section');
                if (cartSection) {
                    cartSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Checkout button logic
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (!this.cart || this.cart.length === 0) {
                    if (typeof showNotification === 'function') {
                        showNotification('Your cart is empty!', 'warning');
                    }
                    return;
                }
                // Save order to history
                const order = {
                    id: this.orderIdCounter++,
                    date: new Date(),
                    items: this.cart.map(item => ({ name: item.name, price: item.price, quantity: item.quantity })),
                    total: this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                };
                this.orderHistory.unshift(order);
                this.renderOrderHistory();
                // Success notification
                if (typeof showNotification === 'function') {
                    showNotification('Order placed successfully! Delivery in 2-3 hours.', 'success');
                }
                this.cart = [];
                this.updateCartCount();
                this.renderCart();
            });
        }
        // Render order history on load
        this.renderOrderHistory();
    }

    // Render medicines
    renderMedicines(medicines) {
        const medicineGrid = this.medicineGrid || document.querySelector('#delivery .medicine-grid');
        if (!medicineGrid) return;
        medicineGrid.innerHTML = medicines.map(medicine => `
            <div class="medicine-card" data-category="${medicine.category}" data-name="${medicine.name}" data-price="${medicine.price}" data-status="${medicine.status}">
                <span class="medicine-image">${medicine.image || ''}</span>
                <div class="medicine-info">
                    <h3>${medicine.name}</h3>
                    <p class="medicine-description">${medicine.description}</p>
                    <div class="medicine-price">$${medicine.price.toFixed(2)}</div>
                    <span class="medicine-status ${medicine.status}">${this.getStatusText(medicine.status)}</span>
                </div>
                <div class="medicine-actions">
                    ${this.getMedicineActionButton(medicine)}
                    <button class="btn btn--secondary medicine-details-btn">Details</button>
                </div>
            </div>
        `).join('');
        this.addMedicineEventListeners();
    }

    // Get status text
    getStatusText(status) {
        const statusMap = {
            'in-stock': 'In Stock',
            'out-of-stock': 'Out of Stock',
            'prescription': 'Prescription Required'
        };
        return statusMap[status] || status;
    }

    // Get medicine action button
    getMedicineActionButton(medicine) {
        if (medicine.status === 'out-of-stock') {
            return `<button class="btn btn--primary" disabled>Notify When Available</button>`;
        } else if (medicine.status === 'prescription') {
            return `<button class="btn btn--primary">Upload Prescription</button>`;
        } else {
            return `<button class="btn btn--primary add-to-cart">Add to Cart</button>`;
        }
    }

    // Add medicine event listeners
    addMedicineEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.medicine-card');
                const medicineName = card.querySelector('h3').textContent;
                const medicinePrice = parseFloat(card.querySelector('.medicine-price').textContent.replace('$', ''));
                const medicineStatus = card.getAttribute('data-status');
                if (medicineStatus === 'out-of-stock') return;
                this.showQuantityModal({ name: medicineName, price: medicinePrice });
            });
        });
        // Details button logic
        const detailsButtons = document.querySelectorAll('.medicine-details-btn');
        detailsButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.medicine-card');
                const medicineName = card.querySelector('h3').textContent;
                this.showMedicineInfoSidebar(medicineName);
            });
        });
    }

    // Show quantity modal
    showQuantityModal(medicine) {
        const modal = document.getElementById('quantityModal');
        const closeModal = document.getElementById('closeQuantityModal');
        const cancelBtn = document.getElementById('cancelQuantity');
        const confirmBtn = document.getElementById('confirmQuantity');
        const quantityInput = document.getElementById('quantityInput');
        const quantityDecrement = document.getElementById('quantityDecrement');
        const quantityIncrement = document.getElementById('quantityIncrement');
        quantityInput.value = 1;
        modal.style.display = 'flex';
        let closed = false;
        const close = () => {
            if (closed) return;
            closed = true;
            modal.style.display = 'none';
        };
        closeModal.onclick = close;
        cancelBtn.onclick = close;
        confirmBtn.onclick = () => {
            const qty = Math.max(1, parseInt(quantityInput.value) || 1);
            this.addToCart({ ...medicine, quantity: qty });
            close();
        };
        modal.onclick = (e) => { if (e.target === modal) close(); };
        quantityDecrement.onclick = () => {
            let val = Math.max(1, parseInt(quantityInput.value) - 1 || 1);
            quantityInput.value = val;
        };
        quantityIncrement.onclick = () => {
            let val = Math.max(1, parseInt(quantityInput.value) + 1 || 1);
            quantityInput.value = val;
        };
        quantityInput.oninput = () => {
            let val = Math.max(1, parseInt(quantityInput.value) || 1);
            quantityInput.value = val;
        };
    }

    // Add to cart functionality
    addToCart(medicine) {
        // If already in cart, update quantity
        const existing = this.cart.find(item => item.name === medicine.name);
        if (existing) {
            existing.quantity += medicine.quantity;
        } else {
            this.cart.push({ ...medicine });
        }
        this.updateCartCount();
        this.renderCart();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) cartCount.textContent = this.cart.length;
        if (this.floatingCartCount) this.floatingCartCount.textContent = this.cart.length;
    }

    // Render cart with details and total (table layout)
    renderCart() {
        const cartItems = document.getElementById('cartItems');
        if (!cartItems) return;
        if (!this.cart || this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }
        let rows = this.cart.map((item, idx) => `
            <tr>
                <td>${item.name}</td>
                <td class="cart-item-price">$${item.price.toFixed(2)}</td>
                <td class="cart-item-qty">
                    <button class="qty-btn" data-idx="${idx}" data-action="decrement">-</button>
                    <input type="number" min="1" value="${item.quantity}" data-idx="${idx}" class="cart-qty-input">
                    <button class="qty-btn" data-idx="${idx}" data-action="increment">+</button>
                </td>
                <td class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button class="remove-item" data-idx="${idx}">×</button></td>
            </tr>
        `).join('');
        const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartItems.innerHTML = `
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="cart-summary-footer"><span>Items: ${this.cart.length}</span></td>
                        <td colspan="2" class="cart-total-footer"><strong>Total: $${total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
        `;
        // Add remove and quantity update functionality
        cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-idx'));
                this.cart.splice(idx, 1);
                this.updateCartCount();
                this.renderCart();
            });
        });
        cartItems.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-idx'));
                const action = btn.getAttribute('data-action');
                if (action === 'increment') this.cart[idx].quantity++;
                if (action === 'decrement' && this.cart[idx].quantity > 1) this.cart[idx].quantity--;
                this.renderCart();
            });
        });
        cartItems.querySelectorAll('.cart-qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const idx = parseInt(input.getAttribute('data-idx'));
                let val = Math.max(1, parseInt(input.value) || 1);
                this.cart[idx].quantity = val;
                this.renderCart();
            });
        });
    }

    // Initialize Doctor Module
    initializeDoctorModule() {
        const doctorGrid = document.querySelector('#consultation .doctors-grid');
        const specialtyFilter = document.getElementById('specialtyFilter');
        const availabilityFilter = document.getElementById('availabilityFilter');
        
        if (doctorGrid) {
            this.renderDoctors(this.doctors);
        }

        // Add filter event listeners
        if (specialtyFilter) {
            specialtyFilter.addEventListener('change', (e) => {
                this.currentFilters.doctor = e.target.value;
                this.filterDoctors();
            });
        }

        if (availabilityFilter) {
            availabilityFilter.addEventListener('change', (e) => {
                this.filterDoctors();
            });
        }
    }

    // Render doctors
    renderDoctors(doctors) {
        const doctorGrid = document.querySelector('#consultation .doctors-grid');
        if (!doctorGrid) return;

        doctorGrid.innerHTML = doctors.map(doctor => `
            <div class="doctor-card" data-specialty="${doctor.specialty}" data-availability="${doctor.availability}">
                <div class="doctor-card-avatar-wrapper">
                    <span class="doctor-card-avatar">${doctor.avatar}</span>
                </div>
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <div class="doctor-specialty">${this.capitalizeFirst(doctor.specialty)}</div>
                    <div class="doctor-rating">⭐ ${doctor.rating} (${doctor.reviews} reviews)</div>
                    <div class="doctor-experience">${doctor.experience} years experience</div>
                    <span class="doctor-availability">Available ${this.getAvailabilityText(doctor.availability)}</span>
                </div>
                <div class="doctor-actions">
                    <button class="btn btn--primary book-appointment">Book Appointment</button>
                    <button class="btn btn--secondary">View Profile</button>
                </div>
            </div>
        `).join('');

        this.addDoctorEventListeners();
    }

    // Filter doctors
    filterDoctors() {
        let filteredDoctors = this.doctors;
        
        if (this.currentFilters.doctor) {
            filteredDoctors = filteredDoctors.filter(doctor => 
                doctor.specialty === this.currentFilters.doctor
            );
        }

        const availabilityFilter = document.getElementById('availabilityFilter');
        if (availabilityFilter && availabilityFilter.value) {
            filteredDoctors = filteredDoctors.filter(doctor => 
                doctor.availability === availabilityFilter.value
            );
        }

        this.renderDoctors(filteredDoctors);
    }

    // Initialize Test Module
    initializeTestModule() {
        const testGrid = document.querySelector('#tests .tests-grid');
        const categoryButtons = document.querySelectorAll('#tests .category-btn');
        
        if (testGrid) {
            this.renderTests(this.tests);
        }

        // Add category filter event listeners
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.dataset.category;
                this.currentFilters.test = category;
                
                // Update active button
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter and render tests
                const filteredTests = category === 'all' 
                    ? this.tests 
                    : this.tests.filter(test => test.category === category);
                this.renderTests(filteredTests);
            });
        });
    }

    // Render tests
    renderTests(tests) {
        const testGrid = document.querySelector('#tests .tests-grid');
        if (!testGrid) return;

        testGrid.innerHTML = tests.map(test => `
            <div class="test-card" data-category="${test.category}">
                <span class="test-icon">${test.icon}</span>
                <div class="test-info">
                    <h3>${test.name}</h3>
                    <p class="test-description">${test.description}</p>
                    <div class="test-details">
                        <div class="test-price">$${test.price}</div>
                        <span class="test-duration">${test.duration}</span>
                    </div>
                </div>
                <div class="test-actions">
                    <button class="btn btn--primary book-test">Book Test</button>
                    <button class="btn btn--secondary">Learn More</button>
                </div>
            </div>
        `).join('');

        this.addTestEventListeners();
    }

    // Initialize Hospital Module
    initializeHospitalModule() {
        const hospitalGrid = document.querySelector('#hospitals .hospitals-grid');
        const serviceFilter = document.getElementById('serviceFilter');
        const distanceFilter = document.getElementById('distanceFilter');
        
        if (hospitalGrid) {
            this.renderHospitals(this.hospitals);
        }

        // Add filter event listeners
        if (serviceFilter) {
            serviceFilter.addEventListener('change', (e) => {
                this.currentFilters.hospital = e.target.value;
                this.filterHospitals();
            });
        }

        if (distanceFilter) {
            distanceFilter.addEventListener('change', (e) => {
                this.filterHospitals();
            });
        }
    }

    // Render hospitals
    renderHospitals(hospitals) {
        const hospitalGrid = document.querySelector('#hospitals .hospitals-grid');
        if (!hospitalGrid) return;

        hospitalGrid.innerHTML = hospitals.map(hospital => `
            <div class="hospital-card" data-services="${hospital.services.join(',')}" data-distance="${hospital.distance}">
                <span class="hospital-icon">${hospital.icon}</span>
                <div class="hospital-info">
                    <h3>${hospital.name}</h3>
                    <p class="hospital-address">${hospital.address}</p>
                    <div class="hospital-distance">📍 ${hospital.distance} miles away</div>
                    <div class="hospital-rating">⭐ ${hospital.rating} (${hospital.reviews} reviews)</div>
                    <div class="hospital-services">
                        ${hospital.services.map(service => 
                            `<span class="service-tag ${service.toLowerCase() === 'emergency' ? 'emergency' : ''}">${service}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="hospital-actions">
                    ${hospital.emergency ? 
                        `<button class="btn emergency-btn">Emergency: ${hospital.emergency}</button>` :
                        `<button class="btn btn--primary">Contact: ${hospital.phone}</button>`
                    }
                    <button class="btn btn--secondary">Get Directions</button>
                </div>
            </div>
        `).join('');

        this.addHospitalEventListeners();
    }

    // Filter hospitals
    filterHospitals() {
        let filteredHospitals = this.hospitals;
        
        if (this.currentFilters.hospital) {
            filteredHospitals = filteredHospitals.filter(hospital => 
                hospital.services.includes(this.currentFilters.hospital)
            );
        }

        const distanceFilter = document.getElementById('distanceFilter');
        if (distanceFilter && distanceFilter.value) {
            const maxDistance = parseFloat(distanceFilter.value);
            filteredHospitals = filteredHospitals.filter(hospital => 
                hospital.distance <= maxDistance
            );
        }

        this.renderHospitals(filteredHospitals);
    }

    // Initialize Pharmacy Module
    initializePharmacyModule() {
        const pharmacyGrid = document.querySelector('#pharmacy .pharmacies-grid');
        
        if (pharmacyGrid) {
            this.renderPharmacies(this.pharmacies);
        }
    }

    // Render pharmacies
    renderPharmacies(pharmacies) {
        const pharmacyGrid = document.querySelector('#pharmacy .pharmacies-grid');
        if (!pharmacyGrid) return;

        pharmacyGrid.innerHTML = pharmacies.map(pharmacy => `
            <div class="pharmacy-card">
                <span class="pharmacy-icon">${pharmacy.icon}</span>
                <div class="pharmacy-info">
                    <h3>${pharmacy.name}</h3>
                    <p class="pharmacy-address">${pharmacy.address}</p>
                    <div class="pharmacy-distance">📍 ${pharmacy.distance} miles away</div>
                    <div class="pharmacy-hours">🕐 ${pharmacy.hours}</div>
                    <div class="pharmacy-phone">📞 ${pharmacy.phone}</div>
                </div>
                <div class="pharmacy-actions">
                    <button class="btn btn--primary check-availability">Check Medicine</button>
                    <button class="btn btn--secondary">Get Directions</button>
                </div>
            </div>
        `).join('');

        this.addPharmacyEventListeners();
    }

    // Add event listeners for all modules
    addDoctorEventListeners() {
        const bookButtons = document.querySelectorAll('.book-appointment');
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.doctor-card');
                const doctorName = card.querySelector('h3').textContent;
                alert(`Booking appointment with ${doctorName}. This feature will be implemented soon!`);
            });
        });
    }

    addTestEventListeners() {
        const bookButtons = document.querySelectorAll('.book-test');
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.test-card');
                const testName = card.querySelector('h3').textContent;
                alert(`Booking test: ${testName}. This feature will be implemented soon!`);
            });
        });
        // Learn More logic
        const learnMoreButtons = document.querySelectorAll('.test-card .btn.btn--secondary');
        learnMoreButtons.forEach(btn => {
            if (btn.textContent.trim() === 'Learn More') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.test-card');
                    const testName = card.querySelector('h3').textContent;
                    this.showTestInfoSidebar(testName);
                });
            }
        });
    }

    showTestInfoSidebar(testName) {
        const sidebar = document.getElementById('testInfoSidebar');
        const content = document.getElementById('testInfoContent');
        const closeBtn = document.getElementById('closeTestInfoSidebar');
        if (!sidebar || !content) return;
        // Find test info
        const info = (this.testInfo || []).find(t => t.name === testName);
        if (!info) {
            content.innerHTML = `<h2>${testName}</h2><p>Information not available.</p>`;
        } else {
            content.innerHTML = `
                <h2>${info.name}</h2>
                <section><span class="test-info-label">Description:</span><div>${info.description}</div></section>
                <section><span class="test-info-label">Purpose:</span><div>${info.purpose}</div></section>
                <section><span class="test-info-label">When/Why to Get:</span><div>${info.when_to_get}</div></section>
                <section><span class="test-info-label">Preparation:</span><div>${info.preparation}</div></section>
                <section><span class="test-info-label">Procedure:</span><div>${info.procedure}</div></section>
                <section><span class="test-info-label">Normal Ranges / Results:</span><div>${info.normal_ranges}</div></section>
                <section><span class="test-info-label">Risks or Side Effects:</span><div>${info.risks}</div></section>
                <section><span class="test-info-label">Turnaround Time:</span><div>${info.turnaround_time}</div></section>
                <section><span class="test-info-label">References:</span><ul>
                    ${(info.references || []).map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                </ul></section>
            `;
        }
        sidebar.style.display = 'flex';
        setTimeout(() => sidebar.classList.add('open'), 10);
        if (closeBtn) {
            closeBtn.onclick = () => {
                sidebar.classList.remove('open');
                setTimeout(() => { sidebar.style.display = 'none'; }, 350);
            };
        }
    }

    addHospitalEventListeners() {
        const emergencyButtons = document.querySelectorAll('.emergency-btn');
        emergencyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const phone = btn.textContent.split(': ')[1];
                alert(`Calling emergency: ${phone}`);
            });
        });
        // Add Get Directions logic
        const directionButtons = document.querySelectorAll('.hospital-card .btn.btn--secondary');
        directionButtons.forEach(btn => {
            if (btn.textContent.trim() === 'Get Directions') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.hospital-card');
                    const address = card.querySelector('.hospital-address').textContent;
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
                    window.open(mapsUrl, '_blank');
                });
            }
        });
    }

    addPharmacyEventListeners() {
        const checkButtons = document.querySelectorAll('.check-availability');
        checkButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.pharmacy-card');
                const pharmacyName = card.querySelector('h3').textContent;
                alert(`Checking medicine availability at ${pharmacyName}. This feature will be implemented soon!`);
            });
        });
        // Add Get Directions logic
        const directionButtons = document.querySelectorAll('.pharmacy-card .btn.btn--secondary');
        directionButtons.forEach(btn => {
            if (btn.textContent.trim() === 'Get Directions') {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const card = btn.closest('.pharmacy-card');
                    const name = card.querySelector('h3').textContent;
                    const address = card.querySelector('.pharmacy-address').textContent;
                    const destination = `${name}, ${address}`;
                    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
                    window.open(mapsUrl, '_blank');
                });
            }
        });
    }

    showMedicineInfoSidebar(medicineName) {
        const sidebar = document.getElementById('medicineInfoSidebar');
        const content = document.getElementById('medicineInfoContent');
        const closeBtn = document.getElementById('closeMedicineInfoSidebar');
        if (!sidebar || !content) return;
        // Find medicine info
        const info = (this.medicineInfo || []).find(m => m.name === medicineName);
        if (!info) {
            content.innerHTML = `<h2>${medicineName}</h2><p>Information not available.</p>`;
        } else {
            content.innerHTML = `
                <h2>${info.name}</h2>
                <section><span class="medicine-info-label">Description:</span><div>${info.description}</div></section>
                <section><span class="medicine-info-label">Uses:</span><div>${info.uses}</div></section>
                <section><span class="medicine-info-label">How it Works:</span><div>${info.how_it_works}</div></section>
                <section><span class="medicine-info-label">Dosage:</span><div>${info.dosage}</div></section>
                <section><span class="medicine-info-label">Side Effects:</span><div>${info.side_effects}</div></section>
                <section><span class="medicine-info-label">Precautions:</span><div>${info.precautions}</div></section>
                <section><span class="medicine-info-label">Storage:</span><div>${info.storage}</div></section>
                <section><span class="medicine-info-label">Manufacturer:</span><div>${info.manufacturer}</div></section>
                <section><span class="medicine-info-label">Prescription Required:</span><div>${info.prescription_required ? 'Yes' : 'No'}</div></section>
                <section><span class="medicine-info-label">References:</span><ul>
                    ${(info.references || []).map(ref => `<li><a href="${ref}" target="_blank">${ref}</a></li>`).join('')}
                </ul></section>
            `;
        }
        sidebar.style.display = 'flex';
        setTimeout(() => sidebar.classList.add('open'), 10);
        if (closeBtn) {
            closeBtn.onclick = () => {
                sidebar.classList.remove('open');
                setTimeout(() => { sidebar.style.display = 'none'; }, 350);
            };
        }
    }

    // Utility functions
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    getAvailabilityText(availability) {
        const availabilityMap = {
            'today': 'Today',
            'tomorrow': 'Tomorrow',
            'this-week': 'This Week'
        };
        return availabilityMap[availability] || availability;
    }

    renderOrderHistory() {
        const list = document.getElementById('orderHistoryList');
        if (!list) return;
        if (!this.orderHistory || this.orderHistory.length === 0) {
            list.innerHTML = '<p class="empty-history">No orders yet.</p>';
            return;
        }
        list.innerHTML = this.orderHistory.map(order => `
            <div class="order-history-card">
                <div class="order-history-header">
                    <span class="order-id">Order #${order.id}</span>
                </div>
                <div class="order-meds-header order-meds-row">
                    <span>Medicine</span>
                    <span>Qty</span>
                    <span>Subtotal</span>
                </div>
                <div class="order-meds-list">
                    ${order.items.map(item => `
                        <div class="order-meds-row">
                            <span>${item.name}</span>
                            <span class="med-qty">x${item.quantity}</span>
                            <span class="med-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-history-summary">
                    <span class="order-date">${order.date.toLocaleString()}</span>
                    <span class="order-total">Total: $${order.total.toFixed(2)}</span>
                </div>
            </div>
        `).join('');
    }
}

// Initialize data loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dataLoader = new DataLoader();
    dataLoader.loadAllData();
    // Close test info and medicine info sidebars on module switch
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const testSidebar = document.getElementById('testInfoSidebar');
            if (testSidebar && testSidebar.classList.contains('open')) {
                testSidebar.classList.remove('open');
                setTimeout(() => { testSidebar.style.display = 'none'; }, 350);
            }
            const medSidebar = document.getElementById('medicineInfoSidebar');
            if (medSidebar && medSidebar.classList.contains('open')) {
                medSidebar.classList.remove('open');
                setTimeout(() => { medSidebar.style.display = 'none'; }, 350);
            }
        });
    });
}); 
