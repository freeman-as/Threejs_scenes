## 003_materials_light_animation

---
### 使用したThree.jsのAPIについて(抜粋)


- 

---
### メモ

- **``requestAnimetionFrame()``**
  フレームアニメーションさせる
  https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
  setIntervalと違い実行タイミングはブラウザが保証してくれる

  ```javascript
  window.requestAnimationFrame(callback);
  // sample code.
  // 再帰的に呼び出して使用
  rendererScene();
  function renderScene(){
      requestAnimationFrame(rendererScene);
  }
  ```

- 

------

### 参考

- **stats.js**
  フレームレート（1秒ごとのフレーム数）に関する情報を表示できるヘルパーライブラリ
  https://github.com/mrdoob/stats.js
- 
