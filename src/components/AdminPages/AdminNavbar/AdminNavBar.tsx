function AdminNavBar() {
  return (
    <div className="w-100">
      <button className="btn m-3 btn-primary "
      
      onClick={()=>{
        history.back();
      }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <span className="material-symbols-outlined fs-5 ">
            arrow_back_ios
          </span> 
        </div>
      </button>
    </div>
  );
}

export default AdminNavBar;
