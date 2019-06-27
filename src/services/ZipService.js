const [max, min] = [95, 75];
function getTemp() {
  let temp = Math.floor(Math.random() * (+max - +min)) + +min;
  return temp;
}
const gyd = function generateYearData(year) {
  let yearData = [];
  for (let i = 0; i < 12; i++) {
    if (i == 1) {
      for (let ii = 1; ii < 29; ii++) {
        let temp = getTemp();
        yearData.push([year, i, ii, temp]);
      }
    } else if ([0, 2, 4, 6, 7, 9, 11].includes(i)) {
      for (let ii = 1; ii < 32; ii++) {
        let temp = getTemp();
        yearData.push([year, i, ii, temp]);
      }
    } else {
      for (let ii = 1; ii < 31; ii++) {
        let temp = getTemp();
        yearData.push([year, i, ii, temp]);
      }
    }
  }
  return yearData;
};

export default {
  getStations() {
    const url =
      "https://www.ncdc.noaa.gov/cdo-web/api/v2/stations?locationid=ZIP:" +
      "91103";
    // this.state.zipcode
    return fetch(url, {
      headers: { token: "lcgEHOgrtMIIEUdSQGVKZUQYUJHvGnvt" }
    });
    // return apiWeatherClient.get('')
  },
  getHighAndLow(zip, start, end) {
    // console.log("GET HIGH AND LOW");
    const url =
      "https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=ZIP:" +
      zip +
      "&startdate=" +
      start +
      "&enddate=" +
      end +
      "&limit=100&units=standard&datatypeid=TMAX&datatypeid=TMIN";
    return fetch(url, {
      headers: { token: "lcgEHOgrtMIIEUdSQGVKZUQYUJHvGnvt" }
    });
  }
};
