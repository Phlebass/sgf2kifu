// /W\[([^\]]+)\]/ is the regex to match W[..]

/*
Might be useful if i'll ever want to read variations

const new_node = function (s) {
  const value = s;
  const children = [];
  const add_child = function (c) {
    children.push(c);
  };
  const get_value = function () {
    return s;
  };
  const get_children = function () {
    if (children.length == 0) return null;
    return children;
  };
  return { add_child, get_value, get_children };
};

function print_tree(n) {
  console.log(`node with value ${n.get_value()}. `);
  if (n.get_children() == null) {
    console.log("No children\n");
  } else {
    console.log("Children: \n");
    n.get_children().map((n) => print_tree(n));
    console.log(`No more children for node ${n.get_value()}`);
  }
}

function string_to_tree(str) {
  const regex = /\(([^\)\(]+)\)/g;
  const root = new_node("A");
  const b = new_node("B");
  root.add_child(b);
  return root;
}
*/

const sgf_parser = function (sgf_str) {
  // removes all comments: they might contain stuff that interferes with regex
  let str = sgf_str.replace(/C\[[^\]]+\]/g, "");

  // replaces from ")" forward
  // this way, only the first variation is kept
  str = str.replace(/\).*/, "");

  const get_black_player = function () {
    const regex_player = /PB\[([^\]]+)\]+/;
    const regex_rank = /BR\[([^\]]+)\]+/;

    let player_name = str.match(regex_player);
    player_name = player_name == null ? "???" : player_name[1];

    let player_rank = str.match(regex_rank);
    player_rank = player_rank == null ? "" : "(" + player_rank[1] + ")";

    return player_name + " " + player_rank;
  };

  const get_white_player = function () {
    const regex_player = /PW\[([^\]]+)\]+/;
    const regex_rank = /WR\[([^\]]+)\]+/;

    let player_name = str.match(regex_player);
    player_name = player_name == null ? "???" : player_name[1];

    let player_rank = str.match(regex_rank);
    player_rank = player_rank == null ? "" : "(" + player_rank[1] + ")";

    return player_name + " " + player_rank;
  };

  const get_komi = function () {
    const regex = /KM\[([^\]]+)\]+/;
    try {
      return str.match(regex)[1];
    } catch {
      return "???";
    }
  };

  const get_result = function () {
    const regex = /RE\[([^\]]+)\]+/;
    try {
      return str.match(regex)[1];
    } catch {
      return "???";
    }
  };

  const get_date = function () {
    const regex = /DT\[([^\]]+)\]+/;
    try {
      return str.match(regex)[1];
    } catch {
      return "???";
    }
  };

  const get_moves = function () {
    const regex = /;(B|W)\[([^\]]+)\]+/g;
    return str.match(regex);
  };

  // only black (handicap) pre moves are considered
  // in the sgf file, handicap stone probably appear (ie: i hope they do) like "AB[pd][dp]"
  // an array is returned, each item being of the form "AB[pd]"
  const get_pre_moves = function () {
    let regex = /(AB)(\[([^\]]+)\]){1,}/;
    const premoves = str.match(regex);
    if (premoves == null) return [];
    regex = /(\[([^\]]+)\])/g;
    return premoves[0].match(regex).map((s) => "AB" + s);
  };

  const convert_coordinates = function (str) {
    const col = str[1];
    const x = str.charCodeAt(3) - 96;
    const y = str.charCodeAt(4) - 96;
    return { x, y, col };
  };

  return {
    get_black_player,
    get_white_player,
    get_moves,
    get_pre_moves,
    convert_coordinates,
    get_date,
    get_result,
    get_komi,
  };
};
