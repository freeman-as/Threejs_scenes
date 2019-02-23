## 038_basic_3d_geometries_cone

``THREE.ConeGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ConeGeometry``**
  円錐形状を生成するためのクラス
  https://threejs.org/docs/#api/en/geometries/ConeGeometry

  ```javascript
  // constructor
  ConeGeometry(radius : Float, height : Float, radialSegments : Integer, heightSegments : Integer, openEnded : Boolean, thetaStart : Float, thetaLength : Float)
  
  // code example
  const geometry = new THREE.ConeGeometry( 5, 20, 32 );
  const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
  const cone = new THREE.Mesh( geometry, material );
  scene.add( cone );
  ```



- 

---
### メモ

- **``THREE.ConeGeometry``**
  円錐を作成
  実体は``radiusTop``が0に固定された``THREE.CylinderGeometry``
- 

------

### 参考

- 
