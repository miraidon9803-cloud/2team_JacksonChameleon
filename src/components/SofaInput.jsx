import React from 'react'
import './scss/SofaInput.scss'

const SofaInput = ({ sofaName, setSofaName }) => {
    return (
        <section className='sofainput-wrap'>
            <div className="inner">

                <div className="sofa-name">
                    <p>소파명을 입력해주세요</p>
                    <input
                        type="text"
                        value={sofaName}
                        onChange={(e) => setSofaName(e.target.value)}
                    />
                </div>
            </div>
        </section>
    )
}

export default SofaInput