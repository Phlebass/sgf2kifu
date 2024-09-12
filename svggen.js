const svgns = "http://www.w3.org/2000/svg";

/**
 * Handles the kifu -> svg part
 * @param {string} id - The id of the svg element in the html file
 */
const new_kifu = function (id = "") {
  const svg = document.querySelector("#" + id);
  let premoves_B = [];
  let premoves_W = [];
  let moves = [];

  const draw_goban = function () {
    // grid lines
    const h_lines = document.createElementNS(svgns, "path");
    const v_lines = document.createElementNS(svgns, "path");
    let h_path = "",
      v_path = "";
    for (let i = 2; i < 19; i++) {
      h_path += `M 10 ${i * 10} L 190 ${i * 10}`;
      v_path += `M ${i * 10} 10 L ${i * 10} 190`;
    }
    h_lines.setAttribute("d", h_path);
    v_lines.setAttribute("d", v_path);
    h_lines.setAttribute("class", "goban_lines");
    v_lines.setAttribute("class", "goban_lines");
    svg.appendChild(h_lines);
    svg.appendChild(v_lines);

    // hoshi points
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const hoshi = document.createElementNS(svgns, "circle");
        hoshi.setAttribute("r", 1);
        hoshi.setAttribute("cx", 40 + i * 60);
        hoshi.setAttribute("cy", 40 + j * 60);
        hoshi.setAttribute("class", "hoshi");
        svg.appendChild(hoshi);
      }
    }

    // border lines
    const border = document.createElementNS(svgns, "path");
    const path = "M 10 10 H 190 V 190 H 10 V 10";
    border.setAttribute("d", path);
    border.setAttribute("class", "goban_border");
    svg.appendChild(border);
  };

  const draw_stone = function (x, y, col, n = "") {
    const stone = document.createElementNS(svgns, "circle");
    stone.setAttribute("r", "4.5");
    stone.setAttribute("cx", x * 10);
    stone.setAttribute("cy", y * 10);
    const c = col == 0 ? "black" : "white";
    stone.setAttribute("class", "stone " + c);
    svg.appendChild(stone);

    if (n != "") {
      const text = document.createElementNS(svgns, "text");
      text.textContent = n;
      text.setAttribute("x", x * 10);
      text.setAttribute("y", y * 10 + 2);
      text.setAttribute("class", "move_n " + c);
      svg.appendChild(text);
    }
  };

  const draw_stones = function (list) {
    list.map((stone, i) => draw_stone(stone.x, stone.y, i % 2, i + 1));
  };

  return { draw_goban, draw_stone, draw_stones };
};

const kifu1 = new_kifu("kifu");
kifu1.draw_goban();

/*
kifu1.draw_stone(3, 4, "black");
kifu1.draw_stone(5, 3, "white");
kifu1.draw_stone(9, 3, "black");
kifu1.draw_stone(4, 5, "white");
kifu1.draw_stone(3, 5, "black");
kifu1.draw_stone(4, 6, "white");
kifu1.draw_stone(3, 7, "black");
*/

const parser = sgf_parser(sgf);
const a = parser.get_moves().map(parser.convert_coordinates);

kifu1.draw_stones(a);
