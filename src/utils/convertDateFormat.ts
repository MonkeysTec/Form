export const convertDateFormat = (inputDate: string | undefined) => {
  if (!inputDate) return;
  const parts = inputDate.split('/');
  if (parts.length === 3) {
    const year = parts[2];
    const month = parts[1];
    const day = parts[0];
    const convertedDate = `${year}-${month}-${day}`;
    return convertedDate;
  } else {
    return 'Formato inválido';
  }
};