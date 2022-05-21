const AristonApi = require("ariston-remotethermo-client");
const credentails = require ('./credentials.json')
const ariston = new AristonApi(credentails.username, credentails.password, credentails.heater_id);

ariston.login().then(() => {
  ariston.getStatus().then((params) => {
    console.log("Comfort Temperature:", params.zone.comfortTemp.value);
    console.log("Outdoor Temperature:", params.outsideTemp);
    console.log("Room Temperature:", params.zone.roomTemp);
    ariston.getComfortStatus().then((value) => {
      console.log("Comfort mode:", value);
      ariston.setComfortStatus(3).then((newState) => {
        console.log("Comfort mode:", newState);
      });
    });

  });
});