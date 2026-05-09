import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata = {
  title: "Assure Sift | Premium Relocation Services",
  description: "India's largest and most awarded movers. Experience architectural minimalism and refined hospitality in relocation.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-primary font-body text-text-dark">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
