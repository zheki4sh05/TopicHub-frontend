function Img({id, fileName}) {
    return ( 
        <img style={{width:"100%", height:"100%"}} src={`http://localhost:8080/api/v1/image?id=${id}`} alt={fileName} />
     );
}

export default Img;