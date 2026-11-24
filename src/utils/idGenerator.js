function generateId (prefix, records) {
    const existingNumbers = records.map(record => {
        const number = Number(record.id.split("-")[1]);
        return number;
    });
    const maxNumber = Math.max(0, ...existingNumbers);
    const nextId = maxNumber + 1; 
    return `${prefix}-${String (nextId).padStart(4, "0")}`;
}
module.exports = { generateId };