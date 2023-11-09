import React, { useState } from "react";

const TravelPdf = (props) => {
  // props로 전달받은 데이터에서 travelId, userId, travelTitle을 추출하여 travelPdfDto 객체 생성
  const travelPdfDto = {
    travelId: props.data.travelId,
    userId: props.data.travelUserId,
    travelTitle: props.data.travelTitle
  };

  // 제출 버튼이 클릭되면 호출되는 함수
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 제출 동작을 막음
    generatePdf(); // generatePdf 함수 호출
  };

  // 서버로부터 PDF를 생성하고 다운로드하는 함수
  const generatePdf = () => {
    // 서버의 API 엔드포인트로 POST 요청을 보냄
    fetch("http://localhost:8888/travel/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 요청의 Content-Type을 JSON으로 설정
      },
      body: JSON.stringify(travelPdfDto), // travelPdfDto 객체를 JSON 문자열로 변환하여 요청 본문에 포함
    })
      .then((response) => response.blob()) // 응답 데이터를 Blob 객체로 변환합니다.
      .then((blob) => {
        // Blob 데이터를 다운로드할 수 있는 URL로 변환
        const url = window.URL.createObjectURL(new Blob([blob]));
        // 새로운 <a> 요소를 생성하고 Blob URL 및 파일 이름을 설정
        const a = document.createElement("a");
        a.href = url;
        a.download = travelPdfDto.travelTitle + ".pdf"; // 다운로드될 파일의 이름 설정
        document.body.appendChild(a); // <a> 요소를 문서에 추가
        a.click(); // <a> 요소를 클릭하여 다운로드 작업 실행
        window.URL.revokeObjectURL(url); // Blob URL 해제
      })
      .catch((error) => {
        console.error("Error generating PDF:", error); // PDF 생성 중 오류가 발생한 경우 콘솔에 오류 메시지 출력
      });
  };

  return (
    <div>
      {/* 폼 제출 시 handleSubmit 함수 호출 */}
      <form onSubmit={handleSubmit}>
        {/* 제출 버튼 */}
        <button type="submit" className="oBtn">제출</button>
      </form>
    </div>
  );
};

export default TravelPdf;
