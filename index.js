var three = THREE;

var scene = new three.Scene();
var camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 800);
var renderer = new three.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



var geometry = new three.BoxGeometry(1, 1, 0, 0, 0);

var textCtx = document.createElement("canvas").getContext("2d");

// Puts text in center of canvas.
function makeTextCanvas(text, width, height) {
    textCtx.canvas.width = width;
    textCtx.canvas.height = height;
    textCtx.font = "20px monospace";
    textCtx.textAlign = "center";
    textCtx.textBaseline = "middle";
    textCtx.fillStyle = "";
    textCtx.clearRect(0, 0, textCtx.canvas.width, textCtx.canvas.height);
    textCtx.fillText(text, width / 2, height / 2);
    return textCtx.canvas;
}

// add text

var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png"),
    }),
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png")
    }),
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png")
    }),
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png")
    }),
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png")
    }),
    new three.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("nexd.png")
    })
]);

var cube = new three.Mesh(geometry, material);
cube.rotation.x = 0;
cube.rotation.y = Math.PI / 4;
scene.add(cube);


camera.position.z = 5;

/* */
var isDragging = false;
var previousMousePosition = {
    x: 0,
    y: 0
};
$(renderer.domElement).on('mousedown', function (e) {
    isDragging = true;
})
    .on('mousemove', function (e) {
        console.log(e);
        var deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        if (isDragging) {

            var deltaRotationQuaternion = new three.Quaternion()
                .setFromEuler(new three.Euler(
                    toRadians(deltaMove.y * 0),
                    toRadians(deltaMove.x * 1),
                    0,
                ));

            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
        }

        previousMousePosition = {
            x: e.offsetX,
            y: e.offsetY
        };
    });

$(document).on('mouseup', function (e) {
    isDragging = false;
});

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function render() {
    renderer.render(scene, camera);


    requestAnimFrame(render);
}

render();
update(0, totalGameTime);

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

