const moment = require('moment') 
const formatDate = (prams)=>{
let mydate = new Date(prams)
let date = moment(mydate).format("DD-MM-YYYY-HH:MM")
    return date
}
module.exports = formatDate;