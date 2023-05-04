import { ActiveLink, Link } from "raviger";
import logo from "./logo.svg";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Login", href: "/login" },
];

export default function Header() {
  return (
    <div className='flex gap-2 items-center'>
      <Link href='/'>
        <img
          src={logo}
          className='animate-spin h-16 w-16'
          alt='logo'
          style={{ animation: "spin 2s linear infinite" }}
        />
      </Link>

      <div className='flex gap-5 items-center'>
        {
          /* Menu */

          menuItems.map((item) => (
            <ActiveLink
              key={item.name}
              href={item.href}
              className='text-xl'
              exactActiveClass='text-blue-600'
            >
              {item.name}
            </ActiveLink>
          ))
        }
      </div>
    </div>
  );
}
