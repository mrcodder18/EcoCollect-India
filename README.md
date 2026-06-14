### Status: ongoing(backend incomplete)

# EcoCollect India ♻️

A smart, tech-driven waste management platform designed to bridge the gap between waste generators and recyclers in India. EcoCollect provides localized solutions for Housing Societies (RWAs), Restaurants, and Corporate Offices to easily dispose of Wet Waste (Geela Kachra) and monetize Dry Recyclables (Sukha Kachra).

## 🌟 Key Modules & Features

### 1. Customer Portal (`recycle_customer.html`)
* **Single Page Application (SPA):** Smooth, tab-based navigation without page reloads.
* **Pincode Serviceability Checker:** Instantly verifies if collection is available in the user's area (e.g., Panvel, Navi Mumbai).
* **Live Scrap Rates:** Displays dynamic, per-KG rates for dry recyclables (Newspaper, Plastic, E-waste).
* **Smart Booking System:** Conditional multi-step form tailored to the user's client type.
* **Segregation Guidelines:** Clear instructions for separating Wet, Dry, and E-waste according to Swachh Bharat guidelines.

### 2. Admin Dashboard (`recycle_admin.html` & `admin_login.html`)
* **Secure Access:** Protected via a dedicated login portal using simulated session-based authentication.
* **Live Statistics:** Overview of pending pickups, active clients, and total waste collected.
* **Pickup Management:** Table interface to view incoming requests and update statuses (Pending ➔ Assigned ➔ Completed).
* **Dynamic Pricing Engine:** Input form to update daily scrap rates across the platform.

### 3. Delivery Partner / Driver App (`dilevery_partner.html`)
* **Mobile-First UI:** Designed specifically for drivers to use on their smartphones.
* **Route Management:** Displays assigned pickups with integrated Google Maps turn-by-turn navigation deep links.
* **Load Tracking:** Interactive modal requiring drivers to input the exact weight (in KG) collected at each stop.
* **Warehouse Drop-off Trigger:** Automatically prompts the driver to return to HQ to unload once the route is complete.

### 4. Driver Registration (`driver_registration.html`)
* **Strict Verification Flow:** Multi-step onboarding for new delivery partners.
* **Document Uploads:** UI for uploading Front and Back photos of the Driving License.
* **Format Validation:** Auto-checks Indian DL numbering formats.

## 🛠️ Technology Stack
* **Frontend:** HTML5, CSS3 (Modern UI/Glassmorphism), Vanilla JavaScript
* **APIs:** Google Maps JavaScript API (Geocoding & Deep Linking)
* **Design Approach:** Mobile-first (Driver App), Responsive Design (Customer/Admin Portals)

## 🚀 How to Run Locally
1. Clone this repository to your local machine:
```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
