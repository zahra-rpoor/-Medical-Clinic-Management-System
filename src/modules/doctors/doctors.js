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

export function getAllDoctors() {
    return doctors;
}


export function getDoctorById(doctorId){
    return doctors.find(doctor => doctor.id === doctorId);
}


export function updateDoctor(doctorId, updatedData) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return false;
    }

    Object.assign(doctor, updatedData);
        return true;
}


export function deactivateDoctor(doctorId) {
    const doctor = doctors.find(doctor => doctor.id === doctorId);

    if (!doctor) {
        return false;
    }

    doctor.status = "inactive";

    return true;
}

// Services
const services = [
    {
        id: "SRV-0001",
        name: "General Checkup",
        fee: 500,
        duration: 30,
        status: "active"
    }
];

export function addService(serviceData) {
    services.push(serviceData);

    return serviceData;
}

export function getAllServices(){
    return services;
}

export function getServiceById(serviceId){
    return services.find(service => service.id === serviceId);
}


export function updateService(serviceId, updatedData) {
    const service = services.find(service => service.id === serviceId);

    if (!service) {
        return false;
    }

    Object.assign(service, updatedData);

    return true;
}