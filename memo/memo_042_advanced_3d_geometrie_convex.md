## 042_advanced_3d_geometrie_convex

``THREE.ConvexGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ConvexGeometry``**
  3Dポイントの特定の配列に対して凸包を生成。このタスクの平均時間複雑度は``O(nlog(n))``と見なされる
  https://threejs.org/docs/#examples/geometries/ConvexGeometry

  ```javascript
  // constructor
  ConvexGeometry( points : Array )
  // - points: 結果として得られる凸包に含まれるVector3の配列
  
  // code example
  const geometry = new THREE.ConvexGeometry( points );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  ```



- 

---
### メモ

- **``THREE.ConvexGeometry``**
  一群の座標を含む凸包(Convex hull)を作成
  凸包とはすべての座標を覆う最小の形状
  受け取れるのは頂点の配列のみ
  標準のThree.jsにはファイルには含まれていないので別途読込が必要
  ``Source``
  https://github.com/mrdoob/three.js/blob/master/examples/js/geometries/ConvexGeometry.js
- 

------

### 参考

- 
