let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let cube = createMesh(new THREE.BoxGeometry(10, 10, 10, 1, 1, 1));
    scene.add(cube);

    camera.position.set(-20, 30, 40);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        // console.log(cube.children[0].geometry);
        this.width = cube.children[0].geometry.parameters.width;
        this.height = cube.children[0].geometry.parameters.height;
        this.depth = cube.children[0].geometry.parameters.depth;

        this.widthSegments = cube.children[0].geometry.parameters.widthSegments;
        this.heightSegments = cube.children[0].geometry.parameters.heightSegments;
        this.depthSegments = cube.children[0].geometry.parameters.depthSegments;

        this.redraw = (_ => {
            scene.remove(cube);
            cube = createMesh(new THREE.BoxGeometry(
                controls.width,
                controls.height,
                controls.depth,
                Math.round(controls.widthSegments),
                Math.round(controls.heightSegments),
                Math.round(controls.depthSegments)
            ));
            scene.add(cube);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'width', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'height', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'depth', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'widthSegments', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'depthSegments', 0, 10).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        cube.rotation.y = step;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireframeMat = new THREE.MeshBasicMaterial();
        wireframeMat.wireframe = true;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireframeMat]);

        return mesh;
    }

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
