let scene, sceneOrtho, camera, cameraOrtho, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();
    sceneOrtho = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 250);
    cameraOrtho = new THREE.OrthographicCamera(0, window.innerWidth, window.innerHeight, 0, -10, 10);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(0, 0, 50);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let material = new THREE.MeshNormalMaterial();
    let geom = new THREE.SphereGeometry(15, 20, 20);
    let mesh = new THREE.Mesh(geom, material);

    scene.add(mesh);

    const getTexture = () => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("../assets/textures/particles/sprite-sheet.png");
        return texture;
    }

    const controls = new function () {
        this.size = 150;
        this.sprite = 0;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;
        this.rotateSystem = true;

        this.redraw = () => {
            sceneOrtho.children.forEach(child => {
                if (child instanceof THREE.Sprite) sceneOrtho.remove(child);
            });
            createSprite(controls.size, controls.transparent, controls.opacity, controls.color, controls.sprite);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'sprite', 0, 4).step(1).onChange(controls.redraw);
    gui.add(controls, 'size', 0, 120).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.addColor(controls, 'color').onChange(controls.redraw);
    controls.redraw();

    let step = 0;
    const renderScene = () => {
        stats.update();

        step += 0.01;
        camera.position.y = Math.sin(step) * 20;

        sceneOrtho.children.forEach(e => {
            if (e instanceof THREE.Sprite) {
                e.position.x = e.position.x + e.velocityX;
                if (e.position.x > window.innerWidth) {
                    e.velocityX = -5;
                    controls.sprite = (controls.sprite + 1) % 5;
                    e.material.map.offset.set(1 / 5 * controls.sprite, 0);
                }
                if (e.position.x < 0) {
                    e.velocityX = 5;
                }
            }
        });

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
        webGLRenderer.autoClear = false;
        webGLRenderer.render(sceneOrtho, cameraOrtho);
    };

    renderScene();

    function createSprite(size, transparent, opacity, color, spriteNumber) {
        const spriteMaterial = new THREE.SpriteMaterial({
            opacity: opacity,
            color: color,
            transparent: transparent,
            map: getTexture()
        });

        spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
        spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
        spriteMaterial.depthTest = false;
        spriteMaterial.blending = THREE.AdditiveBlending;

        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(size, size, size);
        sprite.position.set(100, 50, -10);
        sprite.velocityX = 5;

        sceneOrtho.add(sprite);
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
