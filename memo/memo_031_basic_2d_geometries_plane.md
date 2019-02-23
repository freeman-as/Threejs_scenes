## 031_basic_2d_geometries_plane

``THREE.PlaneGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``PlaneGeometry``**
  平面形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/PlaneGeometry

  ```javascript
  // constructor
  PlaneGeometry(width : Float, height : Float, widthSegments : Integer, heightSegments : Integer)
  // code example
  const geometry = new THREE.PlaneGeometry( 5, 20, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  ```



- 

---
### メモ

- **``THREE.PlaneGeometry``**
  単純な2次元の四角形を作成
- **``widthSegments``**
  横幅をいくつのセグメントに分割するか指定。デフォルトは1
- **``heightSegments``**
  高さをいくつのセグメントに分割するか指定。デフォルトは1
- 

------

### 参考

- 
