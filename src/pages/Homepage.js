import React, { useState, useEffect } from 'react'
import ModalDiv from '../components/Modal/Modal';
import Navbar from '../components/navbar/Navbar';
import { Frown } from 'react-feather';
import SingleNote from '../components/singleNote/SingleNote';


const Homepage = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('myNotes')) || []) ;
    }, []);

    const refresh = () =>{
        setData(JSON.parse(localStorage.getItem('myNotes')) || []) ;
    }

    return (
        <>
            <Navbar setShowModal={setShowModal} data={data} setData={setData} refresh={refresh} />
            {showModal &&
                <ModalDiv showModal={showModal} setShowModal={setShowModal} refresh={refresh} />
            }
            {/* Notes */}
            <div className="row justify-content-start mx-0 p-5">
                {!data.length ?
                    <h1 className="text-center display-1 fw-light text-secondary my-5">
                        <Frown size={100} /> No Notes Found!
                    </h1>
                    :
                    data.map((item, index) => (
                        <SingleNote key={item.id} item={item} refresh={refresh} />
                    ))
                }
            </div>
        </>
    )
}

export default Homepage