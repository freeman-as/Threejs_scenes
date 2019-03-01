let scene, camera, webGLRenderer;
let fonts = {};

function loadFonts() {
    const fontLoader = new THREE.FontLoader();
    fontLoader.load(
        "../assets/fonts/helvetiker_regular.typeface.json",
        (helvetiker) => {
            fonts['helvetiker'] = helvetiker;
            fontLoader.load("../assets/fonts/optimer_regular.typeface.json",
            (optimer) => {
                fonts['optimer'] = optimer;
                init();
            });
        }
    );
}

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(100, 300, 600);
    camera.lookAt(new THREE.Vector3(400, 0, -300));

    const dirLight = new THREE.DirectionalLight();
    dirLight.position.set(25, 23, 15);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight();
    dirLight2.position.set(-25, 23, 15);
    scene.add(dirLight2);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    let text1;
    let text2;

    const controls = new function () {

        this.size = 90;
        this.height = 90;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelEnabled = true;
        this.bevelSegments = 3;
        this.bevelEnabled = true;
        this.curveSegments = 12;
        this.steps = 1;
        this.font = "helvetiker";
        this.weight = "normal";
        // this.style = "italics";

        this.asGeom = function () {
            scene.remove(text1);
            scene.remove(text2);

            const options = {
                size: controls.size,
                height: controls.height,
                weight: controls.weight,
                font: fonts[controls.font],
                bevelThickness: controls.bevelThickness,
                bevelSize: controls.bevelSize,
                bevelSegments: controls.bevelSegments,
                bevelEnabled: controls.bevelEnabled,
                curveSegments: controls.curveSegments,
                steps: controls.steps
            };

            text1 = createMesh(new THREE.TextGeometry("Learning", options));
            text1.position.z = -100;
            text1.position.y = 100;
            scene.add(text1);

            text2 = createMesh(new THREE.TextGeometry("Three.js", options));
            scene.add(text2);
        };
    };

    controls.asGeom();

    const gui = new dat.GUI();
    gui.add(controls, 'size', 0, 200).onChange(controls.asGeom);
    gui.add(controls, 'height', 0, 200).onChange(controls.asGeom);
    gui.add(controls, 'font', ['optimer', 'helvetiker']).onChange(controls.asGeom);
    gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
    gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.asGeom);
    
    const renderScene = () => {
        stats.update();
        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshPhongMaterial({
            specular: 0xffffff,
            color: 0xff6666,
            shininess: 100
        });

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

window.onload = loadFonts;

window.addEventListener('resize', onResize, false);
