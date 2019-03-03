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

    let system1;
    let system2;

    const controls = new function () {
        this.size = 10;
        this.transparent = true;
        this.opacity = 0.6;
        this.color = 0xffffff;

        this.sizeAttenuation = true;

        this.redraw = () => {
            const toRemove = [];
            scene.children.forEach(child => {
                if (child instanceof THREE.Points) {
                    toRemove.push(child);
                }
            });
            toRemove.forEach(child => {
                scene.remove(child)
            });
            createMultiPoints(controls.size, controls.transparent, controls.opacity, controls.sizeAttenuation, controls.color);
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

        scene.children.forEach(child => {
            if (child instanceof THREE.Points) {
                const vertices = child.geometry.vertices;
                vertices.forEach(v => {
                    v.x = v.x - (v.velocityX);
                    v.y = v.y - (v.velocityY);
                    v.z = v.z - (v.velocityZ);
        
                    if (v.x <= -20 || v.x >= 20) v.velocityX = v.velocityX * -1;
                    if (v.y <= 0) v.y = 60;
                    if (v.z <= -20 || v.z >= 20) v.velocityZ = v.velocityZ * -1;
                });
                child.geometry.verticesNeedUpdate = true;
            }
        });

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };

    renderScene();

    function createPoints(name, texture, size, transparent, opacity, sizeAttenuation, color) {
        const geom = new THREE.Geometry();

        color = new THREE.Color(color);
        color.setHSL(
            color.getHSL(color).h,
            color.getHSL(color).s,
            (Math.random()) * color.getHSL(color).l);

        const material = new THREE.PointsMaterial({
            size: size,
            transparent: transparent,
            opacity: opacity,
            map: texture,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            sizeAttenuation: sizeAttenuation,
            color: color
        });

        const range = 40;
        for (let i = 0; i < 50; i++) {
            const particle = new THREE.Vector3(
                Math.random() * range - range / 2,
                Math.random() * range * 1.5,
                Math.random() * range - range / 2);
            particle.velocityY = 0.1 + Math.random() / 5;
            particle.velocityX = (Math.random() - 0.5) / 3;
            particle.velocityZ = (Math.random() - 0.5) / 3;
            geom.vertices.push(particle);
        }

        const system = new THREE.Points(geom, material);
        system.name = name;
        system.sortParticles = true;
        return system;
    }

    function createMultiPoints(size, transparent, opacity, sizeAttenuation, color) {
        const textureLoader = new THREE.TextureLoader();
        const texture1 = textureLoader.load("../assets/textures/particles/snowflake1.png");
        const texture2 = textureLoader.load("../assets/textures/particles/snowflake2.png");
        const texture3 = textureLoader.load("../assets/textures/particles/snowflake3.png");
        const texture4 = textureLoader.load("../assets/textures/particles/snowflake5.png");

        scene.add(createPoints("system1", texture1, size, transparent, opacity, sizeAttenuation, color));
        scene.add(createPoints("system2", texture2, size, transparent, opacity, sizeAttenuation, color));
        scene.add(createPoints("system3", texture3, size, transparent, opacity, sizeAttenuation, color));
        scene.add(createPoints("system4", texture4, size, transparent, opacity, sizeAttenuation, color));
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
