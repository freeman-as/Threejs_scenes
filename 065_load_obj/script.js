let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xaaaaff));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;

    camera.position.set(130, 40, 50);
    camera.lookAt(scene.position);
    scene.add(camera);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(30, 40, 50);
    spotLight.intensity = 1;
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;

    const controls = new function () {
    };

    const gui = new dat.GUI();
    let mesh;

    const loader = new THREE.OBJLoader();
    loader.load('../assets/models/pinecone.obj', (loadedMesh) => {
        const material = new THREE.MeshLambertMaterial({ color: 0x5C3A21 });
        loadedMesh.children.forEach(child => {
            child.material = material;
            child.geometry.computeFaceNormals();
            child.geometry.computeVertexNormals();
        });

        mesh = loadedMesh;
        loadedMesh.scale.set(100, 100, 100);
        loadedMesh.rotation.x = -0.3;
        scene.add(loadedMesh);
    });

    const renderScene = () => {
        stats.update();

        if (mesh) {
            mesh.rotation.y += 0.006;
            mesh.rotation.x += 0.006;
        }

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function createMesh(geom) {
        const meshMaterial = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors,
            wireframe: true,
            wireframeLinewidth: 2,
            color: 0xaaaaaa
        });
        meshMaterial.side = THREE.DoubleSide;

        const mesh = new THREE.Mesh(geom, meshMaterial);
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
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);