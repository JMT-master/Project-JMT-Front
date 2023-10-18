import React from 'react';
import style from '../css/KnowledgeWrite.css'
import {VscSearch} from 'react-icons/vsc';
// import { VscSearch } from 'react-icons/vsc';
import {useNavigate} from 'react-router-dom';
import {AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube} from 'react-icons/ai';


const QnaBoardWrite = () => {
    const navigate = useNavigate();
    return (
        <form action="/QnABoard" method="post">
            <div className='QnA-content'>
                <div className='QnA-write-title'>
                    <h1>Qna 작성</h1>
                    <span><AiFillPrinter style={{width: '50px', height: '30px'}}></AiFillPrinter> </span>
                    <span><AiFillFilePdf style={{width: '50px', height: '30px'}}></AiFillFilePdf> </span>
                    <span> <AiFillYoutube style={{width: '50px', height: '30px'}}></AiFillYoutube> </span>
                    <span><AiFillFacebook style={{width: '50px', height: '30px'}}></AiFillFacebook> </span>
                </div>
                <div className='ask'>
                    <h3>Q&A</h3>
                </div>
                <div className='ask-box'>
                    <div className='ask-category'>
                        <h3>카테고리 선택</h3>
                        <p>분야를 선택해주세요</p>
                        <select className='category'>
                            <option value="관광지">관광지</option>
                            <option value="음식">음식</option>
                            <option value="축제">축제</option>
                            <option value="유저">유저</option>
                            <option value="로그인">로그인</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className='location-search'>
                        <h4>장소 검색 </h4>
                        <input type="text"/>
                        <button><VscSearch/></button>
                    </div>
                    <div className='ask-textarea'>
                        <h4>질문 내용 작성</h4>
                        <input type="text" placeholder='제목을 작성해주세요'/>
                        <textarea cols="80" rows="10"></textarea>
                    </div>
                    <div className='file-attach'>
                        <label for='file'>
                            <div className='btn-upload'>파일 업로드 하기</div>
                        </label>
                        <input type="file" name='file' id='file'/>
                    </div>
                </div>
                <div className='button-box'>
                    <button className='submit-knowledge'>작성완료</button>
                    <button className='back-to-knlist' onClick={() => navigate(-1)}>목록으로 돌아가기</button>
                </div>
            </div>
        </form>
    );
};

export default QnaBoardWrite;