## 039_basic_3d_geometries_torus

``THREE.TorusGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``TorusGeometry``**
  トーラス形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/TorusGeometry

  ```javascript
  // constructor
  TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
  // - radius: トーラスの中心からチューブの中心までのトーラスの半径
  // - tube: チューブの半径
  // - arc: 中心角
  
  // code example
  const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const torus = new THREE.Mesh( geometry, material );
  scene.add( torus );
  ```



- 

---
### メモ

- **``THREE.TorusGeometry``**
  ドーナツのような見た目の単純な形状のジオメトリを作成
- **``radius``**
  トーラスの軸の半径を指定
- **``tube``**
  チューブ(実際のドーナツ部分)の半径を指定
- **``arc``**
  完全な円としてトーラスを描画するかどうかを制御できる
- 

------

### 参考

- 
