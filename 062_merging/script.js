let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(0, 40, 50);
    camera.lookAt(scene.position);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);


    const cubeMaterial = new THREE.MeshNormalMaterial({transparent: true, opacity: 0.5});

    const controls = new function () {
        this.cameraNear = camera.near;
        this.cameraFar = camera.far;
        this.rotationSpeed = 0.02;
        this.combined = false;
        this.numberOfObjects = 500;

        this.redraw = () => {
            const toRemove = [];
            scene.traverse(e => {
                if (e instanceof THREE.Mesh) toRemove.push(e);
            });
            toRemove.forEach(e => {
                scene.remove(e)
            });

            if (controls.combined) {
                const geometry = new THREE.Geometry();
                for (let i = 0; i < controls.numberOfObjects; i++) {
                    const cubeMesh = addCube();
                    cubeMesh.updateMatrix();
                    geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
                }
                scene.add(new THREE.Mesh(geometry, cubeMaterial));

            } else {
                for (let i = 0; i < controls.numberOfObjects; i++) {
                    scene.add(controls.addCube());
                }
            }
        };

        this.addCube = addCube;

        this.outputObjects = () => {
            console.log(scene.children);
        }
    };

    const gui = new dat.GUI();
    gui.add(controls, 'numberOfObjects', 0, 20000);
    gui.add(controls, 'combined').onChange(controls.redraw);
    gui.add(controls, 'redraw');
    controls.redraw();

    let rotation = 0;

    const renderScene = () => {
        stats.update();

        rotation += 0.005;

        // scene.rotation.x+=0.02;
        // scene.traverse(function(e) {
        //     if (e instanceof THREE.Mesh ) {
        //         e.rotation.x+=controls.rotationSpeed;
        //         e.rotation.y+=controls.rotationSpeed;
        //         e.rotation.z+=controls.rotationSpeed;
        //     }
        // });

        camera.position.x = Math.sin(rotation) * 50;
        // camera.position.y = Math.sin(rotation) * 40;
        camera.position.z = Math.cos(rotation) * 50;
        camera.lookAt(scene.position);

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function addCube() {
        const cubeSize = 1.0;
        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;

        cube.position.set(
            -60 + Math.round(Math.random() * 100),
            Math.round(Math.random() * 10),
            -150 + Math.round(Math.random() * 175)
        );

        return cube;
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