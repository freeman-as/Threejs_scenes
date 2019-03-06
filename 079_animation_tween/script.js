let scene, camera, webGLRenderer;

function init() {
    var stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    webGLRenderer.shadowMap.enabled = true;
    
    camera.position.set(10, 10, 10);
    camera.lookAt(new THREE.Vector3(0, -2, 0));

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(20, 20, 20);
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let pointCloud;
    let loadedGeometry;

    // create a tween
    // http://sole.github.io/tween.js/examples/03_graphs.html
    var posSrc = {pos: 1};
    var tween = new TWEEN.Tween(posSrc).to({pos: 0}, 5000);
    tween.easing(TWEEN.Easing.Sinusoidal.InOut);

    var tweenBack = new TWEEN.Tween(posSrc).to({pos: 1}, 5000);
    tweenBack.easing(TWEEN.Easing.Sinusoidal.InOut);

    tween.chain(tweenBack);
    tweenBack.chain(tween);

    var loader = new THREE.PLYLoader();

    loader.load('../assets/models/test.ply', function(geometry) {
        console.log(geometry);
        loadedGeometry = geometry.clone();
        console.log(loadedGeometry);

        var material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.4,
            opacity: 0.6,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            map: generateSprite()
        });

        pointCloud = new THREE.Points(geometry, material);
        pointCloud.sortParticles = true;

        // モデル読込完了待ってからトゥイーンを開始
        tween.start();
        scene.add(pointCloud);
    });

    
    var onUpdate = function() {
        var count = 0;
        var pos = this.pos;

        // console.log(loadedGeometry.attributes.position.array)
        loadedGeometry.attributes.position.array.forEach(e => {
            console.log(count);
            if(count > 100) return true;;
            if (count + 1 % 3 == 0) {
                console.log(e)
                var newY = ((e + 3.22544) * pos) - 3.22544;
            }
            count++;
            // pointCloud.geometry.vertices[count++].set(e.x, newY, e.z);
        });

        pointCloud.geometry.verticesNeedUpdate = true;
    };

    tween.onUpdate(onUpdate);
    tweenBack.onUpdate(onUpdate);

    var renderScene = () => {
        stats.update();
        TWEEN.update();

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function generateSprite() {
        var canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;

        var context = canvas.getContext('2d');
        var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
        gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,1)');

        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);

        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // stats初期化
    function initStats() {
        var stats = new Stats();
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