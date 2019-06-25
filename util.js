const isObject = val =>
    typeof val === 'object' && !Array.isArray(val);

const format = (value) => {
    if (typeof value == "string") {
        let trimmed = value.trim();
        if (trimmed === "") {
            return "EMPTY"
        }
        return trimmed;
    }
    return value;
}

const formatObject = (obj = {}) => {
    if (isObject(obj)) {
        Object.entries(obj)
            .forEach(
                ([key, value]) => {
                    console.log("key", key, "--value", value)
                    if (isObject(value)) {
                        obj[key] = formatObject(value)
                    } else if (Array.isArray(value)) {
                        obj[key] = value.map(el => formatObject(el));
                    } else {
                        obj[key] = format(value)
                    }
                    console.log(obj[key]);
                }
            );
    } else {
        obj = format(obj);
    }
    return obj;
}


module.exports.isObject = isObject;

module.exports.format = format;

module.exports.formatObject = formatObject;