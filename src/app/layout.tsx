import type { Metadata, Viewport } from "next";
import { Outfit, Noto_Serif } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5D4037",
};

export const metadata: Metadata = {
  title: "Lakshmi's Ghumagumalu | Fast Food & Meals in Secunderabad",
  description: "Delicious fast food, rice, noodles, starters and milkshakes at affordable prices. Located at SD Road, Secunderabad, Telangana.",
  keywords: ["restaurant", "fast food", "Secunderabad", "Hyderabad", "affordable meals", "Chinese food", "Indian food"],
  authors: [{ name: "Lakshmi's Ghumagumalu" }],
  openGraph: {
    title: "Lakshmi's Ghumagumalu | Fast Food & Meals",
    description: "Delicious fast food, rice, noodles, starters and milkshakes at affordable prices in Secunderabad.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${notoSerif.variable} font-sans antialiased`}
      >
        {children}
        {/* Netlify Form Detection Fallback */}
        <form name="feedback" data-netlify="true" netlify-honeypot="bot-field" hidden>
          <input type="hidden" name="form-name" value="feedback" />
          <input type="text" name="name" />
          <input type="number" name="rating" />
          <textarea name="feedback"></textarea>
          <input type="text" name="phone" />
        </form>
      </body>
    </html>
  );
}
