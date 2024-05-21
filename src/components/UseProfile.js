import { useEffect, useState } from "react";

export function useProfile() {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setAdmin(data.admin);
        setLoading(false);
      });
    });
  }, []);

  return { admin, loading };
}
