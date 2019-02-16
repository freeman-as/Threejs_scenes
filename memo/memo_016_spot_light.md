## 016_spot_light

``THREE.SpotLight``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``SpotLight``**
  この光は単一の点から一方向に放射
  https://threejs.org/docs/#api/en/lights/SpotLight

  ```javascript
  // constructor
  SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
  // - angle: 上限がMath.PI / 2である方向からの最大光拡散角度。単位はラジアンでデフォルトはMath.PI/3
  // - penumbra: 半影により減衰するスポットライトコーンの割合。ゼロと1の間の値を取る。デフォルトはゼロ
  ```



- **``SpotLightShadow``**
  これは、影を計算するためにSpotLightsによって内部的に使用される
  https://threejs.org/docs/#api/en/lights/shadows/SpotLightShadow

  ```javascript
  // Note
  ```



- 

---
### メモ

- **``THREE.SpotLight``**
  特定の点から円錐状に光を発する光源
  影を使いたい場合にもっとも頻繁に使用
  向きと角度があり、懐中電灯やランタンのようなものと考えるわかりやすい

- **``penumbra``**
  ``SpotLight``は光源から遠ざかるほど光の強さが弱まり、その強さがどのくらい急速に減衰するかを決定する
  小さい値は遠くのオブジェクトまで届き、大きな値を指定すると光源から非常に近いオブジェクトにしか届かない

- **``target``**
  特定のオブジェクトもしくはシーン内の特定の位置に光を向けることができる
  ``THREE.Object3D``オブジェクトを指定する必要がある

  ```javascript
  // 空間内の任意の場所に向ける
  const target = new THREE.Object3D();
  target.position.set(5, 0, 0);
  spotliget.target = target;
  // THREE.SpotLight作成直後であれば、targetプロパティのデフォルトでTHREE.Object3Dが設定されているので直接positionを設定してもいい
  spotlight.target.position.set(5, 0, 0);
  ```

- **``angle``**
  光の円錐の幅を定義
  値を小さくしすぎると、画面上にアーチファクトを発生させるので注意

- **``distance``**
  円錐の高さを設定

- **``shadow.camera``**
  ライトがどこに影を落とすか制御
  透視投影カメラなので、カメラの視界を決める方法と同じように影を落とす領域を指定する
  ``THREE.CameraHelper``を使用することで、ライトが影を表示するために影響を与えている領域を可視化
  影がブロック状に見えるときは、``shadow.mapSize.width``と``shadow.mapSize.height``の両方を大きくするか、影の計算対象領域が広すぎないか確認する

  ```javascript
  // cameraHelper追加
  const cameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  scene.add(cameraHelper);
  ```

- **``WebGLRenderer.shadowMap.type``**
  デフォルトの値から変更することで、淡い影の表現なども可能
  ``PCFShadowMap : ``柔らかい影になる

- 

------

### 参考

- 

