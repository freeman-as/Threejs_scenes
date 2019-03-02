## 053_program_based_sprites

``THREE.CanvasRenderer``によるパーティクル表現とプロパティ詳細について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``CanvasRenderer``**
  ``THREE.Points``で使用されるデフォルトのマテリアル
  r98で廃止された
  https://github.com/mrdoob/three.js/blob/r96/examples/js/renderers/CanvasRenderer.js

  ```javascript
  // constructor
  CanvasRenderer( parameters : Object )
  // code example
  ```



- **``SpriteCanvasMaterial``**
  ``THREE.Points``で使用されるデフォルトのマテリアル
  r98で廃止された
  https://github.com/mrdoob/three.js/blob/r96/examples/js/renderers/CanvasRenderer.js

  ```javascript
  // constructor
  SpriteCanvasMaterial
  
  // code example
  ```



---
### メモ

- **``THREE.CanvasRenderer``**
  canvas要素をレンダリング
- **``THREE.SpriteCanvasMaterial``**
  canvas要素の出力をパーティクルのテクスチャに使用できるマテリアル
  プロパティ：`color` `program` `opcity` `transparent` `blending` `rotation`
- **``THREE.SpriteCanvasMaterial.program``**
  canvasのコンテキストをパラメーターとして受け取る関数。パーティクルが描画されるときに呼び出される。2D描画コンテキストへの呼び出しの結果がパーティクルとして表示される
  このコンテキスト上に描画されたものがすべて`THREE.Sprite`の形状として使用される
- **``THREE.SpriteCanvasMaterial.rotation``**
  canvasの表示内容を回転できる。通常はcanvasの内容を正しくそろえるために値を`Math.PI`に設定する
  マテリアルのコンストラクタで渡すことが出来ないので明示的に設定する
- 

------

### 参考

- 
