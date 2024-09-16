// /W\[([^\]]+)\]/ is the regex to match W[..]

const sgf_parser = function (sgf_str) {
  const str = sgf_str;

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
  // in the sgf file, handicap stone probably appear (ie, i hope they do) like "AB[pd][dp]"
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
    get_komi,
  };
};
