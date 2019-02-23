let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let cone = createMesh(new THREE.ConeGeometry(20, 20));
    scene.add(cone);

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        // console.log(cone.children[0].geometry);
        this.radius = 20;
        this.height = 20;

        this.radialSegments = 8;
        this.heightSegments = 8;

        this.openEnded = false;

        this.thetaStart = 0;
        this.thetaLength = Math.PI * 2;

        this.redraw = (_ => {
            scene.remove(cone);
            cone = createMesh(new THREE.ConeGeometry(
                controls.radius,
                controls.height,
                controls.radialSegments,
                controls.heightSegments,
                controls.openEnded,
                controls.thetaStart,
                controls.thetaLength
            ));
            scene.add(cone);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', -40, 40).onChange(controls.redraw);
    gui.add(controls, 'height', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'heightSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'openEnded').onChange(controls.redraw);
    gui.add(controls, 'thetaStart', 0, Math.PI * 2).onChange(controls.redraw);
    gui.add(controls, 'thetaLength', 0, Math.PI * 2).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        cone.rotation.y = step;

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
