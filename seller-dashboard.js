class SellerDashboard {
    constructor() {
        this.menuItems = [
            { id: 1, name: 'Classic Burger', price: 8.50, description: 'Beef patty, lettuce, tomato, cheese', category: 'Burgers', available: true, size: 'Medium', image: null },
            { id: 2, name: 'Bacon Cheeseburger', price: 10.50, description: 'Classic burger with crispy bacon', category: 'Burgers', available: true, size: 'Large', image: null },
            { id: 3, name: 'Veggie Burger', price: 9.00, description: 'Plant-based patty with vegetables', category: 'Burgers', available: false, size: 'Medium', image: null },
            { id: 4, name: 'Crispy Fries', price: 4.50, description: 'Golden crispy fries', category: 'Sides', available: true, size: 'Small', image: null },
            { id: 5, name: 'Soft Drink', price: 2.50, description: 'Various sodas available', category: 'Drinks', available: true, size: 'Large', image: null }
        ];

        this.sections = ['Burgers', 'Sides', 'Drinks', 'Desserts'];

        this.orders = [
            {
                id: 'ORD-001',
                studentName: 'John Doe',
                studentId: 'ST-12345',
                items: [
                    { name: 'Classic Burger', quantity: 2, price: 8.50 },
                    { name: 'Crispy Fries', quantity: 1, price: 4.50 }
                ],
                total: 21.50,
                paymentMethod: 'gcash',
                status: 'pending',
                timestamp: new Date(Date.now() - 5 * 60000)
            },
            {
                id: 'ORD-002',
                studentName: 'Jane Smith',
                studentId: 'ST-67890',
                items: [
                    { name: 'Bacon Cheeseburger', quantity: 1, price: 10.50 },
                    { name: 'Soft Drink', quantity: 2, price: 2.50 }
                ],
                total: 15.50,
                paymentMethod: 'cash',
                status: 'preparing',
                timestamp: new Date(Date.now() - 15 * 60000)
            }
        ];

        this.editingItem = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateCategoryDropdown();
        this.updateStats();
        this.renderOrders();
        this.renderMenuItems();
    }

    setupEventListeners() {
        // Tab switching
        const tabTriggers = document.querySelectorAll('.tab-trigger');
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => this.switchTab(trigger.dataset.tab));
        });

        // Profile menu
        document.getElementById('profile-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleProfileMenu();
        });

        // Close profile menu when clicking outside
        document.addEventListener('click', () => {
            document.getElementById('profile-dropdown').classList.remove('show');
        });

        // Profile menu items
        document.getElementById('change-password-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.openChangePasswordModal();
        });

        document.getElementById('view-stall-btn').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'stall-page.html'; // Replace with actual stall page URL
        });

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Add new menu item
        document.getElementById('add-item-btn').addEventListener('click', () => this.addMenuItem());

        // Category dropdown handling
        document.getElementById('item-category').addEventListener('change', (e) => {
            if (e.target.value === 'add-section') {
                this.openAddSectionModal();
            } else if (e.target.value === 'remove-section') {
                this.openRemoveSectionModal();
            }
        });

        // Image upload handling
        document.getElementById('item-image').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'image-preview');
        });

        document.getElementById('edit-image').addEventListener('change', (e) => {
            this.handleImageUpload(e, 'edit-image-preview');
        });

        // Modal close buttons
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
        document.getElementById('edit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'edit-modal') this.closeModal();
        });

        // Add Section Modal
        document.getElementById('add-section-close').addEventListener('click', () => this.closeAddSectionModal());
        document.getElementById('create-section-btn').addEventListener('click', () => this.createSection());

        // Remove Section Modal
        document.getElementById('remove-section-close').addEventListener('click', () => this.closeRemoveSectionModal());
        document.getElementById('confirm-remove-section-btn').addEventListener('click', () => this.removeSection());

        // Change Password Modal
        document.getElementById('change-password-close').addEventListener('click', () => this.closeChangePasswordModal());
        document.getElementById('update-password-btn').addEventListener('click', () => this.updatePassword());

        // Update menu item
        document.getElementById('update-item-btn').addEventListener('click', () => this.updateMenuItem());
    }

    switchTab(tabName) {
        // Update tab triggers
        const triggers = document.querySelectorAll('.tab-trigger');
        triggers.forEach(t => t.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(c => c.classList.add('hidden'));
        document.getElementById(`${tabName}-tab`).classList.remove('hidden');
    }

    updateStats() {
        const pendingOrders = this.orders.filter(o => o.status === 'pending' || o.status === 'preparing');
        const readyOrders = this.orders.filter(o => o.status === 'ready');
        const completedOrders = this.orders.filter(o => o.status === 'completed');
        const totalSales = this.orders.reduce((sum, o) => sum + o.total, 0);

        document.getElementById('pending-count').textContent = pendingOrders.length;
        document.getElementById('ready-count').textContent = readyOrders.length;
        document.getElementById('completed-count').textContent = completedOrders.length;
        document.getElementById('total-sales').textContent = `₱${totalSales.toFixed(2)}`;

        // Add color classes
        document.getElementById('pending-count').className = 'stat-number warning';
        document.getElementById('ready-count').className = 'stat-number accent';
        document.getElementById('completed-count').className = 'stat-number success';
        document.getElementById('total-sales').className = 'stat-number secondary';
    }

    renderOrders() {
        const activeOrders = this.orders.filter(o => o.status === 'pending' || o.status === 'preparing');
        const readyOrders = this.orders.filter(o => o.status === 'ready');

        this.renderOrderList('active-orders', activeOrders, false);
        this.renderOrderList('ready-orders', readyOrders, true);
    }

    renderOrderList(containerId, orders, isReady) {
        const container = document.getElementById(containerId);
        
        if (orders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div>${isReady ? 'No orders ready for pickup' : 'No active orders at the moment'}</div>
                </div>
            `;
            return;
        }

        container.innerHTML = orders.map(order => `
            <div class="order-card ${isReady ? 'ready' : ''}">
                <div class="order-header">
                    <div class="order-title">
                        <div class="order-id">${order.id}</div>
                        <div class="badge ${order.status}">
                            ${this.getStatusIcon(order.status)}
                            <span>${order.status === 'ready' ? 'Ready' : order.status}</span>
                        </div>
                    </div>
                    <div class="order-student">${order.studentName}</div>
                    <div class="order-student-id">ID: ${order.studentId}</div>
                    <div class="order-time">${order.timestamp.toLocaleTimeString()}</div>
                </div>
                <div class="order-content">
                    <div class="order-items">
                        ${order.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} × ${item.quantity}</span>
                                <span>₱${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        `).join('')}
                        <div class="order-total">
                            <span>Total</span>
                            <span>₱${order.total.toFixed(2)}</span>
                        </div>
                        <div class="order-payment">
                            Payment: ${order.paymentMethod === 'gcash' ? 'GCash' : 'Cash on Pickup'}
                        </div>
                    </div>
                    
                    <div class="order-actions">
                        ${this.getOrderActionButtons(order)}
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to order action buttons
        container.querySelectorAll('[data-order-id]').forEach(button => {
            button.addEventListener('click', () => {
                const orderId = button.dataset.orderId;
                const newStatus = button.dataset.newStatus;
                this.updateOrderStatus(orderId, newStatus);
            });
        });
    }

    getStatusIcon(status) {
        const icons = {
            pending: '🕒',
            preparing: '📦',
            ready: '⚠️',
            completed: '✅'
        };
        return icons[status] || '';
    }

    getOrderActionButtons(order) {
        if (order.status === 'pending') {
            return `
                <button class="btn btn-secondary btn-full" data-order-id="${order.id}" data-new-status="preparing">
                    Start Preparing
                </button>
            `;
        } else if (order.status === 'preparing') {
            return `
                <button class="btn btn-accent btn-full" data-order-id="${order.id}" data-new-status="ready">
                    Mark Ready
                </button>
            `;
        } else if (order.status === 'ready') {
            return `
                <button class="btn btn-success btn-full" data-order-id="${order.id}" data-new-status="completed">
                    Mark as Picked Up
                </button>
            `;
        }
        return '';
    }

    updateOrderStatus(orderId, newStatus) {
        const orderIndex = this.orders.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            this.orders[orderIndex].status = newStatus;
            this.showToast('Order Status Updated', `Order ${orderId} is now ${newStatus}.`);
            this.updateStats();
            this.renderOrders();
        }
    }

    renderMenuItems() {
        const container = document.getElementById('menu-items');
        
        container.innerHTML = this.menuItems.map(item => `
            <div class="menu-item ${!item.available ? 'unavailable' : ''}">
                ${item.image ? `<div class="menu-item-image"><img src="${item.image}" alt="${item.name}"></div>` : ''}
                <div class="menu-item-header">
                    <div class="menu-item-info">
                        <h4>${item.name}</h4>
                        <div class="badge" style="background: var(--muted); color: var(--muted-foreground); font-size: 0.75rem;">
                            ${item.category}${item.size ? ` - ${item.size}` : ''}
                        </div>
                    </div>
                    <div class="menu-item-actions">
                        <button class="btn btn-ghost btn-sm" onclick="dashboard.editMenuItem(${item.id})">
                            ✏️
                        </button>
                        <button class="btn btn-ghost btn-sm btn-destructive" onclick="dashboard.deleteMenuItem(${item.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                
                <div class="menu-item-description">${item.description}</div>
                
                <div class="menu-item-footer">
                    <span class="menu-item-price">₱${item.price.toFixed(2)}</span>
                    <button class="btn btn-sm ${item.available ? 'btn-primary' : 'btn-ghost'}" 
                            onclick="dashboard.toggleItemAvailability(${item.id})">
                        ${item.available ? 'Available' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `).join('');
    }

    addMenuItem() {
        const name = document.getElementById('item-name').value.trim();
        const price = parseFloat(document.getElementById('item-price').value);
        const category = document.getElementById('item-category').value;
        const size = document.getElementById('item-size').value;
        const description = document.getElementById('item-description').value.trim();
        const imageFile = document.getElementById('item-image').files[0];

        if (!name || !price || category === 'add-section' || category === 'remove-section') {
            this.showToast('Missing Information', 'Please fill in all required fields.', 'error');
            return;
        }

        const newItem = {
            id: Math.max(...this.menuItems.map(i => i.id), 0) + 1,
            name,
            price,
            description,
            category,
            size: size || null,
            available: true,
            image: imageFile ? URL.createObjectURL(imageFile) : null
        };

        this.menuItems.push(newItem);
        
        // Clear form
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-size').value = '';
        document.getElementById('item-description').value = '';
        document.getElementById('item-category').value = 'Burgers';
        document.getElementById('item-image').value = '';
        document.getElementById('image-preview').classList.remove('show');

        this.showToast('Item Added', 'New menu item has been added successfully.');
        this.renderMenuItems();
    }

    editMenuItem(id) {
        const item = this.menuItems.find(i => i.id === id);
        if (!item) return;

        this.editingItem = { ...item };
        
        document.getElementById('edit-name').value = item.name;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-size').value = item.size || '';
        document.getElementById('edit-description').value = item.description;
        
        // Show current image if exists
        if (item.image) {
            const preview = document.getElementById('edit-image-preview');
            preview.innerHTML = `<img src="${item.image}" alt="${item.name}">`;
            preview.classList.add('show');
        }
        
        document.getElementById('edit-modal').classList.add('show');
    }

    updateMenuItem() {
        if (!this.editingItem) return;

        const name = document.getElementById('edit-name').value.trim();
        const price = parseFloat(document.getElementById('edit-price').value);
        const size = document.getElementById('edit-size').value;
        const description = document.getElementById('edit-description').value.trim();
        const imageFile = document.getElementById('edit-image').files[0];

        if (!name || !price) {
            this.showToast('Missing Information', 'Please fill in all required fields.', 'error');
            return;
        }

        const itemIndex = this.menuItems.findIndex(i => i.id === this.editingItem.id);
        if (itemIndex !== -1) {
            this.menuItems[itemIndex] = {
                ...this.menuItems[itemIndex],
                name,
                price,
                size: size || null,
                description,
                image: imageFile ? URL.createObjectURL(imageFile) : this.editingItem.image
            };
        }

        this.closeModal();
        this.showToast('Item Updated', 'Menu item has been updated successfully.');
        this.renderMenuItems();
    }

    deleteMenuItem(id) {
        if (confirm('Are you sure you want to delete this menu item?')) {
            this.menuItems = this.menuItems.filter(i => i.id !== id);
            this.showToast('Item Deleted', 'Menu item has been removed.');
            this.renderMenuItems();
        }
    }

    toggleItemAvailability(id) {
        const itemIndex = this.menuItems.findIndex(i => i.id === id);
        if (itemIndex !== -1) {
            this.menuItems[itemIndex].available = !this.menuItems[itemIndex].available;
            this.renderMenuItems();
        }
    }

    closeModal() {
        document.getElementById('edit-modal').classList.remove('show');
        document.getElementById('edit-image-preview').classList.remove('show');
        document.getElementById('edit-image').value = '';
        this.editingItem = null;
    }

    // Profile Menu Methods
    toggleProfileMenu() {
        const dropdown = document.getElementById('profile-dropdown');
        dropdown.classList.toggle('show');
    }

    openChangePasswordModal() {
        document.getElementById('change-password-modal').classList.add('show');
        document.getElementById('profile-dropdown').classList.remove('show');
    }

    closeChangePasswordModal() {
        document.getElementById('change-password-modal').classList.remove('show');
    }

    updatePassword() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            this.showToast('Missing Information', 'Please fill in all fields.', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showToast('Password Mismatch', 'New passwords do not match.', 'error');
            return;
        }

        // Simulate password update
        this.showToast('Password Updated', 'Your password has been changed successfully.');
        this.closeChangePasswordModal();
        
        // Clear form
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';
    }

    logout() {
        if (confirm('Are you sure you want to log out?')) {
            // Simulate logout
            this.showToast('Logged Out', 'You have been logged out successfully.');
            setTimeout(() => {
                window.location.href = 'login.html'; // Replace with actual login page
            }, 1500);
        }
    }

    // Section Management Methods
    updateCategoryDropdown() {
        const categorySelect = document.getElementById('item-category');
        categorySelect.innerHTML = '';
        
        this.sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section;
            categorySelect.appendChild(option);
        });

        // Add management options
        const addOption = document.createElement('option');
        addOption.value = 'add-section';
        addOption.textContent = '+ Add Section';
        categorySelect.appendChild(addOption);

        const removeOption = document.createElement('option');
        removeOption.value = 'remove-section';
        removeOption.textContent = '- Remove Section';
        categorySelect.appendChild(removeOption);
    }

    openAddSectionModal() {
        document.getElementById('add-section-modal').classList.add('show');
        document.getElementById('item-category').value = 'Burgers'; // Reset to default
    }

    closeAddSectionModal() {
        document.getElementById('add-section-modal').classList.remove('show');
    }

    createSection() {
        const sectionName = document.getElementById('new-section-name').value.trim();
        
        if (!sectionName) {
            this.showToast('Missing Information', 'Please enter a section name.', 'error');
            return;
        }

        if (this.sections.includes(sectionName)) {
            this.showToast('Section Exists', 'This section already exists.', 'error');
            return;
        }

        this.sections.push(sectionName);
        this.updateCategoryDropdown();
        this.closeAddSectionModal();
        
        // Clear form and select new section
        document.getElementById('new-section-name').value = '';
        document.getElementById('item-category').value = sectionName;
        
        this.showToast('Section Added', `Section "${sectionName}" has been created.`);
    }

    openRemoveSectionModal() {
        const removeSelect = document.getElementById('section-to-remove');
        removeSelect.innerHTML = '<option value="">Select Section to Remove</option>';
        
        this.sections.forEach(section => {
            const option = document.createElement('option');
            option.value = section;
            option.textContent = section;
            removeSelect.appendChild(option);
        });

        document.getElementById('remove-section-modal').classList.add('show');
        document.getElementById('item-category').value = 'Burgers'; // Reset to default
    }

    closeRemoveSectionModal() {
        document.getElementById('remove-section-modal').classList.remove('show');
    }

    removeSection() {
        const sectionToRemove = document.getElementById('section-to-remove').value;
        
        if (!sectionToRemove) {
            this.showToast('Missing Information', 'Please select a section to remove.', 'error');
            return;
        }

        // Check if there are items in this section
        const itemsInSection = this.menuItems.filter(item => item.category === sectionToRemove);
        if (itemsInSection.length > 0) {
            if (!confirm(`There are ${itemsInSection.length} items in this section. Remove anyway?`)) {
                return;
            }
            // Remove items in this section
            this.menuItems = this.menuItems.filter(item => item.category !== sectionToRemove);
        }

        this.sections = this.sections.filter(section => section !== sectionToRemove);
        this.updateCategoryDropdown();
        this.closeRemoveSectionModal();
        this.renderMenuItems();
        
        this.showToast('Section Removed', `Section "${sectionToRemove}" has been removed.`);
    }

    // Image Upload Handler
    handleImageUpload(event, previewId) {
        const file = event.target.files[0];
        const preview = document.getElementById(previewId);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                preview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
                preview.classList.add('show');
            };
            reader.readAsDataURL(file);
        } else {
            preview.classList.remove('show');
        }
    }

    showToast(title, description, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;

        document.getElementById('toast-container').appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize the dashboard
const dashboard = new SellerDashboard();