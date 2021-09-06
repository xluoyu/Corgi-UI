export const useCopy = (content: string): Promise<void> => {
  return navigator.clipboard.writeText(content)
}
