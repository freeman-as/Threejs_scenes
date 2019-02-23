## 040_basic_3d_geometries_torus_knot

``THREE.TorusKnotGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``TorusKnotGeometry``**
  トーラスノットを作成。その特定の形状は、一対の互いに素な整数pとqによって定義。 pとqが互いに素でない場合、結果はトーラスリンクになる
  https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry

  ```javascript
  // constructor
  TorusKnotGeometry(radius : Float, tube : Float, tubularSegments : Integer, radialSegments : Integer, p : Integer, q : Integer)
  // - p: この値は、ジオメトリが回転対称軸を中心に何回巻かれるかを決定
  // - q: この値は、ジオメトリがトーラス内部の円の周りに何回巻かれるかを決定
  
  // code example
  const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const torusKnot = new THREE.Mesh( geometry, material );
  scene.add( torusKnot );
  ```



- 

---
### メモ

- **``THREE.TorusKnotGeometry``**
  トーラス結び目を作成。トーラス結び目は自身に複数回巻き付いているチューブのように見える結び目の一種
- **``p``**
  自身の軸の周りに何回巻き付くかを定義
- **``q``**
  内側の穴の周りに何回巻き付くかを定義
- 

------

### 参考

- 
