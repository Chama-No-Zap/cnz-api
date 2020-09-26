const removeSpecialsCharacters = (data) => {
  const { cpf = '', phone = '', cep = ''} = data;
  const regex = new RegExp(/[^\d]+/g);
  const onlyNumbersCpf = cpf.replace(regex, '');
  const onlyNumbersPhone = phone.replace(regex, '');
  const onlyNumbersCep = phone.replace(regex, '');
  return { ...data, cpf: onlyNumbersCpf, phone: onlyNumbersPhone, cep: onlyNumbersCep };
}

module.exports = removeSpecialsCharacters;
