## 054_program_based_point_cloud_webgl

``THREE.PointsMaterial``によるcanvas要素のテクスチャ使用について

---
### 使用したThree.jsのAPIについて(抜粋)

- 

---
### メモ

- **``THREE.PointsMaterial.map``**
  パーティクルで使用するテクスチャ(`THREE.Texture`)を指定できる
  `Three.js`では**canvas要素の出力をテクスチャとして使用**できるので、
  `map`プロパティを使用することでcanvas要素の出力をパーティクルのテクスチャに使える
- **``THREE.PointsMaterial.depthWirte``**
  `false`の値を設定することで深度バッファに影響を与えなくなる
  パーティクルが部分的に重なっていたり半透明部分が正しく表示されない場合はこのプロパティを`false`に設定すると解消される
- **``THREE.Object3D.frustumCulled``**
  ``true``に設定すると**パーティクルがカメラに映る範囲外に出たときに描画しなくなる**ので、パフォーマンスが向上し、フレームレートが改善されることがある
  https://threejs.org/docs/#api/en/core/Object3D.frustumCulled
- 

------

### 参考

- 
