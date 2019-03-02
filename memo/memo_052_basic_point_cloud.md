## 052_basic_point_cloud

``THREE.Points``によるパーティクル表現とプロパティ詳細について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``PointsMaterial``**
  ``THREE.Points``で使用されるデフォルトのマテリアル
  https://threejs.org/docs/#api/en/materials/PointsMaterial

  ```javascript
  // constructor
  PointsMaterial( parameters : Object )
  // - parameters: (オプション)マテリアルの外観を定義する1つ以上のプロパティを持つオブジェクト. マテリアルの任意のプロパティ(Materialから継承した任意のプロパティを含む)をここに渡す
  
  // code example
  const starsGeometry = new THREE.Geometry();
  for ( var i = 0; i < 10000; i ++ ) {
  	const star = new THREE.Vector3();
  	star.x = THREE.Math.randFloatSpread( 2000 );
  	star.y = THREE.Math.randFloatSpread( 2000 );
  	star.z = THREE.Math.randFloatSpread( 2000 );
  	starsGeometry.vertices.push( star );
  }
  const starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
  const starField = new THREE.Points( starsGeometry, starsMaterial );
  scene.add( starField );
  ```



- 

---
### メモ

- **``THREE.Points.material``**
  パーティクルの色とテクスチャを設定
- **``THREE.Points.geometry``**
  個々のパーティクルがどこに配置されるかを指定
  ジオメトリを定義するために使用された頂点がそれぞれパーティクルとして描画される
- **``THREE.PointsMaterial.color``**
  パーティクルの色を指定。``vertexColors``プロパティを``true``にしてジオメトリの``colors``プロパティで頂点カラーを指定していた場合。このプロパティは上書きされる
- **``THREE.PointsMaterial.map``**
  パーティクルにテクスチャを適用できる
  canvas要素の出力結果も設定可能
- **``THREE.PointsMaterial.size``**
  パーティクルの大きさ
- **``THREE.PointsMaterial.sizeAttenuation``**
  ``false``に設定するとすべてのパーティクルがカメラからどの程度離れているかに関係なく同じ大きさで表示される。``true``に設定するとカメラからの距離に応じて決まる
- **``THREE.PointsMaterial.vertexColors``**
  通常``THREE.Points``内のパーティクルはすべて同じ色を持つが、このプロパティの値を`THREE.VertexColors``に設定して、ジオメトリのcolors配列に値が設定されていると、代わりにその配列内の色が使用される
- **``THREE.PointsMaterial.transparent``**
  ``true``に設定するとパーティクルが``opacity``で設定された透明度で描画される
- **``THREE.PointsMaterial.blending``**
  ブレンドモードを指定
- **``THREE.PointsMaterial.fog``**
  シーンに設定されているフォグの影響を受けるかどうか指定。デフォルトは``true``
- 

------

### 参考

- 
