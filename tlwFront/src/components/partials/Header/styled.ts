import styled from "styled-components";
import backgroundImage from "/images/bg0.jpg";

export const HeaderArea = styled.header`

    .filter{
        background-image: url(${backgroundImage});
         background-size: cover;
         height: 450px;
        border-bottom: 0px solid #CCC;
         overflow: hidden;
         align-items: center;
         background-position: 50%;
    }
    .centered-text {
      position: relative;
      top:70%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;

      h2{
        
        height:45px;
        font-size: 3rem;
        margin-top: -3rem;
        color: #fff;
      }
      p{
        font-size: 1.25rem;
        line-height: 1.625;
        font-weight: 400;
        color: #fff;
      
      }
    }
    
    .mask {
        position: absolute;
        background-size: cover;
        width: 100%;
        height: 450px;
        background-image: linear-gradient(195deg,#ec407a,#d81b60);
        opacity: .4!important;
    }
    .containerT{
        display: flex;
        justify-content: center;
        margin-top:150px;
        flex-wrap: wrap;
       
    }
    h1{
        width:590px;

    }
    .containerFixed {
        position:fixed;
        top:0;
        left:0;
        right:0;
        max-width: 1000px;
        margin: auto;
        display: flex;
        margin-top: 1rem;
    }
    .container {
      margin: auto;
      display: flex;
  }

    a{
        text-decoration: none;
    }


    .navBarFixed{
      border-radius: 0.75rem;
    }
    nav {
        .logo {
            display: flex;
             align-items: center;
             margin-right: auto; 
             margin-left:5px;
            img {
              width: 40px;
              border-radius: 20px;
              margin-right: 2px;
            }
          }
          
        backdrop-filter: saturate(200%) blur(30px);
        background-color: hsla(0,0%,100%,.8);
        margin-bottom: 1rem;
        
        right: 0;
        left: 0;
        width:100%;
        box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06);
        flex-wrap: nowrap;    
        margin: 0;

        .ulOther{
          height: 37px;
          padding: 0 75px;
        }
        ul {
            display: flex;
            align-items: center;
            list-style: none;
            height: 22px;
            justify-content: flex-end;

            li{
                margin-left: 20px;
                margin-right: 20px;

                a, button{
                    border: 0;
                    background: none;
                    cursor: pointer;
                    outline: 0;
                    color: #344767;
                    font-size: 14px;
                    display:flex;
                    align-items: center;

                    svg {
                        margin-right: 2px;
                    }

                    &:hover {
                        color: #6e0ad7;

                        svg path {
                            fill: #6e0ad7;
                        }
                    }
                    
                    img {
                        width: 25px;
                        border-radius: 20px;
                        margin-right: 2px;
                    }
                }

                .button {
                    background-color: #e91e63;
                    color: #FFF;
                    border-radius: 8px;
                    padding: 7px 10px;

                    &:hover {
                        background-color: #E57706;
                        color: #FFF
                    }
                }
            }
        }
    }

@media (max-width: 600px) {
    height: auto;

    .containerFixed{
      background:#fff;
      margin:0;
      padding:0;
      position:absolute;
      max-width: 1000px;

    
    }

    .logo {
        margin:5px;
        display: flex;
        align-items: center;
        list-style: none;
        height: 22px;
        width:51%;
        justify-content: flex-end;
    
        img {
          width: 30px;
          border-radius: 20px;
          margin-right: 0px;
        }
      }

   
  nav {
    margin: 0;
      padding: 5px;
    ul {
      margin: 0;
      padding: 0;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      height: auto;
      margin-top: 10px;

      li {
        width: 50%; /* Ajustar a largura total */
        margin: 0;
        display: flex;
        justify-content: center;
        margin-top: 10px;

        .button {
          border-radius: 5px;
        }
      }

      .l2 {
        width: 100%;
        display: flex;
        justify-content: center;

        .button {
          width: 100%;
          border-radius: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          margin-bottom: -1px;
        }
      }
    }
  }
}
`