import { useState, useEffect } from 'react';
export default function Settings(){
  const [key, setKey] = useState('');
  const [secret, setSecret] = useState('');
  const [status, setStatus] = useState('');
  const [hasKey, setHasKey] = useState(false);
  useEffect(()=>{
    fetch('/api/settings').then(r=>r.json()).then(j=>{
      if(j && j.hasKey) setHasKey(true);
    }).catch(()=>{});
  },[]);
  async function save(e){
    e.preventDefault();
    setStatus('Saving...');
    const res = await fetch('/api/settings', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ key, secret })
    });
    const j = await res.json();
    if(j.ok) { setStatus('Saved'); setHasKey(true); setKey(''); setSecret(''); }
    else setStatus('Error: '+(j.error||'unknown'));
  }
  async function removeKey(){
    if(!confirm('Remove API key?')) return;
    const r = await fetch('/api/settings',{method:'DELETE'});
    const j = await r.json();
    if(j.ok){ setStatus('Removed'); setHasKey(false); }
  }
  return (
    <div style={{padding:20}}>
      <h2>Settings — Angel API</h2>
      <p>Mode: <b>{hasKey? 'Live (Angel)' : 'Demo (no key)'}</b></p>
      <form onSubmit={save}>
        <div>
          <label>Angel API Key</label><br/>
          <input value={key} onChange={e=>setKey(e.target.value)} style={{width:400}} placeholder="Enter Angel API Key"/>
        </div>
        <div style={{marginTop:8}}>
          <label>Angel API Secret (optional)</label><br/>
          <input value={secret} onChange={e=>setSecret(e.target.value)} style={{width:400}} placeholder="Optional secret"/>
        </div>
        <div style={{marginTop:12}}>
          <button type="submit">Save API Key</button>
          <button type="button" style={{marginLeft:8}} onClick={removeKey}>Remove Key</button>
        </div>
      </form>
      <div style={{marginTop:12}}>{status}</div>
      <hr/>
      <p>After saving the key, go to Dashboard to see live mode (placeholder).</p>
    </div>
  );
}
