export function warn (location: string, message: string): void {
  console.error(`[Corgi/${location}]: ${message}`)
}