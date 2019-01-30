## 002_materials_light

---
### 使用したThree.jsのAPIについて(抜粋)

- **``SpotLight()``**
  集まる光から遠くなるほどサイズが大きくなる円錐に沿って、一方向に1点から放射されるライト
  https://threejs.org/docs/index.html#api/en/lights/SpotLight

  ```javascript
  // constructor
  SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
  // sample code
  var spotLight = new THREE.SpotLight( 0xffffff );
  ```



- **``MeshLambertMaterial()``**
  鏡面ハイライトのない、光沢のない表面用のマテリアル
  https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial

  ```javascript
  // constructor
  MeshLambertMaterial( parameters : Object )
  // sample code
  new THREE.MeshLambertMaterial({ color: 0x7777ff });
  ```




- **``renderer.shdowMap.enabled``**
  影の描画の有効・無効
  https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.shadowMap

  ```javascript
  shadowMap.enabled : Boolean
  // 影の描画には大きな計算コストがかかるので、デフォルトでは無効化されている
  // 有効化
  renderer.shadowMap.enabled = true;
  ```



- **``receiveShadow``**
  影を落とされる物体に設定

  ```javascript
  plane.receiveShadow = true;
  ```



- **``castShadow``**
  影を落とす物体に設定

  ```javascript
  cube.castShadow = true;
  ```



- **``SpotLight.castShadow``**
  シーン内で影の発生元にする設定
  https://threejs.org/docs/index.html#api/en/lights/SpotLight.castShadow

  ```javascript
  spotLight.castShadow = true;
  ```



- 

---
### メモ

- Three.jsによって提供されている光源の計算を含めるマテリアル
  **``MeshPhongMaterial()``**
  https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial
  **``MeshStandardMaterial()``**
  https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial
- 

------

### 参考

- 
