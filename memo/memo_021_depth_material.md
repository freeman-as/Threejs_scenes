## 021_depth_material

``THREE.MeshDepthMaterial``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``MeshDepthMaterial``**
  深さで図形を描くためのマテリアル。奥行きは、カメラの近距離および遠距離に基づき、白が一番近く、黒が一番遠い
  https://threejs.org/docs/#api/en/materials/MeshDepthMaterial

  ```javascript
  // constructor
  MeshBasicMaterial( parameters : Object )
  // [property](一部)
  // - wireframe: 
  ```


- 

---
### メモ

- **``THREE.MeshDepthMaterial``**
  オブジェクトの見た目は特定のプロパティではなく、オブジェクトからカメラまでの距離だけで決まる
  単独ではあまり利用せず、他のマテリアルと組み合わせることで効果を発揮する
  ``near``,``far``プロパティの範囲外はカメラの可視領域から外れる
  カメラの``near``,``far``プロパティと比べてその間の距離によりオブジェクトの色の変化の速さが決まる
  距離が小さければ非常に早く変化する
  カメラの可視領域が狭いほど色の変化が激しくなる
- **``scene.overrideMaterial``**
  ``THREE.Mesh``オブジェクトそれぞれのマテリアルを明示的に指定しなくてもすべてのオブジェクトでマテリアルが適用される
  シーン内のすべてがそのマテリアルでレンダリングされるように強制
  https://threejs.org/docs/#api/en/scenes/Scene.overrideMaterial
- 

------

### 参考

- 
