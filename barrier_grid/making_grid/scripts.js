//checkAndSetPixelSize();

var width = window.innerWidth;
var style = document.documentElement.style;
var pixelAmount = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--pixel').trim());

if (window.PointerEvent) {
  document.body.addEventListener('pointermove', moveIt);
} else {
  document.body.addEventListener('touchmove', moveIt);
  document.body.addEventListener('mousemove', moveIt);
}


function moveIt(e) {
  e.preventDefault();
  var amount = Math.min(Math.floor((e.clientX || e.touches[0].clientX) / width * 6), 5);
  style.setProperty('--slide-amount', (amount * pixelAmount) + 'px');
}

window.addEventListener('resize', function() {
  width = window.innerWidth;
});

function orientIt(e) {
  var amount = (e.gamma / 12);
  style.setProperty('--slide-amount', (amount * pixelAmount) + 'px')
}

//Support for accelerometer around Y axis (e.g. in your hand facing you tilting it to the left and the right... best when orientationlocked). Disable when pointer events are happening.
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', orientIt);
  
  if (window.PointerEvent) {
    document.body.addEventListener('pointerdown', stopOrientation);
    
    document.body.addEventListener('pointerup', startOrientation);
    document.body.addEventListener('pointercancel', startOrientation);
    document.body.addEventListener('pointerleave', startOrientation);
  } else {
    document.body.addEventListener('touchstart', stopOrientation);
    
    document.body.addEventListener('touchend', startOrientation);
    document.body.addEventListener('touchcancel', startOrientation);
    
    document.body.addEventListener('mousedown', stopOrientation);
    
    document.body.addEventListener('mouseup', startOrientation);
    document.body.addEventListener('mouseleave', startOrientation);
  }
}

function stopOrientation(e) {
  window.removeEventListener('deviceorientation', orientIt);
}
function startOrientation(e) {
  window.addEventListener('deviceorientation', orientIt);
}

document.getElementById('show').addEventListener('click', function(e) {
  document.documentElement.style.setProperty('--show', e.currentTarget.checked ? 1 : 0);
});

function checkAndSetPixelSize() {
  if (window.devicePixelRatio && window.devicePixelRatio >= 2) {
    document.body.style.border = '.5px solid transparent';
    var size = getComputedStyle(document.body).borderWidth;
    if (size.indexOf('.5') > -1) {  
      console.log('looks to support .5px for high res screens');
      document.documentElement.classList.add('highres');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
    const mainDivs = document.querySelectorAll('main div');

    // Define the base directory where your images are stored
    const baseDirectory = 'file:///D:/editing pyhon/barrier_grid/image/';

    // Define an array of image filenames
    const imageFilenames = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];

    // Loop through each main div and set its background image dynamically
    mainDivs.forEach((div, index) => {
      const imagePath = baseDirectory + imageFilenames[index];
      div.style.setProperty('--background-image', `url('${imagePath}')`);
      div.style.setProperty('--offset', `calc(var(--pixel) * ${index + 1})`);
    });
  });





  