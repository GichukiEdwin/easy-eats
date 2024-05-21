import Image from "next/image";
import toast from "react-hot-toast";

export default function ImageUpload({ link, setLink }) {
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (files?.length > 0) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setLink(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Error",
      });
    }
  };

  return (
    <>
      {link && (
        <Image
          className="rounded-lg h-full w-full mb-1"
          src={link}
          width={250}
          height={250}
          alt={"avatar"}
        />
      )}

      {!link && (
        <div className="bg-gray-200 text-center rounded-lg p-4 text-gray-500 mb-1">
          No image
        </div>
      )}

      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="border border-gray-300 rounded-lg p-2 block text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
