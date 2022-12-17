const mongoose = require("mongoose")

const isValidBody = (reqBody) => {
    return Object.keys(reqBody).length == 0;
}

const isValidName = (name) => {
    return /^[a-zA-Z\. ]*$/.test(name)
}

const isMark = (mark) => {
    return /^[1-9]\d*$/.test(mark)
};

const isValidGeoLocation = (location) => {
    return /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(location)
};

const isValidEmail = (Email) => {
    return /^([A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/.test(Email)
};

const isValidPwd = (Password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/.test(Password)
};
const isEmpty = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
};

const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
}

const isValidStatus = (value) => { return ["Active", "Inactive"].indexOf(value) !== -1 }

module.exports = {
    isValidBody,
    isValidEmail,
    isValidPwd,
    isValidName,
    isMark,
    isEmpty,
    isValidStatus,
    isValidObjectId,
    isValidGeoLocation
}