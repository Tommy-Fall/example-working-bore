import styles from '../styles/ModalRoute.module.css'
import { useState, useEffect } from 'react'

const ModalRoute = (props) => {



    const handleClick = e => {
        e.stopPropagation()
    }


    const closeModal = () => {
        props.closeModal()
    }

    return (
        <>
            <>
                {props.state ? (
                    <>
                        <div onClick={() => closeModal()} className={styles.overlay_route}>
                            <div className={styles.modal_route_container}>
                                <div className={`${styles.modal_route}`} onClick={(e) => handleClick(e)}>
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </>

        </>
    )
}

export default ModalRoute

