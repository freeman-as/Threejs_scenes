let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();
    scene.overrideMaterial = new THREE.MeshDepthMaterial();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 30, 170);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.set(-50, 40, 50);
    camera.lookAt(scene.position);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    const controls = new function () {
        this.cameraNear = camera.near;
        this.cameraFar = camera.far;
        this.rotationSpeed = 0.02;
        this.numberOfObjects = scene.children.length;

        this.removeCube = _ => {
            const allChildren = scene.children;
            const lastObject = allChildren[allChildren.length - 1];
            if (lastObject instanceof THREE.Mesh) {
                scene.remove(lastObject);
                this.numberOfObjects = scene.children.length;
            }
        };

        this.addCube = _ => {
            const cubeSize = Math.ceil(3 + (Math.random() * 3));
            const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            let cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
            cubeMaterial = new THREE.MeshDepthMaterial();
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.castShadow = true;

            cube.position.x = -60 + Math.round((Math.random() * 100));
            cube.position.y = Math.round((Math.random() * 10));
            cube.position.z = -100 + Math.round((Math.random() * 150));

            scene.add(cube);
            this.numberOfObjects = scene.children.length;
        };

        this.outputObjects = _ => {
            console.log(this.numberOfObjects);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'addCube');
    gui.add(controls, 'removeCube');
    gui.add(controls, 'cameraNear', 0, 50).onChange(e => {
        camera.near = e;
        camera.updateProjectionMatrix();
    });
    gui.add(controls, 'cameraFar', 100, 300).onChange(e => {
        camera.far = e;
        camera.updateProjectionMatrix();
    });
    gui.add(controls, 'outputObjects');

    let i = 0;
    while (i < 10) {
        controls.addCube();
        i++;
    }

    const renderScene = () => {
        stats.update();

        scene.traverse(e => {
            if (e instanceof THREE.Mesh) {
                e.rotation.x += controls.rotationSpeed;
                e.rotation.y += controls.rotationSpeed;
                e.rotation.z += controls.rotationSpeed;
            }
        })

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
