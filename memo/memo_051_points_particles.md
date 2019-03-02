## 051_points_particles

``THREE.Points``によるパーティクル表現

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Points``**
  点を表示するためのクラス。ポイントは``gl.POINTS``を使って``WebGLRenderer``によってレンダリング
  https://threejs.org/docs/#api/en/objects/Points

  ```javascript
  // constructor
  Points( geometry : Geometry, material : Material )
  // - material: デフォルトはランダムな色の新しいPointsMaterial
  ```



- **``PointsMaterial``**
  ``THREE.Points``で使用されるデフォルトのマテリアル
  https://threejs.org/docs/#api/en/materials/PointsMaterial

  ```javascript
  // constructor
  PointsMaterial( parameters : Object )
  
  // code example
  //This will add a starfield to the background of a scene
  const starsGeometry = new THREE.Geometry();
  for ( var i = 0; i < 10000; i ++ ) {
  	const star = new THREE.Vector3();
  	star.x = THREE.Math.randFloatSpread( 2000 );
  	star.y = THREE.Math.randFloatSpread( 2000 );
  	star.z = THREE.Math.randFloatSpread( 2000 );
  	starsGeometry.vertices.push( star );
  }
  const starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
  const starField = new THREE.Points( starsGeometry, starsMaterial );
  scene.add( starField );
  ```



- 

---
### メモ

- **``THREE.Points``**
  ``THREE.Sprite``と違い、``THREE.Points``のみ管理するだけなのでパフォーマンスが向上するスプライトの作成
- 

------

### 参考

- 
