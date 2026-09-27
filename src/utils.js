
export function getBookmarks(key) {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export function saveBookmarks(key, list) {
  localStorage.setItem(key, JSON.stringify(list))
}

export function toggleBookmark(key, item) {
  const list = getBookmarks(key)
  const exists = list.some(b => b.id === item.id)
  const updated = exists
    ? list.filter(b => b.id !== item.id)
    : [...list, { id: item.id, name: item.name }]
  saveBookmarks(key, updated)
  return !exists
}

export function isBookmarked(key, id) {
  return getBookmarks(key).some(b => b.id === id)
}

export function getSessionNote(kind, id) {
  const all = JSON.parse(sessionStorage.getItem('ff_notes') || '{}')
  return all[`${kind}:${id}`] || ''
}

export function setSessionNote(kind, id, note) {
  const all = JSON.parse(sessionStorage.getItem('ff_notes') || '{}')
  all[`${kind}:${id}`] = note
  sessionStorage.setItem('ff_notes', JSON.stringify(all))
}

export function getCurrentTimeString() {
  return new Date().toTimeString().slice(0, 5)
}

export function getTodayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

export function isMarketOpen(market) {
  const today = getTodayName()
  if (!market.operatingDays.includes(today)) return false
  const now = getCurrentTimeString()
  return now >= market.openingHours && now <= market.closingHours
}

export function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function daysUntilNextOpen(market) {
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayIdx = new Date().getDay()
  const now = getCurrentTimeString()

  for (let i = 0; i < 7; i++) {
    const dayName = names[(todayIdx + i) % 7]
    if (!market.operatingDays.includes(dayName)) continue
    if (i === 0 && now > market.closingHours) continue
    return i
  }
  return 7
}

export function sharePageUrl(path) {
  return `${window.location.origin}${path}`
}
