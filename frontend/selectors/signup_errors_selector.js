const errorsArray = errors => {
  if (!errors) {
    return [];
  }
  return Object.keys(errors).map((prop) => { return [`${prop[0].toUpperCase() + prop.slice(1)} ${errors[prop]}`]; });
};

export default errorsArray;
