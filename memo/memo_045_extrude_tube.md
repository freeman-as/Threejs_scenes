## 045_extrude_tube

``THREE.TubeGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``TubeGeometry``**
  3D曲線に沿って押し出されるチューブを作成
  https://threejs.org/docs/#api/en/geometries/TubeGeometry

  ```javascript
  // constructor
  TubeGeometry(path : Curve, tubularSegments : Integer, radius : Float, radialSegments : Integer, closed : Boolean)
  // - path: Curve基本クラスから継承したパス
  
  // code example
  function CustomSinCurve( scale ) {
  	THREE.Curve.call( this );
  	this.scale = ( scale === undefined ) ? 1 : scale;
  }
  CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
  CustomSinCurve.prototype.constructor = CustomSinCurve;
  CustomSinCurve.prototype.getPoint = function ( t ) {
  	const tx = t * 3 - 1.5;
  	const ty = Math.sin( 2 * Math.PI * t );
  	const tz = 0;
  	return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
  };
  const path = new CustomSinCurve( 10 );
  const geometry = new THREE.TubeGeometry( path, 20, 2, 8, false );
  const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  const mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  ```



- 

---
### メモ

- **``THREE.TubeGeometry``**
  3次元のスプライン曲線に沿って押し出されたチューブを作成
  頂点群の点列を``THREE.CatmullRomCurve3``(``THREE.Curveを継承``)に変換することで定義した点列からなめらかな曲線を生成する
- **``THREE.TubeGeometry.path``**
  チューブが従うパスを規定
- **``THREE.CatmullRomCurve3``**
  Catmull-Romアルゴリズムを使用して一連の点から滑らかな3Dスプライン曲線を作成
  https://threejs.org/docs/#api/en/extras/curves/CatmullRomCurve3
- 

------

### 参考

- 
