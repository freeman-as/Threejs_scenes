let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x7777777 });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI  / 2;
    groundMesh.position.y = -20;
    scene.add(groundMesh);

    const sphereGeometry = new THREE.SphereGeometry(14, 20, 20);
    const cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
    const planeGeometry = new THREE.PlaneGeometry(14, 14, 4, 4);
    
    const meshMaterial = new THREE.MeshBasicMaterial({ color: 0x7777ff });
    const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1));
    meshMaterial.clippingPlanes = [clippingPlane];

    const sphere = new THREE.Mesh(sphereGeometry, meshMaterial);
    const cube = new THREE.Mesh(cubeGeometry, meshMaterial);
    const plane = new THREE.Mesh(planeGeometry, meshMaterial);

    sphere.position.set(0, 3, 2);

    cube.position = sphere.position;
    plane.position = sphere.position;

    scene.add(cube);

    camera.position.set(-20, 50, 40);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;
    let oldContext = null;

    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = meshMaterial.opacity;
        this.transparent = meshMaterial.transparent;
        this.visible = meshMaterial.visible;
        this.side = "front";

        this.color = meshMaterial.color.getStyle();
        this.wireframe = meshMaterial.wireframe;
        this.wireframeLinewidth = meshMaterial.wireframeLinewidth;
        this.wireFrameLineJoin = meshMaterial.wireframeLinejoin;

        this.clippingEnabled = false;
        this.clippingPlaneZ = 0;

        this.selectedMesh = "cube";
    }

    const gui = new dat.GUI();

    const spGui = gui.addFolder("Mesh");
    spGui.add(controls, 'opacity', 0, 1).onChange(e => {
        meshMaterial.opacity = e
    });
    spGui.add(controls, 'transparent').onChange(e => {
        meshMaterial.transparent = e
    });
    spGui.add(controls, 'wireframe').onChange(e => {
        meshMaterial.wireframe = e
    });
    spGui.add(controls, 'wireframeLinewidth', 0, 20).onChange(e => {
        meshMaterial.wireframeLinewidth = e
    });
    spGui.add(controls, 'visible').onChange(e => {
        meshMaterial.visible = e
    });
    spGui.add(controls, 'side', ["front", "back", "double"]).onChange(e => {
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
    spGui.addColor(controls, 'color').onChange(e => {
        meshMaterial.color.setStyle(e)
    });
    spGui.add(controls, 'clippingEnabled').onChange(e => {
        renderer.localClippingEnabled = e;
    });
    spGui.add(controls, 'clippingPlaneZ', -5.0, 5.0).onChange(e => {
        meshMaterial.clippingPlanes[0].constant = e;
    });
    spGui.add(controls, 'selectedMesh', ["cube", "sphere", "plane"]).onChange(e => {
        scene.remove(plane);
        scene.remove(cube);
        scene.remove(sphere);

        console.log(e);
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

// Resizeハンドラ
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
