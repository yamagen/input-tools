<?php
// leap-input.php
// シンプルなLEAP入力フィールド表示 + POST結果表示

$iid = "q001";
$blankSize = 15;

// フォームが送信されたかを確認
$submitted = ($_SERVER["REQUEST_METHOD"] === "POST");
$value = $submitted ? ($_POST[$iid] ?? "") : "";
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>LEAP Input Test</title>

  <script src="js/rom2hil.js"></script>
  <script src="js/leap-input.js"></script>
</head>
<body>

<form method="post" novalidate>
  <input
    type="text"
    class="leap-input"
    name="<?= $iid ?>"
    id="<?= $iid ?>"
    size="<?= $blankSize ?>"
    required autofocus>
  <button type="submit">送信</button>
</form>

<?php if ($submitted) : ?>
  <hr>
  <p><strong>受理した文字列:</strong></p>
  <pre style="font-size:1.2em;"><?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?></pre>
<?php endif; ?>

</body>
</html>
