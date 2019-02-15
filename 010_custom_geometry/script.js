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

    camera.position.x = -20;
    camera.position.y = 25;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(5, 0, 0));

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-20, 30, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];

    const faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4)
    ];

    const geoms = new THREE.Geometry();
    geoms.vertices = vertices;
    geoms.faces = faces;
    geoms.computeFaceNormals();

    const materials = [
        new THREE.MeshLambertMaterial({
            opacity: 0.6, color: 0x44ff44, transparent: true
        }),
        new THREE.MeshBasicMaterial({
            color: 0x000000, wireframe: true
        })
    ];

    const mesh = THREE.SceneUtils.createMultiMaterialObject(geoms, materials);
    mesh.children.forEach((e) => e.castShadow = true);
    
    scene.add(mesh);

    function addControl(x, y, z) {
        const controls = new function () {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        return controls;
    }

    // console.log(addControl(1, 1, 1));

    const controlPoints = [];
    vertices.forEach(v => {
        controlPoints.push(addControl(v.x, v.y, v.z));
    });
    // console.log(controlPoints)
    // controlPoints.push(addControl(1, 3, 1));
    // controlPoints.push(addControl(1, 3, -1));
    // controlPoints.push(addControl(1, -1, 1));
    // controlPoints.push(addControl(1, -1, -1));
    // controlPoints.push(addControl(-1, 3, -1));
    // controlPoints.push(addControl(-1, 3, 1));
    // controlPoints.push(addControl(-1, -1, -1));
    // controlPoints.push(addControl(-1, -1, 1));

    const gui = new dat.GUI();
    gui.add(new function () {
        this.clone = ( _ => {
            const cloneGeometry = mesh.children[0].geometry.clone();
            const materials = [
                new THREE.MeshLambertMaterial({
                    opacity: 0.6, color: 0xff44ff, transparent: true
                }),
                new THREE.MeshBasicMaterial({
                    color: 0x000000, wireframe: true
                })
            ];

            const mesh2 = THREE.SceneUtils.createMultiMaterialObject(cloneGeometry, materials);
            mesh2.children.forEach((e) => e.castShadow = true);

            // THREE.Group内で、複数メッシュが内部的に作られてるか確認用
            // console.dir(mesh2);

            mesh2.translateX(5);
            mesh2.translateZ(5);
            mesh2.name = 'clone';
            scene.remove(scene.getObjectByName('clone'));
            scene.add(mesh2);
        })
    }, 'clone');

    for (let i = 0; i < vertices.length; i++) {
        let f1 = gui.addFolder('Vertices ' + (i + 1));
        f1.add(controlPoints[i], 'x', -10, 10);
        f1.add(controlPoints[i], 'y', -10, 10);
        f1.add(controlPoints[i], 'z', -10, 10);
    }
    

    const renderScene = () => {
        stats.update();

        mesh.children.forEach((e) => {
            for (let i = 0; i < vertices.length; i++) {
                // 頂点座標を再設定
                e.geometry.vertices[i].set(
                    controlPoints[i].x,
                    controlPoints[i].y,
                    controlPoints[i].z
                );
            }
            // ジオメトリに頂点を更新するよう通知
            e.geometry.verticesNeedUpdate = true;
            // 面の法線を再計算
            e.geometry.computeFaceNormals();
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

// Resizeハンドラ
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
