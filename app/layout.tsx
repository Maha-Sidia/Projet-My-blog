import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Y-BLOG",
  description: "A modern blog with dark/light mode",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-[var(--bg)] text-[var(--text)] transition-colors duration-200">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
