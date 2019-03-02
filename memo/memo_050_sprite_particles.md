## 050_sprite_particles

``THREE.Sprite``によるパーティクル表現

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Sprite``**
  常に部分的に透明なテクスチャが適用された、常にカメラの方を向いている平面
  スプライトは影を落とさない
  https://threejs.org/docs/#api/en/objects/Sprite

  ```javascript
  // constructor
  Sprite( material : Material )
  // - material: SpriteMaterialのインスタンス. デフォルトは白いSpriteMaterial
  
  // code example
  const spriteMap = new THREE.TextureLoader().load( "sprite.png" );
  const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  const sprite = new THREE.Sprite( spriteMaterial );
  scene.add( sprite );
  ```



- **``SpriteMaterial``**
  スプライトと共に使用するためのマテリアル
  https://threejs.org/docs/#api/en/materials/SpriteMaterial

  ```javascript
  // constructor
  SpriteMaterial( parameters : Object )
  
  // code example
  const spriteMap = new THREE.TextureLoader().load( 'textures/sprite.png' );
  const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
  const sprite = new THREE.Sprite( spriteMaterial );
  sprite.scale.set(200, 200, 1)
  scene.add( sprite );
  ```



- 

---
### メモ

- **``THREE.Sprite``**
  スプライトの作成
  プロパティを与えなければ小さい白い2次元の正方形として描画される
  引数のマテリアルは``THREE.SpriteMaterial`` ``THREE.SpriteCanvasMaterial``でなければならない
  ``THREE.Object3D``を継承し、``THREE.Mesh``と同じように動作するのでプロパティや関数の多くを共通のものを使える(``position`` ``scale`` ``translate``など)
  ``Three.js``がそれぞれのオブジェクトを個別に管理する必要があるので、大量のオブジェクトを扱うとパフォーマンス上の問題が発生する
- **``パーティクル``**
  スプライトとも呼ばれ、大量の小さなオブジェクトを作成して炎や煙などのエフェクトを実現できる
  個々のジオメトリをパーティクルの集まりとして描画、個別に制御することもできる
- **``スプライト``**
  常に面をカメラの方に向けている2Dの平面
- 

------

### 参考

- 
