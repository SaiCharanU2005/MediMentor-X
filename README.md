# MediMentor-X

**MediMentor-X** is a comprehensive, AI-powered healthcare platform designed to streamline and digitize healthcare access. It provides users with a modern, intuitive interface to interact with a suite of healthcare services, including medicine delivery, doctor consultation, lab test booking, hospital and pharmacy search, and an advanced AI doctor assistant.

---

## Table of Contents

- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [AI/ML Integration](#aiml-integration)
- [Data & Demo Content](#data--demo-content)
- [Setup & Installation](#setup--installation)
- [API Keys & Environment Variables](#api-keys--environment-variables)
- [Usage Guide](#usage-guide)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### 1. **AI Doctor Assistant (MediMentor-X)**
- Natural language chat interface for health queries.
- AI can analyze and explain prescription images.
- Remembers conversation context for personalized responses.
- Provides general health information, medication explanations, and guidance (not a substitute for professional medical advice).

### 2. **Medicine Delivery**
- Browse, search, and filter medicines by category (pain relief, vitamins, diabetes, etc.).
- Add medicines to a cart and place orders.
- Real-time stock status and price display.
- Order history and notifications for successful orders.

### 3. **Doctor Consultation**
- Search and filter doctors by specialty, availability, and location.
- View doctor profiles, ratings, experience, and affiliated hospitals.
- Book consultations (demo mode).

### 4. **Lab Test Booking**
- Browse and book lab tests (e.g., blood tests, thyroid, lipid profile).
- View test details, prices, and estimated duration.
- Add tests to cart and manage bookings.

### 5. **Hospital Finder**
- Search for nearby hospitals with filters for services (emergency, surgery, ICU, etc.) and distance.
- View hospital details, ratings, and contact information.

### 6. **Pharmacy Finder**
- Locate pharmacies by distance, services, and availability.
- Features include medicine availability, price comparison, and 24/7 service indicators.

### 7. **Modern UI/UX**
- Responsive design for desktop and mobile.
- Dynamic dashboards, floating cart, notifications, and sidebars for detailed info.
- Real-time feedback and loading overlays.

---

## Architecture Overview

- **Frontend:** HTML5, CSS3, JavaScript (ES6+), served as a single-page application.
- **Backend:** Node.js (Express.js) for RESTful APIs and authentication; Python (Flask) for AI/ML and image analysis.
- **Database:** Demo data in JSON files; scalable for MongoDB/PostgreSQL in production.
- **AI/ML:** Integrates with OpenRouter (Llama models) and Google Gemini for chat and image analysis.

---

## Frontend

- All UI components are in the `static/` and `templates/` directories.
- Main modules: Dashboard, AI Doctor, Medicine Delivery, Doctor Consultation, Lab Tests, Hospitals, Pharmacy.
- Uses dynamic JavaScript modules for data loading, filtering, and user interaction.
- Responsive and accessible design with modern CSS.

---

## Backend

### Node.js (Express.js)
- Handles RESTful API endpoints for medicines, doctors, tests, hospitals, and pharmacies.
- Provides authentication (registration, login, JWT/session management).
- Serves static files and the main HTML template.

### Python (Flask)
- Handles AI chat and image analysis endpoints.
- `/ask`: Receives user messages and returns AI-generated responses.
- `/analyze-image`: Accepts prescription images, extracts structured information, and provides explanations.

### AI/ML Integration
- **OpenRouter API:** Primary provider for chat and image analysis (Llama models).
- **Google Gemini API:** Backup for image analysis if OpenRouter fails.
- System prompts ensure safe, helpful, and non-diagnostic responses.

---

## Data & Demo Content

- Demo data is stored in `static/data/` as JSON files:
  - `medicines.json`, `doctors.json`, `tests.json`, `hospitals.json`, `pharmacies.json`, etc.
- Each file contains realistic, structured data for demo and development purposes.

---

## Setup & Installation

### Prerequisites

- Node.js (v14+ recommended)
- Python 3.8+
- pip (Python package manager)
- (Optional) Virtual environment for Python

### 1. Clone the Repository

```bash
git clone <repo-url>
cd HB
```

### 2. Install Node.js Dependencies

```bash
cd backend
npm install
```

### 3. Install Python Dependencies

```bash
python -m venv venv
venv\Scripts\activate  # On Windows
# or
source venv/bin/activate  # On Mac/Linux

pip install -r requirements.txt
```

### 4. Set Environment Variables

- **OpenRouter API Key:** For AI chat and image analysis.
- **Google API Key:** (Optional, for backup image analysis).

```bash
# Windows (PowerShell)
$env:OPENROUTER_API_KEY="your-openrouter-api-key"
$env:GOOGLE_API_KEY="your-google-api-key"

# Linux/Mac
export OPENROUTER_API_KEY="your-openrouter-api-key"
export GOOGLE_API_KEY="your-google-api-key"
```

### 5. Run the Backend Servers

- **Node.js Backend:**
  ```bash
  cd backend
  node server.js
  ```
- **Python Flask AI Server:**
  ```bash
  python app.py
  ```

### 6. Access the App

Open your browser and go to:  
`http://localhost:5000` (or the port specified in your config)

---

## API Keys & Environment Variables

- **OPENROUTER_API_KEY:** Required for AI chat and image analysis.
- **GOOGLE_API_KEY:** Optional, for backup image analysis.
- **FLASK_SECRET_KEY:** For Flask session security.

**Never commit your API keys to version control. Use environment variables for security.**

---

## Usage Guide

1. **AI Doctor:**  
   - Type your health question or upload a prescription image.
   - The AI will respond with helpful information and explanations.

2. **Medicine Delivery:**  
   - Browse or search for medicines.
   - Add to cart and place a demo order.

3. **Doctor Consultation:**  
   - Filter doctors by specialty and availability.
   - View profiles and book a consultation (demo).

4. **Lab Tests:**  
   - Browse available tests.
   - Add to cart and book.

5. **Hospital & Pharmacy Finder:**  
   - Search and filter by services, distance, and availability.
   - View details and contact information.

---

## Project Structure

```
HB/
  app.py                # Flask AI/ML backend
  backend/              # Node.js backend (APIs, auth, static serving)
    server.js
    routes/
    config/
    middleware/
    models/
  static/               # Frontend assets (css, js, data)
    css/
    js/
    data/
  templates/            # HTML templates
  venv/                 # Python virtual environment
  requirements.txt      # Python dependencies
  package.json          # Node.js dependencies
```

---

## Future Enhancements

- Real-time database and payment gateway integration.
- Advanced AI for symptom checking and health insights.
- Mobile app and PWA support.
- Enhanced security and privacy features.
- Production-ready deployment (Docker, CI/CD, etc.).

---

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

---

## License

This project is for educational and demonstration purposes. For production or commercial use, please review and update the license accordingly.

---

**MediMentor-X** — Your AI Healthcare Assistant 
Charan U
