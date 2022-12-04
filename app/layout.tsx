// vanilla-extract errors with Next 13 at the moment
// import '@/styles/globals.css';

type Props = { children?: React.ReactNode };

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
