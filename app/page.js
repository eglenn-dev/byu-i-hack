import Link from "next/link";

export default async function Home() {

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <Link href={'/login'}>Login</Link>
      <Link href={'/signup'}>Signup</Link>
    </div>
  );
}
