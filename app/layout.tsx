import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "AI Assignments",
  description: "The best place to learn AI",
};

export default function RootLayout({ children }: { children: ReactNode }) {

  const routes = [{ dist: "/", name: "Home" },
  { dist: "/connect4", name: "Connect4" },
  { dist: "/logic", name: "Logic Last Exo" },
  { dist: "/csp", name: "Time Table CSP" },
  { dist: "/minimax", name: "Minimax Exo 4" },
  { dist: "/sequence", name: "Sequence Exo 5" },
  ];


  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <aside
            style={{
              width: '200px',
              background: '#f0f0f0',
              padding: '1rem',
            }}
          >

            <nav>
              {routes.map((route, i) => (<div key={i}><Link key={i} href={route.dist}>{route.name}</Link> <br /></div>))}
            </nav>
          </aside>

          <main style={{ flex: 1, padding: '1rem' }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
