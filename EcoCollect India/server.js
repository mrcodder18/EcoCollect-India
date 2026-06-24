const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 🛠️ MIDDLEWARE & SETUP
// ==========================================
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Auto-create 'uploads' folder for Driving Licenses if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// ==========================================
// 🗄️ PERSISTENT DATABASE SYSTEM
// ==========================================
const DATA_FILE = path.join(__dirname, 'database.json');

let db = {
    bookings: [],
    drivers: [],
    rates: { news: 15, card: 10, plas: 12, iron: 28, ewaste: 20 }
};

// Load existing data if the server restarts
if (fs.existsSync(DATA_FILE)) {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    db = JSON.parse(rawData);
}

function saveDatabase() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

const serviceablePincodes = ['400001', '400050', '400059', '400099', '400705', '400601', '410206'];

// ==========================================
// 🏠 ROOT ROUTE (Welcome Screen)
// ==========================================
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
            <h1 style="color: #028024;">✅ EcoCollect Server is Running!</h1>
            <p>Your backend APIs are actively listening on Port ${PORT}.</p>
            <p style="color: #666;">Keep this terminal open, and go open <b>recycle_customer.html</b> in your web browser.</p>
        </div>
    `);
});

// ==========================================
// 🌐 1. CUSTOMER PORTAL APIs
// ==========================================
app.get('/api/pincodes/:pin', (req, res) => {
    res.json({ success: true, serviceable: serviceablePincodes.includes(req.params.pin) });
});

app.get('/api/rates', (req, res) => {
    res.json({ success: true, rates: db.rates });
});

app.post('/api/bookings', (req, res) => {
    const { type, name, whatsapp, fullAddress, societyName, flatCount, bizName, wasteVolume } = req.body;
    
    let pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 1); // Schedule for tomorrow
    pickupDate.setHours(10, 0, 0, 0);

    const newBooking = {
        id: 'BK-' + Math.floor(10000 + Math.random() * 90000),
        createdAt: new Date().toISOString(),
        scheduledFor: pickupDate.toISOString(),
        clientType: type,
        name: name,
        phone: whatsapp,
        address: fullAddress,
        details: { societyName, flatCount, bizName, wasteVolume },
        status: 'Pending',
        collectedWeight: 0
    };

    db.bookings.push(newBooking);
    saveDatabase(); 
    
    console.log(`[New Booking] ${newBooking.id} by ${name}`);
    res.status(201).json({ success: true, bookingId: newBooking.id, message: 'Booking confirmed!' });
});

app.get('/api/customer/bookings/:phone', (req, res) => {
    const userPhone = req.params.phone;
    const userBookings = db.bookings.filter(b => b.phone === userPhone);
    userBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, bookings: userBookings });
});

// ==========================================
// 🛡️ 2. ADMIN DASHBOARD APIs
// ==========================================
app.get('/api/admin/dashboard', (req, res) => {
    const pendingCount = db.bookings.filter(b => b.status === 'Pending').length;
    const totalCollected = db.bookings.reduce((sum, b) => sum + (b.collectedWeight || 0), 0);
    
    res.json({
        success: true,
        stats: { pendingPickups: pendingCount, activeClients: db.bookings.length, totalWasteKg: totalCollected },
        bookings: db.bookings
    });
});

app.patch('/api/admin/bookings/:id/status', (req, res) => {
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    booking.status = req.body.status; 
    saveDatabase(); 
    console.log(`[Status Changed] ${booking.id} -> ${booking.status}`);
    res.json({ success: true, message: 'Status updated', booking });
});

app.post('/api/admin/rates', (req, res) => {
    db.rates = { ...db.rates, ...req.body };
    saveDatabase(); 
    res.json({ success: true, message: 'Rates updated', rates: db.rates });
});

// ==========================================
// 🚚 3. DRIVER REGISTRATION & APP APIs
// ==========================================
app.post('/api/drivers/register', upload.fields([{ name: 'dlFront' }, { name: 'dlBack' }]), (req, res) => {
    const { fullName, phone, city, vehicleType, vehicleNum, dlNumber } = req.body;
    
    if (!req.files || !req.files.dlFront || !req.files.dlBack) {
        return res.status(400).json({ success: false, message: 'DL Images are required' });
    }

    const newDriver = {
        id: 'DRV-' + Math.floor(1000 + Math.random() * 9000),
        fullName, phone, city, vehicleType, vehicleNum, dlNumber,
        documents: {
            front: req.files.dlFront[0].path,
            back: req.files.dlBack[0].path
        },
        status: 'Active'
    };

    db.drivers.push(newDriver);
    saveDatabase();
    console.log(`[New Driver Registered] ${newDriver.fullName}`);
    res.status(201).json({ success: true });
});

app.get('/api/driver/tasks', (req, res) => {
    // Return tasks that are Pending or Assigned
    res.json({ success: true, tasks: db.bookings.filter(b => b.status === 'Assigned' || b.status === 'Pending') });
});

app.patch('/api/driver/tasks/:id/complete', (req, res) => {
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) return res.status(404).json({ success: false });

    booking.status = 'Completed';
    booking.collectedWeight = parseFloat(req.body.weight);
    saveDatabase(); 
    
    console.log(`[Pickup Completed] ${booking.id} - ${booking.collectedWeight} KG`);
    res.json({ success: true, booking });
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 EcoCollect Backend running on http://localhost:${PORT}`);
});