const Role = {
    Admin: 'Admin',
    Manager: 'Manager',
    User: 'User',
    Exec:'Executive'
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
}


module.exports = {
    Role,
    rolesArray,
    hasExecView,
    hasAdminView,
    hasManagerView,
    hasUserView,
    setCurrentUserRole
}