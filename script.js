// Gambar yang digunakan dalam permainan
const images = ["🍎", "🍌", "🍇", "🍒", "🍍", "🍉", "🥭", "🍋"];
let tiles = [...images, ...images]; // Duplikasi gambar untuk menciptakan pasangan
let selectedTiles = [];
let matchedTiles = 0;

// Inisialisasi papan permainan
function shuffleTiles() {
  tiles.sort(() => Math.random() - 0.5); // Acak urutan gambar
}

function createBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = ""; // Hapus konten papan sebelumnya
  shuffleTiles();

  tiles.forEach((image, index) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.dataset.index = index;
    tile.dataset.image = image;
    tile.addEventListener("click", flipTile);
    board.appendChild(tile);
  });
}

function flipTile() {
  // Cek apakah sudah ada 2 kartu yang terbuka atau kartu ini sudah cocok
  if (
    selectedTiles.length < 2 &&
    !this.classList.contains("matched") &&
    !this.classList.contains("flipped")
  ) {
    this.classList.add("flipped"); // Tandai sebagai kartu yang terbuka
    this.textContent = this.dataset.image; // Tampilkan gambar
    selectedTiles.push(this);

    if (selectedTiles.length === 2) {
      checkForMatch();
    }
  }
}

function checkForMatch() {
  const [tile1, tile2] = selectedTiles;

  if (tile1.dataset.image === tile2.dataset.image) {
    // Jika pasangan cocok, tambahkan kelas "matched"
    tile1.classList.add("matched");
    tile2.classList.add("matched");
    matchedTiles += 2;
    selectedTiles = [];

    // Cek apakah semua kartu sudah cocok
    if (matchedTiles === tiles.length) {
      document.getElementById("status").textContent =
        "YEYYY KAMU MENANG SAYANGKUU ❤️💕😍";
    }
  } else {
    // Jika pasangan tidak cocok, tunggu sebentar lalu balik kartu kembali
    setTimeout(() => {
      tile1.classList.remove("flipped"); // Hapus tanda flipped
      tile2.classList.remove("flipped"); // Hapus tanda flipped
      tile1.textContent = ""; // Kosongkan gambar
      tile2.textContent = ""; // Kosongkan gambar
      selectedTiles = [];
    }, 1000); // Waktu tunda 1 detik
  }
}

// Mulai permainan
createBoard();
