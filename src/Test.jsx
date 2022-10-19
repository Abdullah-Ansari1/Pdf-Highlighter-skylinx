import React from 'react'

const Test = () => {
    // function saveTextToFile() {
    //     const saveText = "tmp";
    
    //     // file setting
    //     const text = saveText;
    //     const name = "sample.json";
    //     const type = "text/plain";
    
    //     // create file
    //     const a = document.createElement("a");
    //     const file = new Blob([text], { type: type });
    //     a.href = URL.createObjectURL(file);
    //     a.download = name;
    //     document.body.appendChild(a);
    //     a.click();
    //     a.remove();
    // }
    
    const saveJsonObjToFile=()=> {
        const saveObj = { "a": 3 }; // tmp
    
        // file setting
        const text = JSON.stringify(saveObj);
        const name = "sample.json";
        const type = "text/plain";
    
        // create file
        const a = document.createElement("a");
        const file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
  return (
    <div><button onClick={saveJsonObjToFile}>click</button></div>
  )
}

export default Test