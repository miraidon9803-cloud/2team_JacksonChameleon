import React from 'react'
import './scss/CleaningFebric.scss'

const CleaningFebric = ({ material, setMaterial, materials }) => {
    return (
        <section className='cleaningfebric-wrap'>
            <div className='inner'>
                <div className="cleaning-select">
                    <p>원단을 선택해주세요</p>
                    <div className="option-buttons">
                        {materials.map((m) => (
                            <button
                                key={m}
                                type="button"
                                className={material === m ? "active" : ""}
                                onClick={() => setMaterial(m)}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CleaningFebric