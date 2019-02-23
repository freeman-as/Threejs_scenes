let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let knot = createMesh(new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3, 1));
    scene.add(knot);

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        // we need the first child, since it's a multimaterial
        // console.log(knot.children[0].geometry);
        this.radius = knot.children[0].geometry.parameters.radius;
        this.tube = 0.3;
        this.radialSegments = 100;
        this.tubularSegments = 20;
        this.p = knot.children[0].geometry.parameters.p;
        this.q = knot.children[0].geometry.parameters.q;

        this.redraw = (_ => {
            scene.remove(knot);
            knot = createMesh(new THREE.TorusKnotGeometry(
                controls.radius,
                controls.tube,
                Math.round(controls.radialSegments),
                Math.round(controls.tubularSegments),
                Math.round(controls.p),
                Math.round(controls.q)
            ));
            scene.add(knot);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
    gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
    gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        knot.rotation.y = step;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshNormalMaterial({});
        meshMaterial.side = THREE.DoubleSide;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

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
