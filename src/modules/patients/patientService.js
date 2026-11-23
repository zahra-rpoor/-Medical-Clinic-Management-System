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
    }
];

console.log(patientData[0].fullName);
console.log(patientData.length)

function getPatientById(id) {
    return patientData.find(patient => patient.id === id);
}

console.log(getPatientById("Pat-0002"))

function getActivePatients() {
    return patientData.filter(patient => patient.status === "active");
}
console.log(getActivePatients())



const newItem = {
        id: "Pat-0004",
        fullName: "Yalda Ameri",
        age: 45,
        gender: "female",
        phone: "0788900300",
        email: "yalde.a@gmail.com",
        status: "passive"
    }

function addPatient(newPatient) {
    return patientData.push(newPatient)
}
console.log(addPatient(newItem))

console.log(patientData)

function deactivatePatient(patientId) {
    findPatient = patientData.find(patient => patient.id === patientId)
    if (findPatient == false) {
        console.log("Patient not found!")
    } else {
        patientData.replace("deactivate")
    }
    
}
