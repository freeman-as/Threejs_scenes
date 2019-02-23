let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let sphere = createMesh(new THREE.SphereGeometry(4, 10, 10));
    scene.add(sphere);

    camera.position.set(-20, 30, 40);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    console.log(sphere.children[0].geometry);
    const controls = new function () {
        // console.log(sphere.children[0].geometry);
        this.radius = sphere.children[0].geometry.parameters.radius;
        this.widthSegments = sphere.children[0].geometry.parameters.widthSegments;
        this.heightSegments = sphere.children[0].geometry.parameters.heightSegments;
        this.phiStart = 0;
        this.phiLength = Math.PI * 2;
        this.thetaStart = 0;
        this.thetaLength = Math.PI;

        this.redraw = (_ => {
            scene.remove(sphere);
            sphere = createMesh(new THREE.SphereGeometry(
                controls.radius,
                controls.widthSegments,
                controls.heightSegments,
                controls.phiStart,
                controls.phiLength,
                controls.thetaStart,
                controls.thetaLength
            ));
            scene.add(sphere);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'widthSegments', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'phiStart', 0, Math.PI * 2).onChange(controls.redraw);
    gui.add(controls, 'phiLength', 0, Math.PI * 2).onChange(controls.redraw);
    gui.add(controls, 'thetaStart', 0, Math.PI * 2).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, Math.PI * 2).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        sphere.rotation.y = step;

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
