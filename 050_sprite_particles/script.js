let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 0, 150);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    const renderScene = () => {
        stats.update();

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    createSprites();
    renderScene();

    function createSprites() {
        const material = new THREE.SpriteMaterial();

        for (let x = -5; x < 5; x++) {
            for (let y = -5; y < 5; y++) {
                const sprite = new THREE.Sprite(material);
                sprite.position.set(x * 10, y * 10, 0);
                scene.add(sprite);
            }
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
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
