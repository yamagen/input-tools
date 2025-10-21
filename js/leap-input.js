// leap-input.js
// LEAP入力フィールドの簡潔・安全な設定
// 各input要素は自身の値を直接変換（id参照不要）

// --- ローマ字→ひらがな 変換関数（例示用） ---
//function roman2hiragana(str) {
//  return str
//    .replace(/a/g, "あ")
//    .replace(/i/g, "い")
//    .replace(/u/g, "う")
//    .replace(/e/g, "え")
//    .replace(/o/g, "お");
//}

// --- 共通セットアップ関数 ---
function setupLeapInputs() {
  document.querySelectorAll(".leap-input").forEach((el) => {
    // 入力補助系をすべて無効化
    el.setAttribute("autocomplete", "off");
    el.setAttribute("autocorrect", "off");
    el.setAttribute("autocapitalize", "off");
    el.setAttribute("spellcheck", "false");
    el.setAttribute("pattern", "[a-z\\-]+");
    el.style.imeMode = "disabled";

    // 不正操作防止
    el.addEventListener("copy", (e) => e.preventDefault());
    el.addEventListener("paste", (e) => e.preventDefault());
    el.addEventListener("contextmenu", (e) => e.preventDefault());

    // 入力時に自分自身の値を変換
    el.addEventListener("input", function () {
      this.value = roman2hiragana(this.value);
    });
  });

  // ★ 最初の1つだけ自動フォーカス
  const firstInput = document.querySelector(".leap-input");
  if (firstInput) firstInput.focus();
}

// --- DOM読み込み時に実行 ---
window.addEventListener("DOMContentLoaded", setupLeapInputs);
