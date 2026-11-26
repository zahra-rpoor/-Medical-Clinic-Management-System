// Developer 5 - Billing Module

// 1. Bills Data

const bills = [];


// Bills

function creatBill (patientId, patientName,appointmentId, serviceName, serviceFee, discount = 0) {
   if (serviceFee <= 0) {
      console.log("Invalid discount fee.");
      return;
   }
   if (discount < 0 || discount > serviceFee) {
      console.log("Invalid discount.");
      return;
   }

   const total = serviceFee - discount;

   const newBill = {
      id: bills.length + 1,
      patientId: patientId,
      patientName: patientName,
      appointmentId: appointmentId,
      serviceName: serviceName,
      serviceFee: serviceFee,
      discount: discount,
      total: total,
      amountPaid: 0,
      remainingBalance: total, 
      paymentStatus: "unpaid",
   };

   bills.push(newBill);

   console.log("Bill created successfully.");
   return newBill
}

// Display Bill

function displayBill(billId) {
   const bill = bills.find(billId => {
      return bill.id === billId;
   });

   if (!bill) {
      console.log("Bill not found.");
      return;
   }

   console.log("================================");
   console.log("        PATIENT BILL            ");
   console.log("=================================");

   console.log("Patient:", bill.patientName);
   console.lot("Patient ID:", bill.patientId);
   console.log("Appointment ID:", bill.appointmentId);
   console.log("Service:", bill.serviceName);
   console.log("Service Fee:", bill.serviceFee);
   console.log("Discount:", bill.discount);
   console.log("Total:", bill.total);
   console.log("Amount Paid:", bill.amountPaid);
   console.log("Remaining Balance:", bill.remainingBalance);
   console.log("Payment Status:", bill.paymentStatus);

   console.log("===================================");
}

// Record Payment

function recordPayment(billId, amount) {
   const bill = bills.find(bill => {
      return bill.id === billId;
   });
   if (!bill) {
      console.log("Bill not found.");
      return;
   }
   if (amount <= 0 ) {
      console.log("Payment must be greater than zero");
      return;
   }
   if (bill.paymentStatus === "paid") {
      console.log("Bill is already paid.");
      return;
   }
   if (amount > bill.remainingBalance) {
      console.log("Payment exceeds remaining balance.");
      return;
   }

   bill.amountPaid += amount;

   bill.remainingBalance = bill.total - bill.amountPaid;

   if (bill.remainingBalance === 0) {
      bill.paymentStatus = "paid";
   }
   else if (bill.amountPaid > 0) {
      bill.paymentStatus = "partial";
   }
   else {
      bill.paymentStatus = "unpaid";
   }
   console.log("Payment recorded successfully.");
   return bill;
}

// Get Bill By ID

function getBillById(billId) {
   const bill = bills.find(bill => {
      return bill.id === billId;
   });
   return bill;
}

// Get bills By Patients ID

function getBillsByPatientId(patientId) {
   const patientBills = bills.filter(bill => {
      return bill.patientId === patientId;
   });
   return patientBills;
}

// Get Unpaid Bills

function getunpaidBills() {
   const unpaidBills = bills.filter(bill => {
      return bill.paymentStatus !== "paid";
   });
   return unpaidBills;
}


// Git All Bills

function getAllBills() {
   return bills;
}

// Export Functions

module.exports = {
   creatBill,
   displayBill,
   recordPayment,
   getBillById,
   getBillsByPatientId,
   getunpaidBills,
   getAllBills
};