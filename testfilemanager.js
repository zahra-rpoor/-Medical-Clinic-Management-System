import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

import { readJSON, writeJSON } from "../../utils/filemanager.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testFilePath = path.join(
    __dirname,
    "../../data/fileManager-test.json"
);

// Test data
const testData = [
    {
        id: "TEST-0001",
        name: "Ahmad"
    }
];

// Test 1: Write data
writeJSON(testFilePath, testData);
console.log("Data written successfully.");

// Test 2: Read data
const result = readJSON(testFilePath);
console.log("Read data:", result);

// Test 3: Compare written and read data
console.log(
    "Test passed:",
    JSON.stringify(result) === JSON.stringify(testData)
);

// Delete temporary test file
fs.unlinkSync(testFilePath);
console.log("Temporary test file deleted.");