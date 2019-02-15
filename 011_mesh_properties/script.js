let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45, window.innerWidth / window.innerHeight, 0.1, 1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    const planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
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
    spotLight.position.set(-20, 30, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.positionX = 0;
        this.positionY = 4;
        this.positionZ = 0;

        this.rotationX = 0;
        this.rotationY = 0;
        this.rotationZ = 0;
        this.scale = 1;

        this.translateX = 0;
        this.translateY = 0;
        this.translateZ = 0;

        this.visible = true;

        this.translate = _ => {
            cube.translateX(controls.translateX);
            cube.translateY(controls.translateY);
            cube.translateZ(controls.translateZ);

            controls.positionX = cube.position.x;
            controls.positionY = cube.position.y;
            controls.positionZ = cube.position.z;
        };
    };

    const material = new THREE.MeshLambertMaterial({ color: 0x44ff44 });
    const geos = new THREE.BoxGeometry(5, 8, 3);
    const cube = new THREE.Mesh(geos, material);
    cube.position.y = 4;
    cube.castShadow = true;
    scene.add(cube);

    const gui = new dat.GUI();

    guiScale = gui.addFolder('scale');
    guiScale.add(controls, 'scaleX', 0, 5);
    guiScale.add(controls, 'scaleY', 0, 5);
    guiScale.add(controls, 'scaleZ', 0, 5);
    
    guiPositon = gui.addFolder('position');
    const contX = guiPositon.add(controls, 'positionX', -10, 10);
    const contY = guiPositon.add(controls, 'positionY', -4, 20);
    const contZ = guiPositon.add(controls, 'positionZ', -10, 10);
    
    contX.listen();
    contX.onChange(value => cube.position.x = controls.positionX);

    contY.listen();
    contY.onChange(value => cube.position.y = controls.positionY);

    contZ.listen();
    contZ.onChange(value => cube.position.z = controls.positionZ);

    guiRotation = gui.addFolder('rotation');
    guiRotation.add(controls, 'rotationX', -4, 4);
    guiRotation.add(controls, 'rotationY', -4, 4);
    guiRotation.add(controls, 'rotationZ', -4, 4);

    guiTranslate = gui.addFolder('translate');
    guiTranslate.add(controls, 'translateX', -10, 10);
    guiTranslate.add(controls, 'translateY', -10, 10);
    guiTranslate.add(controls, 'translateZ', -10, 10);
    guiTranslate.add(controls, 'translate');

    gui.add(controls, 'visible');

    const renderScene = () => {
        stats.update();

        cube.visible = controls.visible;

        cube.rotation.x = controls.rotationX;
        cube.rotation.y = controls.rotationY;
        cube.rotation.z = controls.rotationZ;

        cube.scale.set(controls.scaleX, controls.scaleY, controls.scaleZ);

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
