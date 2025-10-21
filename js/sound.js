// sound.js --==*==-- --==*==-- --==*==-- --==*==--
// javaScript の制約として、音声はユーザーの操作でないと演奏できない。
// そのため、ボタンを押したときに音声を再生するようにする。
// 音声ファイルは、snd フォルダに入れる。
function auPlay(id) {
  console.log(id);
  var sound = new Audio("snd/" + id + ".mp3"); // 音声ファイルを指定
  sound.play(); // 再生
  sound.addEventListener("ended", (event) => {
    // 音声が終了したときのイベント
    qk.submit(); // フォームを送信、すなわち時間切れ。
  });
}
