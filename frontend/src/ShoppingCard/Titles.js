import React from 'react'

export default function Titles(props) {
    return (
        <div >
            <h1 className='h1'>
                {props.mainTitle}
                {props.subTitle}
            </h1>
        </div>
    )
}

// export default function Titles(mainTitle, subTitle) {
//     return (
//         <div>
//             <h1>
//                 {mainTitle}
//                 {subTitle}
//             </h1>
//         </div>
//     )
// }
// 另一種寫法