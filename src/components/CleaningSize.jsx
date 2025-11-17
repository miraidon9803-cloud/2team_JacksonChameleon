import React from 'react'
import './scss/CleaningSize.scss'

const CleaningSize = ({ size, setSize, sizes }) => {
    return (
        <section className='cleaningsize-wrap'>
            <div className='inner'>
                <div className="size-select">
                    <p>사이즈를 선택해주세요</p>
                    <div className="option-buttonss">
                        {sizes.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className={size === s ? "active" : ""}
                                onClick={() => setSize(s)}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                    <p className='size-des'>기준 : 모듈에서 가장 긴 부분의 가로 길이 총합</p>
                </div>
            </div>
        </section>
    )
}

export default CleaningSize