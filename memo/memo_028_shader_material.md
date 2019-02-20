## 028_shader_material

``THREE.ShaderdMaterial``の基本機能

---
### 使用したThree.jsのAPIについて(抜粋)

- **``ShaderdMaterial``**
  カスタムシェーダでレンダリングされたマテリアル。シェーダは、GLSLで書かれたGPU上で動作する小さなプログラムです。必要に応じて、カスタムシェーダを使用可能
  https://threejs.org/docs/#api/en/materials/ShaderMaterial

  ```javascript
  // constructor
  ShaderMaterial( parameters : Object )
  // code example
  const material = new THREE.ShaderMaterial( {
  	uniforms: {
  		time: { value: 1.0 },
  		resolution: { value: new THREE.Vector2() }
  	},
  	vertexShader: document.getElementById( 'vertexShader' ).textContent,
  	fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );
  ```


- 

---
### メモ

- **``THREE.ShaderdMaterial``**
  WebGLコンテキストで直接実行される独自シェーダーを設定可能
  独自シェーダーを使用することで、オブジェクトの描画方法やThreejsのデフォルトの表示を上書きする方法を厳密に指定できる
  その他のマテリアルと同じプロパティも設定可能、それに加えて特殊なプロパティを渡すことができる

- **``fragmentShader``**
  ピクセルの色を設定。フラグメントシェーダープログラムを文字列で渡す

  ```
  特定のフラグメントについて表示すべき色を返す
  ```

- **``vertexShader``**
  頂点の位置を変更。頂点シェーダープログラムを文字列として渡す

  ```
  このシェーダーを利用することで、頂点の位置を変更してジオメトリを変形させることができる
  ```

- **``uniforms``**
  頂点シェーダーとフラグメントシェーダーの両方に同じ情報を送る

  ```
  JavaScriptレンダラーからシェーダーに情報を渡すために使用する変数
  描画ループ内で値を更新してアニメーションさせる
  ```

- **``defines``**
  シェーダープログラムにグローバル変数を追加できる

- **``attributes``**
  頂点シェーダーとフラグメントシェーダーの呼び出しごとに異なる値を設定。通常は位置や法線に関係するデータを渡すために使用。このプロパティがなければ、呼び出しごとにジオメトリのすべての頂点を渡すことになる

- **``lights``**
  ライトのデータをシェーダーに渡すかどうかを指定。デフォルト値はfalse

- **``gl_Position``**
  シェーダーの中で使用される特殊な変数で、代入した値が最終的な**座標**として返される

- **``position``**
  シェーダーの中で各頂点の座標を受け取る変数

- **``gl_FragColor``**
  シェーダーの中で使用される特殊な変数で、代入した値が最終的な**色**として返される

- 

------

### 参考

- 
