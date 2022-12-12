const valid=function(value){
    if(typeof value=="number" || typeof value==null || typeof value==undefined)
    return false
    if(typeof value=="string" && value.trim().length==0)
    return false
    return true
}
const regForUrl=function(value){
    let re=/^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
    return re.test(value)

}

module.exports={valid,regForUrl}
