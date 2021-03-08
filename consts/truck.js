const SPRINTER = 'SPRINTER';
const SMALL_STRAIGHT = 'SMALL STRAIGHT';
const LARGE_STRAIGHT = 'LARGE STRAIGHT';

module.exports = {
  [SPRINTER]: {
    dimensions: {
      length: 300,
      width: 250,
      height: 170,
    },
    payload: 1700,
  },
  [SMALL_STRAIGHT]: {
    dimensions: {
      length: 500,
      width: 250,
      height: 170,
    },
    payload: 2500,
  },
  [LARGE_STRAIGHT]: {
    dimensions: {
      length: 700,
      width: 350,
      height: 200,
    },
    payload: 4000,
  },
};
