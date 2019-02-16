let scene, camera, renderer;

function init() {

    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(600, 200, 20, 20);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, -5, 0);
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff3333 });
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

    camera.position.set(-35, 30, 25);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const ambiColor = "#1c1c1c"
    const ambientLight = new THREE.AmbientLight(ambiColor);
    scene.add(ambientLight);

    const target = new THREE.Object3D();
    target.position.set(5, 0, 0);

    const pointColor = "#ff5808";
    const directionalLight = new THREE.DirectionalLight(pointColor);
    directionalLight.position.set(-40, 60, -10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 2;
    directionalLight.shadow.camera.far = 200;
    directionalLight.shadow.left = -50;
    directionalLight.shadow.right = 50;
    directionalLight.shadow.top = 50;
    directionalLight.shadow.bottom = -50;

    directionalLight.distance = 0;
    directionalLight.intensity = 0.5;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;
    scene.add(directionalLight);

    const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
    cameraHelper.visible = false;
    scene.add(cameraHelper);

    const sphereLight = new THREE.SphereGeometry(0.2);
    const sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
    const sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;

    sphereLightMesh.position.set(3, 20, 3);
    scene.add(sphereLightMesh);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = pointColor;
        this.intensity = 0.5;
        this.distance = 0;
        this.debug = false;
        this.castShadow = true;
        this.target = "Plane";
    };

    const gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(e => {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'pointColor').onChange(e => {
        directionalLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'intensity', 0, 5).onChange(e => {
        directionalLight.intensity = e;
    });
    gui.add(controls, 'distance', 0, 200).onChange(e => {
        directionalLight.distance = e;
    })
    gui.add(controls, 'debug').onChange(e => {
        cameraHelper.visible = e;
    })
    gui.add(controls, 'castShadow').onChange(e => {
        directionalLight.castShadow = e;
    })
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(e => {
        console.log(e);
        switch (e) {
            case "Plane":
                directionalLight.target = plane;
                break;
            case "Sphere":
                directionalLight.target = sphere;
                break;
            case "Cube":
                directionalLight.target = cube;
                break;
        }       
    });

    const renderScene = () => {
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * Math.cos(step));
        sphere.position.y = sphere.geometry.parameters.radius/2 + (10 * Math.abs(Math.sin(step)));

        sphereLightMesh.position.z = -8;
        sphereLightMesh.position.x = +(27 * (Math.sin(step / 3)));
        sphereLightMesh.position.y = 10 + (26 * (Math.cos(step / 3)));
    
        directionalLight.position.copy(sphereLightMesh.position);    

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
