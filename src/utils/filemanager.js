//handles reading and writing JSON data files
const fs = require("fs")

// ====================================
// ("path") is a module, through it we can join several files later
// const path = require("path")
// const dataPath = path.join(__dirname, "..", "data", "appointments.json");
// ======================================



// this function reads files, convert JSON text to JSON data and returns it
function readJSON(filePath){
    // try and catch is for error inticipation
    try{
    const data = fs.readFileSync(filePath, "utf8")
    const parsedData = JSON.parse(data)

    return parsedData
    }catch(error){
       
        throw error

    }

}



// this function writes Javacript data into a JSON file
function writeJSON(filePath, data){

    // using try and catch for error handling
    try{
       const jsonData = JSON.stringify(data, null, 2)
       fs.writeFileSync(filePath, jsonData, "utf8")
    }catch(error){
        throw error
    }

}



// export thesee functions so other moxdules can use them 
module.exports = {readJSON, writeJSON}