import FormNav from "@/components/ui/FormNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FormNav />
        {children}
      </body>
    </html>
  );
}
