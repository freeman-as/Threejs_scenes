## 018_hemisphere_light

``THREE.HemisphereLight``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``HemisphereLight``**
  シーンの真上に配置された光源で、色は空色から地色に消えていく。 この光は影を落とすのには使えない
  https://threejs.org/docs/#api/en/lights/HemisphereLight

  ```javascript
  // constructor
  HemisphereLight( skyColor : Integer, groundColor : Integer, intensity : Float )
  ```



- 

---
### メモ

- **``THREE.HemisphereLight``**
  アウトドアシーンを表現できる自然なライティングを作成するのに使用
  屋外にいるような見た目の自然なライティングにできる
  太陽光の拡散や物体の反射などの状況を再現する
  空から受ける光の色と地面から受ける光の色、光の強度を設定

- **``groundColor : ``**地面からの光の色
  **``color : ``**空からの光の色
  **``position : ``**空からの光の向き。デフォルト値は(0, 1, 0)

- 

------

### 参考

- 

