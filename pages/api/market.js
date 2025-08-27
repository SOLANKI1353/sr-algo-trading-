const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default async function handler(req, res){
  try {
    const rec = await prisma.apiKey.findFirst({ where: { name: 'angel' }});
    if(rec && rec.key){
      // Real integration placeholder: use rec.key, rec.secret
      // For safety this template returns a notice; replace with SmartAPI calls for live data.
      return res.status(200).json({
        ok:true, live:true, note:'Angel key present — replace placeholder with SmartAPI calls',
        data: { symbols: [] }
      });
    } else {
      // Dummy data
      const dummy = { symbols: [
        { symbol: 'RELIANCE', price: 2460, change: 0.6 },
        { symbol: 'TCS', price: 3500, change: -0.2 },
        { symbol: 'INFY', price: 1720, change: 1.2 }
      ]};
      return res.status(200).json({ ok:true, demo:true, data: dummy });
    }
  } catch(e){
    console.error(e);
    res.status(500).json({ ok:false, error: e.message });
  } finally {
    try{ await prisma.$disconnect(); } catch(e){}
  }
}
