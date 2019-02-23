let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let polyhedron = createMesh(new THREE.IcosahedronGeometry(10, 0));
    scene.add(polyhedron);

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        // console.log(polyhedron.children[0].geometry);
        this.radius = 10;
        this.detail = 0;
        this.type = 'Icosahedron';

        this.redraw = (_ => {
            scene.remove(polyhedron);
            switch (controls.type) {
                case 'Icosahedron':
                    polyhedron = createMesh(new THREE.IcosahedronGeometry(controls.radius, controls.detail));
                    break;
                case 'Tetrahedron':
                    polyhedron = createMesh(new THREE.TetrahedronGeometry(controls.radius, controls.detail));
                    break;
                case 'Octahedron':
                    polyhedron = createMesh(new THREE.OctahedronGeometry(controls.radius, controls.detail));
                    break;
                case 'Dodecahedron':
                    polyhedron = createMesh(new THREE.DodecahedronGeometry(controls.radius, controls.detail));
                    break;
                case 'Custom':
                    const vertices = [
                        1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
                    ];

                    const indices = [
                        2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
                    ];

                    polyhedron = createMesh(new THREE.PolyhedronGeometry(vertices, indices, controls.radius, controls.detail));
                    break;
            }

            scene.add(polyhedron);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).step(1).onChange(controls.redraw);
    gui.add(controls, 'detail', 0, 3).step(1).onChange(controls.redraw);
    gui.add(controls, 'type', ['Icosahedron', 'Tetrahedron', 'Octahedron', 'Dodecahedron', 'Custom']).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();

        step += 0.01;
        polyhedron.rotation.y = step;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

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
