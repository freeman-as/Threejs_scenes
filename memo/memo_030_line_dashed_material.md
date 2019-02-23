## 030_line_dashed_material

``THREE.LineDashedMaterial``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``LineDashedMaterial``**
  破線でワイヤフレームスタイルのジオメトリを描画するためのマテリアル
  https://threejs.org/docs/#api/en/materials/LineDashedMaterial

  ```javascript
  // constructor
  LineDashedMaterial( parameters : Object )
  // code example
  const material = new THREE.LineDashedMaterial( {
  	color: 0xffffff,
  	linewidth: 1,
  	scale: 1,
  	dashSize: 3,
  	gapSize: 1,
  } );
  ```



- **``computeLineDistances () : Line``**
  ``LineDashedMaterial``に必要な距離値の配列を計算。ジオメトリ内の各頂点について、このメソッドは現在の点からラインの先頭までの累積長を計算する
  https://threejs.org/docs/#api/en/objects/Line.computeLineDistances

  ```javascript
  // code example
  lines.computeLineDistances();
  const material = new THREE.LineDashedMaterial( {
  	color: 0xffffff,
  	dashSize: 10,
  	gapSize: 1,
  	scale: 1
  } );
  ```



- 

---
### メモ

- **``THREE.LineDashedMaterial``**
  線に色を付けるだけではなく、点線の効果も加えることができる
- **``dashSize``**
  点の長さ
- **``gapSize``**
  点間の長さ
- **``computeLineDistances()``**
  ``THREE.LineBasiceMaterial``と違い、線を構成する頂点間の距離を計算するために、呼び出す必要がある
  呼び出さない場合は点間が正確に設定されないので注意
- 

------

### 参考

- 
