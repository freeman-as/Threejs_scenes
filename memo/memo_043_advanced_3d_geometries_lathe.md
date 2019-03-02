## 043_advanced_3d_geometries_lathe

``THREE.LatheGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``LatheGeometry``**
  花瓶のように軸対称のメッシュを作成。旋盤はY軸を中心に回転
  https://threejs.org/docs/#api/en/geometries/LatheGeometry

  ```javascript
  // constructor
  LatheGeometry(points : Array, segments : Integer, phiStart : Float, phiLength : Float)
  
  // code example
  const points = [];
  for ( let i = 0; i < 10; i ++ ) {
  	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
  }
  const geometry = new THREE.LatheGeometry( points );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const lathe = new THREE.Mesh( geometry, material );
  scene.add( lathe );
  ```



- 

---
### メモ

- **``THREE.LatheGeometry``**
  なめらかな曲線を元に3次元形状を作成
  ノットとも呼ばれる点を使用して定義し、スプライン曲線とも呼ばれる
- 

------

### 参考

- 
