import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Note() {
  const params = useParams();
  const [todoDetail, setTodoDetail] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    fetch(`/api/todos/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        const dataText = data.todo;
        setTodoDetail(dataText);
        setIsLoaded(true);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [params.id]);
  return (
    <>
      {isLoaded ? (
        <div>
          <h2>{todoDetail.name}</h2>
          <p>Status: {todoDetail.status}</p>
        </div>
      ) : (
        <CircularProgress className="spinner" />
      )}
    </>
  );
}
