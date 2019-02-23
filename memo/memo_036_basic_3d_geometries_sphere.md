## 036_basic_3d_geometries_sphere

``THREE.SphereGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``SphereGeometry``**
  球体形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/SphereGeometry

  ```javascript
  // constructor
  SphereGeometry(radius : Float, widthSegments : Integer,  : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float)
  // - widthSegments: 水平セグメント数
  // - heightSegments: 垂直セグメント数
  // - phiStart: 水平方向の開始角度を指定
  // - phiLength: 水平方向の開始角度を指定
  // - thetaStart: 垂直方向の開始角度を指定
  // - thetaLength: 垂直方向の掃引角度サイズを指定
  
  // code example
  const geometry = new THREE.SphereGeometry( 5, 32, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  const sphere = new THREE.Mesh( geometry, material );
  scene.add( sphere );
  ```



- 

---
### メモ

- **``THREE.SphereGeometry``**
  3次元の球を作成
- **``phiStart``**
  球をどの経度から描き始めるか指定
- **``phiLength``**
  ``phiStart``から開始してどのくらいの長さ球を描画するか指定
- **``thetaStart``**
  球をどの緯度から描き始めるか指定
- **``thetaLength``**
  ``thetaStart``から開始してどのくらいの長さ球を描画するか指定。``0.5 * Math.PI``だと上半分の球が描画
- 

------

### 参考

- 
