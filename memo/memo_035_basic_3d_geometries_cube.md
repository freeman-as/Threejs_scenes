## 035_basic_3d_geometries_cube

``THREE.BoxGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``BoxGeometry``**
  与えられた``width``, ``height``, および ``depth``を持つ長方形の直方体のジオメトリクラス。作成時に、立方体は原点を中心とし、各エッジはいずれかの軸に平行になる
  https://threejs.org/docs/#api/en/geometries/BoxGeometry

  ```javascript
  // constructor
  BoxGeometry(width : Float, height : Float, depth : Float, widthSegments : Integer, heightSegments : Integer, depthSegments : Integer)
  // - depth: 深さつまり、Z軸に平行な辺の長さ
  // - depthSegments: 辺の深さに沿って分割された長方形の面の数
  
  // code example
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  ```



- 

---
### メモ

- **``THREE.BoxGeometry``**
  単純な3Dジオメトリで、幅と高さと奥行を指定して立方体を作成
- **``depth``**
  立方体の奥行。立方体のz軸方向の頂点の長さを指定
- **``depthSegments``**
  立方体をz軸方向に分割するセグメントの数
- 

------

### 参考

- 
