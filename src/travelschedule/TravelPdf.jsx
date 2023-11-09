import React, { useState } from "react";

const TravelPdf = (props) => {

  const travelPdfDto = {
    travelId : props.data.travelId,
    userId : props.data.travelUserId
  }

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
      body: JSON.stringify(travelPdfDto),
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
      <form onSubmit={handleSubmit}>
        <button type="submit" className="oBtn">제출</button>
      </form>
    </div>
  );
};

export default TravelPdf;
