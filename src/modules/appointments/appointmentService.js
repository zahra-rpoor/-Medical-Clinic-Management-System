//temporary apointment data for development and testing(without JSON)
const appointments = [
    
]
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


// mock data for doctors. real ones come from module 2
    const doctors = [
        {
            id: 201,
            name: "Dr. Ahmad",
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
    },
    {
        id: 202,
        name: "Dr. Sara",
        status: "active",
        workingDays: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ],
        workingHours: {
            start: "09:00",
            end: "15:00"
        }
    }
]


     // this fumction checks whether doctor is working on the selcted day
    
    function isDoctorWorkingOnDate(doctorId, date){
        const doctor = getDoctorById(doctorId)
        
        if (!doctor) {
            return false
        }
    
    const dayName = getDayName(date)
    
    return doctor.workingDays.includes(dayName)
}


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
function getDoctorById(doctorId){
    const doctor = doctors.find(doctor => {
        return doctor.id === doctorId
    })
    return doctor
    
}
   // checking doctors' availibility on weekdays
        function getDayName(date) {
    const appointmentDate = new Date(date);

    const dayNumber = appointmentDate.getUTCDay();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    return days[dayNumber];}


 function isDoctorAvailableAtTime(doctorId, time){
        const doctor = getDoctorById(doctorId);

        if (!doctor){
            return false;
        }
        const startTime = doctor.workingHours.start;
        const endTime = doctor.workingHours.end;


        return time >= startTime && time < endTime
    }
    




// =========================
// book appointments function 1
// ======================



//function to book a new apointment (chekz the patient and doxtor first. 
// avoids double booking)
function bookAppointment(patientId, doctorId, date, time){
    
    
    
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
    
    // is the doctor active and availibel
    const doctor = getDoctorById(doctorId)
    
    if (!doctor){
        console.log("Doctor not found.")
        return
    }
    if(doctor.status !== "active"){
        console.log("Doctor is inactive")
        return
    }
    // is doctor working on the selected day
    const isWorkingDay = isDoctorWorkingOnDate(doctorId, date);

    if (!isWorkingDay) {
    console.log("Doctor does not work on this day.");
    return;
    }

   


    // availability
    const isAvailable = isDoctorAvailableAtTime(doctorId, time)

    if (!isAvailable){
        console.log("Doctor is not available at the this time.")
        return
    }
   

     

    // checking for double appointments booking
    const existingAppointment = appointments.find(appointment => {
        return appointment.doctorId === doctorId &&
        appointment.date === date &&
        appointment.time === time &&
               appointment.status === "booked";
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
                appointment.status === "booked" ;
            })
            
            if (existingPatientAppointment){
                console.log("Patient already has an appointment at this time.");
                return
            }
            
            






            
            //  Create a new appointment in a object
            const newAppointment = {
                id : appointments.length + 1, 
                patientId :patientId,
                doctorId: doctorId,
                date : date, 
                time: time, 
                status: "booked"
            }
            
            
            // Step 4: Save the appointment
            
            appointments.push(newAppointment)

            
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
        appointment.status = "completed";
        console.log("Appointment completed successfully!");

       } 
        
// ========================
// get all appointments
// ============================



        
        
        
        
        // Function to display all appointments
        function getAllAppointments() {
           return appointments;
            
        }
        console.log(getAllAppointments())
        
        
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
// get appointments by date
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
          


         function isValidStatus(status) {
    const validStatuses = ["booked", "cancelled", "completed"];

    return validStatuses.includes(status);
}

        //  get appointmnet by status

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

        // Check whether the doctor works on the new date
       const isWorkingDay = isDoctorWorkingOnDate(appointment.doctorId, newDate);

       if (!isWorkingDay) {
       console.log("Doctor does not work on this day.");
       return;
         }
            
         
        // check wether th edoctor is available at the new time
        const isAvailable = isDoctorAvailableAtTime(appointment.doctorId, newTime)

        if(!isAvailable){
            console.log("Doctor is not availabel at this time.")
            return
        }


            
            
            // check wether the doctor is already booked
            const doctorConflict = appointments.find(existing => {
            return existing.doctorId === appointment.doctorId &&
            existing.date === newDate &&
            existing.time === newTime &&
            existing.status === "booked" &&
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
            existing.status === "booked" &&
            existing.id !== appointmentId
            
        })
        
        if (patientConflict){
            console.log("Patient already has an appointment at the new time.")
            return
        }
        
        
        // update appointment date and time if ther is no conflict
        
        appointment.date = newDate
        appointment.time = newTime
        
        console.log("Appointment rescheduale successfully!");
        console.log("New date: ", appointment.date)
        console.log("New Time: ", appointment.time)
        
    }
































      