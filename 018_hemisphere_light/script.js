let scene, camera, renderer;

function init() {

    const stats = initStats();

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xaaaaaa, 0.010, 200);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xaaaaff));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const textureLoader = new THREE.TextureLoader();
    const textureGrass = textureLoader.load("../assets/textures/grasslight-big.jpg");
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(4, 4);

    const planeGeometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({ map: textureGrass });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;

    cube.position.set(-4, 3, 0);
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 25, 25);
    const speherMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, speherMaterial);
    sphere.castShadow = true;

    sphere.position.set(10, 5, 10);
    scene.add(sphere);

    camera.position.set(-20, 15, 45);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const spotLight0 = new THREE.SpotLight(0xcccccc);
    spotLight0.position.set(-40, 60, -10);
    spotLight0.lookAt(plane);
    scene.add(spotLight0);

    const target = new THREE.Object3D();
    target.position.set(5, 0, 0);

    const hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    const pointColor = "#ffffff";
    const dirLight = new THREE.DirectionalLight(pointColor);
    dirLight.position.set(30, 10, -50);
    dirLight.castShadow = true;
    dirLight.target = plane;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 200;
    dirLight.shadow.camera.left = -50;
    dirLight.shadow.camera.right = 50;
    dirLight.shadow.camera.top = 50;
    dirLight.shadow.camera.bottom = -50;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.mapSize.width = 2048;
    scene.add(dirLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;

        this.hemisphere = true;
        this.color = 0x00ff00;
        this.skyColor = 0x0000ff;
        this.intensity = 0.6;
    };

    const gui = new dat.GUI();
    gui.add(controls, 'hemisphere').onChange(e => {
        if (!e) {
            hemiLight.intensity = 0;
        } else {
            hemiLight.intensity = controls.intensity;
        }
    })
    gui.addColor(controls, 'color').onChange(e => {
        hemiLight.groundColor = new THREE.Color(e);
    });
    gui.addColor(controls, 'skyColor').onChange(e => {
        hemiLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'intensity', 0, 5).onChange(e => {
        hemiLight.intensity = e;
    });
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
