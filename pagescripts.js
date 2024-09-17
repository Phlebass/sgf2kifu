let sgf_str = "";

function sgf_from_file(file) {
  let fr = new FileReader();
  fr.onload = function () {
    //console.log("File:", fr.result);
    draw_game(fr.result);
  };

  fr.readAsText(file);
}

// The file is dropped
function dropHandler(ev) {
  //console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  ev.target.classList.remove("active");

  sgf_from_file(ev.dataTransfer.files.item(0));
}

// The file is given with the input thing
function file_changed() {
  const [file] = document.querySelector("#file_input").files;
  sgf_from_file(file);
}

function stampa() {
  const new_kifu = document.querySelector("#kifu").cloneNode(true);
  const new_info = document.querySelector("#game_info").cloneNode(true);
  const new_movesat = document.querySelector("#moves_at").cloneNode(true);

  let print_window = window.open("", "", "height=400,width=800");
  print_window.document.write(
    '<html><head><title>Kifu</title><link rel="stylesheet" href="styles.css"></head><body id="foglio_stampa"><div ></div></body></html>'
  );
  print_window.document.querySelector("#foglio_stampa").appendChild(new_info);
  print_window.document.querySelector("#foglio_stampa").appendChild(new_kifu);
  print_window.document
    .querySelector("#foglio_stampa")
    .appendChild(new_movesat);

  print_window.document.close();
  print_window.print();
}

const file_drop = document.getElementById("file_drop");
file_drop.addEventListener("dragenter", (ev) => {
  ev.preventDefault();
  ev.target.classList.add("active");
});
file_drop.addEventListener("dragleave", (ev) => {
  ev.preventDefault();
  ev.target.classList.remove("active");
});
file_drop.addEventListener("dragover", (ev) => ev.preventDefault());
file_drop.addEventListener("drop", dropHandler, false);
