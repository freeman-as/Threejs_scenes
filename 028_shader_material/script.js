let scene, camera, renderer;

function init() {
    vertexShader = document.getElementById('vertex-shader').textContent
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const cubeGeometry = new THREE.BoxGeometry(20, 20, 20);

    const meshMaterial1 = createMaterial("vertex-shader", "fragment-shader-1");
    const meshMaterial2 = createMaterial("vertex-shader", "fragment-shader-2");
    const meshMaterial3 = createMaterial("vertex-shader", "fragment-shader-3");
    const meshMaterial4 = createMaterial("vertex-shader", "fragment-shader-4");
    const meshMaterial5 = createMaterial("vertex-shader", "fragment-shader-5");
    const meshMaterial6 = createMaterial("vertex-shader", "fragment-shader-6");

    const materials = [
            meshMaterial1,
            meshMaterial2,
            meshMaterial3,
            meshMaterial4,
            meshMaterial5,
            meshMaterial6
    ];

    const cube = new THREE.Mesh(cubeGeometry, materials);
    scene.add(cube);

    camera.position.set(30, 30, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const renderScene = () => {
        stats.update();

        step += 0.01;
        cube.rotation.set(step, step, step);

        cube.material.forEach(function(e) {
            e.uniforms.time.value += 0.01;
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

    function createMaterial(vertexShader, fragmentShader) {
        const vertShader = document.getElementById(vertexShader).textContent;
        const fragShader = document.getElementById(fragmentShader).textContent;

        const uniforms = {
            time: {type: 'f', value: 0.2},
            scale: {type: 'f', value: 0.2},
            alpha: {type: 'f', value: 0.6},
            resolution: {type: "v2", value: new THREE.Vector2()}
        };

        uniforms.resolution.value.x = window.innerWidth;
        uniforms.resolution.value.y = window.innerHeight;

        const meshMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertShader,
            fragmentShader: fragShader,
            transparent: true
        });

        return meshMaterial;
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
