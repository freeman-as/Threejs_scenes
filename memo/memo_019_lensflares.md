## 019_lensflares

``THREE.Lensflare``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``Lensflare``**
  ライトを追跡する模擬レンズフレアを作成
  https://threejs.org/docs/#examples/objects/Lensflare

  ```javascript
  // constructor
  LensflareElement( texture : Texture, size : Float, distance : Float, color : Color, blending : Materials )
  // - texture: フレアに使用するTHREE.Texture
  // - size: ピクセル単位のサイズ
  // - distance: (0-1) 光源から(0 =光源側)
  // - color: レンズフレアの色
  // - blending: デフォルトはTHREE.NormalBlending
  
  // code example
  var light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
  
  var textureLoader = new THREE.TextureLoader();
  
  var textureFlare0 = textureLoader.load( "textures/lensflare/lensflare0.png" );
  var textureFlare1 = textureLoader.load( "textures/lensflare/lensflare2.png" );
  var textureFlare2 = textureLoader.load( "textures/lensflare/lensflare3.png" );
  
  var lensflare = new THREE.Lensflare();
  
  lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
  lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
  lensflare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );
  
  light.add( lensflare );
  ```



- 

---
### メモ

- **``THREE.Lensflare``**
  太陽やその他の明るい光源を直接写真に撮ると現れる光輪
  3Dシーンでレンズフレアを使うと、シーンがより現実的に見える効果がある
- **``texture``**
  フレアの形を決める画像
- **``size``**
  フレアがどのくらい大きいか指定。サイズはピクセルで指定し、-1を指定するとテクスチャ自身のサイズ
- **``blending``**
  フレアのための画像は複数指定することができるので、ブレンディングモードでそれらをどのように混ぜ合わせるか決める
- **``Blending Mode``**
  https://threejs.org/docs/#api/en/constants/Materials
- 

------

### 参考

- 

