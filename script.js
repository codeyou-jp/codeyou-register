console.log("✅ JavaScriptは読み込まれました！");
// === グローバル変数 ===
let idSwirlDone = false;
let linkSwirlDone = false;
let isQRStarted = false;
let isZipperStarted = false;

// === 効果音たち ===
const sePopBang = new Audio("sounds/Balloon-Pop01-2(Dry).mp3");
const seSwirlShakaHi = new Audio("sounds/Maracas01-01(Single).mp3");
const seSwirlShakaLow = new Audio("sounds/Maracas01-02(Single).mp3");
const seSnapClick = new Audio("sounds/炊飯器のふたを閉める.mp3");
const seVictoryBlast = new Audio("sounds/Inspiration11-2(Mid).mp3");

// ✅ DOM読み込み後の処理
window.addEventListener("DOMContentLoaded", function () {
  const qrBtn = document.getElementById("qrBtn");
  const zipperBtn = document.getElementById("zipperBtn");

  const idSwirl = document.getElementById("idSwirl");
  const puzzleIDLeft = document.getElementById("puzzleIDLeft");
  const puzzleIDRight = document.getElementById("puzzleIDRight");
  const idInputBlock = document.getElementById("idInputBlock");
  const idInput = document.getElementById("idInput");

  const linkSwirl = document.getElementById("linkSwirl");
  const puzzleLinkLeft = document.getElementById("puzzleLinkLeft");
  const puzzleLinkRight = document.getElementById("puzzleLinkRight");
  const linkInputBlock = document.getElementById("linkInputBlock");
  const linkInput = document.getElementById("linkInput");

  const swirlCombo = document.getElementById("swirlCombo");
  const puzzleComplete = document.getElementById("puzzleComplete");
  const submitBtn = document.getElementById("submitBtn");

  

  // ✅ QRボタン押下
  qrBtn.addEventListener("click", function () {
    sePopBang.play(); // 🎈 QRボタン音（風船）

    qrBtn.style.display = "none";
    idSwirl.classList.remove("hidden");
    idSwirl.style.display = "block";

    setTimeout(() => {
    seSwirlShakaHi.play(); // 🎵マラカス高音
    idSwirl.classList.add("swirl-shake"); // ✅ 横揺れ！
  }, 300);

  setTimeout(() => {
    idSwirl.classList.remove("swirl-shake");
  }, 1000);
  });

  // ✅ チャックボタン押下
  zipperBtn.addEventListener("click", function () {

    zipperBtn.style.display = "none";
    linkSwirl.classList.remove("hidden");
    linkSwirl.style.display = "block";
  setTimeout(() => {
    seSwirlShakaHi.play(); // 🎵マラカス高音
    linkSwirl.classList.add("swirl-shake"); // ✅ 横揺れ！
  }, 400);

  setTimeout(() => {
    linkSwirl.classList.remove("swirl-shake");
  }, 1000);
  })

// ✅ ID入力完了 → QR復活
idInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && idInput.value.trim() !== "") {
    showMiniSwirl("idSwirlMini", "images/codeyou-puzzle/id_swirl.png", "90px");
    idSwirlDone = true;
    checkSwirlComplete();

    idInputBlock.style.display = "none";

    // ✅ チャックボタンを復活！！
    setTimeout(() => {
      zipperBtn.classList.remove("hidden");
      zipperBtn.style.display = "flex";
      zipperBtn.disabled = false;
      zipperBtn.style.opacity = "1";
      zipperBtn.style.pointerEvents = "auto";

      console.log("✅ チャック復活完了:", {
        display: zipperBtn.style.display,
        disabled: zipperBtn.disabled,
        opacity: zipperBtn.style.opacity,
        pointer: zipperBtn.style.pointerEvents
      });
    }, 50); // ← わずかに余裕持たせておく
  }
});

// ✅ Link入力完了 → QR復活
linkInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter" && linkInput.value.trim() !== "") {
    showMiniSwirl("linkSwirlMini", "images/codeyou-puzzle/link_swirl.png", "90px");
    linkSwirlDone = true;
    checkSwirlComplete();

    linkInputBlock.style.display = "none";

    // ✅ QRボタンを復活！！
    setTimeout(() => {
      qrBtn.classList.remove("hidden");
      qrBtn.style.display = "flex";
      qrBtn.disabled = false;
      qrBtn.style.opacity = "1";
      qrBtn.style.pointerEvents = "auto";

      console.log("✅ QR復活完了:", {
        display: qrBtn.style.display,
        disabled: qrBtn.disabled,
        opacity: qrBtn.style.opacity,
        pointer: qrBtn.style.pointerEvents
      });
    }, 50); // ← わずかに余裕持たせておく
  }
});


  // ✅ ID Swirl → ピース → 合体 → 入力欄
  // === ID Swirlクリック → ピース → 合体 → 入力
  idSwirl.addEventListener("click", function () {
    idSwirl.style.display = "none";
    puzzleIDLeft.classList.remove("hidden");
    puzzleIDRight.classList.remove("hidden");

    puzzleIDLeft.style.position = "absolute";
    puzzleIDLeft.style.top = "45%";
    puzzleIDLeft.style.left = "40%";
    puzzleIDLeft.style.transform = "scale(1.5)";
    puzzleIDLeft.style.transition = "all 0.5s ease";
    puzzleIDLeft.style.display = "block";

    puzzleIDRight.style.position = "absolute";
    puzzleIDRight.style.top = "45%";
    puzzleIDRight.style.left = "50%";
    puzzleIDRight.style.transform = "scale(1.5)";
    puzzleIDRight.style.transition = "all 0.5s ease";
    puzzleIDRight.style.display = "block";


    setTimeout(function () {
      puzzleIDLeft.style.display = "none";
      puzzleIDRight.style.display = "none";
      idInputBlock.classList.remove("hidden");
      idInputBlock.style.display = "block";
      seSnapClick.play(); // 🧩 合体音（スナップ）
    }, 1500);
  });

  // ✅ Link Swirl → ピース → 合体 → 入力欄
  linkSwirl.addEventListener("click", function () {
    linkSwirl.style.display = "none";
    puzzleLinkLeft.classList.remove("hidden");
    puzzleLinkRight.classList.remove("hidden");

    puzzleLinkLeft.style.position = "absolute";
    puzzleLinkLeft.style.top = "45%";
    puzzleLinkLeft.style.left = "40%";
    puzzleLinkLeft.style.transform = "scale(1.5)";
    puzzleLinkLeft.style.transition = "all 0.5s ease";
    puzzleLinkLeft.style.display = "block";

    puzzleLinkRight.style.position = "absolute";
    puzzleLinkRight.style.top = "45%";
    puzzleLinkRight.style.left = "50%";
    puzzleLinkRight.style.transform = "scale(1.5)";
    puzzleLinkRight.style.transition = "all 0.5s ease";
    puzzleLinkRight.style.display = "block";

    setTimeout(function () {
      puzzleLinkLeft.style.display = "none";
      puzzleLinkRight.style.display = "none";
      linkInputBlock.classList.remove("hidden");
      linkInputBlock.style.display = "block";
      seSnapClick.play(); // 🧩 合体音（スナップ）
    }, 1500);
  });
  // ✅ miniSwirlを表示
  function showMiniSwirl(id, src, left) {
    let swirl = document.getElementById(id);
    if (!swirl) {
      swirl = document.createElement("img");
      swirl.id = id;
      swirl.src = src;
      swirl.style.position = "absolute";
      swirl.style.top = "20px";
      swirl.style.left = left;
      swirl.style.width = "150px";
      swirl.style.zIndex = "200";
      document.body.appendChild(swirl);
    } else {
      swirl.style.display = "block";
    }
  }

  // ✅ 両方入力完了したらswirlComboを表示
function checkSwirlComplete() {
  if (idSwirlDone && linkSwirlDone) {
    // 両方のminiSwirlを非表示に
    const idSwirlMini = document.getElementById("idSwirlMini");
    const linkSwirlMini = document.getElementById("linkSwirlMini");
    if (idSwirlMini) idSwirlMini.style.display = "none";
    if (linkSwirlMini) linkSwirlMini.style.display = "none";

    // comboSwirlを表示
    swirlCombo.classList.remove("hidden");
    swirlCombo.style.display = "block";
    setTimeout(() => {
      seSwirlShakaLow.play();
      swirlCombo.classList.add("swirl-shake");
    }, 400);
        setTimeout(() => {
      swirlCombo.classList.remove("swirl-shake");
    }, 1000);
  }
}
// ✅ swirlComboクリックでpuzzleComplete表示（ボタン化）＋オーバーレイ表示
swirlCombo.addEventListener("click", function () {
  swirlCombo.style.display = "none";

  const puzzleComplete = document.getElementById("puzzleComplete");
  const overlay = document.getElementById("overlay");

  puzzleComplete.classList.remove("hidden");
  overlay.classList.remove("hidden");

  puzzleComplete.style.display = "block";
  overlay.style.display = "block";

  seVictoryBlast.play(); // 🎺 勝利ファンファーレ
});

// ✅ puzzleComplete（＝登録ボタン）クリック → 登録処理へ
document.getElementById("puzzleComplete").addEventListener("click", function () {
  // ここでフォーム送信や登録処理を実装する
  alert("登録完了！（仮）");

  // オーバーレイとボタンを非表示
  document.getElementById("puzzleComplete").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  });
});