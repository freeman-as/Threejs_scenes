## 023_mesh_normal_material

``THREE.MeshNormalMaterial``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``MeshNormalMaterial``**
  法線ベクトルをRGBカラーにマッピングするマテリアル
  https://threejs.org/docs/#api/en/materials/MeshNormalMaterial

  ```javascript
  // constructor
  MeshNormalMaterial( parameters : Object )
  // [property](一部)
  // - wireframe: 
  ```


- 

---
### メモ

- **``法線``**
  面に対して垂直なベクトルのこと
  光の反射の計算やテクスチャマッピング、ライトの当て方、陰や色を付けるか決めるなど様々なシーンで利用される
  基本的には内部的に計算してくれるので自分で計算する必要はない

- **``THREE.MeshNormalMaterial``**
  法線が指す方向が面の色の決定に使用
  球などの場合、構成する面の法線はすべて違う方向を向いていて、各法線の間は滑らかに補間される
  る

- **``THREE.ArrowHelper``**
  方向を視覚化するための3D矢印オブジェクト
  https://threejs.org/docs/#api/en/helpers/ArrowHelper

  ```              javascript
  // constructor
  ArrowHelper(dir : Vector3, origin : Vector3, length : Number, hex : Number, headLength : Number, headWidth : Number )
  ```

- 


------

### 参考

- 
