function getInputData(arr) {
    let isp = { ...arr }
    let obj = {};

    for (var key in isp) {
        
        if (isp[key].type === "radio" || isp[key].type === "checkbox") {
            if (isp[key].checked) {
                obj[isp[key].name] ? obj[isp[key].name].push(isp[key].value) 
                : obj[isp[key].name] = [isp[key].value];
            }
        } else if (isp[key].tagName !== "BUTTON") {
            obj[isp[key].name] = isp[key].value
        }
    }
    return obj
}

export { getInputData }