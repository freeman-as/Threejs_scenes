## 033_basic_2d_geometries_ring

``THREE.RingGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``RingGeometry``**
  二次元リング形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/RingGeometry

  ```javascript
  // constructor
  RingGeometry(innerRadius : Float, outerRadius : Float, thetaSegments : Integer, phiSegments : Integer, thetaStart : Float, thetaLength : Float)
  // - thetaSegments: セグメント数。数値が大きいほど、リングは丸くなる。最小値=3, デフォルト値=8
  
  // code example
  const geometry = new THREE.RingGeometry( 1, 5, 32 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  ```



- 

---
### メモ

- **``THREE.RingGeometry``**
  中心に穴の空いたオブジェクトを作成
  必須プロパティなし

- **``innerRadius``**
  円の内部半径。中心にある穴の大きさ

- **``outerRadius``**
  円の外部半径。円の大きさ、中心から円周までの距離

- **``thetaSegments``**
  円を作成する際に使用される円周方向に沿ったセグメントの数。大きな値を設定すると輪が滑らかになる

- **``phiSegments``**
  直径方向に必要なセグメントの数。円の滑らかさには影響を与えない

- 


------

### 参考

- 
