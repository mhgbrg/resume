const fs = require('fs')
const path = require('path')

const express = require('express')
const Mustache = require('mustache')
const yaml = require('js-yaml')

const port = process.env.PORT
const resumeContentFilename = process.argv[2]

const app = express()

app.use(express.static(path.resolve(__dirname, '..', 'node_modules')))

app.get('/preview', (req, res) => res.send(renderPage('preview')))
app.get('/plain', (req, res) => res.send(renderPage('plain')))

app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
)

function readFile(filename) {
  const filepath = path.resolve(__dirname, filename)
  return fs.readFileSync(filepath, 'utf-8')
}

function renderPage(page) {
  const data = yaml.safeLoad(
    fs.readFileSync(resumeContentFilename, 'utf-8'),
    'utf8'
  )
  const template = readFile(`templates/pages/${page}.mst`)
  const partials = {
    resume: readFile('templates/partials/resume.mst'),
    section: readFile('templates/partials/section.mst'),
  }
  return Mustache.render(template, data, partials)
}
