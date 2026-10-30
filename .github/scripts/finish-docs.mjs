// Preserve raw Markdown download URLs after VitePress has rendered their HTML pages.
import { cp, mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
async function copyMarkdown(relative) {
  for (const entry of await readdir(relative, { withFileTypes: true })) {
    const source = `${relative}/${entry.name}`
    if (entry.isDirectory()) await copyMarkdown(source)
    else if (entry.name.endsWith('.md')) {
      const target = path.join('docs/.vitepress/dist', source)
      await mkdir(path.dirname(target), { recursive: true })
      await cp(source, target)
    }
  }
}
await copyMarkdown('themes')
await copyMarkdown('tool')
