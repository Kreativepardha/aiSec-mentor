export const detectCodeInText = (text: string): boolean => {
  const codeKeywords = ['function', 'SELECT', 'const', 'await', 'req', 'res', '{', '};']
  const lines = text.split('\n')
  const keywordHits = lines.filter(line =>
    codeKeywords.some(kw => line.toLowerCase().includes(kw.toLowerCase()))
  )

  return keywordHits.length >= 3 // treat as code if ≥ 2 lines have code
}
