import styled from "styled-components";

export const PageArea = styled.div<{ opacity: number }>`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;

    .signin--area {
        border-radius: 15px;
        background-color: #FFF;
        width: 430px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);
        opacity: ${props => props.opacity};

    .cardPosition {
        width:395px;
        margin-top: -2rem!important;
        margin-right: 1rem!important;
        margin-left: 1rem!important;
    }
    
    .card {
        height:120px;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px 0 rgba(0,0,0,.14),0 7px 10px -5px rgba(233,30,99,.4)!important;
        padding-right: 0.25rem!important;
        padding-top: 0.1rem!important;
        padding-bottom: 1rem!important;
        font-weight: 300;
        color: #fff!important;
        text-align: center!important;
        background-image: linear-gradient(195deg,#ec407a,#d81b60);
    }
    
    .h4, .h5, .h6, h4, h5, h6 {
    font-size: 1.5rem;
    line-height: 1.375;
    }
    p{
        font-size: 14px;
        margin-top:-25px;
    }


        .title--page {
            font-weight: bold;
            color: #555;
            margin-bottom: 25px;
            font-size: 20px;
        }

        .OAuth {
            color: #FFF;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            width: 70%;
            padding: 15px 10px;
            border-radius: 25px;
            margin-bottom: 10px;
            font-size: 16px;
            cursor: pointer;

            img {
                width: 20px;
                position: absolute;
                left: 0;
                margin-left: 15px;
            }
        }

        .facebook-login {
            background-color: rgb(58, 89, 152);
        }

        .google-login {
            background-color: rgb(66, 133, 244);
        }

        .or {
            font-size: 13px;
            color: #999;
            margin: 15px;
        }

        .box-error {
            background-color:  #d64242;
            color: #FFF;
            padding: 10px 5px;
            width: 70%;
            margin: 1px 0px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 30px;
                margin-right: 15px;
            }
        }

        form {
            width: 85%;
            margin-top: 15px;

            label {
                width: 100%;

                .area--title{
                    font-weight: bold;
                    color: #555;
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                .area--input {

                    input {
                        width: 100%;
                        height: 39px;
                        border: 1px solid #d2d6da;
                        border-radius: 5px;
                        margin-bottom: 15px;
                        outline: none;
                        padding: 10px;
                        font-size: 15px;
                        color: #555;

                        &:focus {
                            border: 2px solid #d81b60;
                        }
                    }

                    .vs-password {
                        width: 100%;
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        input {
                            width: 100%;
                            padding-right: 35px;
                        }
        
                        img {
                            width: 20px;
                            position: absolute;
                            right: 0;
                            margin-right: 10px;
                            cursor: pointer;
                            margin-bottom: 15px;
                            opacity: 0.5;
                        }
                    }
                }
            }

            .area--checkbox {
                display: flex;
                align-items: center;

                input[type="checkbox"] {
                    width: 12px;
                    margin: 0;
                    margin-left: 10px;
                }
            } 
        }

        .button-area {
            width: 85%;

            button {
                width: 100%;
                border: 0;
                font-size: 17px;
                background-image: linear-gradient(195deg,#ec407a,#d81b60);
                box-shadow: 0 3px 3px 0 rgba(233,30,99,.15), 0 3px 1px -2px rgba(233,30,99,.2), 0 1px 5px 0 rgba(233,30,99,.15);
                color: #FFF;
                padding: 10px 20px;
                border-radius: 10px;
                cursor: pointer;
            }
        }

        .signup--box {
            margin: 40px 0px;
            color: #555;
            font-size: 15px;

            a {
                text-decoration: none;
                color: #6e0ad7;
                font-weight: bold;
            }
        }

        .help-box {
            color: #555;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 15px;
            cursor: pointer;
        }
    }

    .info--area {
        color: #555;
        font-size: 11px;
        margin-top: 15px;
        max-width: 500px;
        line-height: 25px;

        .pointer {
            color: #6e0ad7;
            font-weight: bold;
        }
    }

@media (max-width:600px) {

    margin-top: 0;

    .signin--area {
        width: 100vw;

        .OAuth {
            font-size: 13px;
            padding-left: 25px;
        }

        form {
            width: 90%;

            small {
                font-size: 10px;
            }
        }
    }
    
    .info--area {
        padding: 15px;
    }
}
`