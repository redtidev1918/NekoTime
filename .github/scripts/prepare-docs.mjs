// Root documents and downloadable themes/tools remain authoritative in their original locations.
// Recreate the ignored VitePress copies before every build or development session.
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()
const docs = path.join(root, 'docs')
const publicDir = path.join(docs, 'public')
await mkdir(publicDir, { recursive: true })
for (const directory of ['themes', 'tool', 'public/themes', 'public/tool']) {
  const target = path.resolve(docs, directory)
  if (!target.startsWith(`${docs}${path.sep}`)) throw new Error('Generated path escaped docs')
  await rm(target, { recursive: true, force: true })
}

function documentText(text, source) {
  // Root README links previously resolved against the repository root.
  if (!source.includes('/')) text = text.replace(/([("'])docs\//g, '$1./')
  text = text.replace(/\]\(LICENSE\)/g, '](/LICENSE.txt)')
  text = text.replace(/\]\(\.\.\/docs\//g, '](../')
  if (source === 'README.md') {
    text = text.replace(/\]\(#使用指南\)/g, '](/USAGE.md)')
      .replace(/\]\(#主题系统\)/g, '](/THEMES.md)')
      .replace(/\]\(#技术栈\)/g, '](/TECH_STACK.md)')
  }
  return text
}

for (const file of ['README.md', 'README.en.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'SECURITY.md']) {
  await writeFile(path.join(docs, file), documentText(await readFile(path.join(root, file), 'utf8'), file))
}
await cp(path.join(root, 'LICENSE'), path.join(publicDir, 'LICENSE'))
await cp(path.join(root, 'LICENSE'), path.join(publicDir, 'LICENSE.txt'))

async function copyDirectory(relative) {
  for (const entry of await readdir(path.join(root, relative), { withFileTypes: true })) {
    const source = `${relative}/${entry.name}`
    if (entry.isDirectory()) await copyDirectory(source)
    else {
      // Keep the previous raw file URL as well as a rendered page for Markdown.
      const target = path.join(publicDir, source)
      await mkdir(path.dirname(target), { recursive: true })
      if (!entry.name.endsWith('.md')) await cp(path.join(root, source), target)
      if (entry.name.endsWith('.md')) {
        const rendered = path.join(docs, source)
        await mkdir(path.dirname(rendered), { recursive: true })
        await writeFile(rendered, documentText(await readFile(path.join(root, source), 'utf8'), source))
      }
    }
  }
}
await copyDirectory('themes')
await copyDirectory('tool')
