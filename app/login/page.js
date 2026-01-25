export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <input className="input" placeholder="Email" />
      <input className="input mt-2" type="password" placeholder="Password" />
      <button className="btn-primary mt-4 w-full">Login</button>
    </div>
  );
}
