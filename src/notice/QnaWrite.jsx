import React, { useEffect } from 'react'
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';
import { call, getCookie } from '../common/ApiService';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../common/ApiConfig';

const QnaWrite = (props) => {
    const { id } = useParams(); // 브라우저 주소에서 동적 세그먼트 값 읽어오기
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState("관광지");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [index, setIndex] = useState(parseInt(localStorage.getItem('qna.length')) + 1 || 0);
    const [item, setItem] = useState({
        qnaCategory: category,
        qnaTitle: "",
        qnaContent: "",
        qnaView: 0,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const isContainingWrite = location.pathname.includes('write');
    const [file, setFile] = useState();
    // 첨부파일 변경
    const fileUpload = (e) => {
        // const files = document.getElementById("knowledgeWrite-file").files;
        const files = e.target.files;

        const uploadFile = e.target.files[0];
        console.log("files : ", files);
        console.log("uploadFile : ", uploadFile);

        if (files.length === 1) {
            let value = e.target.value;
            let result = value.split('\\').reverse()[0];

            document.getElementById('qnaWrite-file-text').value = result;
        }
        else
            document.getElementById('qnaWrite-file-text').value = '첨부파일 : ' + files.length + '개';

        setFile(files);

    }
    useEffect(() => {
        if (id) {
            // 브라우저 주소에서 읽어온 id 값이 있을 경우 API 호출
            call(`/qna/admin/${id}`, "GET")
                .then((response) => {
                    console.log("response.data : {}", response);
                    setItem(response);
                    setTitle(response.qnaTitle);
                    setCategory(response.qnaCategory);
                    setContent(response.qnaContent);
                });

        }
    }, [id]); // id 값이 변경될 때마다 useEffect가 다시 실행됨


    const addItem = (item) => {
        const formData = new FormData();

        console.log("add item : {}", item);

        if (file !== undefined && file != null) {
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
            }
        }

        formData.append('data', new Blob([JSON.stringify(item)], {
            type: "application/json"
        }));

        const accessToken = getCookie("ACCESS_TOKEN");

        axios({
            method : 'post',
            url : API_BASE_URL + '/qna/admin/write',
            headers : {
              "Content-Type" : "multipart/form-data",
              "Authorization": 'Bearer ' + accessToken
            },
            data : formData
          }).then(response => {
            console.log("/qna/admin/write :", response)
            if(response.status === 200) {
              window.location.href="/qna";
            }
          });
    }

    const postEditItem = (item) => {
        const formData = new FormData();

        console.log("post item : {}", item);

        if (file !== undefined && file != null) {
            for (let i = 0; i < file.length; i++) {
                formData.append('file', file[i]);
            }
        }

        formData.append('data', new Blob([JSON.stringify(item)], {
            type: "application/json"
        }));

        const accessToken = getCookie();

        axios({
            method : 'post',
            url : API_BASE_URL + '/qna/admin/'+id,
            headers : {
              "Content-Type" : "multipart/form-data",
              "Authorization": 'Bearer ' + accessToken
            },
            data : formData
          }).then(response => {
            console.log("/qna/admin/id :", response)
            if(response.status === 200) {
              window.location.href="/qna/"+id;
            }
          });
    };

    const onButtonClick = () => {
        console.log(index);
        const newItem = {
            qnaCategory: category,
            qnaTitle: document.getElementById('qna_title').value,
            qnaContent: document.getElementById('qna_content').value,
            qnaView: 0,
        };
        addItem(newItem);
    };

    const onPostClick = () => {
        const newItem = {
            qnaCategory: category,
            qnaTitle: title,
            qnaContent: content,
        };
        postEditItem(newItem);
    }

    const cateSelect = (e) => {
        console.log("items[0] : {}", items[0]);
        console.log("index값 : {}", index);
        setCategory(e.target.value);
    }
    //타이틀 변경
    const onChangeTitle =(e) =>{
        setTitle(e.target.value);
    }
    //내용 변경
    const onChangeContent=(e)=>{
        setContent(e.target.value);
    }
    //파일 변경도 추가되어야함
    return (

        <div className='knowledge-content'>
            <div className='knowledge-write-title'>
                <h1>Q & A</h1>
                <span><AiFillPrinter style={{ width: '50px', height: '30px' }}></AiFillPrinter> </span>
                <span><AiFillFilePdf style={{ width: '50px', height: '30px' }}></AiFillFilePdf> </span>
                <span> <AiFillYoutube style={{ width: '50px', height: '30px' }}></AiFillYoutube> </span>
                <span><AiFillFacebook style={{ width: '50px', height: '30px' }}></AiFillFacebook> </span>
            </div>
            <div className='ask'>
                <h3>Q & A 작성</h3>
            </div>
            <div className='ask-box'>
                <div className='ask-category'>
                    <h3>카테고리 선택</h3>
                    <p>분야를 선택해주세요</p>
                    <select className='category' id='category' name='category' value={category} onChange={cateSelect}>
                        <option value={"관광지"} selected>관광지</option>
                        <option value={"음식"}>음식</option>
                        <option value={"축제"}>축제</option>
                        <option value={"여행일정"}>여행일정</option>
                        <option value={"로그인"}>로그인</option>
                        <option value={"기타"}>기타</option>
                    </select>
                    <input type="hidden" id="qna_category" name="qna_category" />
                </div>
                <div className='ask-textarea'>
                    <h4>제목 작성</h4>
                    <input type="text" placeholder='제목을 작성해주세요' id="qna_title" name="qna_title" value={title} onChange={onChangeTitle} />
                    <textarea cols="80" rows="10" id="qna_content" name="qna_content" value={content} onChange={onChangeContent} ></textarea>
                </div>
                <div className='file-attach'>
                    <input placeholder='첨부파일' id='qnaWrite-file-text' readOnly></input>
                    <label for='qnaWrite-file' className='btn-upload'>파일 업로드</label>
                    <input type="file" name='qnaWrite-file' id='qnaWrite-file'
                        accept='.doc, .pdf, image/*'  // doc, pdf, image 파일만 허용
                        multiple
                        onChange={fileUpload}
                    />
                </div>
            </div>
            <div className='button-box'>
                <button type="button" className='submit-knowledge' onClick={onButtonClick} style={{ display: isContainingWrite ? "block" : "none" }}>작성완료</button>
                <button type="button" className='submit-knowledge' onClick={onPostClick} style={{ display: isContainingWrite ? "none" : "block" }}>수정완료</button>
                <button className='back-to-knlist' onClick={() => navigate("/qna")}>목록으로 돌아가기</button>
            </div>
            <input type="hidden" id='qnaNum' name='qnaNum' value={index} />
        </div>

    )
}
export default QnaWrite
