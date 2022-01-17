import React, { useEffect } from "react";
import { useState } from "react";
import styled from 'styled-components';
// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
`;
// Creating a custom hook
function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);
    function onChange(e) {
        setValue(e.target.value);
    }
    return {
        value,
        onChange,
    };
}


const Box = ({ values }) => {

    return (
        <div className='lg--4 md--6 sm--12 box-container'>
            <div className='box'>
                <h2>{values.title}</h2>

                <img src={values.image} alt=""></img>
                <p className='description'>{(values.description.length < 100) ? (values.description) : (values.description.substring(0, 100) + "...")}

                </p>
                <div>
                    <span className='price'>Price: ${values.price.toFixed(2)}</span>
                    <span className='rating'>Rating: {values.rating.rate}/5</span>
                </div>
                <div>
                    <button className="buy">BUY</button>
                </div>
            </div>
        </div>
    );
};






const FakeStore = ({ product }) => {
    const [filteredProd, setFilteredProd] = useState(product);
    useEffect(
        () => {
            setFilteredProd(product);
        }, [product]
    )
    const categoryProps = useInput();
    const priceProps = useInput();

    return (
        <div><h1><span className='block'>Alexander Sarancha</span><span className='block italic'>Fakestore</span></h1>

            <div className='input-group'><StyledInput
                {...categoryProps}
                placeholder="Category"
            />
                <button className="search" onClick={() => {
                    let temp = product.filter((prod) =>
                        prod.category.toUpperCase().includes(categoryProps.value.toUpperCase())
                    );
                    setFilteredProd(temp);


                }}>Category </button>
            </div>
            <div className='input-group'>
                <StyledInput
                    {...priceProps}
                    placeholder="Maximum Price"
                    type="number"
                />
                <button className="search" onClick={() => {
                    let temp = product.filter((prod) =>
                        parseFloat(prod.price) <= parseFloat(priceProps.value)
                    );
                    setFilteredProd(temp);


                }}>Maximum price </button>
            </div>



            <button className='fuctionButton' onClick={() => {
                let temp = [...product];
                temp.sort((a, b) => b.price - a.price);
                setFilteredProd(temp);

            }
            }>Price Up</button>
            <button className='fuctionButton' onClick={() => {
                let temp = [...product];;
                temp.sort((a, b) => a.price - b.price);
                setFilteredProd(temp);

            }
            }>Price Down</button>
            <button className='fuctionButton' onClick={() => {
                let temp = [...product];
                setFilteredProd(temp);

            }
            }>Reset</button>

            <section className="boxes-container">
                {filteredProd.map((values) => {
                    return (
                        <Box values={values} />
                    )
                })}


            </section>
        </div >
    )
};
export default FakeStore;