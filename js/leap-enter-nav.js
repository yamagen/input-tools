// leap-enter-nav.js
// Enterで次のフィールド、Shift+Enterで前のフィールドに移動

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(
    "input[type=text], input[type=number], textarea",
  );

  inputs.forEach((input, index) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // デフォルト送信防止

        if (event.shiftKey) {
          // Shift+Enter → ひとつ前へ
          const prev = inputs[index - 1];
          if (prev) prev.focus();
        } else {
          // Enterのみ → ひとつ次へ
          const next = inputs[index + 1];
          if (next) {
            next.focus();
          } else {
            // 最後のフィールドならフォーム送信
            const form = this.form;
            if (form) form.submit();
          }
        }
      }
    });
  });
});
