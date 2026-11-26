//handles reading and writing JSON data files
import fs from "node:fs";

// ====================================
// ("path") is a module, through it we can join several files later
// const path = require("path")
// const dataPath = path.join(__dirname, "..", "data", "appointments.json");
// ======================================



// this function reads files, convert JSON text to JSON data and returns it
function readJSON(filePath,  defaultValue = []){
    // try and catch is for error inticipation
    try{
     const data = fs.readFileSync(filePath, "utf8")

     const parsedData = JSON.parse(data)

    return parsedData


    }catch(error){
        if (error.code === "ENOENT") {
             console.log(`File not found: ${filePath}`);
            console.error("Using default data instead.");
    return defaultValue;
            
        }

        if (error instanceof SyntaxError) {
             console.error(`Invalid JSON format in file: ${filePath}`);
             console.error("Using default data instead.");
             return defaultValue;
        }

        if (error.code === "EACCES") {
            throw new Error(`Permission denied: Cannot read ${filePath}`);
        }
       
        throw new Error(`Failed to read JSON file: ${error.message}`);

    }

}



// this function writes Javacript data into a JSON file
function writeJSON(filePath, data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
}



// export thesee functions so other moxdules can use them 
export { readJSON, writeJSON };