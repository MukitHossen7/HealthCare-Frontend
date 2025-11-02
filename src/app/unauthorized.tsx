import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <main className="">
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
