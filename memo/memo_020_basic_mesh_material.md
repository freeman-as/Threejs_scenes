## 020_basic_mesh_material

``THREE.Materail``の基本機能

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Materail``**
  Materialsの抽象基本クラス。 マテリアルはオブジェクトの外観を表す。それらは（ほとんど）レンダラに依存しない方法で定義されているので、別のレンダラを使用することにした場合、マテリアルを書き換える必要はない。このクラスのプロパティとメソッドは、他のすべてのマテリアルタイプに継承（ただし、デフォルトは異なる場合がある）
  https://threejs.org/docs/#api/en/materials/Material

  ```javascript
  // constructor
  Material()
  ```



- **``MeshBasicMaterial``**
  単純な網掛け（フラットまたはワイヤフレーム）でジオメトリを描画するためのマテリアル。 光の影響を受けない
  https://threejs.org/docs/#api/en/materials/MeshBasicMaterial

  ```javascript
  // constructor
  MeshBasicMaterial( parameters : Object )
  // [property](一部)
  // - color:
  // - wireframe: 
  // - vertexColors: それぞれの頂点に適用される色を個別に定義
  // - fog: グローバルなfog設定影響を受けるかどうか指定
  ```



- 

---
### メモ

- **``THREE.Material``**
  マテリアルの基本クラスで、全マテリアル共通のプロパティを含む
  https://threejs.org/docs/#api/en/materials/Material
  大きく3つのプロパティグループに分けることができる
  - 基本的なプロパティ
  - ブレンディングプロパティ
    描画される色が物体の後ろにある色とどのように相互作用するかを指定
  - 高度なプロパティ
    WebGLの内部的な動作に関係する
- **``id``**
  マテリアルを特定したり、作成時に代入したりするために使用
  最初のマテリアルの値が0から始まり、作成されるたびに1ずつ増加する
- **``name``**
  名前を設定できる。デバッグなどで使用
- **``transparent``**
  ``true``に設定するとオブジェクトの透明度に従って描画
  アルファチャンネルが設定されたテクスチャを使用する場合、``true``に設定しなければならない
- **``side``**
  ジオメトリの裏表どちら側にマテリアルを適用するか指定
  デフォルト値は``THREE.FrontSIde``オブジェクトの正面(外側)に適用
  ``TRHEE.BackSide(裏側) ``、``THREE.DoubleSide(両面)`` がある
- **``clippingPlanes``**
  ``THREE.Plane``オブジェクトの配列を設定すると、マテリアルが設定されているメッシュの表示がそれら平面の法線側で切り取られた領域に限られる。デフォルト値は空の配列
- **``clippingShadows``**
  ``clippingPlanes``が影にも影響を与えるかどうか指定
- **``needsUpdate``**
  マテリアルの更新には変更されたことを通知する必要があり、このプロパティを``true``に設定すると、新しく設定したプロパティでマテリアルのキャッシュを更新する
- **ブレンディングプロパティ**
  https://threejs.org/docs/#api/en/constants/CustomBlendingEquations
- 

------

### 参考

- ``THREE.CanvasRenderer``
  r98で削除された
  https://twitter.com/mrdoob/status/1058022036038148096

