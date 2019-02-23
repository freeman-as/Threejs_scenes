let scene, camera, renderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const points = gosper(4, 60);

    const lines = new THREE.Geometry();
    const colors = [];
    let i = 0;
    points.forEach(e => {
        lines.vertices.push(new THREE.Vector3(e.x, e.z, e.y));
        colors[i] = new THREE.Color(0xffffff);
        colors[i].setHSL(e.x / 100 + 0.5, (e.y * 20) / 300, 0.8);
        i++;
    });

    lines.colors = colors;

    // lines.computeLineDistances();
    const material = new THREE.LineDashedMaterial({
        vertexColors: true,
        color: 0xffffff,
        dashSize: 2,
        gapSize: 2,
        scale: 0.1
    });

    const line = new THREE.Line(lines, material);
    line.computeLineDistances();
    line.position.set(25, -30, -60);
    scene.add(line);

    document.getElementById("WebGL-output").appendChild(renderer.domElement);

    let step = 0;

    const renderScene = () => {
        stats.update();

        step += 0.01;
        line.rotation.z = step;

        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };
    renderScene();

    function gosper(a, b) {
        var turtle = [0, 0, 0];
        var points = [];
        var count = 0;
        rg(a, b, turtle);
        return points;

        function rt(x) {
            turtle[2] += x;
        }

        function lt(x) {
            turtle[2] -= x;
        }

        function fd(dist) {
//                ctx.beginPath();
            points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.moveTo(turtle[0], turtle[1]);
            var dir = turtle[2] * (Math.PI / 180);
            turtle[0] += Math.cos(dir) * dist;
            turtle[1] += Math.sin(dir) * dist;
            points.push({x: turtle[0], y: turtle[1], z: Math.sin(count) * 5});
//                ctx.lineTo(turtle[0], turtle[1]);
//                ctx.stroke();
        }

        function rg(st, ln, turtle) {
            st--;
            ln = ln / 2.6457;
            if (st > 0) {
//                    ctx.strokeStyle = '#111';
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                lt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
                rt(60);
            }
            if (st == 0) {
                fd(ln);
                rt(60);
                fd(ln);
                rt(120);
                fd(ln);
                lt(60);
                fd(ln);
                lt(120);
                fd(ln);
                fd(ln);
                lt(60);
                fd(ln);
                rt(60)
            }
        }

        function gl(st, ln, turtle) {
            st--;
            ln = ln / 2.6457;
            if (st > 0) {
//                    ctx.strokeStyle = '#555';
                lt(60);
                rg(st, ln, turtle);
                rt(60);
                gl(st, ln, turtle);
                gl(st, ln, turtle);
                rt(120);
                gl(st, ln, turtle);
                rt(60);
                rg(st, ln, turtle);
                lt(120);
                rg(st, ln, turtle);
                lt(60);
                gl(st, ln, turtle);
            }
            if (st == 0) {
                lt(60);
                fd(ln);
                rt(60);
                fd(ln);
                fd(ln);
                rt(120);
                fd(ln);
                rt(60);
                fd(ln);
                lt(120);
                fd(ln);
                lt(60);
                fd(ln);
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
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

window.addEventListener('resize', onResize, false);
