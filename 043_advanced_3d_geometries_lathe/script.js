let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    let spGroup;
    let latheMesh;

    const controls = new function () {

        this.segments = 12;
        this.phiStart = 0;
        this.phiLength = 2 * Math.PI;

        this.redraw = (_ => {
            scene.remove(spGroup);
            scene.remove(latheMesh);
            generatePoints(controls.segments, controls.phiStart, controls.phiLength);
        });
    };

    generatePoints(controls.segments, controls.phiStart, controls.phiLength);

    const gui = new dat.GUI();
    gui.add(controls, 'segments', 0, 50).step(1).onChange(controls.redraw);
    gui.add(controls, 'phiStart', 0, 2 * Math.PI).onChange(controls.redraw);
    gui.add(controls, 'phiLength', 0, 2 * Math.PI).onChange(controls.redraw);

    const renderScene = () => {
        stats.update();


        spGroup.rotation.y = step;
        step += 0.01;
        latheMesh.rotation.y = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function generatePoints(segments, phiStart, phiLength) {
        const points = [];
        const height = 5;
        const count = 30;
        for (let i = 0; i < count; i++) {
            points.push(new THREE.Vector2((Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12, ( i - count ) + count / 2));
        }

        spGroup = new THREE.Group();
        spGroup.rotation.y = -Math.PI / 2;
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, transparent: false
        });
        points.forEach(point => {
            const spGeom = new THREE.SphereGeometry(0.2);
            const spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.set(point.x, point.y, 0);
            spGroup.add(spMesh);
        })
        scene.add(spGroup);

        const latheGeometry = new THREE.LatheGeometry(points, segments, phiStart, phiLength);
        latheMesh = createMesh(latheGeometry);
        scene.add(latheMesh);
    }

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
