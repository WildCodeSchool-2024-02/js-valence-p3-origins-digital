import { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRevalidator } from "react-router-dom";

export default function AddCategory() {
  const categoryRef = useRef();
  const revalidator = useRevalidator();

  const handleCreate = async (e) => {
    e.preventDefault();
    const category = categoryRef.current.value;
    const formatedCategory = `${category.charAt(0).toUpperCase()}${category.slice(1)}`;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category: formatedCategory,
          }),
          credentials: "include",
        }
      );
      if (res.status === 201) {
        categoryRef.current.value = "";
        revalidator.revalidate();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center w-full sm:w-auto">
      <input
        className="mr-2"
        type="text"
        placeholder="create new category"
        ref={categoryRef}
      />
      <button
        className="mt-0 bg-primary"
        aria-label="create"
        type="button"
        onClick={handleCreate}
      >
        <FontAwesomeIcon className="px-1 text-white" icon={faPlus} />
      </button>
    </div>
  );
}
