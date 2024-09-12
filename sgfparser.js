// /W\[([^\]]+)\]/ is the regex to match W[..]

let sgf =
  "(;PB[Kadono Jowa];B[qd];W[dc];B[cp];W[pq];B[ep];W[oc];B[ce];W[ci];B[ck];W[ed])";

const sgf_parser = function (sgf_str) {
  const str = sgf_str;

  const get_black_player = function () {
    const regex = /PB\[([^\]]+)\]+/;
    return str.match(regex)[1];
  };

  const get_white_player = function () {
    const regex = /PW\[([^\]]+)\]+/;
    return str.match(regex)[1];
  };

  const get_moves = function () {
    const regex = /;(B|W)\[([^\]]+)\]+/g;
    return str.match(regex);
  };

  const convert_coordinates = function (str) {
    const x = str.charCodeAt(3) - 96;
    const y = str.charCodeAt(4) - 96;
    return { x, y };
  };

  return { get_black_player, get_white_player, get_moves, convert_coordinates };
};
