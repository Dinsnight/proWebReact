import {useEffect, useRef, useState} from "react";

function ProWebProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);
    const [modelVisible, setModelVisible] = useState(false);
    const [selectedProd, setSelectedProd] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const totalInfo = 8;

    const inputRef = useRef(null)

    const indexOfLastPage = currentPage * totalInfo;
    const indexOfFirstPage = indexOfLastPage - totalInfo;

    useEffect(()=>{
        inputRef.current.focus();
    })

    useEffect(() => {
        const getProduct = async ()=>{
            try {
                const response = await fetch("https://dummyjson.com/products")
                const data = await response.json()

                setTimeout(()=>{
                    setProducts(data.products)
                    setLoading(false)
                },2000)
            }catch (e) {
                console.log(e)
            }
        }
        getProduct()
    }, []);

    const filteredProduct = products.filter((prod)=>{
        return prod.title.toLowerCase().includes(search.toLowerCase());
    })

    const curPage = filteredProduct.slice(
        indexOfFirstPage,
        indexOfLastPage
    )

    const addToCart = (product)=>{
       setSelectedProd(product)
        setModelVisible(true)
    }

    const confirmedProd = ()=>{
        if (selectedProd && !cart.includes(selectedProd.title)){
            setCart([selectedProd.title,...cart])
        }
        setModelVisible(false)
        setSelectedProd(null)
    }

    const cancelChose = () =>{
        setModelVisible(false)
        setSelectedProd(null)
    }
    const deleteProd = (id)=>{
        setCart(cart.filter((elem, i)=> i !== id))
    }

    return(
        <div className={"container-fluid"} style={{margin:"0", padding:"0"}}>
            <div className={"d-flex justify-content-end"}>
                <div className={"d-flex flex-column align-items-end border rounded p-3"}>
                    <h3>Cart</h3>
                    {cart.length ===0 ?(
                        <p>Cart empty</p>
                    ):(
                        cart.map((item,index) =>(
                            <div key={index}>
                                <span
                                    key={index}
                                >{item}
                                </span>
                                <button
                                    className={"btn btn-danger"}
                                    onClick={()=>deleteProd(index)}
                                >x</button>
                            </div>
                        ) )
                    )}
                </div>
            </div>

            <h1 className={"text-center"}>Test  for Proweb</h1>

            <label className={"d-flex justify-content-center align-items-center"}>
                <input
                    ref={inputRef}
                    className={"rounded-pill input-group  w-50 px-3"}
                    type={"text"}
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
            </label>
            {modelVisible && (
                <div
                    className={"position-fixed top-0 start-0 w-100  bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"}
                >
                    <div className={"text-center"}>
                        <h4>Add prod</h4>
                        <div className={"d-flex gap-4 m-3"}>
                            <button className={"btn btn-success"} onClick={confirmedProd}>YES</button>
                            <button className={"btn btn-danger"} onClick={cancelChose}>No</button>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <p>Loading...</p>
            ):(
                <div className={"row d-flex justify-content-center align-items-center"}>
                    {curPage.map((product)=>(
                        <div
                        className={"col-sm-12 col-md-6 col-lg-4 p-2"}
                        key={product.id}
                        onClick={()=>addToCart(product)}
                        >
                            <div className={"card"} >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className={"img-fluid"}
                                />
                                <div className={"card-body"}>
                                    <h3 className={"card-title"}>{product.title}</h3>
                                    <p className={"card-text"}>{product.description.slice(0,40)+'...'}</p>
                                    <strong>${product.price}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className={"d-flex justify-content-center align-items-center gap-2 m-2"}>
                {Array.from(
                    {length:(Math.ceil(filteredProduct.length / totalInfo))},
                    (el,index)=>(
                        <button
                            className={"btn btn-outline-dark"}
                            key={index}
                            onClick={()=>setCurrentPage(index + 1)}
                        >
                            {index+1}
                        </button>
                    )
                )}
            </div>

            <footer className={"d-flex align-items-center justify-content-center py-3 bg-dark text-light"}>
                <p>&copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}

export default ProWebProducts