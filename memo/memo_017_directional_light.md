## 017_directional_light

``THREE.DirectionalLight``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``DirectionalLight``**
  この光は単一の点から一方向に放射
  https://threejs.org/docs/#api/en/lights/DirectionalLight

  ```javascript
  // constructor
  DirectionalLight( color : Integer, intensity : Float )
  ```



- 


---
### メモ

- **``THREE.DirectionalLight``**
  ある一点からではなく、2次元平面からそれぞれ平行な光線を放つ光源
  太陽の光のようなものと考える
  ターゲットがどれほど遠くにあってもライトは減衰しない
  照らされる領域はすべて同じ強さの光を受ける

- **``shadow.camera``**
  ライトがどこに影を落とすか制御
  ``THREE.SpotLight``とは違い、平行投影カメラの視界を決める方法と同じように影を落とす領域を指定

- 


------

### 参考

- 

