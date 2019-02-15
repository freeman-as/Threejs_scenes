## 011_mesh_properties

メッシュオブジェクトのプロパティと関数

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Mesh``**
  三角ポリゴンメッシュベースのオブジェクトを表すクラス。 SkinnedMeshなどの他のクラスのベースとしても機能
  https://threejs.org/docs/index.html#api/en/objects/Mesh

  ```javascript
  // constructor
  Mesh( geometry : Geometry, material : Material )
  // code example
  var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  ```




- **``Object3D.position : Vector3``**
  オブジェクトのローカル位置を表すプロパティ。デフォルトは（0、0、0）
  https://threejs.org/docs/#api/en/core/Object3D.position

  ```javascript
  // code example
  mesh.position.x = 1;
  // 同時に設定
  mesh.position.set(1, 1, 1);
  ```



- **``Object3D.rotaion : Vector3``**
  オブジェクトの局所回転（オイラー角を参照）、ラジアン単位
  任意の軸周りの回転を設定できるプロパティ
  https://threejs.org/docs/#api/en/core/Object3D.rotation

  ```javascript
  // code example
  // 回転の値はラジアン
  mesh.rotation.x = 0.5 * Math.PI; // x軸を90度回転
  // 同時に設定
  mesh.rotation.set(0.5 * Math.PI, ,0 ,0);
  // 度 -> ラジアン
  const degrees = 45;
  const radians = degrees * (Math.PI / 180);
  ```



- **``Object3D.scale : Vector3``**
  オブジェクトのローカルスケール。デフォルトはVector3（1、1、1）
  x, y, z軸を基準に拡大縮小ができるプロパティ
  https://threejs.org/docs/#api/en/core/Object3D.scale

  ```javascript
  // code example
  mesh.scale.x = 2;
  // 同時に設定
  mesh.scale.set(2, 2, 2);
  ```



- **``Object3D.translateX(distance : Float) : this``**
  **``Object3D.translateY(distance : Float) : this``**
  **``Object3D.translateZ(distance : Float) : this``**
  距離単位で、オブジェクト空間の各軸に沿ってオブジェクトを移動
  https://threejs.org/docs/#api/en/core/Object3D.translateX
  https://threejs.org/docs/#api/en/core/Object3D.translateY
  https://threejs.org/docs/#api/en/core/Object3D.translateZ

  ```javascript
  // Note
  positionのように移動したいオブジェクトの位置を相対座標ではなく、現在の位置からの相対的な値として指定
  // code example
  mesh.position.set(1, 1, 1);
  mesh.translateX(5);
  >> position => (6, 1, 1)
  ```



- **``Object3D.translateOnAxis ( axis : Vector3, distance : Float ) : this``**
  オブジェクト空間内で、指定した軸と距離でオブジェクトを移動。軸は正規化されていると見なされる
  https://threejs.org/docs/#api/en/core/Object3D.translateOnAxis

  ```javascript
  // code exmple
  // X軸に沿って5移動
  mesh.translateOnAxis(new Vector3(1, 0, 0), 5);
  ```



- **``Object3D.visible : Boolean``**
  trueの場合、オブジェクトはレンダリングされる。デフォルトはtrue
  https://threejs.org/docs/#api/en/core/Object3D.visible

  ```javascript
  // Meshを描画しない
  mesh.visible = false;
  ```



- 

---
### メモ

- **メッシュ**
  作成するには、ジオメトリとマテリアルが必要
  シーンに追加して描画
- **``position``**
  オブジェクトの親要素からの相対位置
  多くの場合親要素はTHREE.Scene, THREE.Groupオブジェクトになる
- **``rotation``**
  特定の軸周りで回転するためのメソッド
  rotateX(), rotateY(), rotateZ()
- **``translate``**
  移動したいオブジェクトの位置を相対座標ではなく、現在の位置からの相対的な値として指定
- 

------

### 参考

- 

