import { useEffect, useState } from "react";

export function useProfile() {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // Log data for debugging
        console.log("Profile data:", data);
        setAdmin(data.admin || false); // Ensure admin is set to false if undefined
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // useEffect(() => {
  //   setLoading(true);

  //   fetch("/api/profile").then((response) => {
  //     response.json().then((data) => {
  //       setAdmin(data.admin);
  //       setLoading(false);
  //     });
  //   });
  // }, []);

  return { admin, loading, error };
}
