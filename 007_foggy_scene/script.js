function init() {
    const stats = initStats();

    const scene = new THREE.Scene();
    // scene.for = new THREE.FogExp2(0xffffff, 0.015);
    scene.fog = new THREE.Fog(0xffffff, 0.015, 100);

    const camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, -5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;

        this.removeCube = () => {
            let allChildren = scene.children;
            let lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };

        this.addCube = () => {
            let cubeSize = Math.ceil(Math.random() * 3);
            let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            let cubeMaterial = new THREE.MeshLambertMaterial({
                color: Math.random() * 0xffffff
            });
            let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;
            cube.name = "cube-" + scene.children.length;

            cube.position.x = -30 + Math.round(Math.random() * planeGeometry.parameters.width);
            cube.position.y = Math.round(Math.random() * 5);
            cube.position.z = -20 + Math.round(Math.random() * planeGeometry.parameters.height);

            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };

        this.outputObjects = () => {
            console.log(scene.children);
            // console.log(scene.getObjectByName("cube-8"));
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'outputObjects');
    gui.add(controls, 'numberOfObjects').listen();

    const renderScene = () => {
        stats.update();

        scene.traverse(obj => {
            if (obj instanceof THREE.Mesh && obj != plane) {
                obj.rotation.x += controls.rotationSpeed;
                obj.rotation.y += controls.rotationSpeed;
                obj.rotation.z += controls.rotationSpeed;
            }
        });

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

window.onload = init;
