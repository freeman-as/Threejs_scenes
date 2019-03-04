let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    let knot = createMesh(new THREE.TorusKnotGeometry(10, 1, 64, 8, 2, 3));
    scene.add(knot);

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(-20, 0, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;
    let loadedMesh;

    const controls = new function () {
        // console.log(knot.geometry.parameters);
        this.radius = knot.geometry.parameters.radius;
        this.tube = 0.3;
        this.radialSegments = knot.geometry.parameters.radialSegments;
        this.tubularSegments = knot.geometry.parameters.tubularSegments;
        this.p = knot.geometry.parameters.p;
        this.q = knot.geometry.parameters.q;

        this.redraw = () => {
            scene.remove(knot);
            knot = createMesh(new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q)));
            scene.add(knot);
        };

        this.save = () => {
            // console.log(scene.toJSON());
            const result = knot.toJSON();
            console.log(result);
            localStorage.setItem("json", JSON.stringify(result));
        };

        this.load = () => {
            scene.remove(loadedMesh);
            const json = localStorage.getItem("json");
            console.log(JSON.stringify(json));
            if (json) {
                const loadedGeometry = JSON.parse(json);
                const loader = new THREE.ObjectLoader();

                loadedMesh = loader.parse(loadedGeometry);
                loadedMesh.position.x -= 50;
                scene.add(loadedMesh);
            }
        }
    };

    const gui = new dat.GUI();
    const ioGui = gui.addFolder('Save & Load');
    ioGui.add(controls, 'save').onChange(controls.save);
    ioGui.add(controls, 'load').onChange(controls.load);
    const meshGui = gui.addFolder('mesh');
    meshGui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    meshGui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
    meshGui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
    meshGui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
    meshGui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
    meshGui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        knot.rotation.y = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            wireframe: true,
            wireframeLinewidth: 2,
            color: 0xaaaaaa
        });
        meshMaterial.side = THREE.DoubleSide;

        const mesh = new THREE.Mesh(geom, meshMaterial);
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
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);