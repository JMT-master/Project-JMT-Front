import axios from "axios";
import React, { useState } from "react";

const TravelPdf = () => {
  const [travelPlan, setTravelPlan] = useState([]);
  const [travel, setTravel] = useState({
    startTime: Date.now(),
    place: "",
    placeName: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTravel((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setTravelPlan([travel,travel]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    generatePdf();
  };

  const generatePdf = () => {
    fetch("http://localhost:8888/travel/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travelPlan),
    })
      .then((response) => response.blob()) // 응답 데이터를 Blob 객체로 변환합니다.
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "travel_schedule.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <div>
      {/* 필요한 입력 폼 또는 컴포넌트 */}
      <form onSubmit={handleSubmit}>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default TravelPdf;
