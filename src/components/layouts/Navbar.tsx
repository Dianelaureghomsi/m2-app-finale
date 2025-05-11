"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo1 from "@/public/logos/logo1-wbg.png";

const links = [
  {
    key: "Accueil",
    path: "/",
  },
  {
    key: "Messages",
    path: "/m2/Navigation/message",
  },
  {
    key: "Notes des élèves",
    path: "/m2/Navigation/Notes",
  },
  {
    key: "Évènements",
    path: "/m2/Navigation/Evenement",
  },
];

export function Navbar() {
  const pathname = usePathname();
  const isLoggingIn = pathname === "/m2/connexion";
  const isSigningUp = pathname === "/m2/inscription";

  return (
    <nav className="bg-white border-b border-gray-200 flex justify-between items-center w-full px-40 transition-all duration-300">
      <Link href="/">
        <Image src={logo1} alt="M2 logo" width={150}  />
      </Link>

      <div className="flex items-center space-x-12 justify-between">
        <ul className="flex items-center space-x-6 transition-all duration-300">
          {links.map((link) => (
            <li
              key={link.key}
              className={`${
                pathname == link.path && "text-purple-600"
              } cursor-pointer hover:text-purple-600 transition-all duration-300 font-medium text-gray-500`}
            >
              <Link href={link.path}>{link.key}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-1">
          {!isLoggingIn && (
            <Link
              className="px-10 py-2 rounded-lg font-semibold text-purple-600 hover:text-white hover:bg-purple-600 active:bg-purple-700 transition-all duration-300"
              href="/m2/connexion"
            >
              Connexion
            </Link>
          )}
          {!isSigningUp && (
            <Link
              className="px-10 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 active:bg-purple-700 transition-all duration-300 text-white font-semibold"
              href="/m2/inscription"
            >
              S'inscrire
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
