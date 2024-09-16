let sgf_str = "";

function sgf_from_file(file) {
  let fr = new FileReader();
  fr.onload = function () {
    console.log("File:", fr.result);
    draw_game(fr.result);
  };

  fr.readAsText(file);
}

// The file is dropped
function dropHandler(ev) {
  console.log("File(s) dropped");

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

const file_drop = document.getElementById("file_drop");
file_drop.addEventListener("dragenter", (ev) => {
  console.log("Enter!");
  ev.preventDefault();
  ev.target.classList.add("active");
});
file_drop.addEventListener("dragleave", (ev) => {
  ev.preventDefault();
  ev.target.classList.remove("active");
});
file_drop.addEventListener("dragover", (ev) => ev.preventDefault());
file_drop.addEventListener("drop", dropHandler, false);
