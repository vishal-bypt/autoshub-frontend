const Role = {
    Admin: 'Admin',
    Manager: 'Manager',
    User: 'User',
    Exec: 'Executive'
}

const rolesArray = (userRole) => {
    let roleArray = [];
    if (userRole !== null && userRole !== "") {
        let binaryValue = userRole.toString(2);
        var newValue = binaryValue.padStart(4, "0");
        let array = [...newValue]
        // let array = [...newValue].reverse();
        array.map((value, index) => {
            if (index === 0 && value === "1") {
                roleArray.push(Role.Exec);
            } else if (index === 1 && value === "1") {
                roleArray.push(Role.Admin);
            } else if (index === 2 && value === "1") {
                roleArray.push(Role.Manager);
            } else if (index === 3 && value === "1") {
                roleArray.push(Role.User);
            }
        });
        return roleArray
    }
}

const hasExecView = (userRole) => {
    let isExec = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes(Role.Exec)) {
        isExec = true;
    } else {
        isExec = false;
    }
    return isExec;
}

const hasAdminView = (userRole) => {
    let isAdmin = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes(Role.Admin)) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    return isAdmin;
}

const hasManagerView = (userRole) => {
    let isManager = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes(Role.Manager)) {
        isManager = true;
    } else {
        isManager = false;
    }
    return isManager;
}

const hasUserView = (userRole) => {
    let isUser = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes(Role.User)) {
        isUser = true;
    } else {
        isUser = false;
    }
    return isUser;
}

function setCurrentUserRole(role) {
    let localData = localStorage.getItem("authUser")
    const data = JSON.parse(localData);
    data.currentRole = role
    localStorage.setItem("authUser", JSON.stringify(data))
    // return new Promise(function (resolve, reject) {
    //     if (true) { // Try changing to 'false'
    //         setTimeout(function () {
    //             console.log('waitForMe\'s function succeeded');
    //             let localData = localStorage.getItem("authUser")
    //             const data = JSON.parse(localData);
    //             data.currentRole = role
    //             localStorage.setItem("authUser", JSON.stringify(data))
    //             resolve();
    //         }, 5000);
    //     }
    // });
}

function getUserName(firstName, lastName) {
    if (firstName !== "" || firstName !== null) {
        const userName = firstName + " " + lastName;
        return userName;
    } else if (lastName !== "" || lastName !== null) {
        return lastName;
    } else {
        return "Anonymous";
    }
}

function getInitials(name) {

    //splits words to array
    var nameArray = name.split(" ");

    var initials = '';

    //if it's a single word, return 1st and 2nd character
    if (nameArray.length === 1) {
        return nameArray[0].charAt(0) + "" + nameArray[0].charAt(1);
    } else {
        initials = nameArray[0].charAt(0);
    }
    //else it's more than one, concat the initials in a loop
    //we've gotten the first word, get the initial of the last word


    //first word

    for (let i = nameArray.length - 1; i < nameArray.length; i++) {
        initials += nameArray[i].charAt(0);
    }

    // for (i = (nameArray.length - 1); i < nameArray.length; i++) {
    //     initials += nameArray[i].charAt(0);
    // }
    //return capitalized initials
    return initials.toUpperCase();
}

module.exports = {
    Role,
    rolesArray,
    hasExecView,
    hasAdminView,
    hasManagerView,
    hasUserView,
    setCurrentUserRole,
    getUserName,
    getInitials
}