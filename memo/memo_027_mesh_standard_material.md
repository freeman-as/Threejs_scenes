## 027_mesh_standard_material

``THREE.MeshStandardMaterial``の基本機能

---
### 使用したThree.jsのAPIについて(抜粋)

- **``MeshStandardMaterial``**
  Metallic-Roughnessワークフローを使用した、標準的な物理ベースのマテリアル
  https://threejs.org/docs/#api/en/materials/MeshStandardMaterial

  ```javascript
  // constructor
  MeshStandardMaterial( parameters : Object )
  // [property](一部)
  // - metalness: マテリアルがどの程度金属っぽいか。木や石などの非金属材料は0.0を使用し、金属使用は1.0を使用し、間には何もない（通常）。デフォルトは0.5
  // - metalnessMap: このテクスチャの青いチャンネルは、素材の金属性を変えるために使用
  // - roughness: マテリアルがどれくらい粗いかを表す。 0.0は滑らかな鏡面反射、1.0は完全拡散を意味し、デフォルトは0.5。ラフネスマップも指定されている場合は、両方の値が乗算される
  // - roughnessMap: このテクスチャの緑色のチャンネルは、素材の粗さを変えるために使用
  ```



- 

---
### メモ

- **``THREE.MeshStandardMaterial``**
  簡易的な物理ベースレンダリング(Physically based rendering : PBR)を実現するマテリアル
  オブジェクトの質感をより物理現象に則した形で実現しようとする
- **``metalness``**
  金属性。この値で光をどの程度どのような色で反射するか決まる
- **``metalnessMap``**
  ``metalness``をより細かく指定するためのテクスチャ
- **``roughness``**
  表面の粗さ。光沢の度合いを指定
- **``roughnessMap``**
  ``roughness``をより細かく指定するためのテクスチャ
- 

------

### 参考

- 
