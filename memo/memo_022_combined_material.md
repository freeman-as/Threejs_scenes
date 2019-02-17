## 022_combined_material

``THREE.SceneUtils.createMultiMaterialObject``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``.createMultiMaterialObject ( geometry : Geometry, materials : Array ) : Group``**
  Materialsに定義された各マテリアルの新しいメッシュを含む新しいグループを作成。これは、1メッシュに複数のマテリアルを定義する一連のマテリアルと同じではないことに注意。これは、マテリアル実装とワイヤフレーム実装の両方を必要とするオブジェクト作成が可能
  https://threejs.org/docs/#examples/utils/SceneUtils.createMultiMaterialObject

  ```javascript
  // Note
  ```


- 

---
### メモ

- **``THREE.MeshDepthMaterial``**
  色を設定するオプションがなく、マテリアルのデフォルトプロパティによって決まる

- **``THREE.SceneUtils.createMultiMaterialObject``**
  このメソッドでメッシュを作成すると、ジオメトリをコピーして2つの厳密に同じメッシュをグループ内に入れて返す
  あるオブジェクトが別のオブジェクトの上に描画されるとき片方が半透明だとちらつきが発生することがあるが、メッシュを縮小すると避けることができる

- **``MeshDepthMaterial``との複数マテリアル作成方法**

  1. ``THREE.MeshBasicMaterial``の``transparent``を``true``
     ``true``に設定しないとすでに描画されている色を考慮しないため
  2. ブレンディングモードを設定
     ``blending``プロパティを確認して背景の影響をどう受けるか判断
     背景を``MeshDepthMaterial``にすればその効果が付与される

  ```javascript
  // code example
  const cubeMaterial = new THREE.MeshDepthMaterial();
  const colorMaterial = new THREE.MeshBasicMaterial({
      color: controls.color,
      transparent: true,
  	// THREE.MultiplyBlendingモードは前景の色と背景の色を掛け合わせる
      blending: THREE.MultiplyBlending
  });
  const cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [colorMaterial, cubeMaterial]);
  ```

- 

------

### 参考

- 
