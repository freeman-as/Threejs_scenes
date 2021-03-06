let scene, camera, renderer;

function init() {
    let stopMovingLight = false;

    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
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

    const spotLight0 = new THREE.SpotLight(0xcccccc);
    spotLight0.position.set(-40, 30, -10);
    spotLight0.lookAt(plane);
    scene.add(spotLight0);

    const target = new THREE.Object3D();
    target.position.set(5, 0, 0);

    const pointColor = "#ffffff";
    const spotLight = new THREE.SpotLight(pointColor);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    spotLight.shadow.camera.near = 2;
    spotLight.shadow.camera.far = 200;
    spotLight.shadow.camera.fov = 30;
    spotLight.target = plane;
    spotLight.decay = 1;
    spotLight.distance = 0;
    spotLight.angle = 0.4;
    scene.add(spotLight);

    const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
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

    let invert = 1;
    let phase = 0;

    const controls = new function () {
        this.rotationSpeed = 0.03;
        this.bouncingSpeed = 0.03;
        this.ambientColor = ambiColor;
        this.pointColor = pointColor;
        this.intensity = 1;
        this.decay = 1;
        this.distance = 0;
        this.penumbra = 30;
        this.angle = 0.1;
        this.debug = false;
        this.castShadow = true;
        this.target = "Plane";
        this.stopMovingLight = false;
    };

    const gui = new dat.GUI();
    gui.addColor(controls, 'ambientColor').onChange(e => {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'pointColor').onChange(e => {
        spotLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'angle', 0, Math.PI * 2).onChange(e => {
        spotLight.angle = e;
    });
    gui.add(controls, 'intensity', 0, 5).onChange(e => {
        spotLight.intensity = e;
    });
    gui.add(controls, 'decay', 1, 100).onChange(e => {
        spotLight.decay = e;
    })
    gui.add(controls, 'distance', 0, 200).onChange(e => {
        spotLight.distance = e;
    })
    gui.add(controls, 'penumbra', 0, 100).onChange(e => {
        spotLight.penumbra = e;
    })
    gui.add(controls, 'debug').onChange(e => {
        cameraHelper.visible = e;
    })
    gui.add(controls, 'castShadow').onChange(e => {
        spotLight.castShadow = e;
    })
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    gui.add(controls, 'target', ['Plane', 'Sphere', 'Cube']).onChange(e => {
        console.log(e);
        switch (e) {
            case "Plane":
                spotLight.target = plane;
                break;
            case "Sphere":
                spotLight.target = sphere;
                break;
            case "Cube":
                spotLight.target = cube;
                break;
        }       
    });

    gui.add(controls, 'stopMovingLight').onChange(e => {
        stopMovingLight = e;
    })

    const renderScene = () => {
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * Math.cos(step));
        sphere.position.y = sphere.geometry.parameters.radius/2 + (10 * Math.abs(Math.sin(step)));

        if (!stopMovingLight) {
            if (phase > 2 * Math.PI) {
                invert = -invert;
                phase -= 2 * Math.PI;
            } else {
                phase += controls.rotationSpeed;
            }

            sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
            sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
            sphereLightMesh.position.y = 10;
    
            if (invert < 0) {
                const pivot = 14;
                sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
            }
    
            spotLight.position.copy(sphereLightMesh.position);    
        }

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
