import { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddCategory from "../../components/AddCategory";

export const loader = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error("error while trying to get all categories");
    } else {
      return data;
    }
  } catch (error) {
    throw new Error("error while trying to get all categories");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/videos`,
      {
        method: "POST",
        body: formData,
      },
      { credentials: "include" }
    );
    const data = await res.json();
    if (res.status !== 201) {
      return toast.error(data?.message, {
        position: "bottom-right",
      });
    }

    return toast.success("Video uploaded successfully", {
      position: "bottom-right",
    });
  } catch (error) {
    console.error({ message: "error while adding new video" });
  }
  return null;
};

export default function DashboardAddVideo() {
  const result = useActionData();
  const formRef = useRef();
  const navigation = useNavigation();
  const isSubmiting = navigation.state === "submitting";

  useEffect(() => {
    if (result) {
      formRef.current.reset();
    }
  }, [result]);

  const categories = useLoaderData();

  return (
    <div className="page">
      <Form
        ref={formRef}
        method="post"
        className="flex flex-col w-full gap-8 mt-8"
        encType="multipart/form-data"
      >
        <input
          className="px-2 py-2 rounded-lg"
          type="text"
          name="title"
          placeholder="title"
          required
        />
        <textarea
          className="px-2 py-2 resize-none min-h-[8rem]"
          name="description"
          placeholder="description"
          required
        />
        <div className="flex flex-col items-center justify-between gap-y-8 sm:gap-0 sm:flex-row">
          <select
            className="px-2 py-4 rounded-lg w-full sm:w-[50%]"
            name="category"
            required
          >
            <option value="">category</option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                  id={category.id}
                >
                  {category.name}
                </option>
              ))}
          </select>
          <AddCategory />
        </div>
        <select className="px-2 py-4 rounded-lg" name="isPrivate">
          <option value="public">public</option>
          <option value="private">private</option>
        </select>
        <input type="file" name="file" />
        <button
          className={
            isSubmiting
              ? `bg-gray-300 button`
              : `text-white bg-primary hover:bg-primary/80 button`
          }
          type="submit"
          disabled={isSubmiting}
        >
          {isSubmiting ? "Uploading..." : "Add"}
        </button>
      </Form>
      <ToastContainer />
    </div>
  );
}
