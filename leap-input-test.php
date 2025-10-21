<?php
// leap-input-test.php
// LEAP 入力制御 + ローマ字→ひらがな変換 + Enter移動機能 テスト

$inputs = [
  ["id" => "i01", "name" => "q1", "label" => "①"],
  ["id" => "i02", "name" => "q2", "label" => "②"],
  ["id" => "i03", "name" => "q3", "label" => "③"],
];
$submitted = ($_SERVER["REQUEST_METHOD"] === "POST");
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>LEAP Input Test (Integrated)</title>

  <!-- スクリプトの読み込み順に注意 -->
  <script src="js/rom2hil.js"></script>
  <script src="js/leap-input.js"></script>
  <script src="js/leap-enter-nav.js"></script>

  <style>
    body { font-family: sans-serif; margin: 2em; }
    input.leap-input {
      font-size: 1.2em;
      padding: 0.2em;
      margin: 0.3em;
      width: 12em;
    }
    button {
      font-size: 1em;
      margin-top: 1em;
    }
  </style>
</head>
<body>

<h2>LEAP Input 統合テスト</h2>
<p>ローマ字で入力すると、即時にひらがなに変換されます。<br>
Enterで次のフィールドへ、Shift+Enterで前のフィールドへ移動します。</p>

<form method="post" novalidate>
<?php foreach ($inputs as $in) : ?>
  <label for="<?= $in["id"] ?>"><?= $in["label"] ?>：</label>
  <input type="text"
         class="leap-input"
         id="<?= $in["id"] ?>"
         name="<?= $in["name"] ?>"
         size="15"
         required>
  <br>
<?php endforeach; ?>
  <button type="submit">送信</button>
</form>

<?php if ($submitted) : ?>
  <hr>
  <h3>受理結果</h3>
  <ul>
    <?php foreach ($inputs as $in) : ?>
      <li>
        <strong><?= htmlspecialchars($in["label"]) ?></strong>：
        <?= htmlspecialchars($_POST[$in["name"]] ?? "", ENT_QUOTES, "UTF-8") ?>
      </li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>

</body>
</html>
