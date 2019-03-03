let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(20, 40, 110);
    camera.lookAt(new THREE.Vector3(20, 30, 0));

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let cloud;

    const controls = new function () {
        this.size = 3;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = () => {
            scene.remove(scene.getObjectByName("particles1"));

            createPoints(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.addColor(controls, 'color').onChange(controls.redraw);
    gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
    controls.redraw();

    const renderScene = () => {
        stats.update();

        const vertices = cloud.geometry.vertices;
        vertices.forEach(v => {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);

            if (v.y <= 0) v.y = 60;
            if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
        });
        cloud.geometry.verticesNeedUpdate = true;

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    renderScene();

    function createPoints(size, transparent, opacity, sizeAttenuation, color) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load("../assets/textures/particles/raindrop-1.png");
        const geom = new THREE.Geometry();
        const material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            depthWrite: false,
            map: texture,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        const range = 40;
        for (let i = 0; i < 1500; i++) {
            const particle = new THREE.Vector3(
                Math.random() * range - range / 2,
                Math.random() * range * 1.5,
                Math.random() * range - range / 2);
            particle.velocityX = (Math.random() - 0.5) / 3;
            particle.velocityY = 0.1 + Math.random() / 5;
            geom.vertices.push(particle);
        }

        cloud = new THREE.Points(geom, material);
        cloud.sortParticles = true;
        cloud.name = "particles1";
        scene.add(cloud);
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
