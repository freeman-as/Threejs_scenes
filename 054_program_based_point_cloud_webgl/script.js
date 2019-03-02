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

    const getTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;

        const ctx = canvas.getContext('2d');

        // the body
        ctx.translate(-81, -84);

        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.moveTo(83, 116);
        ctx.lineTo(83, 102);
        ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
        ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
        ctx.lineTo(111, 116);
        ctx.lineTo(106.333, 111.333);
        ctx.lineTo(101.666, 116);
        ctx.lineTo(97, 111.333);
        ctx.lineTo(92.333, 116);
        ctx.lineTo(87.666, 111.333);
        ctx.lineTo(83, 116);
        ctx.fill();

        // the eyes
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.moveTo(91, 96);
        ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
        ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
        ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
        ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
        ctx.moveTo(103, 96);
        ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
        ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
        ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
        ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
        ctx.fill();

        // the pupils
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
        ctx.fill();

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    };

    let cloud;

    const controls = new function () {
        this.size = 15;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;
        this.rotateSystem = true;
        this.sizeAttenuation = true;

        this.redraw = function () {
            if (scene.getObjectByName("pointcloud")) {
                scene.remove(scene.getObjectByName("pointcloud"));
            }
            createPoints(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
        };
    };

    const gui = new dat.GUI();
    gui.add(controls, 'size', 0, 20).onChange(controls.redraw);
    gui.add(controls, 'transparent').onChange(controls.redraw);
    gui.add(controls, 'opacity', 0, 1).onChange(controls.redraw);
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

    function createPoints(size, transparent, opacity, sizeAttenuation, color) {
        const geom = new THREE.Geometry();
        const material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: getTexture(),
            sizeAttenuation: sizeAttenuation,
            depthWrite: false,
            color: color
        });

        const range = 500;
        for (let i = 0; i < 1500; i++) {
            const particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
            geom.vertices.push(particle);
        }

        cloud = new THREE.Points(geom, material);
        cloud.name = 'pointcloud';
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
