## 005_screen_size_change

---
### 使用したThree.jsのAPIについて(抜粋)

- **``camera.updateProjectionMatrix()``**
  カメラの射影行列を更新。基本パラメータを変更した後には呼び出す必要がある
  https://threejs.org/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix

  ```javascript
  updateProjectionMatrix () : null
  // sample code
  camera.updateProjectionMatrix();
  ```




- **``WebGLRenderer.setSize()``**
  デバイスのピクセル比率を考慮して、出力キャンバスを（width、height）にサイズ変更し、さらに（0、0）から始まってそのサイズに合うようにビューポートを設定する
  https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setSize

  ```javascript
  setTextureCube ( cubeTexture : CubeTexture, slot : Number ) : null
  // sample code
  renderer.setSize(window.innerWidth, window.innerHeight);
  ```




- 

---
### メモ

- リサイズ方法
  resizeハンドラで再計算する

  ```javascript
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  ```

- 

------

### 参考

- 
