const AristonApi = require("ariston-remotethermo-client");
const moment = require("moment-timezone");
const fs = require('fs')
const credentails = require ('./credentials.json');



const path = __dirname + '/out.csv';

const ariston = new AristonApi(credentails.username, credentails.password, credentails.heater_id);

if (!fs.existsSync(path)) {
    fs.appendFileSync(path, 'Date;OutTemp;InTemp\r\n');
}


ariston.login().then(() => {
  ariston.getStatus().then((params) => {
    const date = moment(new Date(),'Europe/Rome')
    console.log(date.format('DD/MM/yyyy HH:mm:ss'));
    console.log("Comfort Temperature:", params.zone.comfortTemp.value);
    console.log("Outdoor Temperature:", params.outsideTemp);
    console.log("Room Temperature:", params.zone.roomTemp);
    fs.appendFileSync(path, date.format('DD/MM/yyyy HH:mm:ss') + ';'+ params.outsideTemp +';'+ params.zone.roomTemp +'\r\n');

    process.exit(0)

    // ariston.getComfortStatus().then((value) => {
    //   console.log("Comfort mode:", value);
    //   ariston.setComfortStatus(3).then((newState) => {
    //     console.log("Comfort mode:", newState);
    //   });
    // });

  });
});