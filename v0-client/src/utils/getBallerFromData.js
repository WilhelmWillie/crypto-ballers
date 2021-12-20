function getPositionFromRawData(rawData) {
  const scaledRawData = Math.floor(rawData / 2);
  
  switch(scaledRawData) {
    case 0:
      return 'PG';
    case 1:
      return 'SG';
    case 2:
      return 'SF';
    case 3:
      return 'PF';
    case 4:
      return 'C';
    default:
      return 'N/A';
  }
}

function getStatisticFromRawData(rawData) {
  const scaledRawData = Math.floor(rawData / 2);
  
  return 50 + scaledRawData;
}

function getBallerFromData(data) {
  const dataStr = String(data);

  const rawPosition = Number(dataStr.substring(0, 1));
  const rawOutsideScoring = Number(dataStr.substring(1, 3));
  const rawInsideScoring = Number(dataStr.substring(3, 5));
  const rawDefense = Number(dataStr.substring(5, 7));
  const rawRebounding = Number(dataStr.substring(7, 9));
  const rawPlaymaking = Number(dataStr.substring(9, 11));
  const rawAthleticism = Number(dataStr.substring(11, 13));

  return {
    position: getPositionFromRawData(rawPosition),
    outsideScoring: getStatisticFromRawData(rawOutsideScoring),
    insideScoring: getStatisticFromRawData(rawInsideScoring),
    defense: getStatisticFromRawData(rawDefense),
    rebounding: getStatisticFromRawData(rawRebounding),
    playmaking: getStatisticFromRawData(rawPlaymaking),
    athleticism: getStatisticFromRawData(rawAthleticism),
  }
}

export default getBallerFromData;