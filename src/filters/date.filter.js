export default function dateFilter(value) {
  const options = {
    day: '2-digit',
    month: 'numeric',
    year: 'numeric'
  }
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
