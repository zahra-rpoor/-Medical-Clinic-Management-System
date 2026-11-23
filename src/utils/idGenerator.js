export function generateId(prefix, records ){
    const nextId = records.length + 1;
    return `${prefix}-${String(nextId).padStart(4,"0")}`;
}
