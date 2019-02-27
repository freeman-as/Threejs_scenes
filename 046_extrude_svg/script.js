let scene, camera, renderer, orbit;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    let shape = createMesh(new THREE.ShapeGeometry(drawShape()));
    scene.add(shape);

    camera.position.set(-80, 80, 80);
    camera.lookAt(new THREE.Vector3(60, -60, 0));

    const dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(70, 170, 70);
    dirLight.intensity = 0.7;
    dirLight.target = shape;
    scene.add(dirLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    orbit = new THREE.OrbitControls(camera, webGLRenderer.domElement);

    let step = 0;

    const controls = new function () {

        this.depth = 2;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelEnabled = true;
        this.bevelSegments = 3;
        this.bevelEnabled = true;
        this.curveSegments = 12;
        this.steps = 1;

        this.asGeom = (_ => {
            scene.remove(shape);
            const options = {
                depth: controls.depth,
                bevelThickness: controls.bevelThickness,
                bevelSize: controls.bevelSize,
                bevelSegments: controls.bevelSegments,
                bevelEnabled: controls.bevelEnabled,
                curveSegments: controls.curveSegments,
                steps: controls.steps
            };
            shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options));
            scene.add(shape);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'depth', 0, 20).onChange(controls.asGeom);
    gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
    gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.asGeom);

    controls.asGeom();

    const renderScene = () => {
        stats.update();

        step += 0.005;
        shape.rotation.y = step;

        orbit.update();

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function drawShape() {
        // SVGからd属性のパスステートメントを読み込む
        const svgString = document.querySelector('#batman-path').getAttribute('d');
        // d3-threeDライブラリが用意してる
        // SVG文字列を引数に受け取る
        const shape = transformSVGPathExposed(svgString);
        return shape;
    }

    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));

        const meshMaterial = new THREE.MeshPhongMaterial({
            color: 0x333333, shininess: 100
        });
        const mesh = new THREE.Mesh(geom, meshMaterial);
        mesh.scale.x = 0.1;
        mesh.scale.y = 0.1;

        mesh.rotation.z = Math.PI;
        mesh.rotation.x = -1.1;
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
