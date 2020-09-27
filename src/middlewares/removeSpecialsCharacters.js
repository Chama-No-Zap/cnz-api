const removeSpecialsCharacters = (req, _res, next) => {
  const { cpf = '', phone = '', address = {} } = req.body;
  const regex = new RegExp(/[^\d]+/g);
  const onlyNumbersCpf = cpf.replace(regex, '');
  const onlyNumbersPhone = phone.replace(regex, '');
  const onlyNumbersCep = address.cep.replace(regex, '');
  req.body = {
    ...req.body,
    cpf: onlyNumbersCpf,
    phone: onlyNumbersPhone,
    address: { ...address, cep: onlyNumbersCep }
  };
  next();
}

module.exports = removeSpecialsCharacters;

