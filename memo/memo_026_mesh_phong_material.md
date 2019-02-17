## 026_mesh_phong_material

``THREE.MeshPhongMaterial``の基本機能

---
### 使用したThree.jsのAPIについて(抜粋)

- **``MeshPhongMaterial``**
  鏡面反射光のある光沢のある表面のためのマテリアル
  https://threejs.org/docs/#api/en/materials/MeshPhongMaterial

  ```javascript
  // constructor
  MeshPhongMaterial( parameters : Object )
  // [property](一部)
  // - emissive: マテリアルの発光色、基本的に他の照明の影響を受けない無地の色。デフォルトは黒
  // - spcular: マテリアルのスペキュラカラー。既定値は0x111111（非常に濃い灰色）に設定されている色。これは、マテリアルの輝きの度合いとその輝きの色を定義
  // - shininess: ハイライトがどれほど輝いているか。値が大きいほどハイライトがシャープになる。デフォルトは30
  // - flatShading: マテリアルをフラットシェーディングでレンダリングするかどうかを定義。デフォルトはfalse
  ```



- 

---
### メモ

- **``THREE.MeshPhongMaterial``**
  シーン内の光源に反応し、光沢のない表面を作成
- **``specular``**
  光沢の色を指定。colorと同じ色に設定するとより金属のような見た目になる。灰色に設定するとプラスチックのような見た目になる
- **``shininess``**
  反射のハイライトがどのくらい明るいかを指定
- **``flatShading``**
  フラットシェーディグを適用するかどうか定義。falseを定義するとそれぞれの面の境目が見えないなめらかなオブジェクトになる
- 

------

### 参考

- 
