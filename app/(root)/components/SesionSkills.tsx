'use client'

import { useResize } from "@/hooks/useResize";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react"
gsap.registerPlugin(ScrollTrigger)

const SesionSkills = ({ className, ...props }: { className: string }) => {
    const skils = [
        'React',
        'Nextjs',
        'Tailwindcss',
        'Shadcn',
        'Ant Design',
        'Javascript',
        'Typescript',
        'Zustand',
        'React Query',
        'Github',
        'Html',
        'Css',
        'Sass',
    ]

    const sessionRef = useRef(null);

    const triggerRef = useRef(null);

    const { isVisibleMobile } = useResize()

    useEffect(() => {
        gsap.fromTo(
            triggerRef.current,
            { x: isVisibleMobile ? '-150%' : '33%' }, // Bắt đầu từ vị trí bên trái
            {
                x: isVisibleMobile ? '0%' : '-35%', // Kết thúc ở vị trí chuẩn
                duration: 5,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top center', // Kích hoạt ngay khi đến giữa của phần tử
                    end: 'top bottom', // Kết thúc khi cuộn đến giữa dưới của phần tử
                    scrub: 5, // Hiệu ứng kéo theo scroll
                    // markers: true, // Hiển thị markers để kiểm tra
                    onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung

                },
            }
        );
    }, [])


    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.box-bgc',
                start: 'top center',
                end: 'bottom end',
                scrub: 2,
            }
        });

        tl.fromTo('.box-bgc', {
            // borderBottomLeftRadius: '0%',
            // borderBottomRightRadius: '0%',
            duration: 5,
            ease: 'power1.inOut',
        }, {
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px',
            ease: 'power3.out',
        })
            .to('.box-bgc', { // Thêm bước mới vào timeline
                // borderBottomLeftRadius: '500px',
                // borderBottomRightRadius: '500px',
                duration: 2, // Thời gian hiệu ứng
            }, "-=3"); // Bắt đầu sau 0.5 giây
    }, [])


    useEffect(() => {
        const textElement = document.querySelectorAll('.box-skills')
        gsap.fromTo(
            textElement,
            {
                borderRadius: '0%',
                opacity: 0.5
            }, // Bắt đầu từ vị trí bên trái
            {
                duration: 5,
                opacity: 1,
                borderRadius: '16px',
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: '.box-bgc',
                    start: 'top center', // Kích hoạt ngay khi đến giữa của phần tử
                    end: 'top', // Kết thúc khi cuộn đến giữa dưới của phần tử
                    scrub: 5, // Hiệu ứng kéo theo scroll
                    // markers: true, // Hiển thị markers để kiểm tra
                    onEnterBack: () => console.log('Cuộn hết nội dung'), // Xác định khi nào cuộn hết nội dung
                },
            }
        );

    }, [])

    useEffect(() => {
        const elements = document.querySelectorAll('.text-gray-200') as NodeListOf<HTMLElement>;

        elements.forEach(element => {
            let isDragging = false;
            let initialX: any, initialY: any;
            let xOffset = 0, yOffset = 0;

            element.addEventListener('mousedown', (e: any) => {
                isDragging = true;
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            });

            element.addEventListener('mousemove', (e: any) => {
                if (isDragging) {
                    e.preventDefault(); // Ngăn chặn việc chọn văn bản khi kéo
                    const currentX = e.clientX - initialX;
                    const currentY = e.clientY - initialY;

                    xOffset = currentX;
                    yOffset = currentY;

                    element.style.transform = `translate(${currentX}px, ${currentY}px)`;

                }
            });

            element.addEventListener('mouseup', () => {
                isDragging = false;
            });

            element.addEventListener('mouseleave', () => {
                isDragging = false;
            });

        });
    }, []);



    return (
        <div id="ss-skills" ref={sessionRef} className='flex flex-col gap-8 overflow-hidden'>
            <h1 className='text-center text-lg md:text-2xl mb-section lg:text-4xl'>Skills</h1>
            <div className={`shadow-xl box-bgc w-full bg-gray-500 overflow-hidden`} >
                <div ref={triggerRef} className={`flex ${isVisibleMobile ? 'flex-row flex-wrap' : 'flex-row'} gap-2 mx-16 justify-center my-32`}>
                    {skils.map((e, index) => {
                        return (
                            <div key={index} className={`text-gray-200 cursor-grab box-skills  border ${isVisibleMobile ? 'min-w-fit w-fit' : ' min-w-[170px]'} h-fit text-center font-semibold text-xl px-4 py-2`}>
                                {e}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SesionSkills