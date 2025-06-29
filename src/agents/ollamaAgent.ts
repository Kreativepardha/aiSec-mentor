import { spawn } from 'child_process'

export const runWithOllama = async (prompt: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const ollama = spawn('ollama', ['run', 'codellama'], {
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    let output = ''
    ollama.stdout.on('data', (data) => {
      output += data.toString()
    })

    ollama.stderr.on('data', (data) => {
      console.error('Ollama Error:', data.toString())
    })

    ollama.on('close', () => {
      resolve(output.trim())
    })

    ollama.stdin.write(prompt)
    ollama.stdin.end()
  })
}
