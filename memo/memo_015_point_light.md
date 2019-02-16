## 015_point_light

``THREE.PointLight``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``PointLight``**
  一点から全方向に放射される光。これに関する一般的な使用例は、裸電球から発せられた光を複製すること
  https://threejs.org/docs/#api/en/lights/PointLight

  ```javascript
  // constructor
  PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
  // - distance: 光の最大範囲デフォルトは0（制限なし）
  // - decay: ライトの距離に沿ってライトが減光する量。デフォルトは1。物理的に正しい照明の場合は、これを2に設定
  ```



- 

---
### メモ

- **``THREE.PointLight``**
  一点から全方向に向かって光を発する光源
  全方向に光を発するので、影の計算がGPUにとって非常に重たい処理になるので、影を発生させない
- **``decay``**
  ライトからの距離に応じて光が減衰する量
- **``distance``**
  ライトの光が届く距離
  値を0にすることで、光が距離によって一切減衰しなくなる
- 

------

### 参考

- 

