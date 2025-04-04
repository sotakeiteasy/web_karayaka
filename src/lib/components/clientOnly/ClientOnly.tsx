import { useEffect, useState } from "react";

export default function ClientOnly({
  children,
  ...delegated
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div {...delegated}>{children}</div>;
}
