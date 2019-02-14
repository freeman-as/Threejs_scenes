## 010_custom_geometry

頂点と面による立方体

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Geometry``**
  Geometryは、BufferGeometryのユーザーフレンドリーな代替方法です。ジオメトリは、読みやすく編集しやすいVector3やColorのようなオブジェクトを使用して属性（頂点位置、面、色など）を格納しますが、型付き配列よりも効率が悪くなります。
  https://threejs.org/docs/index.html#api/en/core/Geometry

  ```javascript
  // constructor no arguments
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
  	new THREE.Vector3( -10,  10, 0 ),
  	new THREE.Vector3( -10, -10, 0 ),
  	new THREE.Vector3(  10, -10, 0 )
  );
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  ```




- **``Geometry.vertices : Array``**
  頂点の配列 頂点の配列は、モデル内のすべての頂点の位置を保持します。 この配列の更新を通知するには、.verticesNeedUpdateをtrueに設定する必要があります。
  https://threejs.org/docs/index.html#api/en/core/Geometry.vertices

  ```javascript
  // pushで頂点を追加
  geometry.vertices.push(
  	new THREE.Vector3( -10,  10, 0 ),
  	new THREE.Vector3( -10, -10, 0 ),
  	new THREE.Vector3(  10, -10, 0 )
  );
  ```



- **``Geometry.faces : Array``**
  面の配列 面の配列は、モデル内の各頂点がフォーム面にどのように接続されているかを表します。さらに、面と頂点の法線と色に関する情報も保持しています。
  https://threejs.org/docs/index.html#api/en/core/Geometry.faces

  ```javascript
  // pushで面を追加
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  ```



- **``Geometry.computeFaceNormals() : null``**
  法線 - Face3の方向を示すベクトル。 （Geometry.computeFaceNormalsを使用して）自動的に計算された場合、これは三角形の2つの辺の正規化された外積です。デフォルトは（0、0、0）です。
  https://threejs.org/docs/index.html#api/en/core/Geometry.computeFaceNormals
  https://threejs.org/docs/index.html#api/en/core/Face3.normal

  ```javascript
  // 法線の再計算
  geometry.computeFaceNormals();
  ```



- **``Geometry.computeFaceNormals() : null``**
  法線 - Face3の方向を示すベクトル。 （Geometry.computeFaceNormalsを使用して）自動的に計算された場合、これは三角形の2つの辺の正規化された外積です。デフォルトは（0、0、0）です。
  https://threejs.org/docs/index.html#api/en/core/Geometry.computeFaceNormals
  https://threejs.org/docs/index.html#api/en/core/Face3.normal

  ```javascript
  // pushで面を追加
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  Vector3( x : Float, y : Float, z : var geometry = new THREE.Geometry();
  
  geometry.computeBoundingSphere();Float )
  // example code
  var a = new THREE.Vector3( 0, 1, 0 );
  //no arguments; will be initialised to (0, 0, 0)
  var b = new THREE.Vector3( );
  var d = a.distanceTo( b );
  ```



- 

---
### メモ

- **頂点の定義**
  Face3()で面を作成する際、カメラに向かって面の裏表を判断するのに頂点定義の順序が重要
  正面向きの面：時計回り
  裏側向きの面：反時計回り

  ```javascript
  // 反時計回りに頂点順序を定義
  new THREE.Face(0, 2, 1)
  ```

- **頂点群 (vertices)**

- 

------

### 参考

- 

