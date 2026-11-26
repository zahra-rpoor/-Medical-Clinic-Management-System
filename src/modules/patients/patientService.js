import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({
    input,
    output
});

const patientData = [
    {
        id: "PAT-0001",
        fullName: "Sara Mustamendi",
        age: 22,
        gender: "Female",
        phone: "0789900300",
        email: "sara.m@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0002",
        fullName: "Zahra Razaee",
        age: 42,
        gender: "Female",
        phone: "0785500440",
        email: "zahra.r@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0003",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0004",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0005",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0006",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0007",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0008",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0009",
        fullName: "Qasim Naeme",
        age: 32,
        gender: "male",
        phone: "0789700354",
        email: "qasim.n@gmail.com",
        status: "active"
    },
    {
        id: "PAT-0010",
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


let patientId = "PAT-0001"
function getPatientById() {
    return patientData.find(patient => patient.id === patientId);
}

console.log(getPatientById(patientId))



function getActivePatients() {
    return patientData.filter(patient => patient.status === "active");
}
console.log(getActivePatients());

const newItem = {
    id: "PAT-0050",
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
    findPatient.status = "inactive";
    return findPatient;
}

console.log(deactivatePatient("PAT-0004"));
console.log(deactivatePatient("PAT-9999"));

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

console.log(updatePatient("PAT-0001", newPhone));

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

function generateId() {
    const nextId = patientData.length + 1;
    return `PAT-${String(nextId).padStart(4, "0")}`;
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
        id: generateId(),
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
        appointment.date >= today && appointment.status === "scheduled"
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

export {
    getPatientById,
    getActivePatients,
    addPatient,
    deactivatePatient,
    updatePatient,
    getAllPatients,
    getPatientPaginated,
    showCurrentPage,
    nextPage,
    previousPage,
    searchPatientByName,
    searchPatientByPhone,
    generateId,
    validatePatient,
    registerPatient,
    promptNewPatient,
    promptNewPatient
}