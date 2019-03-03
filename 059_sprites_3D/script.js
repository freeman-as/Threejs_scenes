let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(20, 0, 150);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;
    let group;

    const renderScene = () => {
        stats.update();

        step += 0.01;
        group.rotation.x = step;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    createSprites()
    renderScene();

    function createSprites() {
        group = new THREE.Group();
        const range = 200;
        for (let i = 0; i < 400; i++) {
            group.add(createSprite(10, false, 0.6, 0xffffff, i % 5, range));
        }
        scene.add(group);
    }

    function getTexture() {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("../assets/textures/particles/sprite-sheet.png");
        return texture;
    }

    function createSprite(size, transparent, opacity, color, spriteNumber, range) {
        const spriteMaterial = new THREE.SpriteMaterial({
                opacity: opacity,
                color: color,
                transparent: transparent,
                map: getTexture()
            }
        );

        spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
        spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
        spriteMaterial.depthTest = false;
        spriteMaterial.blending = THREE.AdditiveBlending;

        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(size, size, size);
        sprite.position.set(
            Math.random() * range - range / 2,
            Math.random() * range - range / 2,
            Math.random() * range - range / 2);
        sprite.velocityX = 5;

        return sprite;
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
