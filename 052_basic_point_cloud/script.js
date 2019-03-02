let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.set(20, 0, 150);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let cloud;

    const controls = new function () {
        this.size = 4;
        this.transparent = true;
        this.opacity = 0.6;
        this.vertexColors = true;
        this.color = 0xffffff;
        this.sizeAttenuation = true;
        this.rotateSystem = true;

        this.redraw = () => {
            if (scene.getObjectByName("particles")) {
                scene.remove(scene.getObjectByName("particles"));
            }
            createParticles(controls.size, controls.transparent, controls.opacity, controls.vertexColors, controls.sizeAttenuation, controls.color);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'size', 0, 10).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
    gui.add(controls, 'vertexColors').onChange(controls.redraw);
    gui.addColor(controls, 'color').onChange(controls.redraw);
    gui.add(controls, 'sizeAttenuation').onChange(controls.redraw);
    gui.add(controls, 'rotateSystem');

    controls.redraw();

    let step = 0;

    const renderScene = () => {
        stats.update();

        if (controls.rotateSystem) {
            step += 0.01;

            cloud.rotation.x = step;
            cloud.rotation.z = step;
        }

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    renderScene();

    function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color) {
        const geom = new THREE.Geometry();
        const material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,           
            vertexColors: vertexColors,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        const range = 500;
        for (let i = 0; i < 15000; i++) {
            const particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
            geom.vertices.push(particle);
            let color = new THREE.Color(0x00ff00);
            color.setHSL(color.getHSL(color).h, color.getHSL(color).s, Math.random() * color.getHSL(color).l);
            geom.colors.push(color);
        }

        cloud = new THREE.Points(geom, material);
        cloud.name = "particles";
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
