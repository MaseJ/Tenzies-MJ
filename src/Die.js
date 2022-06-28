import React from "react"

export default function Die(props) {


    // Styles that render if die is clicked or not
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white",
        transition: "all .5s ease",
        WebkitTransition: "all .5s ease",
        MozTransition: "all .5s ease"
    }
    
    return (
        <div 
            className={`die-face die-shaking`} 
            style={styles}
            onClick={props.holdDice}
        >
            
            {props.value === 1 && 
                <div className={`face-1`}>
                    {<div className={`die`}></div>}
                </div>
            }
                
            
            {props.value === 2 &&
                <div className={`face-2`}>
                    <div className={`die`}></div>
                    <div className={`die`}></div>
                </div>
            }

            {props.value === 3 &&
                <div className={`face-3`}>
                    <div className={`die`}></div>
                    <div className={`die`}></div>
                    <div className={`die`}></div>
                </div>
            }

            {props.value === 4 &&
                <div className={`face-4`}>
                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>
                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>
                    
                </div>
            }

            {props.value === 5 &&
                <div className={`face-5`}>
                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>

                    <div className={`die`}></div>

                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>
                </div>    
            }

            {props.value === 6 &&
                <div className={`face-6`}>
                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>
                    <div className={`column`}>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                        <div className={`die`}></div>
                    </div>
                    
                </div>
            }   
            
        </div>
    )
}