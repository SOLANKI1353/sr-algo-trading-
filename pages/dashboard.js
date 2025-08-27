import { useEffect, useState } from 'react';
export default function Dashboard(){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    fetch('/api/market').then(r=>r.json()).then(j=>{
      setData(j);
      setLoading(false);
    }).catch(e=>{
      setData({ok:false, error: String(e)});
      setLoading(false);
    });
  }, []);
  if(loading) return <div style={{padding:20}}>Loading...</div>;
  if(!data || !data.ok) return <div style={{padding:20}}>Error: {data && data.error}</div>;
  return (
    <div style={{padding:20}}>
      <h2>Market Data ({data.demo ? 'Demo' : data.live ? 'Live' : 'Unknown'})</h2>
      <ul>
        {data.data.symbols.map(s=>(
          <li key={s.symbol}>{s.symbol} — ₹{s.price} ({s.change}%)</li>
        ))}
      </ul>
    </div>
  );
}
