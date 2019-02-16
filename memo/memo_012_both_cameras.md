## 012_both_cameras

カメラの平行投影と透視投影を切り替える

---
### 使用したThree.jsのAPIについて(抜粋)

- **``PerspectiveCamera``**
  この投影モードは、人間の目の見え方を模倣するように設計。これは、3Dシーンのレンダリングに使用される最も一般的な投影モード
  https://threejs.org/docs/#api/en/cameras/PerspectiveCamera

  ```javascript
  // constructor
  PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  // - fov: 視野角
  // - aspect: 横幅と縦幅の比
  // - near: カメラのどのくらい近くから描画を開始するか指定
  // - far: カメラからどのくらい遠くまで見えるか指定
  // code example
  // 数値は推奨値
  const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 2000 );
  scene.add( camera );
  ```



- **``OrthographicCamera``**
  この投影モードでは、レンダリングされたイメージ内のオブジェクトのサイズは、カメラからの距離に関係なく一定のまま。 これは、特に2DシーンやUI要素のレンダリングに役立つ
  https://threejs.org/docs/#api/en/cameras/OrthographicCamera

  ```javascript
  // constructor
  OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
  // - left: カメラ錐台の左側面(描画領域の左境界)
  // - right: カメラ錐台の右側面(描画領域の右境界)
  // - top: カメラ錐台の上側面(描画領域の上限)
  // - bottom: カメラ錐台の下側面(描画領域の下限)
  // - near: カメラ位置を基準にこの点より向こう側がシーンに描画
  // - far: カメラ位置を基準にこの点までがシーンに描画
  // code example
  // 数値は推奨値
  const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  scene.add( camera );
  ```



- 

---
### メモ

- **透視投影**
  カメラから遠方にあるものほど小さく描画される
- **``平行投影``**
  オブジェクトとカメラの距離が描画サイズに影響しない
  平行投影では縦横比もFOVも考慮しない
  描画対象としたい直方体領域を定義する
  描画領域外のものは見なくなる
- **``fov``**
  水平方向のFOVを定義。垂直方向のFOVはfovプロパティとaspectプロパティに基づいて決定
- 

------

### 参考

- 

