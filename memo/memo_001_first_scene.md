## 001_first_scene


---
### 使用したThree.jsのAPIについて(抜粋)

- **``Scene()``**
  sceneオブジェクトは表示したいすべての物体と利用したいすべての光源を保持して変更を監視するコンテナオブジェクト
  https://threejs.org/docs/index.html#api/en/scenes/Scene

  ```javascript
  // constructor
  new THREE.Scene();
  ```




- **``PerspectiveCamera()``**
  シーンを描画するときの画角を決める
  https://threejs.org/docs/index.html#api/en/cameras/PerspectiveCamera

  ```javascript
  PerspectiveCamera(fov: Number, aspect: Number, near: Number, far: Number)
  // constructor
  var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  scene.add(camera);
  ```



- **``WebGLRenderer()``**
  cameraオブジェクトの角度に基づいてブラウザ内でのsceneオブジェクトの見え方を計算
  https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer

  ```javascript
  WebGLRenderer(parameters: Object)
  // constructor
  var renderer = new THREE.WebGLRenderer();
  ```



- **``WebGLRenderer.setClearColor()``**
  rendererの背景色を設定
  https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.setClearColor

  ```javascript
  setClearColor ( color : Color, alpha : Float ) : null
  ```



- **``WebGLRenderer.setSize()``**
  描画するシーンの大きさをレンダラーに通知
  https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.setSize

  ```javascript
  setSize ( width : Integer, height : Integer, updateStyle : Boolean ) : null
  ```



- **``lookAt()``**
  指定した座標にカメラが向くようにする
  https://threejs.org/docs/#api/en/core/Object3D.lookAt

  ```javascript
  lookAt ( vector : Vector3 ) : null
  ```




- **``WebGLRenderer.domElement``**
  レンダラのDOM出力
  https://threejs.org/docs/#api/en/renderers/WebGLRenderer.domElement

  ```javascript
  document.body.appendChild( renderer.domElement );
  ```



- 

---
### メモ

- **``scene.add()``**

  シーンにオブジェクトを追加

- 


------

### 参考

- 
