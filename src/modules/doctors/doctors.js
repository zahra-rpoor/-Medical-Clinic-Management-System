import { generateId } from "../../utils/idGenerator.js";

          // Doctor Data

const doctors = [
    {
        id: "DOC-0001",
        name: "Dr. Ahmad",
        specialty: "Cardiology",
        status: "active",

        workingDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Saturday",
            "Sunday"
        ],

        workingHours: {
            start: "08:00",
            end: "16:00"
        }
    }
];

      // Get All Doctors
export function getAllDoctors() {
    return doctors;
}

       //Search Doctor by id
export function getDoctorById(doctorId){
    return doctors.find(doctor => doctor.id === doctorId);
}

// Search Doctors by Name or specialty
export function searchDoctors(searchTerm) {
    const term = searchTerm.toLowerCase();

    return doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(term) ||
        doctor.specialty.toLowerCase().includes(term)
    );
}

      // Update Doctor 
export function updateDoctor(doctorId, updatedData) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return false;
    }

    Object.assign(doctor, updatedData);
        return true;
}

// Update Doctor Working Hours
export function setDoctorWorkingHours(doctorId, workingDays, start, end) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return false;
    }

    doctor.workingDays = workingDays;

    doctor.workingHours = {
        start: start,
        end: end
    };

    return true;
}

// Get Doctor Weekly Schedule
export function getDoctorWeeklySchedule(doctorId) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return null;
    }

    return {
        doctorName: doctor.name,
        workingDays: doctor.workingDays,
        workingHours: doctor.workingHours
    };
}

// Check Doctor Availability
export function isDoctorAvailable(doctorId, date, time) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor || doctor.status !== "active") {
        return false;
    }

    const appointmentDate = new Date(date);

    if (Number.isNaN(appointmentDate.getTime())) {
        return false;
    }

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const dayName = days[appointmentDate.getUTCDay()];

    if (!doctor.workingDays.includes(dayName)) {
        return false;
    }

    const startTime = doctor.workingHours.start;
    const endTime = doctor.workingHours.end;

    return time >= startTime && time < endTime;
}


        // Deactive Doctor
export function deactivateDoctor(doctorId) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return false;
    }

    doctor.status = "inactive";

    return true;
}

         // Service Data
const services = [
    {
        id: "SRV-0001",
        name: "General Checkup",
        fee: 500,
        duration: 30,
        status: "active"
    }
];
     // Add Service
export function addService(serviceData) {
    const newService = {
        ...serviceData,
        id: generateId("SRV", services),
        status: "active"
    };

    services.push(newService);

    return newService;
}

     //Get All Services
export function getAllServices(){
    return services;
}
     // Search Service by Id
export function getServiceById(serviceId){
    return services.find(service => service.id === serviceId);
}

   // Update Service
export function updateService(serviceId, updatedData) {
    const service = services.find(service => service.id === serviceId);

    if (!service) {
        return false;
    }

    Object.assign(service, updatedData);

    return true;
}

// Deactivate Service
export function deactivateService(serviceId) {
    const service = services.find(service => service.id === serviceId);

    if (!service) {
        return false;
    }

    service.status = "inactive";
    return true;
}

        // Doctor Registration - Add Doctor 

export function addDoctor(doctorData) {
    const newDoctor = {
        ...doctorData,
        id: generateId("DOC", doctors),
        status: "active"
    };

    doctors.push(newDoctor);

    return newDoctor;
}