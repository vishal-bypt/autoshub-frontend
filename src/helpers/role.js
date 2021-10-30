const Role = {
    Admin: 'Admin',
    Manager: 'Manager',
    User: 'User'
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
                roleArray.push("executive");
            } else if (index === 1 && value === "1") {
                roleArray.push("admin");
            } else if (index === 2 && value === "1") {
                roleArray.push("manager");
            } else if (index === 3 && value === "1") {
                roleArray.push("user");
            }
        });
        return roleArray
    }
}

const hasExecView = (userRole) => {
    let isExec = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes("executive")) {
        isExec = true;
    } else {
        isExec = false;
    }
    return isExec;
}

const hasAdminView = (userRole) => {
    let isAdmin = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes("admin")) {
        isAdmin = true;
    } else {
        isAdmin = false;
    }
    return isAdmin;
}

const hasManagerView = (userRole) => {
    let isManager = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes("manager")) {
        isManager = true;
    } else {
        isManager = false;
    }
    return isManager;
}

const hasUserView = (userRole) => {
    let isUser = false;
    let roleArray = rolesArray(userRole)
    if (roleArray.includes("user")) {
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