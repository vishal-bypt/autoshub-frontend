export const Role = {
    Admin: 'Admin',
    Manager: 'Manager',
    User: 'User'
}

export const decimalTobinary = (userRole) => {
    let roleArray = [];
    if (userRole !== null) {
        let binaryValue = userRole.toString(2);
        var newValue = binaryValue.padStart(4, "0");
        let array = [...newValue].reverse();
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
