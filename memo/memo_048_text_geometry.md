## 048_text_geometry

``THREE.TextGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``TextGeometry``**
  単一のジオメトリとしてテキストを生成するためのクラス
  これは、一連のテキスト、および読み込まれたFontとジオメトリの親``ExtrudeGeometry``の設定からなるパラメータのハッシュを提供することによって構築される
  https://threejs.org/docs/#api/en/geometries/TextGeometry

  ```javascript
  // constructor
  TextGeometry(text : String, parameters : Object)
  
  // code example
  const loader = new THREE.FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
  	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
  		font: font,
  		size: 80,
  		height: 5,
  		curveSegments: 12,
  		bevelEnabled: true,
  		bevelThickness: 10,
  		bevelSize: 8,
  		bevelSegments: 5
  	} );
  } );
  ```



- **``FontLoader``**
  JSON形式のフォントをロードするためのクラス。 ``Font``を返す。これは、フォントを表すShapesの配列。これはファイルをロードするために``FileLoader``を内部的に使用
  ``facetype.js``を使ってオンラインでフォントを変換できる
  https://threejs.org/docs/#api/en/loaders/FontLoader
  ``THREE.FileLoader``
  https://threejs.org/docs/#api/en/loaders/FileLoader
  ``THREE.Font``
  https://threejs.org/docs/#api/en/extras/core/Font
  ``THREE.LoadingManager``
  https://threejs.org/docs/#api/en/loaders/managers/LoadingManager

  ```javascript
  // constructor
  FontLoader( manager : LoadingManager )
  // - manager: ローダーが使用するloadingManager. デフォルトはTHREE.DefaultLoadingManager
  
  // code example
  const loader = new THREE.FontLoader();
  loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
  	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
  		font: font,
  		size: 80,
  		height: 5,
  		curveSegments: 12,
  		bevelEnabled: true,
  		bevelThickness: 10,
  		bevelSize: 8,
  		bevelSegments: 5
  	} );
  } );
  ```



- **``FontLoader.load()``**
  ``url``からロードを開始し、ロードしたテクスチャを``onLoad``に渡します
  https://threejs.org/docs/#api/en/loaders/FontLoader.load

  ```javascript
  // signature
  .load ( url : String, onLoad : Function, onProgress : Function, onError : Function ) : null
  ```



- 

---
### メモ

- **``THREE.TextGeometry``**
  3Dテキストを作成
  使用したいフォントと``TRHEE.ExtrudeGeometry``作成時と同様のオプションを渡す
  ``THREE.FontLoader``の``load()``のコールバック内で使用する必要があることに注意
- **``THREE.TextGeometry.parameters.font``**
  使用されるフォント。``THREE.FontLoader``で読み込む
- **``THREE.TextGeometry.parameters.size``**
  テキストのサイズ。デフォルトは100
- **``THREE.TextGeometry.parameters.height``**
  押し出される距離(深さ)。デフォルトは50
- **``THREE.TextGeometry.parameters.width``**
  フォントの太さ。normal / boldの指定が可能でデフォルトはnormal
- **``THREE.TextGeometryによる2次元フォント描画``**
  基本的にはテクスチャとして設定したマテリアルを使用する
  3Dテキストの描画には負荷がかかるので、``THREE.TextGeometry``は避ける
- **``Facetype.js``**
  フォントを``JSON``に変換するライブラリ
  ``URL: ``https://github.com/gero3/facetype.js
  ``Three.js``シーン内で使用できるフォントが公開されている
  以下のウェブページを利用すると既存のOpenTypeもしくはTrueTypeフォントを``JSON``に変換できる
  ``URL: ``http://gero3.github.io/facetype.js/
  すべてのフォントが変換できるわけではないので注意
  単純なフォント(直線が多い)ほど使用時に正しく描画される可能性が高い
- 

------

### 参考

- 
