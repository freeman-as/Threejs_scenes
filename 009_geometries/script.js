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

    camera.position.x = -50;
    camera.position.y = 30;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(-10, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x090909);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-25, 25, 32);
    spotLight.castShadow = true;
    scene.add(spotLight);

    addGeometries(scene);
    
    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    function addGeometries(scene) {
        const geoms = [];
        geoms.push(new THREE.CylinderGeometry(1, 4, 4));
        geoms.push(new THREE.BoxGeometry(2, 2, 2));
        geoms.push(new THREE.SphereGeometry(2));
        geoms.push(new THREE.IcosahedronGeometry(4));

        const points = [
            new THREE.Vector3(2, 2, 2),
            new THREE.Vector3(2, 2, -2),
            new THREE.Vector3(-2, 2, -2),
            new THREE.Vector3(-2, 2, 2),
            new THREE.Vector3(2, -2, 2),
            new THREE.Vector3(2, -2, -2),
            new THREE.Vector3(-2, -2, -2),
            new THREE.Vector3(-2, -2, 2)
        ];
        geoms.push(new THREE.ConvexGeometry(points));

        let pts = [];
        const detail = .1;
        const radius = 3;
        for (let angle = 0.0; angle < Math.PI; angle += detail) {
            pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
        }
        geoms.push(new THREE.LatheGeometry(pts, 12));

        geoms.push(new THREE.OctahedronGeometry(3));

        geoms.push(new THREE.ParametricGeometry(THREE.ParametricGeometries.mobius3d, 20, 10));

        geoms.push(new THREE.TetrahedronGeometry(3));

        geoms.push(new THREE.TorusGeometry(3, 1, 10, 10));

        geoms.push(new THREE.TorusKnotGeometry(3, 0.5, 50, 20));

        let j = 0;
        for (let i = 0; i < geoms.length; i++) {
            const cubeMaterial = new THREE.MeshLambertMaterial({
                wireframe: true,
                color: Math.random() * 0xffffff
            });

            const materials = [
                new THREE.MeshPhongMaterial({
                    color: Math.random() * 0xffffff,
                    flatShading :  true
                }),
                new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    wireframe: true
                })
            ];

            const mesh = new THREE.SceneUtils.createMultiMaterialObject(geoms[i], materials);
            mesh.traverse((e) => e.castShadow = true);

            mesh.position.x = -24 + ((i % 4) * 12);
            mesh.position.y = 4;
            mesh.position.z = -8 + (j * 12);

            if ((i + 1) % 4 == 0) j++;
            scene.add(mesh);
        }
    }

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
