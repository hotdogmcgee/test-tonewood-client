const Formulas = { 

    getVolume(length, width, height) {
        return length * width * height
    },

    // kg/m^3
    getDensity(length, width, height, mass) {
        const volume = this.getVolume(length, width, height)
        const kgMass = mass *1000
        return kgMass / volume
    }
}

export default Formulas