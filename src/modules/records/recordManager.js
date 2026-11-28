const path = require("path");
const { readJSON ,writeJSON} = require("../../utils/filemanager");
const {generateId } = require("../../utils/idGenerator");

const recordsFilePath = path.join(__dirname, "../../data/records.json");
const appointmentsFilePath = path.join(__dirname, "../../data/appointments.json");

/*1. record a medical visit (only for valid and completed appointments )  */
function recordVisit (appointmentId, diagnosis, notes ="") {
    const appointments = readJSON(appointmentsFilePath);
    const records = readJSON(recordsFilePath);


/* check for availability of appointment*/
const appointment = appointments.find((apt) => apt.id === appointmentId);
if (!appointment) {
    throw new Error(`Appointment with ID ${appointmentId}not found.`);
}

//check for whether the appointment is complete or not 
if (appointment.status !== "completed") {
    throw new Error ("Medical record can only be created for completed appointments.");
}
//Avoid from creating repeated appointment
const alreadyRecorded = records.find((rec) => rec.appointmentId === appointmentId);
if (alreadyRecorded) {
    throw new Error(`A medical record already exists for appointment ${ appointmentId}.`);
}
 
if (!diagnosis || diagnosis.trim () === "") { 
    throw new Error ("Diagnosis is required.");
}

const newRecord = {
    id : generateId ("REC",records),
    appointmentId : appointment.id ,
    patientId : appointment.patientId,
    doctorId : appointment.doctorId,
    visitDate : appointment.date || new Date (). toISOString().split("T")[0],
    diagnosis : diagnosis.trim(),
    notes: notes.trim(),
    prescriptions : []
};
records.push(newRecord);
writeJSON(recordsFilePath,records);

return newRecord; 
}

// 2. Add a prescription to an existing medical record
function addPrescription(recordId, medication, dosage, durationDays ) {
    const records = readJSON(recordsFilePath);
    const record = records.find ((rec)=> rec.id === recordId);

    if (!record) {
        throw new Error (`Medical record with ID ${recordId }not found.`);
    }
    
    if (!medication || !dosage || !durationDays) {
        throw new Error ("Medication, dosage, and durationDays are required.");
    }
    const newPrescription = {
        medication : medication.trim(),
        dosage : dosage.trim(),
        durationDays : Number(durationDays)
    };

    record.prescriptions.push (newPrescription);
    writeJSON(recordsFilePath, records);
    
    return record;
}

//3. Get all medical records for a specific patient 
function getRecordsOfPatient(patientId) {
    const records = readJSON(recordsFilePath);
    return records.filter((rec)=> rec.patientId === patientId);
}

//4. search medical records by diagnosis keyword (case-insensitive )
function searchRecordsByDiagnosis(keyword) { 
    if (!keyword || keyword.trim() ==="") {
        return[];
    }
    const records = readJSON(recordsFilePath);
    const Lowerkeyword = keyword.trim().toLowerCase();

    return records.filter((rec)=> 
    rec.diagnosis.toLowerCase().includes(Lowerkeyword));
}

module.exports = {
    recordVisit,
    addPrescription,
    getRecordsOfPatient,
    searchRecordsByDiagnosis
};


