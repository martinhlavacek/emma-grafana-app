/**
 *
 */

function getEventsURIs(checkNames, clientNames) {
  // https://sensuapp.org/docs/0.28/api/events-api.html
  var uris = [];
  var dimensionURI = "/events";
  var aClientName = null;
  var aCheckName = null;
  var anAggregateName = null;
  if (clientNames.length) {
    for (let i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      dimensionURI = "/events/" + aClientName;
      uris.push(dimensionURI);
    }
  }
  if ((checkNames.length) && (clientNames.length)) {
    for (let i = 0; i < clientNames.length; i++) {
      aClientName = clientNames[i];
      for (let j = 0; j < checkNames.length; j++) {
        aCheckName = checkNames[i];
        dimensionURI = "/events/" + aClientName + "/" + aCheckName;
        uris.push(dimensionURI);
      }
    }
  }
  if (uris.length === 0) {
    uris.push(dimensionURI);
  }
  return uris;
}

export {
  getEventsURIs
};
