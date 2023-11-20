import { ReactNode } from 'react';
// import Transition from '@/app/transition';

type Props = { children?: ReactNode };
export default function Layout({ children }: Props) {
  return <>{children}</>;
}
