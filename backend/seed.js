const mongoose = require('mongoose');
const DoctorOder = require('./models/doctorOders');

const MONGODB_URI = "mongodb://krupalidholakiya50_db_user:ui27vxtbz@ac-8t0fdfs-shard-00-00.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-01.y6gk4pc.mongodb.net:27017,ac-8t0fdfs-shard-00-02.y6gk4pc.mongodb.net:27017/pharmacy?ssl=true&replicaSet=atlas-13pxsr-shard-0&authSource=admin&appName=Cluster0";

async function seedDatabase() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB Atlas!");

    // Clear existing doctor orders
    await DoctorOder.deleteMany({});
    console.log("Cleared existing doctor orders.");

    const seedOrders = [
      {
        doctorName: "Lalana Thanthirgama",
        doctorContact: "0716189361",
        doctorID: "9182739182V",
        doctorEmail: "doctor123@gmail.com",
        drugId: ["D101", "D102", "D103"],
        drugNames: ["Panadol", "Amoxillin", "Chloroperi Hybanate"],
        drugPrice: [1200, 1200, 1200],
        drugQuantity: [3, 3, 2],
        realQuantity: [3, 3, 2],
        totalAmount: 9600,
        pickupDate: "2020-08-22"
      },
      {
        doctorName: "Lalana Thanthirgama",
        doctorContact: "0716189361",
        doctorID: "9182739182V",
        doctorEmail: "doctor123@gmail.com",
        drugId: ["D101", "D104", "D105"],
        drugNames: ["Panadol", "Citazin", "Metformin"],
        drugPrice: [1200, 1200, 1200],
        drugQuantity: [12, 12, 3],
        realQuantity: [12, 12, 3],
        totalAmount: 32400,
        pickupDate: "2020-08-24"
      },
      {
        doctorName: "Lalana Thanthirgama",
        doctorContact: "0716189361",
        doctorID: "9182739182V",
        doctorEmail: "doctor123@gmail.com",
        drugId: ["D101", "D104", "D105"],
        drugNames: ["Panadol", "Citazin", "Metformin"],
        drugPrice: [1200, 1200, 1200],
        drugQuantity: [12, 13, 12],
        realQuantity: [12, 13, 12],
        totalAmount: 44400,
        pickupDate: "2020-08-22"
      }
    ];

    const created = await DoctorOder.insertMany(seedOrders);
    console.log(`Successfully seeded ${created.length} doctor orders into MongoDB Atlas!`);
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB Atlas.");
    process.exit(0);
  } catch (err) {
    console.error("Database seed error:", err);
    process.exit(1);
  }
}

seedDatabase();
