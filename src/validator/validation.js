const isValidString = function (name) {
    if (typeof name === undefined || typeof name === null) return false;
    if (typeof name === "string" & name.length === 0) return false;
    return true;
}
const isValidReqBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


module.exports = { isValidReqBody, isValidString };