import { ActiveLink, navigate } from "raviger";
import logo from "./logo.svg";
import { UserProfile } from "./types/userTypes";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function Header(props: { currentUser: UserProfile }) {
  return (
    <div className='flex gap-2 items-center'>
      <ActiveLink href='/'>
        <img
          src={logo}
          className='animate-spin h-16 w-16'
          alt='logo'
          style={{ animation: "spin 2s linear infinite" }}
        />
      </ActiveLink>

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

        {
          /* User */
          props.currentUser?.username?.length > 0 ? (
            <button
              className='text-xl'
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
                window.location.reload();
              }}
            >
              Logout
            </button>
          ) : (
            <ActiveLink
              href='/login'
              className='text-xl'
              exactActiveClass='text-blue-600'
            >
              Login
            </ActiveLink>
          )
        }
      </div>
    </div>
  );
}
