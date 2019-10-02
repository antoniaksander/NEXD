
var three = THREE;
var scene = new three.Scene();
var camera = new three.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 800);
var renderer = new three.WebGLRenderer();
const loader = new THREE.TextureLoader();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);



var geometry = new three.BoxGeometry(1, 1, 1);

var material = new three.MeshFaceMaterial([
    new three.MeshBasicMaterial({
        map: THREE.TextureLoader(""),
    }),
    new three.MeshBasicMaterial({
        map: THREE.TextureLoader(""),
    }),
    new three.MeshBasicMaterial({
        map: loader.load('nexd.png'),
    }),
    new three.MeshBasicMaterial({
        map: loader.load('nexd.png'),
    }),
    new three.MeshBasicMaterial({
        map: loader.load('nexd.png'),
    }),
    new three.MeshBasicMaterial({
        map: loader.load('nexd.png'),
    })
]);

var cube = new three.Mesh(geometry, material);
cube.rotation.x = 0;
cube.rotation.y = Math.PI / 1;
scene.add(cube);


var geometry1 = new three.BoxGeometry(1.2, 1.2, 1.2);

var material1 = new three.MeshFaceMaterial([

    new three.MeshBasicMaterial({
        transparent: true,
        map: THREE.TextureLoader(""),
    }),
    new three.MeshBasicMaterial({
        map: THREE.TextureLoader(""),
    }),
    new three.MeshBasicMaterial({
        transparent: true,
        map: loader.load('bluewhite.svg'),
    }),
    new three.MeshBasicMaterial({
        transparent: true,
        map: loader.load('bluewhite.svg'),
    }),
    new three.MeshBasicMaterial({
        transparent: true,
        map: loader.load('bluewhite.svg'),
    }),
    new three.MeshBasicMaterial({
        transparent: true,
        map: loader.load('bluewhite.svg'),
    })
]);



var cube1 = new three.Mesh(geometry1, material1);
cube1.rotation.x = 0;
cube1.rotation.y = Math.PI / 1;
scene.add(cube1);


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
        //console.log(e);
        var deltaMove = {
            x: e.offsetX - previousMousePosition.x,
            y: e.offsetY - previousMousePosition.y
        };

        if (isDragging) {

            var deltaRotationQuaternion = new three.Quaternion()
                .setFromEuler(new three.Euler(
                    toRadians(deltaMove.y * 1),
                    toRadians(deltaMove.x * 0),
                    0,
                ));

            cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);
            cube1.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube1.quaternion);
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


    requestAnimFrame(render, cube, cube1);
}

render();
update(0, totalGameTime);

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

