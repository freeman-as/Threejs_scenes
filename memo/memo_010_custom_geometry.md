## 010_custom_geometry

頂点と面による立方体

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Geometry``**
  Geometryは、BufferGeometryのユーザーフレンドリーな代替方法。ジオメトリは、読みやすく編集しやすいVector3やColorのようなオブジェクトを使用して属性（頂点位置、面、色など）を格納しますが、型付き配列よりも効率が悪くなる
  https://threejs.org/docs/index.html#api/en/core/Geometry

  ```javascript
  // constructor no arguments
  // 頂点をverticesプロパティ、面をfacesプロパティに代入してインスタンスを作成
  var geometry = new THREE.Geometry();
  geometry.vertices.push(
  	new THREE.Vector3( -10,  10, 0 ),
  	new THREE.Vector3( -10, -10, 0 ),
  	new THREE.Vector3(  10, -10, 0 )
  );
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  ```




- **``Geometry.vertices : Array``**
  頂点の配列 頂点の配列は、モデル内のすべての頂点の位置を保持。 この配列の更新を通知するには、.verticesNeedUpdateをtrueに設定する
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
  面の配列 面の配列は、モデル内の各頂点がフォーム面にどのように接続されているかを表す。さらに、面と頂点の法線と色に関する情報も保持
  https://threejs.org/docs/index.html#api/en/core/Geometry.faces

  ```javascript
  // pushで面を追加
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  ```



- **``Geometry.computeFaceNormals() : null``**
  法線 - Face3の方向を示すベクトル。 （Geometry.computeFaceNormalsを使用して）自動的に計算された場合、これは三角形の2つの辺の正規化された外積。デフォルトは（0、0、0）
  https://threejs.org/docs/index.html#api/en/core/Geometry.computeFaceNormals
  https://threejs.org/docs/index.html#api/en/core/Face3.normal

  ```javascript
  // 法線の再計算
  geometry.computeFaceNormals();
  ```



- **``Geometry.verticesNeedUpdate : Boolean``**
  頂点配列が更新されている場合はtrueに設定
  https://threejs.org/docs/index.html#api/en/core/Geometry.verticesNeedUpdate

  ```javascript
  // 頂点の更新
  geometry.verticesNeedUpdate = true;
  ```



- **``Geometry.clone(): Geometry``**
  Geometryの新しいクローンを作成。 頂点、面、UVだけをコピー。ジオメトリの他のプロパティはコピーされない
  https://threejs.org/docs/index.html#api/en/core/Geometry.clone

  ```javascript
  // クローンジオメトリ作成
  const cloneGeometry = geometry.clone();
  ```



- **``SceneUtils.createMultiMaterialObject ( geometry : Geometry, materials : Array ): Group``**
  Materialsに定義された各マテリアルの新しいメッシュを含む新しいグループを作成。これは、1メッシュに複数の材料を定義する一連の材料と同じではないことに注意。これは、マテリアル実装とワイヤフレーム実装の両方を必要とするオブジェクトに最も役立つ
  https://threejs.org/docs/#examples/utils/SceneUtils.createMultiMaterialObject

  ```javascript
  // クローンジオメトリからメッシュ作成
  const cloneGeometry = geometry.clone();
  const cloneMaterial = new THREE.Mesh...
  const cloneMesh = THREE.SceneUtils.createMultiMaterialObject(cloneGeometry, materials);
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

- **四角ポリゴンと三角ポリゴン**
  四角ポリゴン：拡張しやすく面が滑らかになることが多いので、モデリングでの使用が好まれる
  三角ポリゴン：すべての形状を三角形として描画できると効率的なので、レンダリングやゲームエンジン内では三角ポリゴンの利用が好まれる

- **``computeFaceNormals()``**
  各面に対する法線ベクトルを計算
  シーン内の様々なライトに基づいて色を決定する際に利用する

- **``dat.GUI``非表示**：Hキーを押すと隠せる

- **``verticesNeedUpdate``**
  頂点座標を設定した場合に頂点を更新する

- **``clone()``**
  同じ形状のジオメトリに異なるマテリアルを適用することができる

- **``SceneUtils``**
  シーン操作に便利なユーティリティ関数を含むクラス
  examples/js/utils/SceneUtils.js

- **``createMultiMaterialObject()``**
  複数のマテリアルを適用。たとえば半透明のマテリアル＋ワイヤーフレーム表示など
  Meshオブジェクトを一つ作成するのではなく、指定したマテリアル用にそれぞれ一つずつメッシュを作成してそれらのメッシュをグループ(THREE.Group)にまとめる
  グループはシーンオブジェクトと同じように利用可能（内部のchildrenプロパティに複数のジオメトリが入っている状態のまま）

- 

------

### 参考

- **``THREE.WireFrameHelper``によるワイヤーフレーム追加**
  ワイヤーフレームを追加するヘルパークラス

  ```javascript
  // meshとワイヤーフレームのカラーを渡してインスタンス化
  const helper = new THREE.WireFrameHelper(mesh, 0x000000);
  // ヘルパーオブジェクトをシーンに追加
  scene.add(helper)
  // ヘルパーは内部的には単なるTHREE.LineSegmentsオブジェクトなので見え方は自由に設定可能
  // 線幅を設定するには
  helper.materail.linewidth = 2;
  ```

  ``THREE.LineSegments``
  https://threejs.org/docs/index.html#api/en/objects/LineSegments

- 

