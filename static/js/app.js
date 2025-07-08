// Configuration
const API_BASE_URL = window.location.origin || 'http://localhost:5000';

// Application Data
const appData = {
    healthMetrics: [
        {type: "Heart Rate", value: "72", unit: "bpm", status: "normal", trend: "stable"},
        {type: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal", trend: "stable"},
        {type: "Temperature", value: "98.6", unit: "°F", status: "normal", trend: "stable"},
        {type: "Blood Sugar", value: "95", unit: "mg/dL", status: "normal", trend: "stable"},
        {type: "Sleep", value: "7.5", unit: "hours", status: "good", trend: "improving"},
        {type: "Steps", value: "8,245", unit: "steps", status: "active", trend: "increasing"}
    ],
    doctors: [
        {id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", rating: 4.8, experience: "15 years", availability: "Available Today"},
        {id: 2, name: "Dr. Michael Chen", specialty: "Neurologist", rating: 4.9, experience: "12 years", availability: "Available Tomorrow"},
        {id: 3, name: "Dr. Emily Rodriguez", specialty: "Dermatologist", rating: 4.7, experience: "10 years", availability: "Available Today"}
    ],
    medicines: [
        {id: 1, name: "Paracetamol 500mg", price: "$12.99", category: "pain-relief", inStock: true, description: "Effective pain relief medication"},
        {id: 2, name: "Vitamin D3 1000IU", price: "$18.50", category: "vitamins", inStock: true, description: "Essential vitamin supplement"},
        {id: 3, name: "Lisinopril 10mg", price: "$25.00", category: "blood-pressure", inStock: false, description: "Blood pressure medication"}
    ],
    labTests: [
        {id: 1, name: "Complete Blood Count", price: "$45", category: "blood-tests", duration: "24 hours", description: "Comprehensive blood analysis"},
        {id: 2, name: "Lipid Profile", price: "$55", category: "heart-health", duration: "12 hours", description: "Cholesterol and triglyceride levels"},
        {id: 3, name: "Thyroid Function Test", price: "$60", category: "hormone-tests", duration: "48 hours", description: "T3, T4, TSH levels"}
    ],
    hospitals: [
        {id: 1, name: "City General Hospital", address: "123 Medical Center Dr", distance: "0.8 miles", emergency: true, rating: 4.5, services: ["Emergency Care", "Surgery", "ICU"]},
        {id: 2, name: "St. Mary's Medical Center", address: "456 Health Ave", distance: "1.2 miles", emergency: true, rating: 4.7, services: ["Cardiology", "Neurology", "Pediatrics"]},
        {id: 3, name: "Metro Heart Institute", address: "789 Cardiac Blvd", distance: "2.1 miles", emergency: false, rating: 4.9, services: ["Cardiology", "Cardiac Surgery"]}
    ],
    pharmacies: [
        {id: 1, name: "CVS Pharmacy", address: "321 Main St", distance: "0.3 miles", hours: "24/7", phone: "(555) 123-4567"},
        {id: 2, name: "Walgreens", address: "654 Oak Ave", distance: "0.5 miles", hours: "6AM - 12AM", phone: "(555) 987-6543"},
        {id: 3, name: "Rite Aid", address: "987 Pine Rd", distance: "0.7 miles", hours: "7AM - 11PM", phone: "(555) 456-7890"}
    ],
};

// Updated Hospital Data - Replace the existing hospitalData array
const hospitalData = [
    // India Hospitals
    {
        id: 'india-1',
        name: 'All India Institute of Medical Sciences',
        address: 'Ansari Nagar, New Delhi, Delhi 110029',
        distance: 2.1,
        rating: 4.5,
        reviewCount: 1247,
        specializations: ['Emergency', 'Cardiology', 'Neurology', 'Oncology'],
        phone: '+91 11 2658 8500',
        emergencyPhone: '+91 11 2658 8700',
        country: 'India',
        city: 'New Delhi'
    },
    {
        id: 'india-2',
        name: 'Apollo Hospital Chennai',
        address: '21, Greams Lane, Off Greams Road, Chennai, Tamil Nadu 600006',
        distance: 3.4,
        rating: 4.3,
        reviewCount: 892,
        specializations: ['Surgery', 'Cardiology', 'Orthopedics', 'ICU'],
        phone: '+91 44 2829 3333',
        emergencyPhone: '+91 44 2829 4444',
        country: 'India',
        city: 'Chennai'
    },
    {
        id: 'india-3',
        name: 'Fortis Hospital Mohali',
        address: 'Sector 62, Phase-VIII, Mohali, Punjab 160062',
        distance: 1.8,
        rating: 4.2,
        reviewCount: 634,
        specializations: ['Emergency', 'Neurology', 'Gastroenterology', 'Pediatrics'],
        phone: '+91 172 496 7000',
        emergencyPhone: '+91 172 496 7001',
        country: 'India',
        city: 'Mohali'
    },
    {
        id: 'india-4',
        name: 'Kokilaben Dhirubhai Ambani Hospital',
        address: 'Rao Saheb Achutrao Patwardhan Marg, Four Bunglows, Andheri West, Mumbai, Maharashtra 400053',
        distance: 4.7,
        rating: 4.4,
        reviewCount: 756,
        specializations: ['Oncology', 'Cardiology', 'Neurosurgery', 'Emergency'],
        phone: '+91 22 4269 6969',
        emergencyPhone: '+91 22 4269 6970',
        country: 'India',
        city: 'Mumbai'
    },
    {
        id: 'india-5',
        name: 'Medanta The Medicity',
        address: 'CH Baktawar Singh Rd, near Olympus, Sector 38, Gurugram, Haryana 122001',
        distance: 6.2,
        rating: 4.1,
        reviewCount: 923,
        specializations: ['Heart Surgery', 'Transplant', 'Oncology', 'ICU'],
        phone: '+91 124 414 1414',
        emergencyPhone: '+91 124 414 1500',
        country: 'India',
        city: 'Gurugram'
    },
    {
        id: 'india-6',
        name: 'Christian Medical College Vellore',
        address: 'Ida Scudder Rd, Vellore, Tamil Nadu 632004',
        distance: 5.1,
        rating: 4.6,
        reviewCount: 1134,
        specializations: ['Emergency', 'Infectious Disease', 'Surgery', 'Pediatrics'],
        phone: '+91 416 228 1000',
        emergencyPhone: '+91 416 228 1001',
        country: 'India',
        city: 'Vellore'
    },
    {
        id: 'india-7',
        name: 'Manipal Hospital Bangalore',
        address: '98, Rustum Bagh, Airport Rd, Bangalore, Karnataka 560017',
        distance: 3.9,
        rating: 4.0,
        reviewCount: 567,
        specializations: ['Orthopedics', 'Urology', 'Gastroenterology', 'Emergency'],
        phone: '+91 80 2502 4444',
        emergencyPhone: '+91 80 2502 4500',
        country: 'India',
        city: 'Bangalore'
    },
    {
        id: 'india-8',
        name: 'Max Super Speciality Hospital Saket',
        address: '1, 2, Press Enclave Road, Saket Institutional Area, Saket, New Delhi, Delhi 110017',
        distance: 2.8,
        rating: 4.2,
        reviewCount: 798,
        specializations: ['Cardiology', 'Neurology', 'Oncology', 'Emergency'],
        phone: '+91 11 2651 5050',
        emergencyPhone: '+91 11 2651 5100',
        country: 'India',
        city: 'New Delhi'
    },
    {
        id: 'india-9',
        name: 'Narayana Health City Bangalore',
        address: '258/A, Bommasandra Industrial Area, Anekal Taluk, Bangalore, Karnataka 560099',
        distance: 7.3,
        rating: 4.1,
        reviewCount: 1023,
        specializations: ['Heart Surgery', 'Pediatric Surgery', 'Nephrology', 'ICU'],
        phone: '+91 80 7122 2200',
        emergencyPhone: '+91 80 7122 2300',
        country: 'India',
        city: 'Bangalore'
    },
    {
        id: 'india-10',
        name: 'Tata Memorial Hospital Mumbai',
        address: 'Dr Ernest Borges Rd, Parel, Mumbai, Maharashtra 400012',
        distance: 4.5,
        rating: 4.3,
        reviewCount: 856,
        specializations: ['Oncology', 'Radiation Therapy', 'Surgery', 'Emergency'],
        phone: '+91 22 2417 7000',
        emergencyPhone: '+91 22 2417 7001',
        country: 'India',
        city: 'Mumbai'
    },

    // USA Hospitals
    {
        id: 'usa-1',
        name: 'Mayo Clinic Rochester',
        address: '200 1st St SW, Rochester, MN 55905',
        distance: 2.4,
        rating: 4.8,
        reviewCount: 2134,
        specializations: ['Emergency', 'Cardiology', 'Neurology', 'Oncology'],
        phone: '+1 507 284 2511',
        emergencyPhone: '+1 507 284 2111',
        country: 'USA',
        city: 'Rochester'
    },
    {
        id: 'usa-2',
        name: 'Cleveland Clinic',
        address: '9500 Euclid Ave, Cleveland, OH 44195',
        distance: 1.9,
        rating: 4.7,
        reviewCount: 1876,
        specializations: ['Heart Surgery', 'Neurosurgery', 'Orthopedics', 'Emergency'],
        phone: '+1 216 444 2200',
        emergencyPhone: '+1 216 444 7000',
        country: 'USA',
        city: 'Cleveland'
    },
    {
        id: 'usa-3',
        name: 'Johns Hopkins Hospital',
        address: '1800 Orleans St, Baltimore, MD 21287',
        distance: 3.2,
        rating: 4.6,
        reviewCount: 1567,
        specializations: ['Surgery', 'Pediatrics', 'Psychiatry', 'ICU'],
        phone: '+1 410 955 5000',
        emergencyPhone: '+1 410 955 6000',
        country: 'USA',
        city: 'Baltimore'
    },
    {
        id: 'usa-4',
        name: 'Massachusetts General Hospital',
        address: '55 Fruit St, Boston, MA 02114',
        distance: 2.7,
        rating: 4.5,
        reviewCount: 1245,
        specializations: ['Emergency', 'Neurology', 'Cardiology', 'Transplant'],
        phone: '+1 617 726 2000',
        emergencyPhone: '+1 617 726 2100',
        country: 'USA',
        city: 'Boston'
    },
    {
        id: 'usa-5',
        name: 'UCLA Medical Center',
        address: '757 Westwood Plaza, Los Angeles, CA 90095',
        distance: 4.1,
        rating: 4.4,
        reviewCount: 1389,
        specializations: ['Oncology', 'Neurosurgery', 'Pediatrics', 'Emergency'],
        phone: '+1 310 825 9111',
        emergencyPhone: '+1 310 825 2111',
        country: 'USA',
        city: 'Los Angeles'
    },
    {
        id: 'usa-6',
        name: 'New York-Presbyterian Hospital',
        address: '525 E 68th St, New York, NY 10065',
        distance: 1.6,
        rating: 4.3,
        reviewCount: 2045,
        specializations: ['Emergency', 'Heart Surgery', 'Maternity', 'ICU'],
        phone: '+1 212 746 5454',
        emergencyPhone: '+1 212 746 5050',
        country: 'USA',
        city: 'New York'
    },
    {
        id: 'usa-7',
        name: 'UCSF Medical Center',
        address: '505 Parnassus Ave, San Francisco, CA 94143',
        distance: 3.8,
        rating: 4.2,
        reviewCount: 987,
        specializations: ['Neurology', 'Oncology', 'Transplant', 'Emergency'],
        phone: '+1 415 476 1000',
        emergencyPhone: '+1 415 476 1001',
        country: 'USA',
        city: 'San Francisco'
    },
    {
        id: 'usa-8',
        name: 'Houston Methodist Hospital',
        address: '6565 Fannin St, Houston, TX 77030',
        distance: 2.3,
        rating: 4.1,
        reviewCount: 1156,
        specializations: ['Cardiology', 'Orthopedics', 'Surgery', 'Emergency'],
        phone: '+1 713 790 3311',
        emergencyPhone: '+1 713 790 3400',
        country: 'USA',
        city: 'Houston'
    },
    {
        id: 'usa-9',
        name: 'Cedars-Sinai Medical Center',
        address: '8700 Beverly Blvd, Los Angeles, CA 90048',
        distance: 4.7,
        rating: 4.0,
        reviewCount: 1334,
        specializations: ['Emergency', 'Gastroenterology', 'Neurology', 'ICU'],
        phone: '+1 310 423 3277',
        emergencyPhone: '+1 310 423 8780',
        country: 'USA',
        city: 'Los Angeles'
    },
    {
        id: 'usa-10',
        name: 'Northwestern Memorial Hospital',
        address: '251 E Huron St, Chicago, IL 60611',
        distance: 2.1,
        rating: 4.2,
        reviewCount: 1098,
        specializations: ['Heart Surgery', 'Neurosurgery', 'Oncology', 'Emergency'],
        phone: '+1 312 926 2000',
        emergencyPhone: '+1 312 926 5188',
        country: 'USA',
        city: 'Chicago'
    },

    // UK Hospitals
    {
        id: 'uk-1',
        name: 'Great Ormond Street Hospital',
        address: 'Great Ormond St, Bloomsbury, London WC1N 3JH',
        distance: 1.5,
        rating: 4.6,
        reviewCount: 1234,
        specializations: ['Pediatrics', 'Emergency', 'Surgery', 'ICU'],
        phone: '+44 20 7405 9200',
        emergencyPhone: '+44 20 7405 9300',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-2',
        name: 'St. Bartholomew\'s Hospital',
        address: 'W Smithfield, London EC1A 7BE',
        distance: 2.3,
        rating: 4.4,
        reviewCount: 987,
        specializations: ['Emergency', 'Cardiology', 'Trauma', 'Surgery'],
        phone: '+44 20 3465 5000',
        emergencyPhone: '+44 20 3465 5001',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-3',
        name: 'Royal Marsden Hospital',
        address: '203 Fulham Rd, Chelsea, London SW3 6JJ',
        distance: 3.1,
        rating: 4.5,
        reviewCount: 856,
        specializations: ['Oncology', 'Radiation Therapy', 'Surgery', 'Emergency'],
        phone: '+44 20 7352 8171',
        emergencyPhone: '+44 20 7352 8200',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-4',
        name: 'Guy\'s Hospital',
        address: 'Great Maze Pond, London SE1 9RT',
        distance: 2.8,
        rating: 4.3,
        reviewCount: 1067,
        specializations: ['Emergency', 'Neurology', 'Transplant', 'ICU'],
        phone: '+44 20 7188 7188',
        emergencyPhone: '+44 20 7188 8888',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-5',
        name: 'King\'s College Hospital',
        address: 'Denmark Hill, London SE5 9RS',
        distance: 4.2,
        rating: 4.2,
        reviewCount: 743,
        specializations: ['Liver Surgery', 'Neurosurgery', 'Emergency', 'Maternity'],
        phone: '+44 20 3299 9000',
        emergencyPhone: '+44 20 3299 4000',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-6',
        name: 'The Royal London Hospital',
        address: 'Whitechapel Rd, Whitechapel, London E1 1FR',
        distance: 3.7,
        rating: 4.1,
        reviewCount: 892,
        specializations: ['Emergency', 'Trauma', 'Burns', 'Surgery'],
        phone: '+44 20 3416 5000',
        emergencyPhone: '+44 20 3416 5001',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-7',
        name: 'Imperial College Healthcare NHS Trust',
        address: 'Du Cane Rd, London W12 0HS',
        distance: 5.1,
        rating: 4.0,
        reviewCount: 634,
        specializations: ['Research', 'Oncology', 'Cardiology', 'Emergency'],
        phone: '+44 20 3313 1000',
        emergencyPhone: '+44 20 3313 1001',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-8',
        name: 'University College London Hospitals',
        address: '235 Euston Rd, Fitzrovia, London NW1 2BU',
        distance: 2.6,
        rating: 4.2,
        reviewCount: 1156,
        specializations: ['Emergency', 'Neurology', 'Cancer', 'ICU'],
        phone: '+44 20 3456 7890',
        emergencyPhone: '+44 20 3456 7000',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-9',
        name: 'Chelsea and Westminster Hospital',
        address: '369 Fulham Rd, London SW10 9NH',
        distance: 4.4,
        rating: 3.9,
        reviewCount: 567,
        specializations: ['Maternity', 'Emergency', 'Burns', 'Pediatrics'],
        phone: '+44 20 3315 8000',
        emergencyPhone: '+44 20 3315 8001',
        country: 'UK',
        city: 'London'
    },
    {
        id: 'uk-10',
        name: 'The London Clinic',
        address: '20 Devonshire Pl, Marylebone, London W1G 6BW',
        distance: 1.8,
        rating: 4.4,
        reviewCount: 423,
        specializations: ['Private Care', 'Surgery', 'Oncology', 'Cardiology'],
        phone: '+44 20 7935 4444',
        emergencyPhone: '+44 20 7935 4000',
        country: 'UK',
        city: 'London'
    }
];

// Global variables
let currentModule = 'dashboard';
let cart = [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    setupNavigation();
    setupSearch();
    setupHealthDashboard();
    setupChatbot();
    setupMedicineDelivery();
    setupDoctorConsultation();
    setupTestBooking();
    setupHospitalFinder();
    setupPharmacyFinder();
    
    // Show loading overlay briefly
    showLoading();
    setTimeout(hideLoading, 1000);
}

// Navigation System
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            switchModule(moduleId);
            
            // Update active navigation
            navButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchModule(moduleId) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(module => {
        module.classList.remove('active');
    });
    
    // Show selected module
    document.getElementById(moduleId).classList.add('active');
    currentModule = moduleId;
    
    // Module-specific initialization
    if (moduleId === 'dashboard') {
        initializeCharts();
    }
}

// Search Functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const module = this.closest('.module');
            performSearch(searchTerm, module);
        });
    });
}

function performSearch(searchTerm, module) {
    if (!searchTerm) {
        // Show all items when search is empty
        const cards = module.querySelectorAll('.medicine-card, .doctor-card, .test-card, .hospital-card, .pharmacy-card');
        cards.forEach(card => card.style.display = 'block');
        return;
    }
    
    const cards = module.querySelectorAll('.medicine-card, .doctor-card, .test-card, .hospital-card, .pharmacy-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Health Dashboard
function setupHealthDashboard() {
    // Setup export functionality
    document.querySelector('.dashboard-actions .btn--primary').addEventListener('click', function() {
        showNotification('Health report exported successfully!', 'success');
    });
    
    // Setup sync devices
    document.querySelectorAll('.dashboard-actions .btn--secondary')[0].addEventListener('click', function() {
        showLoading();
        setTimeout(() => {
            hideLoading();
            showNotification('Devices synced successfully!', 'success');
            updateHealthMetrics();
        }, 2000);
    });
    
    // Setup view history
    document.querySelectorAll('.dashboard-actions .btn--secondary')[1].addEventListener('click', function() {
        showNotification('Health history opened!', 'info');
    });
    
    // Add click handlers to metric cards
    document.querySelectorAll('.metric-card').forEach(card => {
        card.addEventListener('click', function() {
            const metric = this.getAttribute('data-metric');
            showNotification(`Viewing detailed ${metric} data`, 'info');
        });
    });
}

function initializeCharts() {
    const canvases = document.querySelectorAll('.metric-chart canvas');
    
    canvases.forEach(canvas => {
        drawMiniChart(canvas);
    });
}

function drawMiniChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Generate sample data points
    const points = [];
    for (let i = 0; i < 10; i++) {
        points.push({
            x: (i / 9) * width,
            y: height - (Math.random() * 0.6 + 0.2) * height
        });
    }
    
    // Draw line chart
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = '#4CAF50';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateHealthMetrics() {
    // Simulate real-time updates
    appData.healthMetrics.forEach((metric, index) => {
        const card = document.querySelectorAll('.metric-card')[index];
        const valueElement = card.querySelector('.metric-value');
        
        // Add slight variation to values
        let newValue;
        switch(metric.type) {
            case 'Heart Rate':
                newValue = (70 + Math.floor(Math.random() * 10)).toString();
                break;
            case 'Steps':
                newValue = (8000 + Math.floor(Math.random() * 1000)).toLocaleString();
                break;
            default:
                newValue = metric.value;
        }
        
        valueElement.innerHTML = `${newValue} <span>${metric.unit}</span>`;
    });
    
    // Redraw charts
    initializeCharts();
}

// Chatbot System
function setupChatbot() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const clearButton = document.getElementById('clearChat');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const modal = document.getElementById('imageUploadModal');
    const closeModal = document.getElementById('closeModal');
    const cancelUpload = document.getElementById('cancelUpload');
    const confirmUpload = document.getElementById('confirmUpload');
    const imagePreview = document.getElementById('imagePreview');
    const imageComment = document.getElementById('imageComment');
    
    let selectedFile = null;
    
    sendButton.addEventListener('click', sendChatMessage);
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    clearButton.addEventListener('click', clearChat);

    uploadImageBtn.addEventListener('click', () => {
        document.getElementById('imageUpload').click();
    });

    document.getElementById('imageUpload').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            selectedFile = file;
            showImageUploadModal(file);
        }
        this.value = null; // Reset file input
    });

    // Modal controls
    closeModal.addEventListener('click', hideImageUploadModal);
    cancelUpload.addEventListener('click', hideImageUploadModal);
    confirmUpload.addEventListener('click', () => {
        if (selectedFile) {
            const comment = imageComment.value.trim();
            sendImageForAnalysis(selectedFile, comment);
            hideImageUploadModal();
        }
    });

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideImageUploadModal();
        }
    });

    function showImageUploadModal(file) {
        // Show image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
        
        // Clear previous comment
        imageComment.value = '';
        
        // Show modal
        modal.style.display = 'flex';
    }

    function hideImageUploadModal() {
        modal.style.display = 'none';
        imagePreview.style.display = 'none';
        imagePreview.src = '';
        imageComment.value = '';
        selectedFile = null;
    }
}

async function sendChatMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    chatInput.value = '';
    showLoading();

    try {
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.response || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        addChatMessage(data.response, 'bot');

    } catch (error) {
        console.error('Error sending message:', error);
        addChatMessage(`Error: Could not connect to the AI assistant. ${error.message}`, 'bot');
        showNotification(`Error: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

// Keep chatHistory for frontend rendering, backend manages its own session history
let chatHistory = []; 
function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const avatar = sender === 'bot' ? '🤖' : '👤';
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Use marked.js to render Markdown for bot messages
    let renderedMessage = message;
    if (sender === 'bot' && window.marked) {
        renderedMessage = marked.parse(message);
    } else {
        renderedMessage = message.replace(/\n/g, '<br>');
    }

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <p>${renderedMessage}</p>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in history
    chatHistory.push({message, sender, time});
}

async function sendImageForAnalysis(file, comment = '') {
    // Add user message with comment if provided
    const userMessage = comment 
        ? `You uploaded: ${file.name}\n\nComment: ${comment}`
        : `You uploaded: ${file.name}`;
    addChatMessage(userMessage, 'user');
    showLoading();

    const formData = new FormData();
    formData.append('image', file);
    if (comment) {
        formData.append('comment', comment);
    }

    try {
        const response = await fetch(`${API_BASE_URL}/analyze-image`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.result || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let messageWithProvider = data.result;
        if (data.provider) {
            messageWithProvider += `<br><span style="font-size:0.9em;color:#888;">API Used: <b>${data.provider === 'openrouter' ? 'OpenRouter' : 'Google Gemini'}</b></span>`;
        }
        addChatMessage(messageWithProvider, 'bot');
        showNotification('Image analysis complete!', 'success');
    } catch (error) {
        console.error('Error analyzing image:', error);
        addChatMessage(`Error: Could not analyze the image. ${error.message}`, 'bot');
        showNotification(`Image Analysis Error: ${error.message}`, 'error');
    } finally {
        hideLoading();
    }
}

function clearChat() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = `
        <div class="message bot-message">
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>Hello! I'm MediMentor-X, your AI doctor assistant. I'm here to help you with your health concerns. Please describe your symptoms, and I'll ask you relevant questions to better understand your condition.</p>
                <span class="message-time">Just now</span>
            </div>
        </div>
    `;
    chatHistory = [];
}

// Medicine Delivery System
function setupMedicineDelivery() {
    // Category filtering
    const categoryButtons = document.querySelectorAll('#delivery .category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterMedicines(category);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const medicineCard = this.closest('.medicine-card');
            const medicineName = medicineCard.querySelector('h3').textContent;
            const medicinePrice = medicineCard.querySelector('.medicine-price').textContent;
            
            addToCart({
                name: medicineName,
                price: medicinePrice,
                id: Date.now()
            });
        });
    });
    
    // Checkout functionality
    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length === 0) {
            // showNotification('Your cart is empty!', 'warning'); // Removed to prevent duplicate/incorrect notification
            return;
        }
        
        showLoading();
        setTimeout(() => {
            hideLoading();
            showNotification('Order placed successfully! Delivery in 2-3 hours.', 'success');
            cart = [];
            updateCartDisplay();
        }, 2000);
    });
}

function filterMedicines(category) {
    const medicines = document.querySelectorAll('.medicine-card');
    
    medicines.forEach(medicine => {
        if (category === 'all' || medicine.getAttribute('data-category') === category) {
            medicine.style.display = 'block';
        } else {
            medicine.style.display = 'none';
        }
    });
}

function addToCart(medicine) {
    cart.push(medicine);
    updateCartDisplay();
    showNotification(`${medicine.name} added to cart!`, 'success');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price}</span>
            <button class="btn btn--sm btn--secondary" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

// Doctor Consultation System
function setupDoctorConsultation() {
    // Specialty filtering
    const specialtyFilter = document.getElementById('specialtyFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');
    
    specialtyFilter.addEventListener('change', filterDoctors);
    availabilityFilter.addEventListener('change', filterDoctors);
    
    // Book appointment functionality
    document.querySelectorAll('.book-appointment').forEach(button => {
        button.addEventListener('click', function() {
            const doctorCard = this.closest('.doctor-card');
            const doctorName = doctorCard.querySelector('h3').textContent;
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification(`Appointment booked with ${doctorName}!`, 'success');
            }, 1500);
        });
    });
}

function filterDoctors() {
    const specialtyFilter = document.getElementById('specialtyFilter').value.toLowerCase();
    const availabilityFilter = document.getElementById('availabilityFilter').value.toLowerCase();
    const doctors = document.querySelectorAll('.doctor-card');
    
    doctors.forEach(doctor => {
        const specialty = doctor.getAttribute('data-specialty');
        const availability = doctor.getAttribute('data-availability');
        
        let showDoctor = true;
        
        if (specialtyFilter && !specialty.includes(specialtyFilter)) {
            showDoctor = false;
        }
        
        if (availabilityFilter) {
            if (availabilityFilter === 'today' && !availability.includes('today')) {
                showDoctor = false;
            }
            if (availabilityFilter === 'tomorrow' && !availability.includes('tomorrow')) {
                showDoctor = false;
            }
        }
        
        doctor.style.display = showDoctor ? 'block' : 'none';
    });
}

// Test Booking System
function setupTestBooking() {
    // Test category filtering
    const categoryButtons = document.querySelectorAll('#tests .category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterTests(category);
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Book test functionality
    document.querySelectorAll('.book-test').forEach(button => {
        button.addEventListener('click', function() {
            const testCard = this.closest('.test-card');
            const testName = testCard.querySelector('h3').textContent;
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification(`${testName} booked successfully!`, 'success');
            }, 1500);
        });
    });
    
    // Home collection and lab visit buttons
    document.querySelectorAll('.option-card .btn').forEach(button => {
        button.addEventListener('click', function() {
            const option = this.textContent.includes('Home') ? 'Home Collection' : 'Lab Visit';
            showNotification(`${option} option selected!`, 'info');
        });
    });
}

function filterTests(category) {
    const tests = document.querySelectorAll('.test-card');
    
    tests.forEach(test => {
        if (category === 'all' || test.getAttribute('data-category') === category) {
            test.style.display = 'block';
        } else {
            test.style.display = 'none';
        }
    });
}

// Hospital Finder System
function setupHospitalFinder() {
    // Hospital filtering
    const serviceFilter = document.getElementById('serviceFilter');
    const distanceFilter = document.getElementById('distanceFilter');
    
    serviceFilter.addEventListener('change', filterHospitals);
    distanceFilter.addEventListener('change', filterHospitals);
    
    // Emergency and direction buttons
    document.querySelectorAll('.hospital-actions .btn').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('emergency-btn')) {
                showNotification('Emergency contact initiated!', 'warning');
            } else {
                showNotification('Opening directions...', 'info');
            }
        });
    });
}

function filterHospitals() {
    const serviceFilter = document.getElementById('serviceFilter').value;
    const distanceFilter = document.getElementById('distanceFilter').value;
    const hospitals = document.querySelectorAll('.hospital-card');
    
    hospitals.forEach(hospital => {
        const services = hospital.getAttribute('data-services');
        const distance = parseFloat(hospital.getAttribute('data-distance'));
        
        let showHospital = true;
        
        if (serviceFilter && !services.includes(serviceFilter)) {
            showHospital = false;
        }
        
        if (distanceFilter && distance > parseFloat(distanceFilter)) {
            showHospital = false;
        }
        
        hospital.style.display = showHospital ? 'block' : 'none';
    });
}

// Pharmacy Finder System
function setupPharmacyFinder() {
    // Medicine availability check
    document.querySelectorAll('.check-availability').forEach(button => {
        button.addEventListener('click', function() {
            const pharmacyCard = this.closest('.pharmacy-card');
            const pharmacyName = pharmacyCard.querySelector('h3').textContent;
            
            showLoading();
            setTimeout(() => {
                hideLoading();
                showNotification(`Checking medicine availability at ${pharmacyName}...`, 'info');
                // Simulate showing availability results
                setTimeout(() => {
                    showNotification('Medicine availability results updated!', 'success');
                }, 1000);
            }, 1500);
        });
    });
    
    // Get directions functionality
    document.querySelectorAll('.pharmacy-card .btn--secondary').forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('Directions')) {
                showNotification('Opening directions to pharmacy...', 'info');
            }
        });
    });
}

// Utility Functions
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

function showNotification(message, type = 'info') {
    const stack = document.getElementById('notificationStack');
    if (!stack) return;
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${getNotificationIcon(type)}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;
    stack.prepend(toast);
    // Close button
    toast.querySelector('.toast-close').onclick = () => {
        toast.remove();
    };
    // Auto-dismiss after 4s
    setTimeout(() => {
        if (toast.parentNode) toast.remove();
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return '✅';
        case 'error': return '❌';
        case 'warning': return '⚠️';
        case 'info': return 'ℹ️';
        default: return 'ℹ️';
    }
}

// Initialize real-time health updates
setInterval(() => {
    if (currentModule === 'dashboard') {
        // Simulate periodic health metric updates
        const randomMetric = Math.floor(Math.random() * 2); // Only update heart rate and steps occasionally
        if (Math.random() > 0.7) { // 30% chance of update
            updateHealthMetrics();
        }
    }
}, 30000); // Every 30 seconds

// Add some interactive hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('metric-card') || 
        e.target.classList.contains('medicine-card') ||
        e.target.classList.contains('doctor-card') ||
        e.target.classList.contains('test-card') ||
        e.target.classList.contains('hospital-card') ||
        e.target.classList.contains('pharmacy-card')) {
        
        // Add subtle glow effect
        e.target.style.transition = 'all 0.3s ease';
        e.target.style.filter = 'brightness(1.1)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('metric-card') || 
        e.target.classList.contains('medicine-card') ||
        e.target.classList.contains('doctor-card') ||
        e.target.classList.contains('test-card') ||
        e.target.classList.contains('hospital-card') ||
        e.target.classList.contains('pharmacy-card')) {
        
        e.target.style.filter = 'brightness(1)';
    }
});

// PWA-like features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would go here for PWA functionality
        console.log('MediMentor-X - Ready for offline capabilities');
    });
}

// Simulate network status
let isOnline = true;
window.addEventListener('online', function() {
    isOnline = true;
    showNotification('Connection restored!', 'success');
});

window.addEventListener('offline', function() {
    isOnline = false;
    showNotification('You are offline. Some features may be limited.', 'warning');
});

console.log('MediMentor-X - Application initialized successfully!');
