let scene, camera, webGLRenderer;

function init() {
    const stats = initStats();

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE));
    webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    
    // let projector = new THREE.Projector();
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);

    const planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    cube.position.set(-9, 3, 0);
    scene.add(cube);

    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x7777ff });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.set(20, 0, 2);
    scene.add(sphere);

    const cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
    const cylinderMaterial = new THREE.MeshLambertMaterial({ color: 0x77ff77 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    
    cylinder.position.set(0, 0, 1);
    scene.add(cylinder);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    const ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

    document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);

    let step = 0;
    let scalingStep = 0;

    const controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
        this.scalingSpeed = 0.03;
        this.showRay = false;
    }
    const gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);
    gui.add(controls, 'scalingSpeed', 0, 0.5);
    gui.add(controls, 'showRay').onChange(e => {
        if (tube) scene.remove(tube);
    });

    let projector = new THREE.Projector();
    let tube;

    const renderScene = () => {
        stats.update();

        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;

        step += controls.bouncingSpeed;
        sphere.position.x = 20 + (10 * (Math.cos(step)));
        sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

        scalingStep += controls.scalingSpeed;
        const scaleX = Math.abs(Math.sin(scalingStep / 4));
        const scaleY = Math.abs(Math.cos(scalingStep / 5));
        const scaleZ = Math.abs(Math.sin(scalingStep / 7));
        cylinder.scale.set(scaleX, scaleY, scaleZ);

        requestAnimationFrame(renderScene);
        webGLRenderer.render(scene, camera);
    };
    renderScene();

    function onDocumentMouseDown(event) {
        // クリックされたスクリーン上の位置でVector3作成
        let vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
        // クリックされたスクリーン上の位置をシーン内の座標に変換
        // スクリーン座標からワールド座標系に逆射影変換
        vector = vector.unproject(camera);

        // カメラ位置から変換後のシーン位置までレイを飛ばす
        const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        // レイが当たったか判定したいオブジェクト
        const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

        if (intersects.length > 0) {
            console.log(intersects[0]);

            intersects[0].object.material.transparent = true;
            intersects[0].object.material.opacity = 0.1;
        }
    }

    function onDocumentMouseMove(event) {
        if (controls.showRay) {
            // クリックされたスクリーン上の位置でVector3作成
            let vector = new THREE.Vector3(( event.clientX / window.innerWidth ) * 2 - 1, -( event.clientY / window.innerHeight ) * 2 + 1, 0.5);
            // クリックされたスクリーン上の位置をシーン内の座標に変換
            // スクリーン座標からワールド座標系に逆射影変換
            vector = vector.unproject(camera);

            // カメラ位置から変換後のシーン位置までレイを飛ばす
            const raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

            // レイが当たったか判定したいオブジェクト
            const intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

            if (intersects.length > 0) {
                const points = [];
                points.push(new THREE.Vector3(-30, 39.8, 30));
                points.push(intersects[0].point);

                const mat = new THREE.MeshBasicMaterial({
                    color: 0xff0000, transparent: true, opacity: 0.6
                });
                const tubeGeometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 60, 0.001);

                if (tube) scene.remove(tube);

                if (controls.showRay) {
                    tube = new THREE.Mesh(tubeGeometry, mat);
                    scene.add(tube);
                }
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