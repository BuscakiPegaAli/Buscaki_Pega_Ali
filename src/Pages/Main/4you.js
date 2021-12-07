import Card from './Card'
import { useState, useEffect } from 'react'




//  Faz o card
function MakeCard({ products, scrollX }){
    
    console.log(products);
return ( 
products.map((product, index) => {

   
    return (
        <Card style={{ marginLeft: index === 0 ? scrollX + 'px' : '1%'}} key={product.id} mg={product.nome} alt={product.categoria} img={product.valor} title={product.descicao} value={product.estoque}  />
    )})
    )
};


function Foryou() {

    const [scrollX, setScrollX] = useState(0)
    const [products, setProducts] = useState([]);
    const [filterCategoria, setFilterCategoria] = useState('');

    useEffect(() => {
        fetch('http://localhost:8081/api/produtos').then(function (response) {
            return response.json();
        }).then((products) => {
            setProducts(products);
        })
    }, [])

    const handleLeftArrow = () => {
        let tamanhoTela = window.innerWidth * 0.8;
        let quantidadeCards = products.length;
        let tamanhoCards = 0.21;


        if(window.innerWidth < 800){
            tamanhoCards = 0.34;
        }
        else if(window.innerWidth < 1200){
            tamanhoCards = 0.25;
        }
        else {
            tamanhoCards = 0.20;
        }
        let listW =  tamanhoTela * tamanhoCards * quantidadeCards;
        let x = scrollX + Math.round(tamanhoTela / 2);
        if(x >= 0) {
            if(scrollX !== 0){
                x = 0;
            }
            else {
                x = ( tamanhoTela - listW )
            }
        }
        
        setScrollX(x)
        console.log(x)
        console.log(products.length)
    } 



    const handleRightArrow = () => {
        let tamanhoTela = window.innerWidth * 0.8;
        let quantidadeCards = products.length;
        let tamanhoCards = 0.21;
    
         if(window.innerWidth < 800){
            tamanhoCards = 0.34;
        }
        else if(window.innerWidth < 1200){
            tamanhoCards = 0.25;
        }
        else {
            tamanhoCards = 0.20;
        }
        let x = scrollX - Math.round(tamanhoTela / 2);
        let listW =  tamanhoTela * tamanhoCards * quantidadeCards;

        if ((tamanhoTela - listW) > x) {
            if(scrollX !== (tamanhoTela - listW)) {
                x = (tamanhoTela - listW);
            } 
            else {
                x = 0;
            }
        }
        

        setScrollX(x)
        console.log(x)
    }

    
    return(  

    <div className="center">
        <i className="bi bi-chevron-left BBG" onClick={handleLeftArrow}></i>
        <div className="cards" >
            <MakeCard products={products} scrollX={scrollX} />
        </div>
        <i className="bi bi-chevron-right BBG" onClick={handleRightArrow}></i>
    </div>
    )
}




// Exporta o Card

export default Foryou;