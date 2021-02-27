function getBallerFromData(data) {
  const dataStr = String(data);

  const result = {
    position: 0,
    outsideScoring: 0,
    insideScoring: 0,
    defense: 0,
    rebounding: 0,
    playmaking: 0,
    athleticism: 0,
  }
 
  const rawPosition = Number(dataStr.substring(0, 1));
  const rawOutsideScoring = Number(dataStr.substring(1, 3));
  const rawInsideScoring = Number(dataStr.substring(3, 5));
  const rawDefense = Number(dataStr.substring(5, 7));
  const rawRebounding = Number(dataStr.substring(7, 9));
  const rawPlaymaking = Number(dataStr.substring(9, 11));
  const rawAthleticism = Number(dataStr.substring(11, 13));

  return result;
}

export default getBallerFromData;