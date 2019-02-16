let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    camera.position.set(120, 60, 180);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const planeGeometry = new THREE.PlaneGeometry(180, 180);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

    for (let j = 0; j < (planeGeometry.parameters.height / 5); j++) {
        for (let i = 0; i < (planeGeometry.parameters.width / 5); i++) {
            const rnd = Math.random() * 0.75 + 0.25;
            const cubeMaterial = new THREE.MeshBasicMaterial();
            cubeMaterial.color = new THREE.Color(rnd, 0, 0);
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

            cube.position.z = -((planeGeometry.parameters.height) / 2) + 2 + (j * 5);
            cube.position.x = -((planeGeometry.parameters.width) / 2) + 2 + (i * 5);
            cube.position.y = 2;

            scene.add(cube);
        }
    }

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(-20, 40, 60);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x292929);
    scene.add(ambientLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.perspective = "Perspective";
        this.switchCamera = _ => {
            if (camera instanceof THREE.PerspectiveCamera) {
                camera = new THREE.OrthographicCamera(window.innerWidth / -16, window.innerWidth / 16, window.innerHeight / 16, window.innerHeight / -16, -200, 500);
                camera.position.set(120, 60, 180);
                camera.lookAt(scene.position);
                this.perspective = "Orthographic";
            } else {
                camera = new THREE.PerspectiveCamera(45, window.innerWidth / innerHeight, 0.1, 1000);
                camera.position.set(120, 60, 180);
                camera.lookAt(scene.position);
                this.perspective = "Perspective";
            }
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'switchCamera');
    gui.add(controls, 'perspective').listen();

    camera.lookAt(scene.position);

    const renderScene = () => {
        stats.update();

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

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
