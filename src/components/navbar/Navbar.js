import React, { useState } from 'react'
import { Plus, Search, Trash, RefreshCcw } from 'react-feather' ;

const Navbar = ({data, setData, setShowModal, refresh}) => {
  const [searchValue, setSearchValue] = useState("") ;

  const deleteAll = () =>{
    const pass = window.confirm('Are you sure to delete all note ?')
    if(!pass){
      return
    }
    localStorage.removeItem('myNotes');
    refresh();
  }
  const sorter = (value) => {
    if(value === 'latest'){
      data.sort((a,b)=> b.id - a.id) ;
    }
    if(value === 'oldest'){
      data.sort((a,b)=> a.id - b.id) ;
    }
    if(value === 'high'){
      data.sort((a,b)=> a.priority.localeCompare(b.priority)) ;
    }
    if(value === 'normal'){
      data.sort((a,b)=> b.priority.localeCompare(a.priority)) ;
    }
    setData([...data]);
    console.log(data);
  }
  const search = (e) =>{
    e.preventDefault();
    let newData;
    if(searchValue){
      newData = data.filter((x) => x.title.toLowerCase().includes(searchValue.toLowerCase()));
      setData([...newData]);
    }
    else{
      refresh();
    }
  }
    return (
    <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Notes Making App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        
        <li className="nav-item dropdown my-3">
          <a href="/" className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort By
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={()=>sorter('latest')}>Latest</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('oldest')}>Oldest</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('high')}>Priority High</a></li>
            <li><a className="dropdown-item" onClick={()=>sorter('normal')}>Priority Normal</a></li>
          </ul>
        </li>

        <li className='nav-item mx-2'>
          <button className='nav-link btn btn-sm btn-info text-light px-2 my-3' onClick={()=>setShowModal(true)}><Plus/> Add New</button>
        </li>
        <li className='nav-item mx-2'>
          <button className='nav-link btn btn-sm btn-danger text-light px-2 my-3' onClick={deleteAll}><Trash/>Delete All</button>
        </li>

      </ul>
      <form className="d-flex" role="search" onSubmit={search}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchValue(e.target.value)}/>
        <button className="btn btn-outline-success" type="submit">{searchValue ? <Search/> : <RefreshCcw />}</button>
      </form>
    </div>
  </div>
</nav>
  )
}

export default Navbar