const cartValidation = (data) => {
  const errors = {};
  if (data.slot === "") {
    errors.slot = "Please pick a delivery slot.";
  }
  if (data.address === "") {
    errors.address = "Please provide a delivery address.";
  }
  if (parseInt(Math.log10(data.number)) + 1 !== 10) {
    errors.number = "Please provide a valid mobile number.";
  }
  return errors;
};

export default cartValidation;
