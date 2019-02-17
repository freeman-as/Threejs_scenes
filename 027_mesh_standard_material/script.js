let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const groundGeom = new THREE.PlaneGeometry(100, 100, 4, 4);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x555555 });
    const groundMesh = new THREE.Mesh(groundGeom, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -20;
    scene.add(groundMesh);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 20);

    const meshMaterial = new THREE.MeshStandardMaterial({ color: 0x7777ff });
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    scene.add(mesh);

    camera.position.set(-20, 30, 40);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    // const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    // scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-0, 30, 60);
    spotLight.castShadow = true;
    spotLight.intensity = 0.6;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;

        this.opacity = meshMaterial.opacity;
        this.transparent = meshMaterial.transparent;
        this.visible = meshMaterial.visible;
        this.roughness = meshMaterial.roughness;
        this.metalness = meshMaterial.metalness;
        this.side = "front";
        this.flatShading = meshMaterial.flatShading;

        this.color = meshMaterial.color.getStyle();
    };

    const gui = new dat.GUI();
    gui.addFolder("Mesh");
    gui.add(controls, 'opacity', 0, 1).onChange(e => {
        meshMaterial.opacity = e
    });
    gui.add(controls, 'transparent').onChange(e => {
        meshMaterial.transparent = e
    });
    gui.add(controls, 'visible').onChange(e => {
        meshMaterial.visible = e
    });
    gui.add(controls, 'roughness', 0, 1.0).onChange(e => {
        meshMaterial.roughness = e;
    });
    gui.add(controls, 'metalness', 0, 1.0).onChange(e => {
        meshMaterial.metalness = e;
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
        console.log(meshMaterial);
    });
    gui.add(controls, "flatShading").onChange(e => {
        console.log(e);
        meshMaterial.flatShading = e;
        meshMaterial.needsUpdate = true;
    });
    gui.addColor(controls, 'color').onChange(e => {
        meshMaterial.color.setStyle(e)
    });

    const renderScene = () => {
        stats.update();

        step += 0.01;
        mesh.rotation.y = step;

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
