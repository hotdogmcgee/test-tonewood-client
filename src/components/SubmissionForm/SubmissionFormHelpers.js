const mathConst = 0.94625;
const milli = 0.001;
const nano = Math.pow(10, -9);
const giga = Math.pow(10, 9);

const Formulas = {
  getVolume(length, width, height) {
    return length * milli * (width * milli) * (height * milli);
  },

  getDensity(length, width, height, mass) {
    const volume = this.getVolume(length, width, height);
    const kgMass = mass * milli;
    return (kgMass / volume).toFixed(2);
  },

  getELong(length, width, height, mass, peakFreqLong) {
    const density = this.getDensity(length, width, height, mass);
    const eLong =
      ((mathConst *
        density *
        Math.pow(length * milli, 4) *
        Math.pow(peakFreqLong, 2)) /
        Math.pow(height * milli, 2)) *
      nano;
    return eLong.toFixed(2);
  },

  getECross(length, width, height, mass, peakFreqCross) {
    const density = this.getDensity(length, width, height, mass);
    const eCross =
      ((mathConst *
        density *
        Math.pow(width * milli, 4) *
        Math.pow(peakFreqCross, 2)) /
        Math.pow(height * milli, 2)) *
      nano;
    return eCross.toFixed(2);
  },

  getVelocitySoundLong(length, width, height, mass, eLong) {
    const density = this.getDensity(length, width, height, mass);
    const velocitySoundLong = Math.sqrt((eLong * giga) / density) * milli;
    return velocitySoundLong.toFixed(2);
  },

  getRadiationRatio(length, width, height, mass, velocitySoundLong) {
    const density = this.getDensity(length, width, height, mass);
    const radiationRatio = (velocitySoundLong / density) * 1000;
    return radiationRatio.toFixed(2);
  }
};

export default Formulas;
