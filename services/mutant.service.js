exports.getMutant = async (data) => {
  try {
    console.log(data)
    return 200;
  } catch (e) {
    throw Error(e)
  }
}