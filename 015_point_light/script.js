let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 20, 20);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff7777 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    cube.position.set(-4, 3, 0);
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const speherMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, speherMaterial);
    sphere.castShadow = true;

    sphere.position.set(20, 0, 2);
    scene.add(sphere);

    camera.position.set(-25, 30, 25);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const ambiColor = "#0c0c0c"
    const ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    // scene.add(spotLight);

    const pointColor = "#ccffcc";
    const pointLight = new THREE.PointLight(pointColor);
    pointLight.distance = 100;
    scene.add(pointLight);

    const sphereLight = new THREE.SphereGeometry(0.2);
    const sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;

    sphereLightMesh.position.set(3, 0, 3);
    scene.add(sphereLightMesh);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    let invert = 1;
    let phase = 0;

    const controls = new function () {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = pointColor;
        this.intensity = 1;
        this.distance = 100;
        this.decay = 1;
    };

    const gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(e => {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'pointColor').onChange(e => {
        pointLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'intensity', 0, 3).onChange(e => {
        pointLight.intensity = e;
    });
    gui.add(controls, 'distance', 0, 100).onChange(e => {
        pointLight.distance = e;
    })
    gui.add(controls, 'decay', 1, 100).onChange(e => {
        pointLight.decay = e;
    })
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    const renderScene = () => {
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * Math.cos(step));
        sphere.position.y = sphere.geometry.parameters.radius/2 + (10 * Math.abs(Math.sin(step)));

        if (phase > 2 * Math.PI) {
            invert = -invert;
            phase -= 2 * Math.PI;
        } else {
            phase += controls.rotationSpeed;
        }
        sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
        sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
        sphereLightMesh.position.y = 5;

        if (invert < 0) {
            const pivot = 14;
            sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
        }

        pointLight.position.copy(sphereLightMesh.position);

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
