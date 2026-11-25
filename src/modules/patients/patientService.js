import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
    input,
    output
});

const patientData = [
    {
        id: "Pat-0001",
        fullName: "Sara Mustamendi",
        age: 22,
        gender: "Female",
        phone: "0789900300",
        email: "sara.m@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0002",
        fullName: "Zahra Razaee",
        age: 42,
        gender: "Female",
        phone: "0785500440",
        email: "zahra.r@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0003",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0004",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0005",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0006",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0007",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0008",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0009",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "Pat-0010",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    }
];
// The result of how object works 
console.log(patientData[0].fullName);
console.log(patientData.length);



async function getPatientById() {
    let patientId = await rl.question("Enter your id: ");
    return patientData.find(patient => patient.id === patientId);
}

getPatientById().then(patient => { console.log(patient);
})

function getActivePatients() {
    return patientData.filter(patient => patient.status === "active");
}
console.log(getActivePatients());

const newItem = {
    id: "Pat-0050",
    fullName: "Yalda Ameri",
    age: 45,
    gender: "female",
    phone: "0788900300",
    email: "yalde.a@gmail.com",
    status: "active"
};

function addPatient(newPatient) {
    return patientData.push(newPatient);
}
console.log(addPatient(newItem));
console.log(patientData);

function deactivatePatient(patientId) {
    const findPatient = patientData.find(patient => patient.id === patientId);
    if (!findPatient) {
        console.log("Patient not found!");
        return null;
    }
    findPatient.status = "passive";
    return findPatient;
}

console.log(deactivatePatient("Pat-0004"));
console.log(deactivatePatient("Pat-9999"));

let newPhone = { phone: "0789900900" };

function updatePatient(patientId, updateData) {
    const findPatient = patientData.find(patient => patient.id === patientId);
    if (!findPatient) {
        console.log("Patient not found!");
        return null;
    }
    Object.assign(findPatient, updateData);
    return findPatient;
}

console.log(updatePatient("Pat-0001", newPhone));

function getAllPatients() {
    return patientData;
}

console.log(getAllPatients());

// Pagination style with usage of startIndex = (page - 1) * limit
function getPatientPaginated(page, limit) {
    const startIndex = (page - 1) * limit;
    return patientData.slice(startIndex, startIndex + limit);
}
console.log(getPatientPaginated(1, 5));
console.log(getPatientPaginated(2, 5));

let currentPage = 1;
const pageLimit = 5;

function showCurrentPage() {
    console.log(`Page ${currentPage}`);
    console.log(getPatientPaginated(currentPage, pageLimit));
}

function nextPage() {
    const totalPages = Math.ceil(patientData.length / pageLimit);
    if (currentPage < totalPages) {
        currentPage++;
        showCurrentPage();
    } else {
        console.log("You are already on the last page!");
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showCurrentPage();
    } else {
        console.log("You are already on the first page!");
    }
}

showCurrentPage();
nextPage();
nextPage();
nextPage();
previousPage();

function searchPatientByName(name) {
    return patientData.filter(patient =>
        patient.fullName.toLowerCase().includes(name.toLowerCase())
    );
}

function searchPatientByPhone(phone) {
    return patientData.filter(patient =>
        String(patient.phone).includes(String(phone))
    );
}

console.log(searchPatientByName("zahra"));
console.log(searchPatientByPhone("078"));

function generatePatientId() {
    const nextId = patientData.length + 1;
    return `Pat-${String(nextId).padStart(4, "0")}`;
}

function validatePatient(patient) {
    if (!patient.fullName || patient.fullName.trim() === "") {
        return "Patient name is required!";
    }

    if (!patient.age || Number(patient.age) <= 0 || !Number.isFinite(Number(patient.age))) {
        return "Please enter a valid age!";
    }

    if (!patient.phone || String(patient.phone).trim() === "") {
        return "Phone number is required!";
    }

    if (!patient.email || !patient.email.includes("@")) {
        return "Please enter a valid email!";
    }

    if (!patient.gender || !["male", "female"].includes(patient.gender.trim().toLowerCase())) {
        return "Invalid gender!";
    }

    return true;
}

function registerPatient(patient) {
    const validation = validatePatient(patient);

    if (validation !== true) {
        return validation;
    }

    const newPatient = {
        id: generatePatientId(),
        fullName: patient.fullName.trim(),
        age: Number(patient.age),
        gender: patient.gender.trim(),
        phone: patient.phone.trim(),
        email: patient.email.trim(),
        status: "active"
    };
    patientData.push(newPatient);
    return newPatient;
}

async function promptNewPatient() {
    try {
        let patientName = await rl.question("Enter your full name: ");
        let patientAge = await rl.question("Enter your age: ");
        let patientGender = await rl.question("Enter your gender: ");
        let patientPhone = await rl.question("Enter your phone: ");
        let patientEmail = await rl.question("Enter your email: ");

        const patient = {
            fullName: patientName,
            age: patientAge,
            gender: patientGender,
            phone: patientPhone,
            email: patientEmail
        };

        console.log(registerPatient(patient));
    } finally {
        rl.close();
    }
}

promptNewPatient();


function getPatientProfile(patientId, appointments, bills) {
    const patient = patientData.find(
        patient => patient.id === patientId
    );

    if (!patient) {
        return "Patient not found";
    }

    const today = new
    Date().toLocaleDateString("en-CA");

    const upcomingAppointments = 
    appointments.filter(appointment => appointment.patientId === patientId &&
        appointment.date >= today && appointment.status === "booked"
    );

    const patientsBills = bills.filter(
        bill => bill.patientId === patientId
    );

    const totalBill = patientsBills.reduce(
        (sum, bill) => sum + Number(bill.total), 0
    );

    const amountPaid = patientsBills.reduce(
        (sum, bill) => sum + Number(bill.amountPaid), 0
    );

    const remainingBalance = patientsBills.reduce(
        (sum, bill) => sum + Number(bill.remainingBalance), 0
    );

    // Returning complete patient profile 
    return {
        patientInfo: patient,
        upcomingAppointments,
        billingSummary: {
            totalBill,
            amountPaid,
            remainingBalance
        }
    };
}