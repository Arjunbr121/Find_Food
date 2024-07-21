import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodid) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, {
        id: foodid,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Unable to delete the item");
      }

      await fetchList();
    } catch (error) {
      console.error("Error removing food:", error);
      toast.error("Failed to remove food item");
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          ))
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
};

export default List;
