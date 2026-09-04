import './globals.css';

export const metadata = {
  title: 'Negombo Fish Price Board | Live Landing Site Rates',
  description: 'Real-time daily fish prices reported by fishermen and buyers across Negombo landing sites.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
