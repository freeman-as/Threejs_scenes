## 037_basic_3d_geometries_cylinder

``THREE.CylinderGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``CylinderGeometry``**
  円柱形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/CylinderGeometry

  ```javascript
  // constructor
  CylinderGeometry(radiusTop : Float, radiusBottom : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
  // - radiusTop: 上部の円柱の半径
  // - radiusBottom: 下部の円柱の半径
  // - openEnded: 円柱の両端が開いているかキャップされているかを示すブール値
  
  // code example
  const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  const cylinder = new THREE.Mesh( geometry, material );
  scene.add( cylinder );
  ```



- 

---
### メモ

- **``THREE.CylinderGeometry``**
  円柱や円柱に似たオブジェクトを作成
- **``radiusTop``**
  **``radiusBottom``**
  半径として負の値を使用可能。ただし負の値を指定すると裏表が逆になるので、``THREE.DoubleSide``に設定しなければ、表示されないので注意
- 

------

### 参考

- 
