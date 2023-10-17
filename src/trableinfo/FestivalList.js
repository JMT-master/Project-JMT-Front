import React from 'react'

const FestivalList = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    
    //페이징용 변수
    const [page, setPage] = useState(1);
    const offset = 12;
    const pageNum = (page - 1) * offset;
    const lastPage = useRef(1);
    const today = Date.now();
    const startDate = new Date(today);
    
    useEffect(() => {
        setLoading(true);
        const dataList = async() => {
            let bodys = [];
            const fes = await axios.get(`https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=my9Z7i6kA%2Fhu2ib1%2FYstUwf1C5qXraJGV%2FJYUpbnKeAwMZgjcXiJ33nAQ3jQ0yxNAL5hlWtyMOj6rdBwGLnaIA%3D%3D&numOfRows=1300&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=${startDate.getFullYear()}`)
            bodys = bodys.concat(fes.body.items)


        } 
    }, []);

    return (
        <div>FestivalList</div>
    )
}
export default FestivalList
