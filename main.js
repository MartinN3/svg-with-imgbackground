var options = {
  dragMode: 'move',
  viewMode: 1,
  aspectRatio: 17 / 20,
  autoCropArea: 0.8,
  restore: false,
  guides: false,
  center: false,
  highlight: false,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: false,
};

var uploadedImageURL;
 

var previews = document.getElementById('previews');

previews.innerHTML = `
    <svg viewBox="-15 35 250 250" xmlns="http://www.w3.org/2000/svg">
      <defs xmlns="http://www.w3.org/2000/svg">
        <pattern xmlns="http://www.w3.org/2000/svg" height="1" id="imgpattern" width="1" x="0" y="0">
          <image id="image" xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" width="100%" xlink:href="" style="
        pointer-events: auto;
        transform: matrix3d(1, 0.24, 0, 0, -0.37, 1, 0, 0, 0, 0, 1, 0, 59, 38, 0, 1);
        /*transform: matrix3d(1, 0.277024, 0, 0, -0.488961, 1, 0, 0, 0, 0, 1, 0, 70.9, 36, 0, 1);*/
        transform-origin: 0px 0px 0px;">  
        </image>
        </pattern>
      </defs>
      <g id="layer1">
        <defs>
          <mask id="masked">
            <path d="m 85.729096,57.550953 6.16839,-4.752549 12.433564,14.109033 47.52866,9.496564 21.4644,-7.613229 2.09152,6.576775 -6.9788,19.007309 -0.099,1.92972 1.44968,0.745202 1.78707,0.364198 -7.81295,22.821154 -2.35391,32.43212 -24.96489,62.63902 -7.85985,29.91612 -5.90133,3.81518 -6.00883,-1.73744 0.94247,-51.32126 -3.1812,-11.12069 -47.692574,-14.884 -10.131512,7.64526 -27.752199,37.70466 -4.500871,-1.63257 -2.077325,-6.11224 10.976177,-25.74766 18.069928,-58.72853 16.691492,-25.484193 7.72618,-21.183753 2.55111,0.398191 1.53066,-1.672401 z" id="path3691" style="fill: white;stroke:#000000;stroke-width:0.15084587px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;"></path>
            <path d="m 102.00632,69.269345 14.69383,5.705078 c 0,0 1.92582,0.601488 1.09849,2.527716 -0.82253,1.915056 -1.90169,1.783574 -1.90169,1.783574 l -21.639139,-2.362351 -6.18936,-7.512278 0.992187,-4.157736 5.669642,-4.110493 z" id="path4567"  style="stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;"></path>
            <path d="m 133.23386,83.451646 20.3793,6.214017 11.02487,-4.34313 1.67043,-3.140416 0.21098,-0.784387 -0.0773,-0.752414 -1.60362,-4.409947 c -0.2528,-0.458503 -0.17794,-1.407937 -1.51573,-0.945056 l -11.58048,3.951839 -17.77342,-0.935443 c 0,0 -1.99754,-0.102187 -2.55577,2.104746 -0.62781,2.482031 1.82078,3.040191 1.82078,3.040191 z" id="path4565" style="stroke:#000000;stroke-width:0.26458332px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;"></path>
            <ellipse cx="176.71315" cy="116.51917" id="path17-3" rx="7.5775709" ry="9.2952061" style="stroke:#000000;stroke-width:0.23845355;stroke-opacity:1;" transform="matrix(0.99964585,-0.02661145,-0.18655062,0.98244535,0,0)"></ellipse>
            <ellipse cx="102.29757" cy="95.17585" id="path17" rx="6.5909853" ry="8.5113897" style="stroke:#000000;stroke-width:0.2128064;stroke-opacity:1;" transform="matrix(0.99999769,0.00214997,-0.22286823,0.97484858,0,0)"></ellipse>
          </mask>
        </defs>
        <image height="252.28085" id="image3688" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" width="230.89929" x="-6.4943261" xlink:href="./img/original-svg.jpg" y="23.837965"></image>
        <rect mask="url(#masked)" style="width: 100%;height: 100%;fill: url(#imgpattern);"></rect>
      </g>
    </svg>
`;

var baseCropperWindow = document.getElementById('image-cropper__base');

var cropper = new Cropper(baseCropperWindow, options);

// Import image
var inputImage = document.getElementById('inputImage');

if (URL) {
  inputImage.onchange = function () {
    var files = this.files;
    var file;

    if (cropper && files && files.length) {
      file = files[0];

      if (/^image\/\w+/.test(file.type)) {
        uploadedImageType = file.type;
        uploadedImageName = file.name;

        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
        }

        baseCropperWindow.src = uploadedImageURL = URL.createObjectURL(file);
        cropper.destroy();
        cropper = new Cropper(baseCropperWindow, options);
        inputImage.value = null;
      } else {
        window.alert('Please choose an image file.');
      }
    }
  };
} else {
  inputImage.disabled = true;
  inputImage.parentNode.className += ' disabled';
}

baseCropperWindow.addEventListener('ready', () => {
  //Assign helper sketch to Cropper preview window
  var cropperViewBox = document.querySelector('.cropper-view-box');
  var newImageNode = document.createElement("img");
  newImageNode.setAttribute('src', './svg/frontdwg-v1.svg');
  newImageNode.setAttribute('class', 'cropper-view-box--vachlSmall');
  cropperViewBox.appendChild(newImageNode);

  // Action when preview button is pressed
  var apply = document.getElementById('apply');
  apply.addEventListener('click', () => {
    var croppedImage = cropper.getCroppedCanvas().toDataURL('image/jpeg');

    //Image in preview SVG that needs to be overwritten by new IMG
    var image = document.getElementById('image');
    image.setAttribute("xlink:href", croppedImage);
  });
});