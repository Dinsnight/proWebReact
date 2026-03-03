import {useEffect, useRef, useState} from "react";

function ProWebProducts(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [cart, setCart] = useState([]);

    const inputRef = useRef(null)

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

    const addToCart = (title)=>{
        if (!cart.includes(title)){
            setCart([...cart, title])
        }
    }
    const deleteProd = (id)=>{
        setCart(cart.filter((elem, i)=> i !== id))
    }

    return(
        <div className={"container-fluid"}>
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

            {loading ? (
                <p>Loading...</p>
            ):(
                <div className={"row"}>
                    {filteredProduct.map((product)=>(
                        <div
                        className={"col-sm-12 col-md-6 col-lg-4 p-2"}
                        key={product.id}
                        onClick={()=>addToCart(product.title)}
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
        </div>
    )
}

export default ProWebProducts