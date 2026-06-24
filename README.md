# EcoCollect India ♻️

## Project Title
**EcoCollect India: End-to-End Smart Waste Management & Monetization Platform**

## Status
**Status:** Ongoing (MVP core complete, backend fully functional with persistent database integration).

## Project Overview
EcoCollect India is a smart, tech-driven waste management platform designed to bridge the critical gap between waste generators and recyclers. Tailored for the Indian urban market, it provides localized solutions for Housing Societies (RWAs), Restaurants, and Corporate Offices to easily dispose of Wet Waste (Geela Kachra) and fairly monetize Dry Recyclables (Sukha Kachra).

## Problem Statement

### The Context
Rapid urbanization in Indian metropolitan cities has led to a critical challenge in Municipal Solid Waste (MSW) management. Despite the Swachh Bharat Mission's push for source segregation, a massive volume of mixed waste still reaches overflowing landfills. The unorganized waste sector (scrap dealers and collectors) plays a vital role in recycling but operates without price transparency, digital tracking, or formal logistics. Furthermore, major waste generators like Housing Societies (RWAs) and commercial establishments lack a reliable, transparent mechanism to dispose of wet waste and monetize dry recyclables.

### The Core Problem
There is a severe lack of structured, transparent, and tech-enabled waste management systems that incentivize segregation at the source and optimize the complex logistics of urban waste collection.

### Key Pain Points Addressed
* **Poor Source Segregation:** Citizens and businesses often lack the explicit motivation, awareness, or infrastructure required to strictly separate wet (organic) waste from dry (recyclable) waste at the point of generation.
* **Unorganized Scrap Market:** Generators of dry waste (paper, plastics, metals, e-waste) have no access to transparent, standardized, and live market pricing (scrap rates), preventing them from fairly monetizing their recyclables.
* **Inefficient Fleet Logistics:** Waste collection fleet drivers operate without optimized routing, real-time load tracking, or digital drop-off verifications, leading to high operational costs, missed pickups, and a lack of chain-of-custody transparency.
* **Lack of Traceability and Reporting:** Housing societies and corporate clients lack access to data dashboards to track their environmental impact (e.g., KGs of waste diverted from landfills, compost generated) to meet environmental, social, and governance (ESG) goals or municipal compliance requirements.

### The Solution: EcoCollect India
EcoCollect solves these critical urban challenges by providing a unified, multi-portal digital platform that seamlessly connects waste generators with a formalized, formalized collection fleet. By offering transparent financial incentives for dry waste, formalized disposal for wet waste, and a mobile-first application for drivers, EcoCollect digitizes and structures the informal waste sector, promotong a zero-landfill, circular economy footprint.

## 🌟 Key Modules & Features

### 1. Customer Portal (`recycle_customer.html`)
* **Single Page Application (SPA):** Smooth, tab-based navigation for all core features without page reloads.
* **Pincode Serviceability Checker:** Instantly verifies if EcoCollect operations are active in the user's localized area (e.g., Panvel, Navi Mumbai).
* **Live Scrap Rates:** Displays dynamic, real-time per-KG rates for all accepted dry recyclables (Newspaper, Plastic, E-waste, Metals), sourced directly from the admin pricing engine.
* **Smart Booking System:** A conditional multi-step form that intelligently tailors required fields (e.g., society details vs. business type) based on the user's specific client profile.
* **Segregation Guidelines:** Clear, visual instructions for separating Wet, Dry, and E-waste in full compliance with Swachh Bharat guidelines.

### 2. Admin Dashboard (`recycle_admin.html` & `admin_login.html`)
* **Secure Access:** Protected via a dedicated, secure login portal (`admin_login.html`) using simulated session-based authentication for HQ personnel.
* **Live Statistics and Overview:** A comprehensive dashboard showing real-time metrics for pending pickups, total active clients, and total weight of waste collected across the system.
* **Pickup and Order Management:** A powerful table interface to view all incoming requests, filter orders, and update statuses (e.g., Pending ➔ Assigned to Driver ➔ Completed) as they move through the logistics pipeline.
* **Dynamic Pricing Engine:** An interactive form that allows administrators to update daily scrap rates across the entire platform, which instantly reflect on the customer portal.

### 3. Delivery Partner / Driver App (`dilevery_partner.html`)
* **Mobile-First UI:** A sleek interface optimized for usability on smart devices, designed specifically for drivers navigating urban terrain.
* **Route and Task Management:** Displays all assigned pickups with integrated geocoding, utilizing the Google Maps JavaScript API for deep links to turn-by-turn navigation deep links to each client stop.
* **Load and Collection Tracking:** An interactive modal forcing drivers to input the exact weight (in KG) collected at each stop, digitizing chain-of-custody documentation.
* **Warehouse Drop-off Trigger:** Automatically calculates the total truck load and prompts the driver to return to HQ to unload once the route is finished.

### 4. Driver Registration (`driver_registration.html`)
* **Strict Verification Flow:** A formalized, multi-step onboarding process to ensure all driver partners are compliant.
* **Document Uploads:** A secure interface for uploading required identification and credentials, specifically both Front and Back photos of the applicant's Driving License.
* **Format and Data Validation:** Automatically checks Indian Driving License numbering formats to prevent fraudulent applications.

## 🛠️ Technology Stack
* **Frontend:** HTML5, CSS3 (Modern UI with Glassmorphism effects), Vanilla JavaScript (No heavy frameworks for maximum fundamental understanding).
* **Backend:** Node.js (JavaScript Runtime) and Express.js (Web Framework).
* **Database:** A persistent `database.json` file-based system (MVP/Prototype state) that auto-saves all system data to disk, preventing data loss on server restarts. Integration with MongoDB or PostgreSQL is planned for production.
* **APIs:** Google Maps JavaScript API (Geocoding & Navigation Deep Linking).
* **File Handling:** Multer (Middleware for `multipart/form-data`) used securely to handle and store Driver DL uploads in the server's filesystem.
* **Security (Prototype):** Simulated session-based authentication using `localStorage` on the frontend.
* **Design Approach:** Mobile-first (Driver App), Responsive Design (Customer/Admin Portals).

## 📊 System Architecture
The EcoCollect platform follows a classic multi-tier client-server architectural pattern, chosen for its simplicity, security, and separation of logical concerns.

### Text-Based Simple System Architecture Overview

This architecture follows a classic multi-tier client-server pattern. It ensures data security, scalability, and ease of management by isolating different logical parts of the application.

### Fundamental Concept: The User Request Flow
A user's action on their device initiates a structured journey, moving from the user interface, across the network, into the application logic, and finally interacting with stored data, before retracing its steps with a response.

---

### Logical Components

#### 1. Client / Frontend (Presentation Tier)
* **Role:** The visual interface and point of user interaction. It presents information and collects user input across all four user roles.
* **Examples:** A user’s web browser or a driver's mobile browser, executing structured requests via HTTP to the backend for data. This tier contains minimal logic (e.g., simple data validation) and *never* directly accesses the database.

#### 2. Network (Public Network)
* **Role:** The data highway facilitating structured HTTP communication between the client devices and the core backend system. Standard internet protocols ensure requests and responses are routed correctly between the user and the system's endpoints.

#### 3. Backend / Application Server (Logic Tier - Node.js/Express.js)
* **Role:** The logical "brain" of the platform. This centralized server processes all business rules, validates complex data, manages administrative authentication, and coordinates all major platform activities.
* **Function:** Receives requests from the public network, executes critical logic (e.g., timestamping a scheduled pickup, calculating total stats), interacts with the Database layer to read/modify data, ensures data security and authorization, and returns processed results/data to the correct Client.

#### 4. Database (Persistence Tier - `database.json`)
* **Role:** The secure vault holding the persistent state of the EcoCollect platform.
* **Examples:** A persistent `database.json` file that auto-saves all booking, rate, and driver data to disk. The uploads folder is also a persistence component for physical files.
* **Function:** This component is **NEVER** accessible directly from the public network. It only accepts internal, secure connections from the trusted Backend/Application server to perform data retrieval and updates.

---

### Step-by-Step Data Journey: A Booking Request

Consider a customer scheduling a pickup:

1.  **Request Initiated (Client Tier):** The customer completes the "Book Pickup" form in `recycle_customer.html`. Upon submission, the client creates a structured HTTP `POST /api/bookings` request containing the form data.
2.  **Request in Transit (Network):** The request is transmitted over the internet to the EcoCollect server's specific IP and Port 5000.
3.  **Application Logic (Backend Tier):** The backend Node.js server receives the request. Express.js middleware parses the JSON payload.
    * The business logic calculates and sets an automatic scheduled arrival timestamp (e.g., tomorrow at 10 AM).
    * A unique Booking ID (e.g., `BK-12345`) is generated.
4.  **Data Persistence (Database Tier):** The server logic updates the internal `bookingsDb` array and securely connects to the persistence layer to save the *entire updated state* to the `database.json` file.
5.  **Response Formation (Backend Tier):** The server forms a success response, including the unique Booking ID and a confirmation message, in standard JSON format.
6.  **Response in Transit (Network):** This JSON response is sent back over the public network to the user's device.
7.  **Data Presented (Client Tier):** The customer's browser receives the success JSON. The frontend code interprets the message, displays the confirmation alert with the Booking ID, and automatically shifts the user's view to the "Track Pickups" tab for immediate tracking.

## 🚀 How to Run Locally

### Prerequisites
You must have **Node.js** installed on your computer.

### Step-by-Step Setup
1.  Clone this repository to your local machine:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  Open your **Terminal** or Command Prompt and navigate into your new project folder:
    ```bash
    cd your-repo-name
    ```
3.  **Initialize the Node.js Project:** Run this command to create your `package.json` file:
    ```bash
    npm init -y
    ```
4.  **Install Required Dependencies:** Run this command to install Express (web framework), CORS (security middleware), and Multer (file upload tool):
    ```bash
    npm install express cors multer
    ```
5.  **Verify Files:** Ensure the full `server.js` backend code is in the root of this folder, along with all 5 HTML portal files. The `uploads/` directory will be created automatically by the server.

### Starting the Platform
1.  **Start the Backend Server:** From the project directory in your terminal, run:
    ```bash
    node server.js
    ```
    You should see the message: `🚀 EcoCollect Backend running on http://localhost:5000`. Keep this terminal window open; this is your core platform.
2.  **Verify the Server:** Open your web browser and navigate to `http://localhost:5000`. You should see the green "EcoCollect Server is Running!" welcome message.
3.  **Launch the Public Website:** Double-click `recycle_customer.html` in your filesystem to open the main public website in your browser. You are now running the EcoCollect ecosystem end-to-end!

### Admin Testing Credentials
Use these hardcoded credentials to access the secure Admin Dashboard:
* **Username:** `admin`
* **Password:** `admin123`
