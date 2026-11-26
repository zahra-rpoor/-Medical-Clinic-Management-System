// importing functions from filemanager(ES Module)
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readJSON, writeJSON } from "../../utils/filemanager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import from doctor and service management
import {
    isDoctorAvailable,
    getServiceById
} from "../doctors/doctorService.js";
// import from id generator 
import { generateId } from "../../utils/idGenerator.js";
const appointmentsFilePath = path.join(
    __dirname,
    "../../data/appointments.json"
);


// Load appointments from the JSON file
const appointments = readJSON(appointmentsFilePath)



// mock data should be cleaned once JSON data is here
const patients = [
    {
        id: 101,
        name: "Ahmad",
        status: "active"
    },
    {
        id: 102,
        name: "Sara",
        status: "inactive"
    }
];




     // this fumction checks whether doctor is working on the selcted day
    
//   removed 

// ==============================

//   patient and doctors loojup functions
// ===============================

// looking for patients through id, return undefine if there isn't any
function getPatientById(patientId) {
    const patient = patients.find(patient => {
        return patient.id === patientId;
    });
    
    return patient;
}

// cheking for doctor's availibality and activness through id

// removed 


   // checking doctors' availibility on weekdays
        // function getDayName(date) was removed


//  function isDoctorAvailableAtTime(doctorId, time) was removed
      




// =========================
// book appointments function 1
// ======================



//function to book a new apointment (chekz the patient and doxtor first. 
// avoids double booking)
function bookAppointment(patientId, doctorId, serviceId, date, time){
    
    
    
    // does the patient exist and is active?
    const patient = getPatientById(patientId)
    
    if (!patient){
        console.log("Patient not found")
        return
        
    }
    // is active?
    if (patient.status !== "active"){
        console.log("Patient is inactive. Appointment cannot be found")
        return
    }
    // Check date validation
if (!isValidDate(date)) {
    console.log("Invalid date.");
    return;
}

    // is the doctor active and availibel
    // const doctor = getDoctorById(doctorId) was removed
    // Validate time format
if (!isValidTime(time)) {
    console.log("Invalid time format. Use HH:MM.");
    return;
}

// Check doctor's availability
const isAvailable = isDoctorAvailable(doctorId, date, time);

if (!isAvailable) {
    console.log("Doctor is not available at this date or time.");
    return;
}

     

    // checking for double appointments booking
    const existingAppointment = appointments.find(appointment => {
        return appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
               appointment.status === "scheduled";
            })
            
            
     if (existingAppointment){
                console.log("Doctor is already booked at this time.")
                return;
            }
            
            
            // 2 checking for patients double booking  
            const existingPatientAppointment = appointments.find(appointment => {
                return appointment.patientId === patientId &&
                appointment.date === date &&
                appointment.time === time &&
                appointment.status === "scheduled" ;
            })
            
            if (existingPatientAppointment){
                console.log("Patient already has an appointment at this time.");
                return
            }
            
            

        // service 
        const service = getServiceById(serviceId);

        if (!service || service.status !== "active") {
        console.log("Service not found or inactive.");
          return;
}




            
            //  Create a new appointment in a object
            const newAppointment = {
                id : generateId("APT", appointments), 
                patientId :patientId,
                doctorId: doctorId,
                serviceId: serviceId,
                date : date, 
                time: time, 
                status: "scheduled"
            }
            
            
            // Step 4: Save the appointment
            
            appointments.push(newAppointment)

            // save appointments to the JSON file
            writeJSON(appointmentsFilePath, appointments);

            
            console.log("Apontment Booked Succesfully!")
            
            console.log(newAppointment)
            
            
        }
        
        
        
// ====================================
// Cancel Apointment function 2
// ================================
        
        // function to cancel an appointment
        function cancelAppointment(appointmentId){
            
            const appointment = appointments.find(appointment => {
                return appointment.id === appointmentId;
                
            })
            
            // function stops if it can't find the appointment
            if (!appointment){
                console.log("Appointment not found")
                return;
            }
            // can't cancell again if it's already cancelled
            if (appointment.status === "cancelled"){
                console.log("This appointment is already cancelled.")
                return
                
            }
            appointment.status = "cancelled"
            // save update to JSON
            writeJSON(appointmentsFilePath, appointments);
            
            console.log("Apointment cancelled successfully!")
        }
        




// =========================================
// complete appointment function 3
// ==========================================
       function completeAppointment(appointmentId){
        const appointment = appointments.find(appointment =>{
            return appointment.id === appointmentId;

        })

        if (!appointment){
            console.log("Appointment not found.")
            return
        }
        if (appointment.status === "cancelled") {
             console.log("Cannot complete a cancelled appointment.");
             return;
        }
        if (appointment.status === "completed") {
            console.log("This appointment is already completed.");
           return;
          }
          // update appointments to JSON
          appointment.status = "completed";
          writeJSON(appointmentsFilePath, appointments);
          console.log("Appointment completed successfully!");

       } 
        
// ========================
// get all appointments
// ============================



        
        
        
        
        // Function to display all appointments
        function getAllAppointments() {
           return appointments;
            
        }
        
        
        
        // function to get patients appointments by ID
        function getAppointmentsByPatient(patientId){
            const patientAppointments = appointments.filter(appointment => {
                return appointment.patientId === patientId;
                
            })
            return patientAppointments;
        }
        
        
        
        
        // function to get doctors appoinments by doctor id
        function getAppointmentsByDoctor(doctorId){
            const doctorAppointments = appointments.filter(appointment => {
                return appointment.doctorId === doctorId;
                
            })
            return doctorAppointments
        }





        
        
// ==========================
// get appointments by date and status
// =========================
        
        // Function to get appointments by date
        function getAppointmentsByDate(date) {
            
            const dailyAppointments = appointments.filter(appointment => {
                return appointment.date === date;
            });
            
            return dailyAppointments
        }
       
        // check for time form validation
        function isValidTime(time) {
       const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
       return timePattern.test(time);
         }
          


        //  validate appointmnet by status
         function isValidStatus(status) {
             const validStatuses = ["scheduled", "cancelled", "completed"];

             return validStatuses.includes(status);
         }




        // get appointments by status

        function getAppointmentsByStatus(status){
            if (!isValidStatus(status)){
                console.log("Invalid appointmnet status.")
                return []
            }

            const filteredAppointments = appointments.filter(appointment =>{
                return appointment.status === status
            })
            return filteredAppointments
        }


        //  check for date format validation
        function isValidDate(date){
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;

            if(!datePattern.test(date)){
                return false;
            }

           const [year, month, day] = date.split("-").map(Number);

    const parsedDate = new Date(Date.UTC(year, month - 1, day));

    return parsedDate.getUTCFullYear() === year &&
           parsedDate.getUTCMonth() === month - 1 &&
           parsedDate.getUTCDate() === day;

        }
        
// ======================
// reschedual appointments function 4
// ========================

        
        // function to rescedual an appoinment also checks for interference
        function rescheduleAppointment(appointmentId, newDate, newTime){
            const appointment = appointments.find(appointment => {
                return appointment.id === appointmentId;
                
            })
            
            if(!appointment){
                console.log("Appointment not found.")
                return
            }
            
            
            if (appointment.status === "cancelled"){
                console.log("Cannot rescedule a cancelled appointmnent")
                return
            }
            

// validate the new time format 
           if (!isValidTime(newTime)){
            console.log("Invalid time format. Use HH:MM")
            return
           }
           // Validate the new date
if (!isValidDate(newDate)) {
    console.log("Invalid date.");
    return;
}


        // Check whether the doctor works on the new date
        // was removed
        // Check doctor's availability on the new date and time
const isAvailable = isDoctorAvailable(
    appointment.doctorId,
    newDate,
    newTime
);

if (!isAvailable) {
    console.log("Doctor is not available at the new date or time.");
    return;
}

            
            
            // check wether the doctor is already booked
            const doctorConflict = appointments.find(existing => {
            return existing.doctorId === appointment.doctorId &&
            existing.date === newDate &&
            existing.time === newTime &&
            existing.status === "scheduled" &&
            existing.id !== appointmentId
        })
        
        if (doctorConflict){
            console.log("Doctor is already booked at the new time")
            return 
        }
        


        
        
        // check wether the patient has another appointment at the new time
        const patientConflict = appointments.find(existing => {
            return existing.patientId === appointment.patientId &&
            existing.date === newDate &&
            existing.time === newTime &&
            existing.status === "scheduled" &&
            existing.id !== appointmentId
            
        })
        
        if (patientConflict){
            console.log("Patient already has an appointment at the new time.")
            return
        }
        
        
        // update appointment date and time if ther is no conflict
        
        appointment.date = newDate
        appointment.time = newTime
        
        // Save updated appointments to JSON
       writeJSON(appointmentsFilePath, appointments);

        console.log("Appointment rescheduale successfully!");
        console.log("New date: ", appointment.date)
        console.log("New Time: ", appointment.time)
        
    }




export {
    bookAppointment,
    cancelAppointment,
    completeAppointment,
    rescheduleAppointment,
    getAllAppointments,
    getAppointmentsByPatient,
    getAppointmentsByDoctor,
    getAppointmentsByDate,
    getAppointmentsByStatus
};

























      