import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandles = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description); // Fixed typo here
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.sucess) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null); // Reset image state
      } else {
        toast.error(response.data.message || "Unable to upload the data");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error("Error uploading data. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            onChange={onChangeHandles}
            value={data.name}
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Write Content here"
            onChange={onChangeHandles}
            value={data.description}
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandles}
              value={data.category}
              required
            >
              <option value="Salad">Salad</option>
              <option value="Rols">Rols</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              onChange={onChangeHandles}
              value={data.price}
              required
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
