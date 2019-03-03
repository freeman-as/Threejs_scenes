let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(30, 30, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    const ground = new THREE.PlaneGeometry(100, 100, 50, 50);
    const groundMat = new THREE.MeshBasicMaterial({ wireframe: true, overdraw: true, color: 0x000000 });
    const transparentMat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 });
    const groundMesh = new THREE.SceneUtils.createMultiMaterialObject(ground, [groundMat, transparentMat]);
    groundMesh.rotation.x = -0.5 * Math.PI;
    scene.add(groundMesh);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0.03;

    let sphere;
    let cube;
    let group;
    let bboxMesh;

    const controls = new function () {
        this.cubePosX = 0;
        this.cubePosY = 3;
        this.cubePosZ = 10;

        this.spherePosX = 10;
        this.spherePosY = 5;
        this.spherePosZ = 0;

        this.groupPosX = 10;
        this.groupPosY = 5;
        this.groupPosZ = 0;

        this.grouping = false;
        this.rotate = false;

        this.groupScale = 1;
        this.cubeScale = 1;
        this.sphereScale = 1;

        this.redraw = () => {
            scene.remove(group);

            sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
            cube = createMesh(new THREE.BoxGeometry(6, 6, 6));

            sphere.position.set(controls.spherePosX, controls.spherePosY, controls.spherePosZ);
            cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ);

            group = new THREE.Group();
            group.add(sphere);
            group.add(cube);
            scene.add(group);
            controls.positionBoundingBox();

            const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), group.position, 10, 0x0000ff);
            scene.add(arrow);
        };

        this.positionBoundingBox = () => {
            scene.remove(bboxMesh);
            const box = setFromObject(group);
            const width = box.max.x - box.min.x;
            const height = box.max.y - box.min.y;
            const depth = box.max.z - box.min.z;

            const bbox = new THREE.BoxGeometry(width, height, depth);
            bboxMesh = new THREE.Mesh(bbox, new THREE.MeshBasicMaterial({
                color: 0x000000,
                vertexColors: THREE.VertexColors,
                wireframeLinewidth: 2,
                wireframe: true
            }));
            // BBOXの描画
            // scene.add(bboxMesh);

            bboxMesh.position.x = ((box.min.x + box.max.x) / 2);
            bboxMesh.position.y = ((box.min.y + box.max.y) / 2);
            bboxMesh.position.z = ((box.min.z + box.max.z) / 2);
        }
    };

    const gui = new dat.GUI();
    const sphereFolder = gui.addFolder("sphere");
    sphereFolder.add(controls, "spherePosX", -20, 20).onChange(e => {
        sphere.position.x = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "spherePosZ", -20, 20).onChange(e => {
        sphere.position.z = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "spherePosY", -20, 20).onChange(e => {
        sphere.position.y = e;
        controls.positionBoundingBox()
    });
    sphereFolder.add(controls, "sphereScale", 0, 3).onChange(e => {
        sphere.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    const cubeFolder = gui.addFolder("cube");
    cubeFolder.add(controls, "cubePosX", -20, 20).onChange(e => {
        cube.position.x = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubePosZ", -20, 20).onChange(e => {
        cube.position.z = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubePosY", -20, 20).onChange(e => {
        cube.position.y = e;
        controls.positionBoundingBox()
    });
    cubeFolder.add(controls, "cubeScale", 0, 3).onChange(e => {
        cube.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    const groupFolder = gui.addFolder("group");
    groupFolder.add(controls, "groupPosX", -20, 20).onChange(e => {
        group.position.x = e;
        controls.positionBoundingBox()
    });
    groupFolder.add(controls, "groupPosZ", -20, 20).onChange(e => {
        group.position.z = e;
        controls.positionBoundingBox()
    });
    groupFolder.add(controls, "groupPosY", -20, 20).onChange(e => {
        group.position.y = e;
        controls.positionBoundingBox()
    });
    groupFolder.add(controls, "groupScale", 0, 3).onChange(e => {
        group.scale.set(e, e, e);
        controls.positionBoundingBox()
    });

    gui.add(controls, "grouping");
    gui.add(controls, "rotate");
    controls.redraw();

    const renderScene = () => {
        stats.update();

        if (controls.grouping && controls.rotate) {
            group.rotation.y += step;
        }

        if (controls.rotate && !controls.grouping) {
            sphere.rotation.y += step;
            cube.rotation.y += step;
        }

        // 描画しているBBOXの更新
        // controls.positionBoundingBox();

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireframeMat = new THREE.MeshBasicMaterial();
        wireframeMat.wireframe = true;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireframeMat]);
        return mesh;
    }

    // http://jsfiddle.net/MREL4/
    function setFromObject(object) {
        const box = new THREE.Box3();
        const v1 = new THREE.Vector3();
        object.updateMatrixWorld(true);
        box.makeEmpty();
        object.traverse(node => {
            if (node.geometry !== undefined && node.geometry.vertices !== undefined) {
                const vertices = node.geometry.vertices;
                for (let i = 0, il = vertices.length; i < il; i++) {
                    v1.copy(vertices[i]);
                    v1.applyMatrix4(node.matrixWorld);
                    box.expandByPoint(v1);
                }
            }
        });
        return box;
    }

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
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);