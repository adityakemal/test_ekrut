import React from 'react';

function Table(props) {
    const {data, remove, header} = props
    var arr = []
    for(let arrData of data){
        arr.push(Object.values(arrData))
    }
    return (
        <table>
            <thead>
                <tr>
                    {
                        header.map((res,i)=><th key={i}>{res}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {arr.map((res,i)=>(
                    <tr key={i}>
                        {
                            res.map((val,j)=><td key={j}>{j === 0 ? i+1 : val}</td>)
                        }
                        <td><i onClick={()=> remove(res[0])}>Remove</i></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;