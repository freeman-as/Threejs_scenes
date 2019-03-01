let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(-30, 50, 50);
    camera.lookAt(new THREE.Vector3(10, -20, 0));

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set(-20, 250, -50);
    dirLight.target.position.x = 30;
    dirLight.target.position.y = -40;
    dirLight.target.position.z = -20;
    dirLight.intensity = 0.3;
    scene.add(dirLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    let parametricMesh;

    const controls = new function () {

        this.func = 'radialWave';
        this.slices = 120;
        this.stacks = 120;

        this.redraw = (_ => {
            scene.remove(parametricMesh);
            let func;
            if (controls.func === 'radialWave') {
                func = radialWave;
            }
            else {
                func = klein;
            }
            parametricMesh = createMesh(new THREE.ParametricGeometry(func, controls.slices, controls.stacks, true));

            scene.add(parametricMesh);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'func', ['klein', 'radialWave']).onChange(controls.redraw);
    gui.add(controls, 'slices', 10, 200).step(5).onChange(controls.redraw);
    gui.add(controls, 'stacks', 10, 200).step(5).onChange(controls.redraw);

    klein = ((u, v, target) => {
        u *= Math.PI;
        v *= 2 * Math.PI;

        u = u * 2;
        let x, y, z;
        if (u < Math.PI) {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
            z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
        } else {
            x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
            z = -8 * Math.sin(u);
        }

        y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

        target.set( x, y, z );
        // return new THREE.Vector3(x, y, z);
    });

    radialWave = ((u, v, target) => {
        const r = 50;

        const x = Math.sin(u) * r;
        const z = Math.sin(v / 2) * 2 * r;
        const y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;

        target.set( x, y, z );
        // return new THREE.Vector3(x, y, z);
    });

    controls.redraw();

    const renderScene = () => {
        stats.update();

        step += 0.01;
        parametricMesh.rotation.y = step;
        parametricMesh.rotation.x = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-25, 0, -25));

        const meshMaterial = new THREE.MeshPhongMaterial({
            specular: 0xaaaaff,
            color: 0x33999ff,
            shininess: 40
        });
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
