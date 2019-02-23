let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    let shape = createMesh(new THREE.ShapeGeometry(drawShape()));
    scene.add(shape);

    camera.position.set(-30, 70, 70);
    camera.lookAt(new THREE.Vector3(10, 0, 0));

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const controls = new function () {
        this.asGeom = (_ => {
            scene.remove(shape);
            shape = createMesh(new THREE.ShapeGeometry(drawShape()));
            scene.add(shape);
        });

        this.asPoints = (_ => {
            scene.remove(shape);
            shape = createLine(drawShape(), false);
            scene.add(shape);
        });

        this.asSpacedPoints = (_ => {
            scene.remove(shape);
            shape = createLine(drawShape(), true);
            scene.add(shape);
        });
    };

    const gui = new dat.GUI();
    gui.add(controls, 'asGeom');
    gui.add(controls, 'asPoints');
    gui.add(controls, 'asSpacedPoints');

    const renderScene = () => {
        stats.update();

        step += 0.01;
        shape.rotation.y = step;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
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
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireframeMat = new THREE.MeshBasicMaterial();
        wireframeMat.wireframe = true;

        const mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireframeMat]);

        return mesh;
    }

    function createLine(shape, spaced) {
        console.log(shape);
        if (!spaced) {
            const mesh = new THREE.Line(
                shape.createPointsGeometry(10),
                new THREE.LineBasicMaterial({
                    color: 0xff3333,
                    linewidth: 2
                })
            );
            return mesh;
        } else {
            const mesh = new THREE.Line(
                shape.createSpacedPointsGeometry(3),
                new THREE.LineBasicMaterial({
                    color: 0xff3333,
                    linewidth: 2
                })
            );
            return mesh;
        }
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
