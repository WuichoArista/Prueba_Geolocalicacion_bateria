//bateria del dispositivo 

let cambioEnBateria = false;

navigator.getBattery().then((bateria) => {
    cambioEnBateria = bateria.charging;

    bateria.addEventListener('chargingchange', () => {
    cambioEnBateria = bateria.charging;
    
    if(cambioEnBateria){
        console.log('la laptop comenso a cargarse')
    } else {
        console.log('Se desconecto la laptop del enchufe')
    }
  });
});


//------------------------------------

var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    console.log(pos);
    var crd = pos.coords;
    console.log(crd);
    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };
  
  function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  
  navigator.geolocation.getCurrentPosition(success, error, options);


//camaras y microfonos -------------------------------------

var video = document.querySelector('video');
var constraints = window.constraints = {
  audio: false,
  video: true
};
var errorElement = document.querySelector('#errorMsg');

navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log('Using video device: ' + videoTracks[0].label);
  stream.onended = function() {
    console.log('Stream ended');
  };
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
})
.catch(function(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
        constraints.video.width.exact + ' px is not supported by your device.');
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg('getUserMedia error: ' + error.name, error);
});

function errorMsg(msg, error) {
  errorElement.innerHTML += '<p>' + msg + '</p>';
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}
