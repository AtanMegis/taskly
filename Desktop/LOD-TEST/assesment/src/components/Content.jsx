import React from 'react'

const Content = ({ price, title, desc }) => {
    return (
        <>
            <h1 className="text-6xl font-bold  text-[#FF922C]">{price}</h1>
            <h2 className="text-4xl text-[#333333] font-bold my-4">{title}</h2>
            <p className="line-clamp-3 text-base text-[#333333]">{desc}</p>
        </>
    )
}

export default Content
