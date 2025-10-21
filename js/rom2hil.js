/*
 
 Last change: 2024/02/19-23:43:04.

 rom2hil.js: roman2hiragana; a conversion script roman to hiragana.

 tableK, tableH, tableH_str, tableK_str, kanaType by Hilo Yamamoto 2024/02/19
 the last "\nn	ん" part has been modified by Hilo Yamamoto 2020/04/23 for Kanji Quiz
 撥音便の整備 has been modified by Hilo Yamamoto 2020/08/27 for SPOT
 roman.toLowerCase() for Capital letters.

*/

let kanaType = 0;
(function (scope) {
  scope.roman2hiragana = roman2hiragana;

  function roman2hiragana(roman, kanaType) {
    return r2h_recur(roman.toLowerCase(), "", kanaType);
  }

  function r2h_recur(roman, acum, kanaType) {
    var match, target;

    //console.log("kana:" + kanaType);

    if (roman.length === 0) return acum;
    match = roman.match(regex);
    if (match) {
      if (kanaType === "K") {
        target = tableK[match[0]].split("\t");
      } else {
        target = tableH[match[0]].split("\t");
      }
      //target = table[match[0]].split("\t");
      return r2h_recur((target[1] || "") + roman.slice(match[0].length), acum + target[0], kanaType);
    } else {
      return r2h_recur(roman.slice(1), acum + roman[0], kanaType);
    }
  }

  var tableH_str =
    "-	ー\n~	〜\n.	。\n,	、\nz/	・\nz.	…\nz,	‥\n\
zh	←\nzj	↓\nzk	↑\nzl	→\nz-	〜\nz[	『\nz]	』\n[	「\n]	」\n\
va	ゔぁ\nvi	ゔぃ\nvu	ゔ\nve	ゔぇ\nvo	ゔぉ\n\
vya	ゔゃ\nvyi	ゔぃ\nvyu	ゔゅ\nvye	ゔぇ\nvyo	ゔょ\n\
qq	っ	q\nvv	っ	v\nll	っ	l\nxx	っ	x\nkk	っ	k\n\
gg	っ	g\nss	っ	s\nzz	っ	z\njj	っ	j\ntt	っ	t\n\
dd	っ	d\nhh	っ	h\nff	っ	f\nbb	っ	b\npp	っ	p\n\
mm	っ	m\nyy	っ	y\nrr	っ	r\nww	っ	w\nwww	w	ww\ncc	っ	c\n\
kya	きゃ\nkyi	きぃ\nkyu	きゅ\nkye	きぇ\nkyo	きょ\n\
gya	ぎゃ\ngyi	ぎぃ\ngyu	ぎゅ\ngye	ぎぇ\ngyo	ぎょ\n\
sya	しゃ\nsyi	しぃ\nsyu	しゅ\nsye	しぇ\nsyo	しょ\n\
sha	しゃ\nshi	し\nshu	しゅ\nshe	しぇ\nsho	しょ\n\
zya	じゃ\nzyi	じぃ\nzyu	じゅ\nzye	じぇ\nzyo	じょ\n\
tya	ちゃ\ntyi	ちぃ\ntyu	ちゅ\ntye	ちぇ\ntyo	ちょ\n\
cha	ちゃ\nchi	ち\nchu	ちゅ\nche	ちぇ\ncho	ちょ\n\
cya	ちゃ\ncyi	ちぃ\ncyu	ちゅ\ncye	ちぇ\ncyo	ちょ\n\
dya	ぢゃ\ndyi	ぢぃ\ndyu	ぢゅ\ndye	ぢぇ\ndyo	ぢょ\n\
tsa	つぁ\ntsi	つぃ\ntse	つぇ\ntso	つぉ\n\
tha	てゃ\nthi	てぃ\nt'i	てぃ\nthu	てゅ\nthe	てぇ\ntho	てょ\nt'yu	てゅ\n\
dha	でゃ\ndhi	でぃ\nd'i	でぃ\ndhu	でゅ\ndhe	でぇ\ndho	でょ\nd'yu	でゅ\n\
twa	とぁ\ntwi	とぃ\ntwu	とぅ\ntwe	とぇ\ntwo	とぉ\nt'u	とぅ\n\
dwa	どぁ\ndwi	どぃ\ndwu	どぅ\ndwe	どぇ\ndwo	どぉ\nd'u	どぅ\n\
nya	にゃ\nnyi	にぃ\nnyu	にゅ\nnye	にぇ\nnyo	にょ\n\
hya	ひゃ\nhyi	ひぃ\nhyu	ひゅ\nhye	ひぇ\nhyo	ひょ\n\
bya	びゃ\nbyi	びぃ\nbyu	びゅ\nbye	びぇ\nbyo	びょ\n\
pya	ぴゃ\npyi	ぴぃ\npyu	ぴゅ\npye	ぴぇ\npyo	ぴょ\n\
fa	ふぁ\nfi	ふぃ\nfu	ふ\nfe	ふぇ\nfo	ふぉ\n\
fya	ふゃ\nfyu	ふゅ\nfyo	ふょ\n\
hwa	ふぁ\nhwi	ふぃ\nhwe	ふぇ\nhwo	ふぉ\nhwyu	ふゅ\n\
mya	みゃ\nmyi	みぃ\nmyu	みゅ\nmye	みぇ\nmyo	みょ\n\
rya	りゃ\nryi	りぃ\nryu	りゅ\nrye	りぇ\nryo	りょ\n\
n'	ん\nnn	ん\nxn	ん\n\
a	あ\ni	い\nu	う\nwu	う\ne	え\no	お\n\
xa	ぁ\nxi	ぃ\nxu	ぅ\nxe	ぇ\nxo	ぉ\nla	ぁ\n\
li	ぃ\nlu	ぅ\nle	ぇ\nlo	ぉ\nlyi	ぃ\nxyi	ぃ\nlye	ぇ\nxye	ぇ\nye	いぇ\n\
ka	か\nki	き\nku	く\nke	け\nko	こ\n\
xka	ヵ\nxke	ヶ\nlka	ヵ\nlke	ヶ\n\
ga	が\ngi	ぎ\ngu	ぐ\nge	げ\ngo	ご\n\
sa	さ\nsi	し\nsu	す\nse	せ\nso	そ\n\
ca	か\nci	し\ncu	く\nce	せ\nco	こ\n\
qa	くぁ\nqi	くぃ\nqu	く\nqe	くぇ\nqo	くぉ\n\
kwa	くぁ\nkwi	くぃ\nkwe	くぇ\nkwo	くぉ\ngwa	ぐぁ\n\
za	ざ\nzi	じ\nzu	ず\nze	ぜ\nzo	ぞ\n\
ja	じゃ\nji	じ\nju	じゅ\nje	じぇ\njo	じょ\n\
jya	じゃ\njyi	じぃ\njyu	じゅ\njye	じぇ\njyo	じょ\n\
ta	た\nti	ち\ntu	つ\ntsu	つ\nte	て\nto	と\n\
da	だ\ndi	ぢ\ndu	づ\nde	で\ndo	ど\n\
xtu	っ\nxtsu	っ\nltu	っ\nltsu	っ\n\
na	な\nni	に\nnu	ぬ\nne	ね\nno	の\n\
ha	は\nhi	ひ\nhu	ふ\nfu	ふ\nhe	へ\n\
ho	ほ\nba	ば\nbi	び\nbu	ぶ\nbe	べ\nbo	ぼ\n\
pa	ぱ\npi	ぴ\npu	ぷ\npe	ぺ\npo	ぽ\n\
ma	ま\nmi	み\nmu	む\nme	め\nmo	も\n\
xya	ゃ\nlya	ゃ\nya	や\nwyi	ゐ\nxyu	ゅ\nlyu	ゅ\nyu	ゆ\nwye	ゑ\nxyo	ょ\nlyo	ょ\nyo	よ\n\
ra	ら\nri	り\nru	る\nre	れ\nro	ろ\n\
xwa	ゎ\nlwa	ゎ\nwa	わ\nwi	うぃ\nwe	うぇ\nwo	を\n\
wha	うぁ\nwhi	うぃ\nwhu	う\nwhe	うぇ\nwho	うぉ\n\
nka	んか\nnki	んき\nnku	んく\nnke	んけ\nnko	んこ\n\
nkya	んきゃ\nnkyi	んきぃ\nnkyu	んきゅ\nnkye	んきぇ\nnkyo	んきょ\n\
nga	んが\nngi	んぎ\nngu	んぐ\nnge	んげ\nngo	んご\n\
ngya	んぎゃ\nngyi	んぎぃ\nngyu	んぎゅ\nngye	んぎぇ\nngyo	んぎょ\n\
nsa	んさ\nnsi	んし\nnsu	んす\nnse	んせ\nnso	んそ\n\
nsha	んしゃ\nnshi	んし\nnshu	んしゅ\nnshe	んしぇ\nnsho	んしょ\n\
nza	んざ\nnzi	んじ\nnzu	んず\nnze	んぜ\nnzo	んぞ\n\
nzya	んじゃ\nnzyu	んじゅ\nnzyo	んじょ\n\
nja	んじゃ\nnju	んじゅ\nnjo	んじょ\n\
nta	んた\nnti	んち\nnchi	んち\nntsu	んつ\nntu	んつ\nnte	んて\nnthi	んてぃ\nnto	んと\n\
ntya	んちゃ\nncha	んちゃ\nntyu	んちゅ\nnchu	んちゅ\nntyo	んちょ\nncho	んちょ\n\
nda	んだ\nndi	んぢ\nnji	んじ\nndu	んづ\nnde	んで\nndo	んど\n\
nha	んは\nnhi	んひ\nnhu	んふ\nnfu	んふ\nnhe	んへ\nnho	んほ\n\
nba	んば\nnbi	んび\nnbu	んぶ\nnbe	んべ\nnbo	んぼ\n\
npa	んぱ\nnpi	んぴ\nnpu	んぷ\nnpe	んぺ\nnpo	んぽ\n\
nma	んま\nnmi	んみ\nnmu	んむ\nnme	んめ\nnmo	んも\n\
nra	んら\nnri	んり\nnru	んる\nnre	んれ\nnro	んろ\n\
nrya	んりゃ\nnryu	んりゅ\nnryo	んりょ\n\
nwa	んわ\nnwi	んうぃ\nnwu	んう\nnwe	んうぇ\nnwo	んを\n\
nn	ん";
  //ん
  var tableK_str =
    "-	ー\n~	〜\n.	。\n,	、\nz/	・\nz.	…\nz,	‥\n\
zh	←\nzj	↓\nzk	↑\nzl	→\nz-	〜\nz[	『\nz]	』\n[	「\n]	」\n\
va	ヴァ\nvi	ヴィ\nvu	ヴ\nve	ヴェ\nvo	ヴォ\n\
vuxya	ヴャ\nvuxi	ヴィ\nvuxyu	ヴュ\nvuxe	ヴェ\nvuxyo	ヴョ\n\
qq	ッ	q\nvv	ッ	v\nll	ッ	l\nxx	ッ	x\nkk	ッ	k\n\
gg	ッ	g\nss	ッ	s\nzz	ッ	z\njj	ッ	j\ntt	ッ	t\n\
dd	ッ	d\nhh	ッ	h\nff	ッ	f\nbb	ッ	b\npp	ッ	p\n\
mm	ッ	m\nyy	ッ	y\nrr	ッ	r\nww	ッ	w\nwww	w	ww\ncc	ッ	c\n\
kya	キャ\nkyi	キィ\nkyu	キュ\nkye	キェ\nkyo	キョ\n\
gya	ギャ\ngyi	ギィ\ngyu	ギュ\ngye	ギェ\ngyo	ギョ\n\
sya	シャ\nsyi	シィ\nsyu	シュ\nsye	シェ\nsyo	ショ\n\
sya	シャ\nsyi	シィ\nsyu	シュ\nsye	シェ\nsyo	ショ\n\
sha	シャ\nshi	シ\nshu	シュ\nshe	シェ\nsho	ショ\n\
zya	ジャ\nzyi	ジィ\nzyu	ジュ\nzye	ジェ\nzyo	ジョ\n\
tya	チャ\ntyi	チィ\ntyu	チュ\ntye	チェ\ntyo	チョ\n\
cha	チャ\nchi	チ\nchu	チュ\nche	チェ\ncho	チョ\n\
cya	チャ\ncyi	チィ\ncyu	チュ\ncye	チェ\ncyo	チョ\n\
dya	ヂャ\ndyi	ヂィ\ndyu	ヂュ\ndye	ヂェ\ndyo	ヂョ\n\
tsa	ツァ\ntsi	ツィ\ntse	ツェ\ntso	ツォ\n\
tha	テャ\nthi	ティ\nt'i	ティ\nthu	テュ\nthe	テェ\ntho	テョ\nt'yu	テュ\n\
dha	デャ\ndhi	ディ\nd'i	ディ\ndhu	デュ\ndhe	デェ\ndho	デョ\nd'yu	デュ\n\
twa	トァ\ntwi	トィ\ntwu	トゥ\ntwe	トェ\ntwo	トォ\nt'u	トゥ\n\
dwa	ドァ\ndwi	ドィ\ndwu	ドゥ\ndwe	ドェ\ndwo	ドォ\nd'u	ドゥ\n\
nya	ニャ\nnyi	ニィ\nnyu	ニュ\nnye	ニェ\nnyo	ニョ\n\
hya	ヒャ\nhyi	ヒィ\nhyu	ヒュ\nhye	ヒェ\nhyo	ヒョ\n\
bya	ビャ\nbyi	ビィ\nbyu	ビュ\nbye	ビェ\nbyo	ビョ\n\
pya	ピャ\npyi	ピィ\npyu	ピュ\npye	ピェ\npyo	ピョ\n\
fa	ファ\nfi	フィ\nfu	フ\nfe	フェ\nfo	フォ\n\
fya	フャ\nfyu	フュ\nfyo	フョ\n\
hwa	ファ\nhwi	フィ\nhwe	フェ\nhwo	フォ\nhwyu	フュ\n\
mya	ミャ\nmyi	ミィ\nmyu	ミュ\nmye	ミェ\nmyo	ミョ\n\
rya	リャ\nryi	リィ\nryu	リュ\nrye	リェ\nryo	リョ\n\
n'	ン\nnn	ン\nxn	ン\n\
a	ア\ni	イ\nu	ウ\nwu	ウ\ne	エ\no	オ\n\
xa	ァ\nxi	ィ\nxu	ゥ\nxe	ェ\nxo	ォ\nla	ァ\n\
li	ィ\nlu	ゥ\nle	ェ\nlo	ォ\nlyi	ィ\nxyi	ィ\nlye	ェ\nxye	ェ\nye	イェ\n\
ka	カ\nki	キ\nku	ク\nke	ケ\nko	コ\n\
xka	ヵ\nxke	ヶ\nlka	ヵ\nlke	ヶ\n\
ga	ガ\ngi	ギ\ngu	グ\nge	ゲ\ngo	ゴ\n\
sa	サ\nsi	シ\nsu	ス\nse	セ\nso	ソ\n\
ca	カ\nci	シ\ncu	ク\nce	セ\nco	コ\n\
qa	クァ\nqi	クィ\nqu	ク\nqe	クェ\nqo	クォ\n\
kwa	クァ\nkwi	クィ\nkwe	クェ\nkwo	クォ\ngwa	グァ\n\
za	ザ\nzi	ジ\nzu	ズ\nze	ゼ\nzo	ゾ\n\
ja	ジャ\nji	ジ\nju	ジュ\nje	ジェ\njo	ジョ\n\
jya	ジャ\njyi	ジィ\njyu	ジュ\njye	ジェ\njyo	ジョ\n\
ta	タ\nti	チ\ntu	ツ\ntsu	ツ\nte	テ\nto	ト\n\
da	ダ\ndi	ヂ\ndu	ヅ\nde	デ\ndo	ド\n\
xtu	ッ\nxtsu	ッ\nltu	ッ\nltsu	ッ\n\
na	ナ\nni	ニ\nnu	ヌ\nne	ネ\nno	ノ\n\
ha	ハ\nhi	ヒ\nhu	フ\nfu	フ\nhe	ヘ\n\
ho	ホ\nba	バ\nbi	ビ\nbu	ブ\nbe	ベ\nbo	ボ\n\
pa	パ\npi	ピ\npu	プ\npe	ペ\npo	ポ\n\
ma	マ\nmi	ミ\nmu	ム\nme	メ\nmo	モ\n\
xya	ャ\nlya	ャ\nya	ヤ\nwyi	ヰ\nxyu	ュ\nlyu	ュ\nyu	ユ\nwye	ヱ\nxyo	ョ\nlyo	ョ\nyo	ヨ\n\
ra	ラ\nri	リ\nru	ル\nre	レ\nro	ロ\n\
xwa	ヮ\nlwa	ヮ\nwa	ワ\nwi	ウィ\nwe	ウェ\nwo	ヲ\n\
wha	ウァ\nwhi	ウィ\nwhu	ウ\nwhe	ウェ\nwho	ウォ\n\
nka	ンカ\nnki	ンキ\nnku	ンク\nnke	ンケ\nnko	ンコ\n\
nkya	ンキャ\nnkyi	ンキィ\nnkyu	ンキュ\nnkye	ンキェ\nnkyo	ンキョ\n\
nga	ンガ\nngi	ンギ\nngu	ング\nnge	ンゲ\nngo	ンゴ\n\
ngya	ンギャ\nngyi	ンギィ\nngyu	ンギュ\nngye	ンギェ\nngyo	ンギョ\n\
nsa	ンサ\nnsi	ンシ\nnsu	ンス\nnse	ンセ\nnso	ンソ\n\
nsha	ンシャ\nnshi	ンシ\nnshu	ンシュ\nnshe	ンシェ\nnsho	ンショ\n\
nza	ンザ\nnzi	ンジ\nnzu	ンズ\nnze	ンゼ\nnzo	ンゾ\n\
nzya	ンジャ\nnzyu	ンジュ\nnzyo	ンジョ\n\
nja	ンジャ\nnju	ンジュ\nnjo	ンジョ\n\
nta	ンタ\nnti	ンチ\nnchi	ンチ\nntsu	ンツ\nntu	ンツ\nnte	ンテ\nnthi	ンティ\nnto	ント\n\
ntya	ンチャ\nncha	ンチャ\nntyu	ンチュ\nnchu	ンチュ\nntyo	ンチョ\nncho	ンチョ\n\
nda	ンダ\nndi	ンヂ\nnji	ンジ\nndu	ンヅ\nnde	ンデ\nndo	ンド\n\
nha	ンハ\nnhi	ンヒ\nnhu	ンフ\nnfu	ンフ\nnhe	ンヘ\nnho	ンホ\n\
nba	ンバ\nnbi	ンビ\nnbu	ンブ\nnbe	ンベ\nnbo	ンボ\n\
npa	ンパ\nnpi	ンピ\nnpu	ンプ\nnpe	ンペ\nnpo	ンポ\n\
nma	ンマ\nnmi	ンミ\nnmu	ンム\nnme	ンメ\nnmo	ンモ\n\
nra	ンラ\nnri	ンリ\nnru	ンル\nnre	ンレ\nnro	ンロ\n\
nrya	ンリャ\nnryu	ンリュ\nnryo	ンリョ\n\
nwa	ンワ\nnwi	ンウィ\nnwu	ンウ\nnwe	ンウェ\nnwo	ンヲ\n\
nn	ン";

  /** @type {Object.<String,String>} */
  var tableH = (function () {
    var tableH = {};
    tableH_str.split("\n").forEach(function (row) {
      tableH[row.match(/^[^\t]+/)] = row.match(/^[^\t]+\t(.+)$/)[1];
    });
    return tableH;
  })();

  var tableK = (function () {
    var tableK = {};
    tableK_str.split("\n").forEach(function (row) {
      tableK[row.match(/^[^\t]+/)] = row.match(/^[^\t]+\t(.+)$/)[1];
    });
    return tableK;
  })();

  /** @type {RegExp} */
  var regex = (function () {
    var key,
      regexs = [];
    var table = kanaType === "K" ? tableK : tableH;
    for (key in table)
      if (table.hasOwnProperty(key)) {
        regexs.push(
          "(?:" +
            key.replace(/[~(?:)|.*+\[\]]/g, function (s) {
              return "\\" + s;
            }) +
            ")",
        );
      }
    return new RegExp("^(?:" + regexs.join("|") + ")", "i");
  })();
})(this);
// vim:set tw=0 et sw=2 sts=2:
