import lock from './assets/lock.png'
import img1 from './assets/1.png'
import img2 from './assets/2.png'
import img3 from './assets/3.png'
import img4 from './assets/4.png'
import img5 from './assets/5.png'
import FancyCarousel from 'react-fancy-circular-carousel'
import 'react-fancy-circular-carousel/FancyCarousel.css'
import { useState } from 'react'
import Content from './components/Content.jsx'

function App() {
    const [focusElement, setFocusElement] = useState(0)
    const images = [img1, img2, img3, img4, img5, img1, img2, img3]
    const info = [
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp 45.000"
            title="Salad Ayam Kacang Tahu"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp 23.0000"
            title="Salad Timun dan Udang Segar"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp. 44.000"
            title="Dada Ayam daun Selada"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp 45.000"
            title="Salad Ayam Kacang Tahu"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp 23.0000"
            title="Salad Timun dan Udang Segar"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp. 44.000"
            title="Dada Ayam daun Selada"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp 23.0000"
            title="Salad Timun dan Udang Segar"
        />,
        <Content
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consectetur odio ducimus laboriosam vero dolores?"
            price="Rp. 44.000"
            title="Dada Ayam daun Selada"
        />,
    ]

    return (
        <>
            <div className="w-[1440px] h-screen my-10 mx-20 relative ">
                <div
                    className="absolute h-full w-full z-10 "
                    style={{
                        clipPath: 'ellipse(42% 56% at 67% 0%)',
                        backgroundColor: '#FFEEDE',
                    }}
                ></div>
                <div className="relative bg-[#FFFFFF]">
                    <div className="flex flex-row items-center justify-between relative z-10">
                        <h1 className="text-4xl">Food Ajah</h1>
                        <ul className="flex gap-12 text-2xl">
                            <a href="/">
                                <li>Sarapan</li>
                            </a>
                            <a href="">
                                <li>Makan Siang</li>
                            </a>
                            <a href="">
                                <li>Makan Malam</li>
                            </a>
                        </ul>
                        <button>
                            <img
                                src={lock}
                                alt={lock}
                                className="cursor-pointer"
                            />
                        </button>
                    </div>
                    <div className="flex flex-row mt-36 w-full ">
                        <div className="flex flex-col w-[30%]">
                            {info[focusElement]}
                        </div>
                        <div className="flex w-[70%] pl-16 relative z-30 ">
                            <div>
                                <FancyCarousel
                                    setFocusElement={setFocusElement}
                                    images={images}
                                    carouselRadius={300}
                                    peripheralImageRadius={50}
                                    centralImageRadius={100}
                                    borderWidth={4}
                                    borderHexColor={'E87F1E'}
                                    navigationButtonStyling={{
                                        backgroundColor: '#FF922C',
                                    }}
                                    transitionTime={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
