let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x999999));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    const sphere1 = createMesh(new THREE.SphereGeometry(5, 20, 30));
    sphere1.position.x = -2;

    const sphere2 = createMesh(new THREE.SphereGeometry(5, 20, 30));
    sphere2.position.set(3, 0, 0);

    const cube = createMesh(new THREE.BoxGeometry(5, 5, 5));
    cube.position.x = -7;

    let result;

    scene.add(sphere1);
    scene.add(sphere2);
    scene.add(cube);

    camera.position.set(0, 20, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    const controls = new function () {

        this.sphere1PosX = sphere1.position.x;
        this.sphere1PosY = sphere1.position.y;
        this.sphere1PosZ = sphere1.position.z;
        this.sphere1Scale = 1;

        this.sphere2PosX = sphere2.position.x;
        this.sphere2PosY = sphere2.position.y;
        this.sphere2PosZ = sphere2.position.z;
        this.sphere2Scale = 1;

        this.cubePosX = cube.position.x;
        this.cubePosY = cube.position.y;
        this.cubePosZ = cube.position.z;
        this.scaleX = 1;
        this.scaleY = 1;
        this.scaleZ = 1;

        this.actionCube = "subtract";
        this.actionSphere = "subtract";

        this.showResult = () => {
            redrawResult();
        };

        this.hideWireframes = false;
        this.rotateResult = false;
    };

    const gui = new dat.GUI();
    const guiSphere1 = gui.addFolder("Sphere1");
    guiSphere1.add(controls, "sphere1PosX", -15, 15).onChange(() => {
        sphere1.position.set(controls.sphere1PosX, controls.sphere1PosY, controls.sphere1PosZ)
    });
    guiSphere1.add(controls, "sphere1PosY", -15, 15).onChange(() => {
        sphere1.position.set(controls.sphere1PosX, controls.sphere1PosY, controls.sphere1PosZ)
    });
    guiSphere1.add(controls, "sphere1PosZ", -15, 15).onChange(() => {
        sphere1.position.set(controls.sphere1PosX, controls.sphere1PosY, controls.sphere1PosZ)
    });
    guiSphere1.add(controls, "sphere1Scale", 0, 10).onChange(e => {
        sphere1.scale.set(e, e, e)
    });

    const guiSphere2 = gui.addFolder("Sphere2");
    guiSphere2.add(controls, "sphere2PosX", -15, 15).onChange(() => {
        sphere2.position.set(controls.sphere2PosX, controls.sphere2PosY, controls.sphere2PosZ)
    });
    guiSphere2.add(controls, "sphere2PosY", -15, 15).onChange(() => {
        sphere2.position.set(controls.sphere2PosX, controls.sphere2PosY, controls.sphere2PosZ)
    });
    guiSphere2.add(controls, "sphere2PosZ", -15, 15).onChange(() => {
        sphere2.position.set(controls.sphere2PosX, controls.sphere2PosY, controls.sphere2PosZ)
    });
    guiSphere2.add(controls, "sphere2Scale", 0, 10).onChange(e =>  {
        sphere2.scale.set(e, e, e)
    });
    guiSphere2.add(controls, "actionSphere", ["subtract", "intersect", "union", "none"]);

    const guiCube = gui.addFolder("cube");
    guiCube.add(controls, "cubePosX", -15, 15).onChange(() => {
        cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ)
    });
    guiCube.add(controls, "cubePosY", -15, 15).onChange(() => {
        cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ)
    });
    guiCube.add(controls, "cubePosZ", -15, 15).onChange(() => {
        cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ)
    });
    guiCube.add(controls, "scaleX", 0, 10).onChange(e => {
        cube.scale.x = e
    });
    guiCube.add(controls, "scaleY", 0, 10).onChange(e => {
        cube.scale.y = e
    });
    guiCube.add(controls, "scaleZ", 0, 10).onChange(e => {
        cube.scale.z = e
    });
    guiCube.add(controls, "actionCube", ["subtract", "intersect", "union", "none"]);

    gui.add(controls, "showResult");
    gui.add(controls, "rotateResult");
    gui.add(controls, "hideWireframes").onChange(() => {
        if (controls.hideWireframes) {
            sphere1.material.visible = false;
            sphere2.material.visible = false;
            cube.material.visible = false;
        } else {
            sphere1.material.visible = true;
            sphere2.material.visible = true;
            cube.material.visible = true;
        }
    });

    const renderScene = () => {
        stats.update();

        if (controls.rotateResult && result) {
            result.rotation.y += 0.04;
            // result.rotation.x+=0.04;
            result.rotation.z -= 0.005;
        }

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    let spinner;

    function redrawResult() {

        showSpinner();

        setTimeout(function () {
            scene.remove(result);
            const sphere1BSP = new ThreeBSP(sphere1);
            const sphere2BSP = new ThreeBSP(sphere2);
            const cube2BSP = new ThreeBSP(cube);

            let resultBSP;
            switch (controls.actionSphere) {
                case "subtract":
                    resultBSP = sphere1BSP.subtract(sphere2BSP);
                    break;
                case "intersect":
                    resultBSP = sphere1BSP.intersect(sphere2BSP);
                    break;
                case "union":
                    resultBSP = sphere1BSP.union(sphere2BSP);
                    break;
                case "none": // noop;
            }

            if (!resultBSP) resultBSP = sphere1BSP;
            switch (controls.actionCube) {
                case "subtract":
                    resultBSP = resultBSP.subtract(cube2BSP);
                    break;
                case "intersect":
                    resultBSP = resultBSP.intersect(cube2BSP);
                    break;
                case "union":
                    resultBSP = resultBSP.union(cube2BSP);
                    break;
                case "none": // noop;
            }

            if (controls.actionCube === "none" && controls.actionSphere === "none") {
                // do nothing
            } else {
                result = resultBSP.toMesh();
                result.geometry.computeFaceNormals();
                result.geometry.computeVertexNormals();
                scene.add(result);
            }

            hideSpinner(spinner);
        }, 200);   
    }

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        const wireframeMat = new THREE.MeshBasicMaterial({
            opacity: 0.5, wireframeLinewidth: 0.5
        });
        wireframeMat.wireframe = true;

        const mesh = new THREE.Mesh(geom, wireframeMat);

        return mesh;
    }

    function showSpinner() {

        const opts = {
            lines: 13,
            length: 20,
            width: 10,
            radius: 30,
            corners: 1,
            rotate: 0,
            direction: 1,
            color: '#000',
            speed: 1,
            trail: 60,
            shadow: false,
            hwaccel: false,
            className: 'spinner',
            zIndex: 2e9,
            top: '50%',
            left: '50%'
        };
        const target = document.getElementById('WebGL-output');
        spinner = new Spinner(opts).spin(target);
        return spinner;
    }


    function hideSpinner(spinner) {
        spinner.stop();
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
