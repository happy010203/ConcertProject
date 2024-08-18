const App = () => {

    const a = "react入門課程"

    // const handleClick = (event) =>{
    //     console.log("點擊了")
    //     console.log(event)
    // }//事件寫法一，要執行的事不只一行，就寫成函式

    return(
        <div>
            <div>
                <p className="text">App</p>
            </div>
            <p>{a.slice(5)}</p>
            <button onClick={()=>console.log(' 點擊了')}>按鈕</button>
            {/* <button onClick={handleClick}>按鈕</button> */}
        </div>
    )
}

export default App;