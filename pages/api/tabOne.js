// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  setTimeout(()=>{
    res.status(200).json({ name: 'tabOne' })
  }, 4000) 
}