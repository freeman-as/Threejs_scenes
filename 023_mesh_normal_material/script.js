let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.set(-50, 40, 50);
    camera.lookAt(scene.position);

    const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x777777 });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -20;
    scene.add(groundMesh);

    const sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
    const cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);

    const meshMaterial = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
    const cube = new THREE.Mesh(cubeGeometry, meshMaterial);
    const plane = new THREE.Mesh(planeGeometry, meshMaterial);

    sphere.position.set(0, 3, 2);
    // sphereに法線表示
    showSpehereNormals(sphere);

    cube.position = sphere.position;
    plane.position = sphere.position;
    scene.add(cube);

    camera.position.set(-20, 30, 40);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = meshMaterial.opacity;
        this.transparent = meshMaterial.transparent;

        this.visible = meshMaterial.visible;
        this.side = "front";

        this.wireframe = meshMaterial.wireframe;
        this.wireframeLinewidth = meshMaterial.wireframeLinewidth;

        this.selectedMesh = "cube";
        this.sphereNormals = false;

        //this.shading = "flat";
    };

    const gui = new dat.GUI();
    gui.add(controls, 'opacity', 0, 1).onChange(e => {
        meshMaterial.opacity = e
    });
    gui.add(controls, 'transparent').onChange(e => {
        meshMaterial.transparent = e
    });
    gui.add(controls, 'wireframe').onChange(e => {
        meshMaterial.wireframe = e
    });
    gui.add(controls, 'wireframeLinewidth', 0, 20).onChange(e => {
        meshMaterial.wireframeLinewidth = e
    });
    gui.add(controls, 'visible').onChange(e => {
        meshMaterial.visible = e
    });
    gui.add(controls, 'side', ["front", "back", "double"]).onChange(e => {
        console.log(e);
        switch (e) {
            case "front":
                meshMaterial.side = THREE.FrontSide;
                break;
            case "back":
                meshMaterial.side = THREE.BackSide;
                break;
            case "double":
                meshMaterial.side = THREE.DoubleSide;
                break;
        }
        meshMaterial.needsUpdate = true;
    });
    /*
    gui.add(controls, 'shading', ["flat", "smooth"]).onChange(function (e) {
        switch (e) {
            case "flat":
                // https://github.com/mrdoob/three.js/issues/1929
                meshMaterial.shading = THREE.FlatShading;
                break;
            case "smooth":
                meshMaterial.shading = THREE.SmoothShading;
                break;
        }

        var oldPos = sphere.position.clone();
        scene.remove(sphere);
        scene.remove(plane);
        scene.remove(cube);
        sphere = new THREE.Mesh(sphere.geometry.clone(), meshMaterial);
        cube = new THREE.Mesh(cube.geometry.clone(), meshMaterial);
        plane = new THREE.Mesh(plane.geometry.clone(), meshMaterial);

        sphere.position = oldPos;
        cube.position = oldPos;
        plane.position = oldPos;

        switch (controls.selectedMesh) {
            case "cube":
                scene.add(cube);

                break;
            case "sphere":
                scene.add(sphere);

                break;
            case "plane":
                scene.add(plane);
                break;

        }

        meshMaterial.needsUpdate = true;
        console.log(meshMaterial);
    });
    */

    gui.add(controls, 'selectedMesh', ["cube", "sphere", "plane"]).onChange(e => {
        scene.remove(plane);
        scene.remove(cube);
        scene.remove(sphere);

        switch (e) {
            case "cube":
                scene.add(cube);
                break;
            case "sphere":
                scene.add(sphere);
                break;
            case "plane":
                scene.add(plane);
                break;
        }
    });
    // gui.add(controls, 'sphereNormals').onChange(e => {
    //     console.log(e);
    //     if (controls.selectedMesh === "sphere") {
    //         if (e) {
    //             showSpehereNormals(sphere);
    //             scene.add(sphere);
    //         } else {
    //             scene.remove(sphere);
    //             scene.add(sphere);
    //         }
    //     }
    // });

    const renderScene = () => {
        stats.update();

        step += 0.01;
        cube.rotation.y = step;
        plane.rotation.y = step;
        sphere.rotation.y = step;

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
