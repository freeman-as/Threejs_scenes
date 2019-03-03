let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(-30, 40, 50);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;
    let knot;

    const controls = new function () {
        this.radius = 13;
        this.tube = 1.7;
        this.radialSegments = 156;
        this.tubularSegments = 12;
        this.p = 5;
        this.q = 4;
        this.asParticles = false;
        this.rotate = false;

        this.redraw = () => {
            if (knot) scene.remove(knot);
            const geom = new THREE.TorusKnotGeometry(controls.radius, controls.tube, Math.round(controls.radialSegments), Math.round(controls.tubularSegments), Math.round(controls.p), Math.round(controls.q));

            if (controls.asParticles) {
                knot = createPoints(geom);
            } else {
                knot = createMesh(geom);
            }

            scene.add(knot);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'radius', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'tube', 0, 40).onChange(controls.redraw);
    gui.add(controls, 'radialSegments', 0, 400).step(1).onChange(controls.redraw);
    gui.add(controls, 'tubularSegments', 1, 20).step(1).onChange(controls.redraw);
    gui.add(controls, 'p', 1, 10).step(1).onChange(controls.redraw);
    gui.add(controls, 'q', 1, 15).step(1).onChange(controls.redraw);
    gui.add(controls, 'asParticles').onChange(controls.redraw);
    gui.add(controls, 'rotate').onChange(controls.redraw);
    controls.redraw();

    const renderScene = () => {
        stats.update();

        step += 0.01;
        if (controls.rotate) {
            knot.rotation.y = step;
        }

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    renderScene();

    function generateSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    function createPoints(geom) {
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending,
            map: generateSprite(),
            depthWrite: false
        });

        const cloud = new THREE.Points(geom, material);
        cloud.sortParticles = true;
        return cloud;
    }

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
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
