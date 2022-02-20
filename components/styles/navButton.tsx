import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

interface Props {
  title: string;
  path: string;
}

const NavButton: FunctionComponent<Props> = ({ title, path }) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <a className={`px-3 py-2 flex items-center hover:bg-slate-700 rounded-md text-sm font-medium cursor-pointer focus:ring-2 focus:ring-red-600 ${router.pathname.startsWith(path) ? 'bg-slate-700' : ''}`}>
        {title}
      </a>
    </Link>
  );
};

export default NavButton;
