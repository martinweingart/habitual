import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-10 text-center flex flex-col gap-5">
      <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
        Habitual
      </h1>
      <div
        className="flex flex-1 px-5 min-h-[480px] flex-col justify-center"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuARO7tjGoA4X8eka3ALGo30Ai960e6bJ9QNa7L-mCtux54JkjZJzIAkXr5poFBf51vX9yVS02BM5_jk4BSG3fFgfvjwqdgfReFpcYBxmV1WXth67b6Md5k6LzRK6d8ETiQQ1FFu8UKz3XmnP_My2Zcp0SrventH3tpmxV5TvlEUtSnilC2pioMf5wnXMj3cDmEvwBGBo1ixT99_umerx-qwfKhLB5fJjuRbJD65NXUYKytS26caJbpKWU10lsHx9o56fwdUXtSVT9o',
        }}
      >
        <div className="flex flex-col gap-5 text-center text-white">
          <h2 className="text-4xl font-black">Build better habits, together</h2>
          <h3 className="text-sm font-normal">
            Habitual is habit tracker that helps you stay motivated and achieve
            your goals.
          </h3>

          <div className="flex-wrap gap-3 flex justify-center flex-col md:flex-row">
            <Link href="/register">
              <Button variant="primary">Sign Up</Button>
            </Link>
            <Link href="/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
