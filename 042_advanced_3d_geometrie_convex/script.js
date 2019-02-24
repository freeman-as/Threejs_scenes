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
    let hullMesh;

    generatePoints();

    const controls = new function () {

        this.redraw = (_ => {
            scene.remove(spGroup);
            scene.remove(hullMesh);
            generatePoints();
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'redraw');

    const renderScene = () => {
        stats.update();


        spGroup.rotation.y = step;
        step += 0.01;
        hullMesh.rotation.y = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function generatePoints() {
        const points = [];
        for (let i = 0; i < 20; i++) {
            const randomX = -15 + Math.round(Math.random() * 30);
            const randomY = -15 + Math.round(Math.random() * 30);
            const randomZ = -15 + Math.round(Math.random() * 30);

            points.push(new THREE.Vector3(randomX, randomY, randomZ));
        }

        spGroup = new THREE.Group();
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, transparent: false
        });
        points.forEach(point => {
            const spGeom = new THREE.SphereGeometry(0.2);
            const spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.copy(point);
            spGroup.add(spMesh);
        })
        scene.add(spGroup);

        const hullGeometry = new THREE.ConvexGeometry(points);
        hullMesh = createMesh(hullGeometry);
        scene.add(hullMesh);
    }

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00, transparent: true, opacity: 0.2
        });
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
