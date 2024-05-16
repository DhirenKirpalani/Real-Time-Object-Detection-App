import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real-Time Object Detection App",
  description: "A real-time object detection app built with TensorFlow.js and React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Real-Time Object Detection App</title>
        <meta name="description" content="A real-time object detection app built with TensorFlow.js and React" />
        <meta property="og:title" content="Real-Time Object Detection App" />
        <meta property="og:description" content="A real-time object detection app built with TensorFlow.js and React" />
        <meta property="og:image" content="/preview.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
