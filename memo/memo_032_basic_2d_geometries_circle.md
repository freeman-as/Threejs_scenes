## 032_basic_2d_geometries_circle

``THREE.CircleGeometry``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``CircleGeometry``**
  ユークリッド幾何の単純な形。中心点を中心にして与えられた半径のところまで伸びている多数の三角形セグメントから構成。それは開始角度と与えられた中心角度から反時計回りに作られている。また、セグメント数が辺の数を決定し通常の多角形を作成するためにも使用できる
  https://threejs.org/docs/#api/en/geometries/CircleGeometry

  ```javascript
  // constructor
  CircleGeometry(radius : Float, segments : Integer, thetaStart : Float, thetaLength : Float)
  // - radius: 円の半径、デフォルト=1
  // - segments: セグメント数(三角形)。最小=3, デフォルト=8
  // - thetaStart: 最初のセグメントの開始角度。デフォルト=0(3時の位置)
  // - thetaLength: 多くの場合thetaと呼ばれる、円形セクターの中心角。デフォルト=2*Piで完全な円
  // code example
  const geometry = new THREE.CircleGeometry( 5, 32 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const circle = new THREE.Mesh( geometry, material );
  scene.add( circle );
  ```



- 

---
### メモ

- **``THREE.CircleGeometry``**
  単純な2次元の円（もしくは部分円）を作成

- **``radius``**
  半径は円の中心から円周までの距離

- **``segments``**
  円を作成するために使用する面の数を指定

- **``thetaStart``**
  円を描き始める場所を指定。``0 ~ 2 * Math.PI``の範囲の値を取れる

- **``thetaLength``**
  どこで円周が終了するかを指定。``2 * Math.PI``で完全な円になる

- **``度をラジアンに変換``**

  ```javascript
  // code example
  function deg2rad(degrees) {
      return degrees * Math.PI / 180;
  }
  ```

- **``ラジアンを度に変換``**

  ```javascript
  // code example
  function rad2degree(radians) {
      return radians * 180 / Math.PI;
  }
  ```

- **``Three.jsの2次元形状の座標系について``**
  ``x-y``平面上に作成するので、地面などを作りたいときは``x-z``平面に作成する必要がある
  2次元オブジェクトを垂直ではなく水平向きに作成するには、
  メッシュをx軸周りに1/4逆回転``(-Math.PI / 2)``させれば良い

  ```javascript
  // code example
  mesh.rotation.x = -Math.PI / 2;
  ```

- 

------

### 参考

- 
