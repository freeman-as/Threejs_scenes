## 007_foggy_scene

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Fog``**
  このクラスは、線形フォグを定義、すなわち距離と共に線形に密になるパラメータを含む
  https://threejs.org/docs/index.html#api/en/scenes/Fog

  ```javascript
  // constructor
  Fog( color : Integer, near : Float, far : Float )
  // - near: フォグをかけ始める最小距離
  // ※アクティブなカメラから「近い」単位よりも小さいオブジェクトは、フォグの影響を受けない
  // - far: フォグの計算と適用が停止する最大距離
  // ※アクティブなカメラから「はるかに」離れたオブジェクトは、フォグの影響を受けない
  scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  ```




- **``FogExp2``**
  このクラスは、指数関数的なフォグを定義、すなわち距離と共に指数関数的に濃くなるパラメータを含む
  https://threejs.org/docs/index.html#api/en/scenes/FogExp2

  ```javascript
  // constructor
  FogExp2( color : Integer, density : Float )
  // - density: 霧が濃くなる速度を定義。 デフォルトは0.00025
  ```




- 

---
### メモ

- 


------

### 参考

- 
