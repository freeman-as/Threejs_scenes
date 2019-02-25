let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    let shape = createMesh(new THREE.ShapeGeometry(drawShape()));
    scene.add(shape);

    camera.position.set(-20, 60, 60);
    camera.lookAt(new THREE.Vector3(20, 20, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    const controls = new function () {

        this.depth = 2;
        this.bevelThickness = 2;
        this.bevelSize = 0.5;
        this.bevelSegments = 3;
        this.bevelEnabled = true;
        this.curveSegments = 12;
        this.steps = 1;

        this.asGeom = (_ => {
            scene.remove(shape);

            const options = {
                depth: controls.depth,
                bevelThickness: controls.bevelThickness,
                bevelSize: controls.bevelSize,
                bevelSegments: controls.bevelSegments,
                bevelEnabled: controls.bevelEnabled,
                curveSegments: controls.curveSegments,
                steps: controls.steps
            }

            shape = createMesh(new THREE.ExtrudeGeometry(drawShape(), options));
            scene.add(shape);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'depth', 0, 20).onChange(controls.asGeom);
    gui.add(controls, 'bevelThickness', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSize', 0, 10).onChange(controls.asGeom);
    gui.add(controls, 'bevelSegments', 0, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'bevelEnabled').onChange(controls.asGeom);
    gui.add(controls, 'curveSegments', 1, 30).step(1).onChange(controls.asGeom);
    gui.add(controls, 'steps', 1, 5).step(1).onChange(controls.asGeom);

    controls.asGeom();

    const renderScene = () => {
        stats.update();

        step += 0.01;
        shape.rotation.y = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function drawShape() {
        const shape = new THREE.Shape();
        // 開始点
        shape.moveTo(10, 10);
        // 上方向に直線を描画
        shape.lineTo(10, 40);
        // 右曲がりの曲線を描画
        shape.bezierCurveTo(15, 25, 25, 25, 30, 40);
        // 下方向にスプライン曲線を描画
        shape.splineThru(
                [new THREE.Vector2(32, 30),
                    new THREE.Vector2(28, 20),
                    new THREE.Vector2(30, 10),
                ]);
        // 下側の曲線を描画
        shape.quadraticCurveTo(20, 15, 10, 10);
        // 目1を追加
        const hole1 = new THREE.Path();
        hole1.absellipse(16, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole1);
        // 目2を追加
        const hole2 = new THREE.Path();
        hole2.absellipse(23, 24, 2, 3, 0, Math.PI * 2, true);
        shape.holes.push(hole2);
        // 口を追加
        const hole3 = new THREE.Path();
        hole3.absarc(20, 16, 2, 0, Math.PI, true);
        shape.holes.push(hole3);

        return shape;
    }

    function createMesh(geom) {
        geom.applyMatrix(new THREE.Matrix4().makeTranslation(-20, 0, 0));

        const meshMaterial = new THREE.MeshNormalMaterial({
            transparent: true, opacity: 0.7
        });

        const wireframeMat = new THREE.MeshBasicMaterial();
        wireframeMat.wireframe = true;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireframeMat]);

        return mesh;
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
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
