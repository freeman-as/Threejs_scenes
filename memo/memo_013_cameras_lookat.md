## 013_cameras_lookat

カメラの視点を特定の点へ制御

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Object3D.lookAt( vector : Vector3 ) : null``**
  **``Object3D.lookAt( x : Float, y : Float, z : Float ) : null``**
  オブジェクトを回転させてワールド空間内の点に向ける
  https://threejs.org/docs/#api/en/core/Object3D.lookAt

  ```javascript
  // 特定のメッシュに向ける
  camera.lookAt(mesh.position);
  ```



- 


---
### メモ

- **カメラの初期視点**
  シーンの中心(0, 0, 0)座標を向いている
- **``lookAt()``**
  カメラの視点を変更
- 

------

### 参考

- 

