let scene, camera, renderer;

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
    let tubeMesh;

    const controls = new function () {

        this.numberOfPoints = 5;
        this.segments = 64;
        this.radius = 1;
        this.radiusSegments = 8;
        this.closed = false;
        this.taper = 'no taper';
        this.points = [];

        this.newPoints = (_ => {
            points = [];
            for (let i = 0; i < controls.numberOfPoints; i++) {
                const randomX = -20 + Math.round(Math.random() * 50);
                const randomY = -15 + Math.round(Math.random() * 40);
                const randomZ = -20 + Math.round(Math.random() * 40);

                points.push(new THREE.Vector3(randomX, randomY, randomZ));
            }
            controls.points = points;
            controls.redraw();
        });

        this.redraw = (_ => {
            const taper = controls.taper === 'sinusoidal' ? THREE.TubeGeometry.SinusoidalTaper : THREE.TubeGeometry.NoTaper;
            scene.remove(spGroup);
            scene.remove(tubeMesh);
            generatePoints(controls.points, controls.segments, controls.radius, controls.radiusSegments, controls.closed, taper);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'newPoints');
    gui.add(controls, 'numberOfPoints', 2, 15).step(1).onChange(controls.newPoints);
    gui.add(controls, 'segments', 0, 200).step(1).onChange(controls.redraw);
    gui.add(controls, 'radius', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'radiusSegments', 0, 100).step(1).onChange(controls.redraw);
    gui.add(controls, 'closed').onChange(controls.redraw);
    gui.add(controls, 'taper', ['no taper', 'sinusoidal']).onChange(controls.redraw);

    controls.newPoints();

    const renderScene = () => {
        stats.update();

        spGroup.rotation.y = step;
        step += 0.01;
        tubeMesh.rotation.y = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();


    function generatePoints(points, segments, radius, radiusSegments, closed, taper) {
        spGroup = new THREE.Object3D();
        const material = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: false});
        points.forEach(function (point) {

            const spGeom = new THREE.SphereGeometry(0.2);
            const spMesh = new THREE.Mesh(spGeom, material);
            spMesh.position.copy(point);
            spGroup.add(spMesh);
        });
        scene.add(spGroup);

        const tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, radiusSegments, closed, taper);
        tubeMesh = createMesh(tubeGeometry);
        scene.add(tubeMesh);
    }

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff00, transparent: true, opacity: 0.2
        });

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
