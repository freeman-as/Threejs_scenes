## 014_ambient_light

``THREE.AmbientLight``について

---
### 使用したThree.jsのAPIについて(抜粋)

- **``AmbientLight``**
  このライトは、シーン内のすべてのオブジェクトを全体的に均等に照らす。 方向を持たないので影を落とすのには使えない
  https://threejs.org/docs/#api/en/lights/AmbientLight

  ```javascript
  // constructor
  AmbientLight( color : Integer, intensity : Float )
  // - intensity: ライトの強さ/強度の数値
  ```



- **``Color``**
  色を表すクラス
  https://threejs.org/docs/#api/en/math/Color

  ```javascript
  // constructor
  Color( r : Color_Hex_or_String, g : Float, b : Float )
  ```



- **``Color.set ( value : Color_Hex_or_String ) : Color``**
  色を表すクラス
  https://threejs.org/docs/#api/en/math/Color.set

  ```javascript
  // constructor
  Color( r : Color_Hex_or_String, g : Float, b : Float )
  ```



- 



---
### メモ

- **``THREE.Light``**
  全ライトが継承しているクラスで、共通の機能を持つ

- **``THREE.AmbientLight``**

  最も基本的なライト
  ライトの色が全体に適用。シーン内のオブジェクトに色が追加される
  特定の入射角がないので、影を落とさない
  形状に関係なく全オブジェクトのすべての面を同じ色にするため、シーン内では他の光源と併用される
  他の光源と組み合わせて影をやわらげたり、シーンに色味を加える

- **``THREE.Color``**
  生成後に色を変更するときは、新たにオブジェクトを作るか、内部プロパティを操作
  ``set() : `` 16進の値を設定。文字列やColorオブジェクトを指定
  ``setStyle() : ``CSSの色指定の方法で設定できる
  https://threejs.org/docs/#api/en/math/Color.setStyle 

- 

------

### 参考

- 

