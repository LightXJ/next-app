// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.setHeader('Content-Disposition', 'inline; filename="cool.html"')
  res.setHeader('Content-Disposition', 'attachment; filename="cool.html"')
  // res.setHeader('Content-Type', 'application/octet-stream'); 
  res.status(200).send('<HTML>Save me!</HTML>')
}