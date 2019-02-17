let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, -2, 0);
    scene.add(plane);

    camera.position.set(-30, 30, 30);
    camera.lookAt(scene.position);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    const group = new THREE.Group();
    const materials = [
        new THREE.MeshBasicMaterial({color: 0x009e60}),
        new THREE.MeshBasicMaterial({color: 0x009e60}),
        new THREE.MeshBasicMaterial({color: 0x0051ba}),
        new THREE.MeshBasicMaterial({color: 0x0051ba}),
        new THREE.MeshBasicMaterial({color: 0xffd500}),
        new THREE.MeshBasicMaterial({color: 0xffd500}),
        new THREE.MeshBasicMaterial({color: 0xff5800}),
        new THREE.MeshBasicMaterial({color: 0xff5800}),
        new THREE.MeshBasicMaterial({color: 0xC41E3A}),
        new THREE.MeshBasicMaterial({color: 0xC41E3A}),
        new THREE.MeshBasicMaterial({color: 0xffffff}),
        new THREE.MeshBasicMaterial({color: 0xffffff})
    ];

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {
                const cubeGeom = new THREE.BoxGeometry(2.9, 2.9, 2.9);
                const cube = new THREE.Mesh(cubeGeom, materials);
                cube.position.set(x * 3 - 3, y * 3, z * 3 - 3);

                group.add(cube);
            }
        }
    }
    scene.add(group);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;
    };

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);

    const renderScene = () => {
        stats.update();

        step += controls.rotationSpeed;
        group.rotation.y = step;
        // scene.traverse(e => {
        //     e.rotation.y = step;
        // })
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

    // stats初期化
    function initStats() {
        const stats = new Stats();
        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.getElementById("Stats-output").appendChild(stats.domElement);

        return stats;
    }

}

function showSpehereNormals(sphere) {
    for (let f = 0, fl = sphere.geometry.faces.length; f < fl; f++) {
        const face = sphere.geometry.faces[f];
        const centroid = new THREE.Vector3(0, 0, 0);
        centroid.add(sphere.geometry.vertices[face.a]);
        centroid.add(sphere.geometry.vertices[face.b]);
        centroid.add(sphere.geometry.vertices[face.c]);
        centroid.divideScalar(3);

        const arrow = new THREE.ArrowHelper(
                face.normal,
                centroid,
                2,
                0x3333FF,
                0.5,
                0.5);
        sphere.add(arrow);
    }
}

// Resizeハンドラ
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
