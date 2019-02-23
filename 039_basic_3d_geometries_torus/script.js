let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let torus = createMesh(new THREE.TorusGeometry(10, 10, 8, 6, Math.PI * 2));
    scene.add(torus);

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        // console.log(torus.children[0].geometry);
        this.radius = torus.children[0].geometry.parameters.radius;
        this.tube = torus.children[0].geometry.parameters.tube;
        this.radialSegments = torus.children[0].geometry.parameters.radialSegments;
        this.tubularSegments = torus.children[0].geometry.parameters.tubularSegments;
        this.arc = torus.children[0].geometry.parameters.arc;

        this.redraw = (_ => {
            scene.remove(torus);
            torus = createMesh(new THREE.TorusGeometry(
                controls.radius,
                controls.tube,
                Math.round(controls.radialSegments),
                Math.round(controls.tubularSegments),
                controls.arc
            ));
            scene.add(torus);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'tubularSegments', 1, 20).onChange(controls.redraw);
    gui.add(controls, 'arc', 0, Math.PI * 2).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        torus.rotation.y = step;

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
