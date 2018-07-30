const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer')

const port = process.argv[2]
const outputFilename = process.argv[3]

const dirname = path.dirname(outputFilename)
if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname)
}

async function generatePdf() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}/plain`, {
    waitUntil: 'networkidle2',
  })
  await page.pdf({ path: outputFilename, format: 'A4' })
  await browser.close()
}

generatePdf()
  .then(() => console.log(`Resume saved as ${outputFilename}`))
  .catch(console.error)
