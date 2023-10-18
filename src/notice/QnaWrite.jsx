import React from 'react'
import style from '../css/KnowledgeWrite.css'
import { VscSearch } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { AiFillFacebook, AiFillFilePdf, AiFillPrinter, AiFillYoutube } from 'react-icons/ai';

const QnaWrite = () => {



    return (
        <form action="/qna/write" method="post">
            <div className='knowledge-content'>
                <div className='knowledge-write-title'>
                    <h1>Q & A</h1>
                    <span><AiFillPrinter style={{width:'50px', height:'30px'}}></AiFillPrinter> </span>
                    <span><AiFillFilePdf style={{width:'50px', height:'30px'}}></AiFillFilePdf> </span>
                    <span> <AiFillYoutube style={{width:'50px', height:'30px'}}></AiFillYoutube> </span>
                    <span><AiFillFacebook style={{width:'50px', height:'30px'}}></AiFillFacebook> </span>
                </div>
                <div className='ask'>
                    <h3>Q & A 작성</h3>
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
                            <option value="기타">기타</option>
                        </select>
                        {/*<input type="hidden" id="qna_category" name="qna_category">*/}
                    </div>
                    <div className='ask-textarea'>
                        <h4>제목 작성</h4>
                        <input type="text" placeholder='제목을 작성해주세요' id="qna_title" name="qna_title" />
                        <textarea cols="80" rows="10" id="qna_content" name="qna_content"></textarea>
                    </div>
                    <div className='file-attach'>
                        <label htmlFor='file'>
                            <div className='btn-upload'>파일 업로드 하기</div>
                        </label>
                        <input type="file" name='file' id='file' multiple/>
                    </div>
                </div>
                <div className='button-box'>
                    <button type="button" className='submit-knowledge' onSubmit="">작성완료</button>
                    {/*<button className='back-to-knlist'onClick={() => navigate(-1)}>목록으로 돌아가기</button>*/}
                </div>
            </div>
        </form>
    )
}
export default QnaWrite
