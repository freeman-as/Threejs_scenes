## 009_geometries

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
  基本的なマテリアルオブジェクト
  https://threejs.org/docs/#api/en/core/Object3D.lookAt

  ```javascript
  lookAt ( vector : Vector3 ) : null
  ```

  | 引数     | 説明                                                         |
  | -------- | ------------------------------------------------------------ |
  | filename | 書き出すファイル名                                           |
  | flags    | コーデックを指定するための関数の戻り値で指定（4つの文字を引数渡して取得） |



- **``lookAt()``**
  基本的なマテリアルオブジェクト
  https://threejs.org/docs/#api/en/core/Object3D.lookAt

  ```javascript
  lookAt ( vector : Vector3 ) : null
  ```

  | 引数     | 説明                                                         |
  | -------- | ------------------------------------------------------------ |
  | filename | 書き出すファイル名                                           |
  | flags    | コーデックを指定するための関数の戻り値で指定（4つの文字を引数渡して取得） |




- FOURCCコーデックの指定

  ```C++
  // 識別子を4個の文字に分解して指定して呼び出す
  // 静的メソッド
  VideoWriter::fourcc(char c1, char c2, char c3, char c4)
  // return: static int
  // 指定した文字列に対応するコードを返す
  ```




- 

---
### メモ

- **ジオメトリ**
  基本的に**頂点群**と呼ばれる3D空間での座標の集合とそれらの点をつないでまとめた数多くの面のこと
- **頂点群 (vertices)**
- **頂点 (vertex)**
- **面 (face)**
  常に3つの頂点からなる三角形
- 

------

### 参考

- 
