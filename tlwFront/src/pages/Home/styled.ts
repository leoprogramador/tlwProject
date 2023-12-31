import styled from "styled-components";

export const SearchArea = styled.div<{seeCat: string}>`
.dropdown {
    position: relative;
    display: inline-block;
  }
  
  .dropbtn {
    padding: 10px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
  }
  
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  
  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
  
  .show {
    display: block;
  }
  

    border-bottom: #CCC;
    padding: 40px 0;

    .searchBox {
        background-color: #fff;
        padding: 20px 15px;
        border-radius: 5px;
        box-shadow: 1px 1px 0.3px rgba(0,0,0,0.2);
        display: flex;

        form{
            flex: 1;
            display: flex;
            svg{
                margin-top:9px;
                margin-left:9px;
            }
            input, select {
                height: 40px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 15px;
                color: #000;
                margin-right: 20px;
                color: #777;
            }

            input {
                flex: 1;
                padding: 0 10px;
            }

            select {
                padding:5px;
                width: 100px;
            }

            button {
                background-color: #e91e63;
                font-size: 15px;
                border: 0;
                border-radius: 5px;
                color: #FFF;
                height: 40px;
                padding: 0 20px;
                cursor: pointer;
            }
        }
    }

    .categoryList {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;
        transition: all ease 0.5s;

        .categoryItem{
            width: calc(100% / 6);
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 11px;
            color: #FFF;
            text-decoration: none;
            text-align: center;
            height: 70px;
            margin: 10px;
            transition: all ease 0.2s;

            &:hover {
                opacity: 0.5;
            }

            .box-image {
                background-color: #FFF;
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 45px;
                height: 45px;
                border-radius: 30px;

                img {
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }

    .seeCat{
        display: none;
    }

    @media (max-width:600px){

        .searchBox {

            form {
                flex-direction: column;

                input {
                    padding: 10px;
                    margin-right: 0;
                    margin-bottom: 10px;
                }

                select {
                    width: 100%;
                    margin-bottom: 10px;
                }
            }
        }

        .categoryList {
            flex-wrap: wrap;
            justify-content: center;
            height: ${props => props.seeCat == "none"?"1px":"500"};
            transition: all ease 0.5s;

            .categoryItem {
                margin: 19px;
                display: ${props => props.seeCat};
                
                .box-image {
                    padding: 20px;

                    img {
                        width: 20px;
                        height: 20px;
                    }
                }

                span {
                    font-size: 8px;
                }
            }
        }

        .seeCat {
            display: flex;
            flex-direction: column;
            align-items: center;

            span{
                color: #FFF;
                font-size: 12px;
                display: ${props => props.seeCat=="none"? "flex": "none"};
            }
            
            img {
                width: 20px;
                height: auto;
                transform: ${props => props.seeCat=="none"? "": "rotate(180deg)"};
                transition: all ease 0.3s;
            }
        }
    }
`

export const CategoryArea = styled.div<{seeCat: string}>`
    background-color: white;
    border-bottom: #CCC;
    padding: 20px 0;

    h2 {
        font-size: 20px;
        text-align:center;
    }
    .searchBox {
        background-color: #4444;
        padding: 20px 15px;
        border-radius: 5px;
        box-shadow: 1px 1px 0.3px rgba(0,0,0,0.2);
        display: flex;

        form{
            flex: 1;
            display: flex;

            input, select {
                height: 40px;
                border: 0;
                border-radius: 5px;
                outline: 0;
                font-size: 15px;
                color: #000;
                margin-right: 20px;
                color: #777;
            }

            input {
                flex: 1;
                padding: 0 10px;
            }

            select {
                width: 100px;
            }

            button {
                background-color: #49aeef;
                font-size: 15px;
                border: 0;
                border-radius: 5px;
                color: #FFF;
                height: 40px;
                padding: 0 20px;
                cursor: pointer;
            }
        }
    }

    .categoryList {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        margin-bottom: 20px;
        transition: all ease 0.5s;

        .categoryItem{
            width: calc(100% / 16);
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 11px;
            color: #000;
            text-decoration: none;
            text-align: center;
            height: 70px;
            margin: 10px;
            transition: all ease 0.2s;

            &:hover {
                opacity: 0.5;
            }

            .box-image {
                background:#FFD1DA;
                padding: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 68px;
                height: 68px;
                border-radius: 100px;

                img {
                    width: 80px;
                    height: 60px;
                }
            }
        }
    }

    .seeCat{
        display: none;
    }

    @media (max-width:600px){

        .searchBox {

            form {
                flex-direction: column;

                input {
                    padding: 10px;
                    margin-right: 0;
                    margin-bottom: 10px;
                }

                select {
                    width: 100%;
                    margin-bottom: 10px;
                }
            }
        }

        .categoryList {
            flex-wrap: wrap;
            justify-content: center;
            height: ${props => props.seeCat == "none"?"1px":"500"};
            transition: all ease 0.5s;

            .categoryItem {
                margin: 19px;
                display: ${props => props.seeCat};
                
                .box-image {
                    padding: 20px;

                    img {
                        width: 20px;
                        height: 20px;
                    }
                }

                span {
                    font-size: 8px;
                }
            }
        }

        .seeCat {
            display: flex;
            flex-direction: column;
            align-items: center;

            span{
                color: #FFF;
                font-size: 12px;
                display: ${props => props.seeCat=="none"? "flex": "none"};
            }
            
            img {
                width: 20px;
                height: auto;
                transform: ${props => props.seeCat=="none"? "": "rotate(180deg)"};
                transition: all ease 0.3s;
            }
        }
    }
`
export const PageArea = styled.div`
    border-bottom: #CCC;
    padding: 20px 0;

    h2 {
        font-size: 20px;
        text-align:center;
    }

    .list {
        display: flex;
        flex-wrap: wrap;
    }
    
    .seeAllLink {
        color: #000;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        margin: 10px 0;
        font-size: 20px;
        width: 100%;
        text-align: center;

        &:hover {
            color: #9d9d9d;
        }
    }


@media (max-width:600px){
    margin: 5px;

    h2 {
        text-align: center;
    }

    .AdItem {
        width: 100%;
    }

    .seeAllLink {
        font-size: 15px;
        color: #4a4a4a;
    }
    }
}

`
