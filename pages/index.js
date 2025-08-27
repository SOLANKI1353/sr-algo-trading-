import Link from 'next/link';
export default function Home(){
  return (
    <div style={{fontFamily:'Arial, sans-serif', padding:20}}>
      <h1>🚀 SR Algo Trading (Angel API - Demo)</h1>
      <p>This is a demo deployment. Go to <Link href="/dashboard">Dashboard</Link> or <Link href="/settings">Settings</Link> to add your Angel API key.</p>
      <hr/>
      <p>When you add the Angel API key in Settings, the app will switch to live mode (real market data).</p>
    </div>
  );
}
