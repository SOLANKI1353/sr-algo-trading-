const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default async function handler(req, res){
  try {
    if(req.method === 'GET'){
      const rec = await prisma.apiKey.findFirst({ where: { name: 'angel' }});
      if(!rec) return res.status(200).json({ ok:true, hasKey:false });
      return res.status(200).json({ ok:true, hasKey:true });
    }
    if(req.method === 'POST'){
      const { key, secret } = req.body || {};
      if(!key) return res.status(400).json({ ok:false, error:'Key required' });
      const existing = await prisma.apiKey.findFirst({ where: { name: 'angel' }});
      if(existing){
        await prisma.apiKey.update({ where: { id: existing.id }, data: { key, secret }});
      } else {
        await prisma.apiKey.create({ data: { name: 'angel', key, secret }});
      }
      return res.status(200).json({ ok:true, saved:true });
    }
    if(req.method === 'DELETE'){
      await prisma.apiKey.deleteMany({ where: { name: 'angel' }});
      return res.status(200).json({ ok:true, deleted:true });
    }
    res.setHeader('Allow',['GET','POST','DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch(e){
    console.error(e);
    res.status(500).json({ ok:false, error: e.message });
  } finally {
    try{ await prisma.$disconnect(); } catch(e){}
  }
}
